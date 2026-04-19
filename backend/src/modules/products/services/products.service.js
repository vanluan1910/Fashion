const productsRepo = require('../repositories/products.repo');
const productsModel = require('../models/products.model');
const { productsDTO, productsListDTO } = require('../dtos/products.dto');

class ProductsService {
  async getAll() {
    const items = await productsRepo.findAll();
    return productsListDTO(items);
  }

  async getById(id) {
    const item = await productsRepo.findById(id);
    if (!item) {
      throw new Error('Không tìm thấy bản ghi này');
    }
    return productsDTO(item);
  }

  async create(data) {
    // Logic nghiệp vụ và gán giá trị mặc định từ Model nếu cần
    const id = await productsRepo.create(data);
    return { id, message: 'Tạo mới thành công' };
  }
}

module.exports = new ProductsService();
