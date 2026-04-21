const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../.env' });

async function seedBlogs() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3307,
    charset: 'utf8mb4'
  });

  try {
    console.log('Cleaning old data...');
    await connection.execute('DELETE FROM blogs');

    const blogs = [
      {
        title: 'Xu hướng thời trang 2026',
        excerpt: 'Khám phá những phong cách dẫn đầu xu hướng năm nay.',
        content: 'Nội dung chi tiết về các bộ sưu tập mang tính đột phá trong năm 2026, kết hợp giữa yếu tố truyền thống và hiện đại.',
        author: 'Admin',
        category: 'Fashion',
        image_url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800'
      },
      {
        title: 'Bí quyết chọn đồ công sở',
        excerpt: 'Làm sao để luôn chuyên nghiệp và tự tin tại văn phòng.',
        content: 'Chia sẻ các mẹo phối đồ giúp bạn tôn lên vóc dáng nhưng vẫn giữ được sự lịch sự và sang trọng nơi công sở.',
        author: 'Trần Lầu',
        category: 'Tips',
        image_url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800'
      },
      {
        title: 'Phụ kiện không thể thiếu',
        excerpt: 'Những món đồ nhỏ giúp nâng tầm bộ trang phục của bạn.',
        content: 'Từ túi xách, đồng hồ đến các món đồ trang sức nhỏ xinh - tất cả đều có thể tạo nên sự khác biệt cho phong cách của bạn.',
        author: 'Thùy Dương',
        category: 'Accessories',
        image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800'
      }
    ];

    console.log('Inserting clean data...');
    for (const blog of blogs) {
      await connection.execute(
        'INSERT INTO blogs (title, excerpt, content, author, category, image_url) VALUES (?, ?, ?, ?, ?, ?)',
        [blog.title, blog.excerpt, blog.content, blog.author, blog.category, blog.image_url]
      );
    }
    console.log('Success! Vietnamese characters are now perfectly encoded.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await connection.end();
  }
}

seedBlogs();
