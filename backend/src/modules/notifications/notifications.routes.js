const express = require('express');
const router = express.Router();
const notificationsController = require('./controllers/notifications.controller');

router.get('/', notificationsController.getAll);
router.get('/recent', notificationsController.getRecent);
router.patch('/read-all', notificationsController.markAllAsRead);
router.patch('/:id/read', notificationsController.markAsRead);

module.exports = router;
