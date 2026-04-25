const blogsRepo = require('../repositories/blogs.repo');
const BlogDTO = require('../dtos/blogs.dto');

class BlogsService {
  async getAllBlogs() {
    try {
      const blogs = await blogsRepo.findAll();
      return {
        success: true,
        data: BlogDTO.toCollection(blogs)
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error fetching blogs: ' + error.message
      };
    }
  }

  async getBlogById(id) {
    try {
      const blog = await blogsRepo.findById(id);
      if (!blog) {
        return {
          success: false,
          message: 'Blog not found'
        };
      }
      return {
        success: true,
        data: BlogDTO.toResponse(blog)
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error fetching blog detail: ' + error.message
      };
    }
  }

  async getBlogBySlug(slug) {
    try {
      const blog = await blogsRepo.findBySlug(slug);
      if (!blog) {
        return {
          success: false,
          message: 'Blog not found'
        };
      }
      return {
        success: true,
        data: BlogDTO.toResponse(blog)
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error fetching blog by slug: ' + error.message
      };
    }
  }

  async createBlog(blogData) {
    try {
      const blogId = await blogsRepo.create(blogData);
      return {
        success: true,
        data: { id: blogId },
        message: 'Blog created successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error creating blog: ' + error.message
      };
    }
  }
}

module.exports = new BlogsService();
