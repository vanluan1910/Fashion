const blogsService = require('../services/blogs.service');

class BlogsController {
  async getAll(req, res) {
    const result = await blogsService.getAllBlogs();
    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  }

  async getById(req, res) {
    const result = await blogsService.getBlogById(req.params.id);
    if (result.success) {
      res.json(result);
    } else {
      const statusCode = result.message === 'Blog not found' ? 404 : 500;
      res.status(statusCode).json(result);
    }
  }

  async getBySlug(req, res) {
    const result = await blogsService.getBlogBySlug(req.params.slug);
    if (result.success) {
      res.json(result);
    } else {
      const statusCode = result.message === 'Blog not found' ? 404 : 500;
      res.status(statusCode).json(result);
    }
  }

  async create(req, res) {
    const result = await blogsService.createBlog(req.body);
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  }

  async getComments(req, res) {
    const result = await blogsService.getComments(req.params.id);
    if (result.success) {
      res.json(result);
    } else {
      res.status(result.statusCode || 400).json(result);
    }
  }

  async createComment(req, res) {
    const result = await blogsService.createComment(req.params.id, req.body);
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(result.statusCode || 400).json(result);
    }
  }
}

module.exports = new BlogsController();
