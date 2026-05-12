const db = require('../../../shared/database');

class ReviewsRepository {
  async findAll() {
    const [rows] = await db.query(`
      SELECT
        pr.review_id,
        pr.product_id,
        pr.account_id,
        pr.order_id,
        pr.rating,
        pr.comment,
        pr.status,
        pr.created_at,
        pr.updated_at,
        p.product_name,
        a.full_name AS customer_name
      FROM product_reviews pr
      LEFT JOIN products p ON pr.product_id = p.product_id
      LEFT JOIN accounts a ON pr.account_id = a.account_id
      ORDER BY pr.created_at DESC, pr.review_id DESC
    `);

    return rows;
  }

  async findById(id) {
    const [rows] = await db.query(`
      SELECT
        pr.review_id,
        pr.product_id,
        pr.account_id,
        pr.order_id,
        pr.rating,
        pr.comment,
        pr.status,
        pr.created_at,
        pr.updated_at,
        p.product_name,
        a.full_name AS customer_name
      FROM product_reviews pr
      LEFT JOIN products p ON pr.product_id = p.product_id
      LEFT JOIN accounts a ON pr.account_id = a.account_id
      WHERE pr.review_id = ?
      LIMIT 1
    `, [id]);

    return rows[0] || null;
  }

  async create(data) {
    const [result] = await db.query(
      `INSERT INTO product_reviews (product_id, account_id, order_id, rating, comment, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.product_id,
        data.account_id,
        data.order_id || null,
        data.rating,
        data.comment || '',
        data.status || 'Chờ duyệt'
      ]
    );

    return result.insertId;
  }

  async updateStatus(id, status) {
    const [result] = await db.query(
      'UPDATE product_reviews SET status = ? WHERE review_id = ?',
      [status, id]
    );
    return result.affectedRows > 0;
  }

  async delete(id) {
    const [result] = await db.query('DELETE FROM product_reviews WHERE review_id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new ReviewsRepository();
