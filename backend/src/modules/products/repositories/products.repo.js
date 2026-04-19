const db = require('../../../shared/database');
const productsModel = require('../models/products.model');

class ProductsRepository {
  constructor() {
    // Tự động lấy danh sách các cột từ Model (trừ password/object)
    this.columns = Object.keys(productsModel)
      .filter(key => key !== 'password' && typeof productsModel[key] !== 'object')
      .join(', ');
  }

  async findAll() {
    const [rows] = await db.query(`SELECT ${this.columns} FROM productss`);
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query(`SELECT ${this.columns} FROM productss WHERE id = ?`, [id]);
    return rows[0];
  }

  async create(data) {
    const [result] = await db.query('INSERT INTO productss SET ?', data);
    return result.insertId;
  }

  async update(id, data) {
    const [result] = await db.query('UPDATE productss SET ? WHERE id = ?', [data, id]);
    return result.affectedRows > 0;
  }

  async delete(id) {
    const [result] = await db.query('DELETE FROM productss WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new ProductsRepository();
