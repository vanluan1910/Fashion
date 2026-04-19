const db = require('../../../shared/database');
const homeModel = require('../models/home.model');

class HomeRepository {
  constructor() {
    // Tự động lấy danh sách các cột từ Model (trừ password/object)
    this.columns = Object.keys(homeModel)
      .filter(key => key !== 'password' && typeof homeModel[key] !== 'object')
      .join(', ');
  }

  async findAll() {
    const [rows] = await db.query(`SELECT ${this.columns} FROM homes`);
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query(`SELECT ${this.columns} FROM homes WHERE id = ?`, [id]);
    return rows[0];
  }

  async create(data) {
    const [result] = await db.query('INSERT INTO homes SET ?', data);
    return result.insertId;
  }

  async update(id, data) {
    const [result] = await db.query('UPDATE homes SET ? WHERE id = ?', [data, id]);
    return result.affectedRows > 0;
  }

  async delete(id) {
    const [result] = await db.query('DELETE FROM homes WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new HomeRepository();
