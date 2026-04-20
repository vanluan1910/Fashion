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
TRUNCATE TABLE authors;
TRUNCATE TABLE customers;

-- Bật lại kiểm tra khóa ngoại
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Insert Categories
INSERT INTO categories (category_name, description) VALUES 
('Áo Sơ Mi', 'Các loại sơ mi công sở, lụa và vải Oxford cao cấp.'),
('Quần Tây', 'Quần Âu, quần Chinos dáng Slim-fit hiện đại.'),
('Phụ Kiện', 'Thắt lưng da, cà vạt và khăn lụa.'),
('Đầm Dạ Hội', 'Thiết kế sang trọng cho các buổi tiệc tối.');

-- 2. Insert Customers
INSERT INTO customers (full_name, email, phone, city, is_vip) VALUES 
('Nguyễn Văn An', 'an.nguyen@mail.com', '0901234567', 'TP. Hồ Chí Minh', 1),
('Trần Thị Bích', 'bich.tran@mail.com', '0912345678', 'Hà Nội', 0),
('Lê Hoàng Long', 'long.le@mail.com', '0987654321', 'Đà Nẵng', 1),
('Phạm Minh Đức', 'duc.pham@mail.com', '0933445566', 'Cần Thơ', 0),
('Hoàng Thanh Trúc', 'truc.hoang@mail.com', '0944556677', 'Hải Phòng', 0);

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

-- 6. Insert Authors
INSERT INTO authors (author_name, role, email) VALUES 
('Quản trị viên', 'Admin', 'admin@atelier.vn'),
('Nguyễn Biên Tập', 'Biên tập viên', 'editor@atelier.vn');

-- 7. Insert Blog Posts
INSERT INTO blog_posts (author_id, title, summary, content, image_banner, status) VALUES 
(1, 'Xu hướng tối giản 2024', 'Khám phá sự trỗi dậy của phong cách Minimalism.', 'Nội dung chi tiết về phong cách tối giản...', 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b', 'Đã xuất bản'),
(2, 'Bí quyết chọn vải lụa', 'Làm sao để phân biệt lụa tự nhiên và lụa nhân tạo?', 'Hướng dẫn chi tiết chọn vải lụa cao cấp...', 'https://images.unsplash.com/photo-1542272604-787c3835535d', 'Bản nháp');

-- 8. Insert Blog Comments
INSERT INTO blog_comments (post_id, user_name, content) VALUES 
(1, 'Khách hàng 01', 'Bài viết rất hữu ích cho người mới bắt đầu phối đồ.'),
(1, 'Fashion Lover', 'Mình rất thích phong cách này, mong shop ra thêm nhiều mẫu mới.');

-- 9. Insert Orders
INSERT INTO orders (customer_id, total_amount, status) VALUES 
(1, 1250000.00, 'Hoàn thành'),
(2, 2100000.00, 'Đang xử lý'),
(3, 950000.00, 'Hoàn thành');

-- 10. Insert Order Items
INSERT INTO order_items (order_id, variant_id, quantity, price_at_purchase) VALUES 
(1, 2, 1, 1250000.00), -- KH 1 mua Áo lụa Trắng size M
(2, 4, 2, 850000.00), -- KH 2 mua 2 Áo Oxford Xanh
(3, 6, 1, 950000.00); -- KH 3 mua Quần tây Xám size 30
