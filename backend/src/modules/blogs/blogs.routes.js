const express = require('express');
const router = express.Router();
const blogsController = require('./controllers/blogs.controller');

// Public routes
router.get('/', blogsController.getAll);
router.get('/:id', blogsController.getById);
router.get('/slug/:slug', blogsController.getBySlug);
router.get('/:id/comments', blogsController.getComments);

// Admin/Protected routes (could add auth middleware later)
router.post('/', blogsController.create);
router.post('/:id/comments', blogsController.createComment);

module.exports = router;
