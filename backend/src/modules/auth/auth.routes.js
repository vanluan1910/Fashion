const express = require('express');
const router = express.Router();
const authController = require('./controllers/auth.controller');
const authMiddleware = require('../../shared/middleware/auth.middleware');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/users', authController.getAllUsers);
router.get('/recent-signups', authController.getRecentSignups);

// Protected routes
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;
