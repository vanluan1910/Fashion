const db = require('../../../shared/database');
const authModel = require('../models/auth.model');

class AuthRepository {
  constructor() {
    // Tự động lấy danh sách các cột từ Model (trừ password/object)
    this.columns = Object.keys(authModel)
      .filter(key => key !== 'password' && typeof authModel[key] !== 'object')
      .join(', ');
  }

  async findAll() {
    const [rows] = await db.query('SELECT account_id, full_name, email, phone, status, created_at FROM accounts WHERE role_id = 3 ORDER BY full_name ASC');
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query(`SELECT ${this.columns} FROM accounts WHERE account_id = ?`, [id]);
    return rows[0];
  }

  async findByEmail(email) {
    const [rows] = await db.query(`SELECT * FROM accounts WHERE email = ?`, [email]);
    return rows[0];
  }

  async create(data) {
    const [result] = await db.query('INSERT INTO accounts SET ?', data);
    return result.insertId;
  }

  async update(id, data) {
    const [result] = await db.query('UPDATE accounts SET ? WHERE account_id = ?', [data, id]);
    return result.affectedRows > 0;
  }

  async delete(id) {
    const [result] = await db.query('DELETE FROM accounts WHERE account_id = ?', [id]);
    return result.affectedRows > 0;
  }

  async findRecent() {
    const [rows] = await db.query(
      `SELECT account_id, full_name, created_at FROM accounts 
       WHERE role_id = 3 
       ORDER BY created_at DESC LIMIT 5`
    );
    return rows;
  }
}

module.exports = new AuthRepository();
