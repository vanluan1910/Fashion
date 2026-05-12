const db = require('../../../shared/database');

class BlogCommentsRepository {
  async findByPostId(postId) {
    const [rows] = await db.query(
      `SELECT comment_id, post_id, user_name, content, created_at
       FROM blog_comments
       WHERE post_id = ?
       ORDER BY created_at DESC, comment_id DESC`,
      [postId]
    );
    return rows;
  }

  async create(data) {
    const [result] = await db.query(
      'INSERT INTO blog_comments (post_id, user_name, content) VALUES (?, ?, ?)',
      [data.post_id, data.user_name, data.content]
    );
    return result.insertId;
  }
}

module.exports = new BlogCommentsRepository();
