const db = require('../../../shared/database');
const productsModel = require('../models/products.model');

class ProductsRepository {
  async findAll() {
    const query = `
      SELECT p.*, c.category_name, 
             (SELECT image_url FROM product_images WHERE product_id = p.product_id AND is_primary = 1 LIMIT 1) as primary_image
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.category_id
      ORDER BY p.created_at DESC
    `;
    const [rows] = await db.query(query);
    return rows;
  }

  async findById(id) {
    const query = `
      SELECT p.*, c.category_name,
             (SELECT image_url FROM product_images WHERE product_id = p.product_id AND is_primary = 1 LIMIT 1) as primary_image
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.category_id
      WHERE p.product_id = ?
    `;
    const [rows] = await db.query(query, [id]);
    return rows[0];
  }

  async findImages(productId) {
    const [rows] = await db.query('SELECT image_url, is_primary FROM product_images WHERE product_id = ?', [productId]);
    return rows;
  }

  async findVariants(productId) {
    const [rows] = await db.query('SELECT * FROM product_variants WHERE product_id = ?', [productId]);
    return rows;
  }

  async create(data) {
    const [result] = await db.query('INSERT INTO products SET ?', data);
    return result.insertId;
  }

  async update(id, data) {
    const [result] = await db.query('UPDATE products SET ? WHERE product_id = ?', [data, id]);
    return result.affectedRows > 0;
  }

  async delete(id) {
    const [result] = await db.query('DELETE FROM products WHERE product_id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new ProductsRepository();
