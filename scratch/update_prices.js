const mysql = require('mysql2/promise');

async function updateProductPrices() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'thang123!',
    database: 'atelier_management',
    charset: 'utf8mb4'
  });

  try {
    // Lấy 12 sản phẩm Safetino mới nhất
    const [rows] = await connection.execute('SELECT product_id FROM products ORDER BY product_id DESC LIMIT 12');
    
    const prices = [450000, 495000, 520000, 550000, 485000, 515000];
    const oldPrices = [650000, 700000, 750000, 800000];

    for (let i = 0; i < rows.length; i++) {
      const basePrice = prices[i % prices.length];
      const oldPrice = oldPrices[i % oldPrices.length];
      
      await connection.execute(
        'UPDATE products SET base_price = ?, old_price = ?, status = ? WHERE product_id = ?',
        [basePrice, oldPrice, 'Còn hàng', rows[i].product_id]
      );
    }

    console.log(`Successfully updated prices for ${rows.length} products to around 500k.`);
  } catch (error) {
    console.error('Error updating prices:', error);
  } finally {
    await connection.end();
  }
}

updateProductPrices();
