const notificationsService = require('../services/notifications.service');

class NotificationsController {
  async getAll(req, res) {
    try {
      const result = await notificationsService.getNotifications(req.query);
      if (result.success) {
        res.json(result);
      } else {
        res.status(result.statusCode || 500).json(result);
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getRecent(req, res) {
    try {
      const result = await notificationsService.getRecentNotifications(req.query.limit);
      if (result.success) {
        res.json(result);
      } else {
        res.status(result.statusCode || 500).json(result);
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async markAsRead(req, res) {
    try {
      const result = await notificationsService.markNotificationAsRead(req.params.id);
      if (result.success) {
        res.json(result);
      } else {
        res.status(result.statusCode || 500).json(result);
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async markAllAsRead(req, res) {
    try {
      const result = await notificationsService.markAllNotificationsAsRead();
      if (result.success) {
        res.json(result);
      } else {
        res.status(result.statusCode || 500).json(result);
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new NotificationsController();
