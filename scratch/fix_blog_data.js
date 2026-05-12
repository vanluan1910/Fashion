const mysql = require('mysql2/promise');

async function fixBlogData() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'thang123!',
    database: 'atelier_management',
    charset: 'utf8mb4'
  });

  try {
    console.log("Updating blog table encoding and images...");
    
    // 1. Cập nhật bảng blogs
    const blogs = [
      {
        title: "Sức hút của phong cách thời trang tối giản trong năm 2024",
        excerpt: "Phong cách tối giản (Minimalism) không bao giờ lỗi mốt. Hãy cùng khám phá cách phối đồ tinh tế nhưng vẫn đầy quyền lực...",
        image_url: "https://images.unsplash.com/photo-1594932224456-80699735d12a?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "5 bí quyết giữ cho quần áo luôn bền đẹp như mới",
        excerpt: "Việc chăm sóc quần áo đúng cách không chỉ giúp bạn tiết kiệm chi phí mà còn bảo vệ môi trường. Dưới đây là những mẹo nhỏ...",
        image_url: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "Xu hướng màu sắc chủ đạo cho mùa hè năm nay",
        excerpt: "Mùa hè này, những gam màu rực rỡ và tươi mới đang chiếm lĩnh sàn diễn thời trang. Hãy cùng điểm qua những tông màu...",
        image_url: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop"
      }
    ];

    // Cập nhật 3 bài viết đầu tiên trong DB để test
    const [rows] = await connection.execute('SELECT id FROM blogs ORDER BY id ASC LIMIT 3');
    
    for (let i = 0; i < rows.length; i++) {
      if (blogs[i]) {
        await connection.execute(
          'UPDATE blogs SET title = ?, excerpt = ?, image_url = ? WHERE id = ?',
          [blogs[i].title, blogs[i].excerpt, blogs[i].image_url, rows[i].id]
        );
      }
    }

    console.log(`Successfully updated ${rows.length} blogs in admin database.`);
  } catch (error) {
    console.error('Error updating blogs:', error);
  } finally {
    await connection.end();
  }
}

fixBlogData();
