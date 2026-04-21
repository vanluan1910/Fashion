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
    const { name, price, description, category, image } = data;

    // 1. Ánh xạ danh mục (Map category name to ID)
    let category_id = 1; // Mặc định
    if (category === "Thời trang nam") category_id = 1;
    else if (category === "Thời trang nữ") category_id = 2;
    else if (category === "Phụ kiện") category_id = 3;

    // 2. Tạo sản phẩm gốc
    const productId = await productsRepo.create({
      product_name: name,
      base_price: parseFloat(price) || 0,
      description: description,
      category_id: category_id,
      created_at: new Date()
    });

    // 3. Lưu ảnh nếu có
    if (image) {
      // Giả sử repository có hàm saveImage, nếu không tôi sẽ tạo câu lệnh trực tiếp
      // Ở đây tôi dùng productsRepo để thực hiện chèn ảnh
      await db.query('INSERT INTO product_images (product_id, image_url, is_primary) VALUES (?, ?, ?)', [productId, image, 1]);
    }

    return { id: productId, message: 'Thêm sản phẩm thành công' };
  }

  async update(id, data) {
    const { name, price, description, category, image } = data;

    // 1. Ánh xạ danh mục
    let category_id = 1;
    if (category === "Thời trang nam") category_id = 1;
    else if (category === "Thời trang nữ") category_id = 2;
    else if (category === "Phụ kiện") category_id = 3;

    // 2. Cập nhật thông tin cơ bản
    const updateData = {
      product_name: name,
      base_price: parseFloat(String(price).replace(/[^0-9.]/g, '')) || 0,
      description: description,
      category_id: category_id
    };

    const success = await productsRepo.update(id, updateData);

    // 3. Cập nhật ảnh nếu có ảnh mới
    if (image && String(image).startsWith('data:image')) {
      // Xóa ảnh cũ và đặt ảnh mới là primary
      await db.query('UPDATE product_images SET is_primary = 0 WHERE product_id = ?', [id]);
      await db.query('INSERT INTO product_images (product_id, image_url, is_primary) VALUES (?, ?, ?)', [id, image, 1]);
    }

    if (!success) throw new Error('Cập nhật thất bại');
    return { message: 'Cập nhật thành công' };
  }

  async delete(id) {
    const success = await productsRepo.delete(id);
    if (!success) throw new Error('Xóa thất bại');
    return { message: 'Xóa thành công' };
  }
}

module.exports = new ProductsService();
