require('dotenv').config();
const db = require('./config/db');

const CREATE_NOTIFICATIONS_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS notifications (
  notification_id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id VARCHAR(50) NOT NULL,
  actor_account_id INT NULL,
  metadata_json JSON NULL,
  is_read TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP NULL
) ENGINE=InnoDB;
`;

async function ensureNotificationsTable() {
  try {
    await db.execute(CREATE_NOTIFICATIONS_TABLE_SQL);
    console.log('Notifications table is ready.');
  } catch (error) {
    console.error('Failed to create notifications table:', error.message);
    process.exitCode = 1;
  } finally {
    await db.end();
  }
}

ensureNotificationsTable();
