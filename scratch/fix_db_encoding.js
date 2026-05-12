const mysql = require('mysql2/promise');

async function fixDatabaseEncoding() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'thang123!',
    database: 'atelier_management',
    charset: 'utf8mb4'
  });

  try {
    const newName = 'Áo sơ mi nam công sở Safetino';
    
    // Lấy 12 sản phẩm mới nhất
    const [rows] = await connection.execute('SELECT product_id FROM products ORDER BY product_id DESC LIMIT 12');
    
    for (const row of rows) {
      await connection.execute(
        'UPDATE products SET product_name = ? WHERE product_id = ?',
        [newName, row.product_id]
      );
    }

    console.log(`Successfully updated ${rows.length} products with clean Vietnamese names.`);
  } catch (error) {
    console.error('Error updating database:', error);
  } finally {
    await connection.end();
  }
}

fixDatabaseEncoding();
