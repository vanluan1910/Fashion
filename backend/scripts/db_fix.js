const mysql = require('mysql2/promise');
require('dotenv').config({ path: './backend/.env' });

async function fix() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    charset: 'utf8mb4'
  });

  console.log('Đang kết nối database...');

  const queries = [
    ["UPDATE categories SET category_name = ? WHERE category_id = 1", "Thời trang nam"],
    ["UPDATE categories SET category_name = ? WHERE category_id = 2", "Thời trang nữ"],
    ["UPDATE categories SET category_name = ? WHERE category_id = 3", "Phụ kiện"]
  ];

  for (const [sql, value] of queries) {
    await connection.execute(sql, [value]);
    console.log(`Đã cập nhật: ${value}`);
  }

  await connection.end();
  console.log('Hoàn thành sửa lỗi font!');
}

fix().catch(console.error);
