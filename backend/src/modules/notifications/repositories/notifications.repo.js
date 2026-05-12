const db = require('../../../shared/database');

class NotificationsRepository {
  serializeMetadata(metadata) {
    if (metadata === undefined || metadata === null) {
      return null;
    }

    return typeof metadata === 'string' ? metadata : JSON.stringify(metadata);
  }

  async create(data) {
    const payload = {
      type: data.type,
      title: data.title,
      message: data.message,
      entity_type: data.entity_type,
      entity_id: String(data.entity_id),
      actor_account_id: data.actor_account_id || null,
      metadata_json: this.serializeMetadata(data.metadata_json),
      is_read: data.is_read ? 1 : 0,
      read_at: data.read_at || null
    };

    const [result] = await db.query('INSERT INTO notifications SET ?', payload);
    return this.findById(result.insertId);
  }

  async findById(notificationId) {
    const [rows] = await db.query(
      `SELECT notification_id, type, title, message, entity_type, entity_id,
              actor_account_id, metadata_json, is_read, created_at, read_at
       FROM notifications
       WHERE notification_id = ?
       LIMIT 1`,
      [notificationId]
    );

    return rows[0] || null;
  }

  async findRecent(limit = 5) {
    const safeLimit = Number(limit) > 0 ? Number(limit) : 5;
    const [rows] = await db.query(
      `SELECT notification_id, type, title, message, entity_type, entity_id,
              actor_account_id, metadata_json, is_read, created_at, read_at
       FROM notifications
       ORDER BY created_at DESC, notification_id DESC
       LIMIT ?`,
      [safeLimit]
    );
    return rows;
  }

  async findAll({ limit = 20, offset = 0, filter = 'all' }) {
    const safeLimit = Number(limit) > 0 ? Number(limit) : 20;
    const safeOffset = Number(offset) >= 0 ? Number(offset) : 0;
    const shouldFilterUnread = filter === 'unread';
    const whereClause = shouldFilterUnread ? 'WHERE is_read = 0' : '';

    const [rows] = await db.query(
      `SELECT notification_id, type, title, message, entity_type, entity_id,
              actor_account_id, metadata_json, is_read, created_at, read_at
       FROM notifications
       ${whereClause}
       ORDER BY created_at DESC, notification_id DESC
       LIMIT ? OFFSET ?`,
      [safeLimit, safeOffset]
    );

    const [countRows] = await db.query(
      `SELECT COUNT(*) AS total
       FROM notifications
       ${whereClause}`
    );

    const [unreadRows] = await db.query(
      'SELECT COUNT(*) AS unread_count FROM notifications WHERE is_read = 0'
    );

    return {
      items: rows,
      total: countRows[0]?.total || 0,
      unread_count: unreadRows[0]?.unread_count || 0
    };
  }

  async markAsRead(notificationId) {
    const [result] = await db.query(
      `UPDATE notifications
       SET is_read = 1,
           read_at = COALESCE(read_at, NOW())
       WHERE notification_id = ?`,
      [notificationId]
    );
    return result.affectedRows > 0;
  }

  async markAllAsRead() {
    const [result] = await db.query(
      `UPDATE notifications
       SET is_read = 1,
           read_at = COALESCE(read_at, NOW())
       WHERE is_read = 0`
    );
    return result.affectedRows;
  }
}

module.exports = new NotificationsRepository();
