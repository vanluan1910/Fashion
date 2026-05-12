const notificationsRepo = require('../repositories/notifications.repo');

class NotificationsService {
  parseInteger(value, fieldName, defaultValue = null) {
    if (value === undefined || value === null || value === '') {
      if (defaultValue !== null) {
        return defaultValue;
      }

      const error = new Error(`${fieldName} is required`);
      error.statusCode = 400;
      throw error;
    }

    const parsedValue = Number.parseInt(value, 10);
    if (!Number.isInteger(parsedValue) || parsedValue < 0) {
      const error = new Error(`${fieldName} must be a non-negative integer`);
      error.statusCode = 400;
      throw error;
    }

    return parsedValue;
  }

  parseFilter(filter) {
    const normalizedFilter = filter || 'all';
    if (!['all', 'unread'].includes(normalizedFilter)) {
      const error = new Error('filter must be one of: all, unread');
      error.statusCode = 400;
      throw error;
    }

    return normalizedFilter;
  }

  mapNotification(notification) {
    return {
      ...notification,
      metadata_json: this.parseMetadata(notification.metadata_json),
      is_read: Boolean(notification.is_read)
    };
  }

  parseMetadata(metadata) {
    if (!metadata) {
      return null;
    }

    if (typeof metadata === 'object') {
      return metadata;
    }

    try {
      return JSON.parse(metadata);
    } catch (error) {
      return metadata;
    }
  }

  async createNotification(data) {
    try {
      const requiredFields = ['type', 'title', 'message', 'entity_type', 'entity_id'];
      for (const field of requiredFields) {
        if (!data?.[field]) {
          const error = new Error(`${field} is required`);
          error.statusCode = 400;
          throw error;
        }
      }

      if (typeof data.metadata_json === 'string') {
        JSON.parse(data.metadata_json);
      }

      const notification = await notificationsRepo.create(data);
      return {
        success: true,
        data: this.mapNotification(notification)
      };
    } catch (error) {
      return {
        success: false,
        statusCode: error.statusCode || 500,
        message: error.message
      };
    }
  }

  async getRecentNotifications(limit) {
    try {
      const safeLimit = Math.min(this.parseInteger(limit, 'limit', 5), 50);
      const notifications = await notificationsRepo.findRecent(safeLimit);
      return {
        success: true,
        data: notifications.map((notification) => this.mapNotification(notification))
      };
    } catch (error) {
      return {
        success: false,
        statusCode: error.statusCode || 500,
        message: error.message
      };
    }
  }

  async getNotifications(query) {
    try {
      const limit = Math.min(this.parseInteger(query.limit, 'limit', 20), 100);
      const offset = this.parseInteger(query.offset, 'offset', 0);
      const filter = this.parseFilter(query.filter);
      const result = await notificationsRepo.findAll({ limit, offset, filter });

      return {
        success: true,
        data: {
          items: result.items.map((notification) => this.mapNotification(notification)),
          pagination: {
            total: result.total,
            unread_count: result.unread_count,
            limit,
            offset,
            filter
          }
        }
      };
    } catch (error) {
      return {
        success: false,
        statusCode: error.statusCode || 500,
        message: error.message
      };
    }
  }

  async markNotificationAsRead(notificationId) {
    try {
      const parsedId = this.parseInteger(notificationId, 'notification_id');
      const existingNotification = await notificationsRepo.findById(parsedId);

      if (!existingNotification) {
        return {
          success: false,
          statusCode: 404,
          message: 'Notification not found'
        };
      }

      if (!existingNotification.is_read) {
        await notificationsRepo.markAsRead(parsedId);
      }

      const notification = await notificationsRepo.findById(parsedId);
      return {
        success: true,
        data: this.mapNotification(notification),
        message: existingNotification.is_read
          ? 'Notification already marked as read'
          : 'Notification marked as read'
      };
    } catch (error) {
      return {
        success: false,
        statusCode: error.statusCode || 500,
        message: error.message
      };
    }
  }

  async markAllNotificationsAsRead() {
    try {
      const affectedRows = await notificationsRepo.markAllAsRead();
      return {
        success: true,
        data: { updated_count: affectedRows },
        message: 'All notifications marked as read'
      };
    } catch (error) {
      return {
        success: false,
        statusCode: error.statusCode || 500,
        message: error.message
      };
    }
  }
}

module.exports = new NotificationsService();
