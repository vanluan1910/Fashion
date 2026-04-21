const express = require('express');
const router = express.Router();
const blogsController = require('./controllers/blogs.controller');

// Public routes
router.get('/', blogsController.getAll);
router.get('/:id', blogsController.getById);

// Admin/Protected routes (could add auth middleware later)
router.post('/', blogsController.create);

module.exports = router;
