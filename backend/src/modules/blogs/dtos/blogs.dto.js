class BlogDTO {
  static toResponse(blog) {
    if (!blog) return null;
    return {
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      category: blog.category,
      image: blog.image_url,
      views: blog.views || 0,
      date: blog.created_at,
      updated_at: blog.updated_at
    };
  }

  static toCollection(blogs) {
    return blogs.map(blog => this.toResponse(blog));
  }
}

module.exports = BlogDTO;
