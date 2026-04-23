const db = require('./src/shared/database');
async function check() {
  const [rows] = await db.query('SELECT * FROM categories');
  console.log(JSON.stringify(rows, null, 2));
  process.exit();
}
check();
