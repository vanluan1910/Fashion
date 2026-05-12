const db = require('../../../config/db');

class OrdersRepository {
  async findItemsByOrderId(orderId) {
    const [rows] = await db.execute(`
      SELECT
        oi.order_item_id,
        oi.order_id,
        oi.variant_id,
        oi.quantity,
        oi.price_at_purchase,
        pv.product_id,
        pv.color,
        pv.size,
        pv.sku,
        p.product_name
      FROM order_items oi
      LEFT JOIN product_variants pv ON oi.variant_id = pv.variant_id
      LEFT JOIN products p ON pv.product_id = p.product_id
      WHERE oi.order_id = ?
      ORDER BY oi.order_item_id ASC
    `, [orderId]);

    return rows;
  }

  async findAll() {
    try {
      const [rows] = await db.execute(`
        SELECT 
          o.*, 
          a.full_name as customer_name, 
          a.email as customer_email,
          (SELECT COUNT(*) FROM order_items WHERE order_id = o.order_id) as items_count
        FROM orders o 
        JOIN accounts a ON o.account_id = a.account_id 
        ORDER BY o.order_date DESC
      `);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const [rows] = await db.execute(`
        SELECT o.*, a.full_name as customer_name, a.email as customer_email, a.phone as customer_phone
        FROM orders o 
        JOIN accounts a ON o.account_id = a.account_id 
        WHERE o.order_id = ?
      `, [id]);
      const order = rows[0];
      if (!order) return null;
      order.items = await this.findItemsByOrderId(order.order_id);
      return order;
    } catch (error) {
      throw error;
    }
  }

  async findByAccountId(accountId) {
    try {
      const [rows] = await db.execute(`
        SELECT * FROM orders 
        WHERE account_id = ? 
        ORDER BY order_date DESC
      `, [accountId]);
      const orders = rows;
      const itemsByOrder = await Promise.all(
        orders.map(async (order) => ({
          order_id: order.order_id,
          items: await this.findItemsByOrderId(order.order_id)
        }))
      );

      const itemsMap = new Map(itemsByOrder.map((entry) => [entry.order_id, entry.items]));
      return orders.map((order) => ({
        ...order,
        items: itemsMap.get(order.order_id) || []
      }));
    } catch (error) {
      throw error;
    }
  }

  async create(data) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      const [orderResult] = await connection.execute(
        'INSERT INTO orders (account_id, total_amount, status, order_date) VALUES (?, ?, ?, NOW())',
        [data.account_id, data.total_amount, data.status || 'Đang xử lý']
      );
      const orderId = orderResult.insertId;

      if (data.items && data.items.length > 0) {
        for (const item of data.items) {
          let variantId = item.variant_id;
          if (!variantId) {
            const [variants] = await connection.execute(
              'SELECT variant_id FROM product_variants WHERE product_id = ? LIMIT 1',
              [item.id]
            );
            variantId = variants.length > 0 ? variants[0].variant_id : null;
          }

          if (variantId) {
            await connection.execute(
              'INSERT INTO order_items (order_id, variant_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)',
              [orderId, variantId, item.quantity, item.price]
            );
          }
        }
      }

      await connection.commit();
      return orderId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async updateStatus(id, status) {
    try {
      const [result] = await db.execute(
        'UPDATE orders SET status = ? WHERE order_id = ?',
        [status, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new OrdersRepository();
