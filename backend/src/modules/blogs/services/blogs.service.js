const blogsRepo = require('../repositories/blogs.repo');
const blogCommentsRepo = require('../repositories/blog-comments.repo');
const BlogDTO = require('../dtos/blogs.dto');
const notificationsService = require('../../notifications/services/notifications.service');
const db = require('../../../shared/database');

class BlogsService {
  async emitNotificationSafely(payload) {
    try {
      await notificationsService.createNotification(payload);
    } catch (error) {
      console.warn('[notifications] create failed:', error.message);
    }
  }

  async ensureBlogPostMirror(blog) {
    if (!blog) return null;

    const [rows] = await db.query('SELECT post_id FROM blog_posts WHERE post_id = ? LIMIT 1', [blog.id]);
    if (rows.length > 0) {
      return rows[0];
    }

    const publishedAt = blog.created_at || new Date();
    await db.query(
      `INSERT INTO blog_posts (post_id, account_id, title, summary, content, image_banner, status, views, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        blog.id,
        null,
        blog.title,
        blog.excerpt || '',
        blog.content || '',
        blog.image_url || '',
        'Đã xuất bản',
        0,
        publishedAt
      ]
    );
  }

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

      await this.emitNotificationSafely({
        type: 'blog_created',
        title: `Bài viết mới: ${blogData.title}`,
        message: `${blogData.title} vừa được xuất bản.`,
        entity_type: 'blog',
        entity_id: String(blogId),
        metadata_json: {
          blog_title: blogData.title,
          category: blogData.category || null
        }
      });

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

  async getComments(postId) {
    try {
      const blog = await blogsRepo.findById(postId);
      if (!blog) {
        return {
          success: false,
          statusCode: 404,
          message: 'Blog not found'
        };
      }

      await this.ensureBlogPostMirror(blog);
      const comments = await blogCommentsRepo.findByPostId(postId);
      return {
        success: true,
        data: comments
      };
    } catch (error) {
      return {
        success: false,
        statusCode: 500,
        message: 'Error fetching blog comments: ' + error.message
      };
    }
  }

  async createComment(postId, data) {
    try {
      const blog = await blogsRepo.findById(postId);
      if (!blog) {
        return {
          success: false,
          statusCode: 404,
          message: 'Blog not found'
        };
      }

      await this.ensureBlogPostMirror(blog);

      const userName = data.user_name || data.name || 'Khách hàng';
      const content = data.content || data.message || '';
      if (!content.trim()) {
        return {
          success: false,
          statusCode: 400,
          message: 'Comment content is required'
        };
      }

      const commentId = await blogCommentsRepo.create({
        post_id: postId,
        user_name: userName,
        content
      });

      await this.emitNotificationSafely({
        type: 'blog_comment_created',
        title: `Bình luận mới: ${blog.title}`,
        message: `${userName} vừa bình luận bài viết.`,
        entity_type: 'blog_comment',
        entity_id: String(commentId),
        metadata_json: {
          post_id: postId,
          blog_title: blog.title,
          user_name: userName,
          comment_snippet: content.slice(0, 120)
        }
      });

      return {
        success: true,
        data: { id: commentId },
        message: 'Comment created successfully'
      };
    } catch (error) {
      return {
        success: false,
        statusCode: 500,
        message: 'Error creating blog comment: ' + error.message
      };
    }
  }
}

module.exports = new BlogsService();
