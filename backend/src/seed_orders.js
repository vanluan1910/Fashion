const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../.env' });

async function seedOrders() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3307,
    charset: 'utf8mb4'
  });

  try {
    console.log('Inserting sample orders...');
    const orders = [
      { account_id: 3, total_amount: 1250000, status: 'Đang xử lý' },
      { account_id: 4, total_amount: 450000, status: 'Hoàn thành' },
      { account_id: 3, total_amount: 890000, status: 'Đã hủy' }
    ];

    for (const order of orders) {
      await connection.execute(
        'INSERT INTO orders (account_id, total_amount, status) VALUES (?, ?, ?)',
        [order.account_id, order.total_amount, order.status]
      );
    }
    console.log('Success! Orders seeded with correct Vietnamese status.');
  } catch (error) {
    console.error('Error seeding orders:', error);
  } finally {
    await connection.end();
  }
}

seedOrders();
