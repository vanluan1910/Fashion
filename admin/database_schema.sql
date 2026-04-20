-- =============================================================
-- DATABASE SCHEMA FOR ATELIER FASHION MANAGEMENT SYSTEM
-- Standard: MariaDB / MySQL 3NF Compliance (IDEMPOTENT VERSION)
-- Target Database: atelier_management
-- =============================================================

CREATE DATABASE IF NOT EXISTS atelier_management 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE atelier_management;

-- 1. Table: Customers (Quản lý khách hàng)
CREATE TABLE IF NOT EXISTS customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    city VARCHAR(50) NOT NULL,
    is_vip BOOLEAN DEFAULT FALSE,
    status ENUM('Hoạt động', 'Tạm khóa') DEFAULT 'Hoạt động',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Table: Categories (Danh mục sản phẩm)
CREATE TABLE IF NOT EXISTS categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
) ENGINE=InnoDB;

-- 3. Table: Products (Sản phẩm gốc)
CREATE TABLE IF NOT EXISTS products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    product_name VARCHAR(200) NOT NULL,
    base_price DECIMAL(15, 2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product_category FOREIGN KEY (category_id) 
        REFERENCES categories(category_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 4. Table: Product_Images (Ảnh sản phẩm - Một sản phẩm nhiều ảnh)
CREATE TABLE IF NOT EXISTS product_images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE, -- Đánh dấu ảnh đại diện
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_image_product FOREIGN KEY (product_id) 
        REFERENCES products(product_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. Table: Product_Variants (Chi tiết sản phẩm: Size, Màu, SKU)
CREATE TABLE IF NOT EXISTS product_variants (
    variant_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    color VARCHAR(30),
    size VARCHAR(20),
    stock_quantity INT DEFAULT 0,
    price_adjustment DECIMAL(15, 2) DEFAULT 0.00, -- Chênh lệch giá so với giá gốc
    CONSTRAINT fk_variant_product FOREIGN KEY (product_id) 
        REFERENCES products(product_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 6. Table: Orders (Thông tin đơn hàng chung)
CREATE TABLE IF NOT EXISTS orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(15, 2) DEFAULT 0.00,
    status ENUM('Đang xử lý', 'Hoàn thành', 'Đã hủy') DEFAULT 'Đang xử lý',
    CONSTRAINT fk_order_customer FOREIGN KEY (customer_id) 
        REFERENCES customers(customer_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 7. Table: Order_Items (Chi tiết đơn hàng - Kết nối với Variant)
CREATE TABLE IF NOT EXISTS order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    variant_id INT NOT NULL, -- Kết nối trực tiếp đến loại hàng (Size/Màu) cụ thể
    quantity INT NOT NULL DEFAULT 1,
    price_at_purchase DECIMAL(15, 2) NOT NULL,
    CONSTRAINT fk_item_order FOREIGN KEY (order_id) 
        REFERENCES orders(order_id) ON DELETE CASCADE,
    CONSTRAINT fk_item_variant FOREIGN KEY (variant_id) 
        REFERENCES product_variants(variant_id)
) ENGINE=InnoDB;

-- 8. Table: Authors (Tác giả bài viết)
CREATE TABLE IF NOT EXISTS authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) DEFAULT 'Biên tập viên',
    email VARCHAR(100) UNIQUE
) ENGINE=InnoDB;

-- 9. Table: Blog_Posts (Bài viết)
CREATE TABLE IF NOT EXISTS blog_posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    author_id INT,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    content LONGTEXT,
    image_banner VARCHAR(255), -- Ảnh bìa chính
    status ENUM('Đã xuất bản', 'Bản nháp') DEFAULT 'Bản nháp',
    views INT DEFAULT 0,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_post_author FOREIGN KEY (author_id) 
        REFERENCES authors(author_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 10. Table: Blog_Comments (Chi tiết bài viết: Bình luận)
CREATE TABLE IF NOT EXISTS blog_comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comment_post FOREIGN KEY (post_id) 
        REFERENCES blog_posts(post_id) ON DELETE CASCADE
) ENGINE=InnoDB;
