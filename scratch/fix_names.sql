-- Đảm bảo kết nối sử dụng utf8mb4
SET NAMES utf8mb4;

-- Cập nhật lại tên chuẩn cho các sản phẩm Safetino dựa trên pattern cũ bị lỗi
UPDATE products SET product_name = 'Áo sơ mi nam công sở Safetino' WHERE product_name LIKE 'Áo S%';

-- Cập nhật chi tiết hơn cho 12 sản phẩm mới nhất
UPDATE products SET product_name = 'Áo sơ mi nam công sở Safetino' 
WHERE product_id IN (
    SELECT product_id FROM (
        SELECT product_id FROM products ORDER BY product_id DESC LIMIT 12
    ) as t
);
