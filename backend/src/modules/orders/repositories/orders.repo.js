const db = require('../../../config/db');

class OrdersRepository {
  async findAll() {
    try {
      // Join with accounts to get customer info and count items
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
      return rows[0];
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
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async create(data) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // 1. Insert into orders
      const [orderResult] = await connection.execute(
        'INSERT INTO orders (account_id, total_amount, status, order_date) VALUES (?, ?, ?, NOW())',
        [data.account_id, data.total_amount, data.status || 'Đang xử lý']
      );
      const orderId = orderResult.insertId;

      // 2. Insert into order_items
      if (data.items && data.items.length > 0) {
        for (const item of data.items) {
          // If variant_id is missing, try to find the first variant for this product
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
