-- =============================================================
-- SAMPLE DATA INSERTION SCRIPT FOR ATELIER SYSTEM
-- Target Database: atelier_management
-- Version: Idempotent (Re-runnable)
-- =============================================================

USE atelier_management;

-- Tạm thời tắt kiểm tra khóa ngoại để dọn dẹp dữ liệu
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE product_variants;
TRUNCATE TABLE product_images;
TRUNCATE TABLE products;
TRUNCATE TABLE categories;
TRUNCATE TABLE blog_comments;
TRUNCATE TABLE blog_posts;
TRUNCATE TABLE role_permissions;
TRUNCATE TABLE permissions;
TRUNCATE TABLE accounts;
TRUNCATE TABLE roles;

-- Bật lại kiểm tra khóa ngoại
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Insert Roles
INSERT INTO roles (role_id, role_name, description) VALUES 
(1, 'Administrator', 'Toàn quyền quản trị hệ thống.'),
(2, 'Editor', 'Quản lý bài viết và nội dung blog.'),
(3, 'Customer', 'Khách hàng mua sắm tại cửa hàng.');

-- 2. Insert Permissions
INSERT INTO permissions (permission_name, description) VALUES 
('view_dashboard', 'Truy cập trang tổng quan admin'),
('manage_products', 'Quản lý danh sách sản phẩm'),
('manage_orders', 'Quản lý đơn hàng khách hàng'),
('publish_blog', 'Đăng và sửa bài viết blog');

-- 3. Insert Accounts (Hợp nhất Admin, Editor và Customer)
INSERT INTO accounts (account_id, role_id, full_name, email, password, phone, status) VALUES 
-- Quản trị viên & Nhân viên (Role 1 & 2)
(1, 1, 'Quản trị viên', 'admin@atelier.vn', '$2b$10$X7...', '0900000001', 'Hoạt động'),
(2, 2, 'Nguyễn Biên Tập', 'editor@atelier.vn', '$2b$10$X7...', '0900000002', 'Hoạt động'),
-- Khách hàng (Role 3)
(3, 3, 'Nguyễn Văn An', 'an.nguyen@mail.com', '$2b$10$X7...', '0901234567', 'Hoạt động'),
(4, 3, 'Trần Thị Bích', 'bich.tran@mail.com', '$2b$10$X7...', '0912345678', 'Hoạt động'),
(5, 3, 'Lê Hoàng Long', 'long.le@mail.com', '$2b$10$X7...', '0987654321', 'Hoạt động');

-- 4. Insert Categories
INSERT INTO categories (category_name, description) VALUES 
('Áo Sơ Mi', 'Các loại sơ mi công sở, lụa và vải Oxford cao cấp.'),
('Quần Tây', 'Quần Âu, quần Chinos dáng Slim-fit hiện đại.'),
('Phụ Kiện', 'Thắt lưng da, cà vạt và khăn lụa.'),
('Đầm Dạ Hội', 'Thiết kế sang trọng cho các buổi tiệc tối.');

-- 3. Insert Products
INSERT INTO products (category_id, product_name, base_price, description) VALUES 
(1, 'Áo Sơ Mi Lụa Ý', 1250000.00, 'Chất liệu lụa tơ tằm tự nhiên, thoáng mát và sang trọng.'),
(1, 'Áo Sơ Mi Oxford', 850000.00, 'Vải Oxford dày dặn, đứng form thích hợp cho công sở.'),
(2, 'Quần Tây Âu Slim-fit', 950000.00, 'Dáng ôm hiện đại, chất liệu co giãn nhẹ.'),
(3, 'Thắt Lưng Da Bò', 1500000.00, 'Da thật nguyên tấm, khóa cài cao cấp.');

-- 4. Insert Product Images
INSERT INTO product_images (product_id, image_url, is_primary) VALUES 
(1, 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b', 1),
(1, 'https://images.unsplash.com/photo-1542272604-787c3835535d', 0),
(2, 'https://images.unsplash.com/photo-1509631179647-0177331693ae', 1),
(3, 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35', 1);

-- 5. Insert Product Variants (SKUs - Size/Color)
INSERT INTO product_variants (product_id, sku, color, size, stock_quantity) VALUES 
-- Áo lụa Ý
(1, 'SILK-WHT-S', 'Trắng', 'S', 10),
(1, 'SILK-WHT-M', 'Trắng', 'M', 15),
(1, 'SILK-BLK-M', 'Đen', 'M', 12),
-- Áo Oxford
(2, 'OXF-BLU-L', 'Xanh Biển', 'L', 20),
(2, 'OXF-BLU-XL', 'Xanh Biển', 'XL', 10),
-- Quần Tây
(3, 'TR-GRY-30', 'Xám Tro', '30', 8),
(3, 'TR-GRY-31', 'Xám Tro', '31', 14);

-- 5. Insert Blog Posts
INSERT INTO blog_posts (account_id, title, summary, content, image_banner, status) VALUES 
(1, 'Xu hướng tối giản 2024', 'Khám phá sự trỗi dậy của phong cách Minimalism.', 'Nội dung chi tiết về phong cách tối giản...', 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b', 'Đã xuất bản'),
(2, 'Bí quyết chọn vải lụa', 'Làm sao để phân biệt lụa tự nhiên và lụa nhân tạo?', 'Hướng dẫn chi tiết chọn vải lụa cao cấp...', 'https://images.unsplash.com/photo-1542272604-787c3835535d', 'Bản nháp');

-- 6. Insert Blog Comments
INSERT INTO blog_comments (post_id, user_name, content) VALUES 
(1, 'Khách hàng 01', 'Bài viết rất hữu ích cho người mới bắt đầu phối đồ.'),
(1, 'Fashion Lover', 'Mình rất thích phong cách này, mong shop ra thêm nhiều mẫu mới.');

-- 7. Insert Orders
INSERT INTO orders (account_id, total_amount, status) VALUES 
(3, 1250000.00, 'Hoàn thành'),
(4, 2100000.00, 'Đang xử lý'),
(5, 950000.00, 'Hoàn thành');

-- 8. Insert Order Items
INSERT INTO order_items (order_id, variant_id, quantity, price_at_purchase) VALUES 
(1, 2, 1, 1250000.00), -- KH 1 mua Áo lụa Trắng size M
(2, 4, 2, 850000.00), -- KH 2 mua 2 Áo Oxford Xanh
(3, 6, 1, 950000.00); -- KH 3 mua Quần tây Xám size 30
