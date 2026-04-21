USE atelier_management;

-- Đảm bảo kết nối dùng đúng bộ mã UTF-8
SET NAMES utf8mb4;

UPDATE categories SET category_name = 'Thời trang nam' WHERE category_id = 1;
UPDATE categories SET category_name = 'Thời trang nữ' WHERE category_id = 2;
UPDATE categories SET category_name = 'Phụ kiện' WHERE category_id = 3;
