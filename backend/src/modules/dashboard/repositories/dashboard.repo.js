const db = require('../../../config/db');

class DashboardRepository {
  async getStats() {
    try {
      // 1. Revenue comparison (Current month vs Previous month)
      const [[currentRevenue]] = await db.execute(`
        SELECT SUM(total_amount) as total 
        FROM orders 
        WHERE status != 'Đã hủy' AND MONTH(order_date) = MONTH(CURDATE()) AND YEAR(order_date) = YEAR(CURDATE())
      `);

      const [[prevRevenue]] = await db.execute(`
        SELECT SUM(total_amount) as total 
        FROM orders 
        WHERE status != 'Đã hủy' 
        AND MONTH(order_date) = MONTH(DATE_SUB(CURDATE(), INTERVAL 1 MONTH))
        AND YEAR(order_date) = YEAR(DATE_SUB(CURDATE(), INTERVAL 1 MONTH))
      `);

      // 2. Orders comparison (Today vs Yesterday)
      const [[todayOrders]] = await db.execute(`
        SELECT COUNT(*) as total 
        FROM orders 
        WHERE DATE(order_date) = CURDATE()
      `);

      const [[yesterdayOrders]] = await db.execute(`
        SELECT COUNT(*) as total 
        FROM orders 
        WHERE DATE(order_date) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)
      `);

      // 3. Customers comparison (Total customers)
      const [[totalCustomers]] = await db.execute(`
        SELECT COUNT(*) as total FROM accounts WHERE role_id = 3
      `);

      const [[prevCustomers]] = await db.execute(`
        SELECT COUNT(*) as total FROM accounts 
        WHERE role_id = 3 
        AND created_at < DATE_FORMAT(CURDATE() ,'%Y-%m-01')
      `);

      // Calculate conversion rate (dummy or based on logic if available)
      const conversionRate = 3.24; 

      return {
        revenue: {
          current: parseFloat(currentRevenue.total) || 0,
          previous: parseFloat(prevRevenue.total) || 0
        },
        orders: {
          current: todayOrders.total || 0,
          previous: yesterdayOrders.total || 0
        },
        customers: {
          current: totalCustomers.total || 0,
          previous: prevCustomers.total || 0
        },
        conversionRate: conversionRate
      };
    } catch (error) {
      throw error;
    }
  }

  async getRecentOrders(limit = 5) {
    try {
      const [rows] = await db.execute(`
        SELECT 
          o.order_id, 
          o.total_amount, 
          o.status, 
          o.order_date,
          a.full_name as customer_name,
          (
            SELECT p.product_name 
            FROM order_items oi
            JOIN product_variants pv ON oi.variant_id = pv.variant_id
            JOIN products p ON pv.product_id = p.product_id
            WHERE oi.order_id = o.order_id
            LIMIT 1
          ) as product_name
        FROM orders o
        JOIN accounts a ON o.account_id = a.account_id
        ORDER BY o.order_date DESC
        LIMIT ?
      `, [limit]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async getRevenueStats(period = 'year', targetYear = new Date().getFullYear()) {
    try {
      let query = '';
      let params = [targetYear];

      if (period === 'year') {
        query = `
          SELECT 
            MONTH(order_date) as label_num, 
            SUM(total_amount) as revenue
          FROM orders
          WHERE YEAR(order_date) = ? AND status != 'Đã hủy'
          GROUP BY MONTH(order_date)
          ORDER BY MONTH(order_date)
        `;
      } else if (period === 'month') {
        query = `
          SELECT 
            DAY(order_date) as label_num, 
            SUM(total_amount) as revenue
          FROM orders
          WHERE YEAR(order_date) = ? AND MONTH(order_date) = MONTH(CURDATE()) AND status != 'Đã hủy'
          GROUP BY DAY(order_date)
          ORDER BY DAY(order_date)
        `;
      } else if (period === 'week') {
        query = `
          SELECT 
            DAYNAME(order_date) as label_num, 
            SUM(total_amount) as revenue
          FROM orders
          WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND status != 'Đã hủy'
          GROUP BY DAYNAME(order_date)
          ORDER BY order_date
        `;
        params = []; // No targetYear needed for last 7 days usually, or we could refine
      }

      const [rows] = await db.execute(query, params);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async getCategoryStats() {
    try {
      const [rows] = await db.execute(`
        SELECT c.category_name as name, SUM(oi.price_at_purchase * oi.quantity) as value
        FROM order_items oi
        JOIN product_variants pv ON oi.variant_id = pv.variant_id
        JOIN products p ON pv.product_id = p.product_id
        JOIN categories c ON p.category_id = c.category_id
        JOIN orders o ON oi.order_id = o.order_id
        WHERE o.status != 'Đã hủy'
        GROUP BY c.category_name
        ORDER BY value DESC
        LIMIT 5
      `);
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new DashboardRepository();
