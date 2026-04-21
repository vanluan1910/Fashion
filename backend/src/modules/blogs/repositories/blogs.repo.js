const db = require('../../../config/db');

class BlogsRepository {
  async findAll() {
    try {
      const [rows] = await db.execute('SELECT * FROM blogs ORDER BY created_at DESC');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const [rows] = await db.execute('SELECT * FROM blogs WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async create(blogData) {
    const { title, excerpt, content, author, category, image_url } = blogData;
    try {
      const [result] = await db.execute(
        'INSERT INTO blogs (title, excerpt, content, author, category, image_url) VALUES (?, ?, ?, ?, ?, ?)',
        [title, excerpt, content, author, category, image_url]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new BlogsRepository();
