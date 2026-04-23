const db = require('./src/shared/database');
async function run() {
  try {
    await db.query('ALTER TABLE products ADD COLUMN sub_category VARCHAR(100)');
    console.log('Success: sub_category column added');
  } catch (err) {
    if (err.code === 'ER_DUP_COLUMN_NAME') {
      console.log('Column sub_category already exists');
    } else {
      console.error('Error adding column:', err);
    }
  } finally {
    process.exit(0);
  }
}
run();
