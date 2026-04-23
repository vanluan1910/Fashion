const productsRepo = require('../repositories/products.repo');
const productsModel = require('../models/products.model');
const { productsDTO, productsListDTO } = require('../dtos/products.dto');
const db = require('../../../shared/database');

class ProductsService {
  async getAll() {
    const items = await productsRepo.findAll();
    return productsListDTO(items);
  }

  async getById(id) {
    const item = await productsRepo.findById(id);
    if (!item) {
      throw new Error('Không tìm thấy sản phẩm này');
    }

    // Lấy thêm ảnh và biến thể
    const [images, variants] = await Promise.all([
      productsRepo.findImages(id),
      productsRepo.findVariants(id)
    ]);

    // Gộp dữ liệu bổ sung
    item.images = images.map(img => img.image_url);
    item.colors = [...new Set(variants.map(v => v.color).filter(Boolean))];
    item.sizes = [...new Set(variants.map(v => v.size).filter(Boolean))];
    item.total_stock = variants.reduce((sum, v) => sum + v.stock_quantity, 0);

    return productsDTO(item);
  }

  async create(data) {
    const { name, price, description, category, subCategory, image, status, oldPrice } = data;

    // 1. Ánh xạ danh mục (Map category name to ID)
    let category_id = 1; // Mặc định
    const cat = String(category).toLowerCase();
    if (cat === "thời trang nam" || cat === "men") category_id = 1;
    else if (cat === "thời trang nữ" || cat === "women") category_id = 2;
    else if (cat === "phụ kiện" || cat === "accessories") category_id = 3;

    // 2. Tạo sản phẩm gốc
    const productId = await productsRepo.create({
      product_name: name,
      base_price: parseFloat(String(price).replace(/[^0-9.]/g, '')) || 0,
      old_price: oldPrice ? parseFloat(String(oldPrice).replace(/[^0-9.]/g, '')) : null,
      description: description,
      category_id: category_id,
      sub_category: subCategory,
      status: status || "Còn hàng",
      created_at: new Date()
    });

    // 3. Lưu ảnh nếu có
    if (image) {
      await db.query('INSERT INTO product_images (product_id, image_url, is_primary) VALUES (?, ?, ?)', [productId, image, 1]);
    }

    return { id: productId, message: 'Thêm sản phẩm thành công' };
  }

  async update(id, data) {
    const { name, price, description, category, subCategory, image, status, oldPrice } = data;

    // 1. Ánh xạ danh mục
    let category_id = 1;
    const cat = String(category).toLowerCase();
    if (cat === "thời trang nam" || cat === "men") category_id = 1;
    else if (cat === "thời trang nữ" || cat === "women") category_id = 2;
    else if (cat === "phụ kiện" || cat === "accessories") category_id = 3;

    // 2. Cập nhật thông tin cơ bản
    const updateData = {
      product_name: name,
      base_price: parseFloat(String(price).replace(/[^0-9.]/g, '')) || 0,
      old_price: oldPrice ? parseFloat(String(oldPrice).replace(/[^0-9.]/g, '')) : null,
      description: description,
      category_id: category_id,
      sub_category: subCategory,
      status: status
    };

    await productsRepo.update(id, updateData);

    // 3. Cập nhật ảnh nếu có ảnh mới
    if (image && String(image).startsWith('data:image')) {
      await db.query('UPDATE product_images SET is_primary = 0 WHERE product_id = ?', [id]);
      await db.query('INSERT INTO product_images (product_id, image_url, is_primary) VALUES (?, ?, ?)', [id, image, 1]);
    }

    return { message: 'Cập nhật thành công' };
  }

  async delete(id) {
    const success = await productsRepo.delete(id);
    if (!success) throw new Error('Xóa thất bại');
    return { message: 'Xóa thành công' };
  }
}

module.exports = new ProductsService();
