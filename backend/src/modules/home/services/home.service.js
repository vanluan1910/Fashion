const homeRepo = require('../repositories/home.repo');
const homeModel = require('../models/home.model');
const { homeDTO, homeListDTO } = require('../dtos/home.dto');

class HomeService {
  async getAll() {
    const items = await homeRepo.findAll();
    return homeListDTO(items);
  }

  async getById(id) {
    const item = await homeRepo.findById(id);
    if (!item) {
      throw new Error('Không tìm thấy bản ghi này');
    }
    return homeDTO(item);
  }

  async create(data) {
    // Logic nghiệp vụ và gán giá trị mặc định từ Model nếu cần
    const id = await homeRepo.create(data);
    return { id, message: 'Tạo mới thành công' };
  }
}

module.exports = new HomeService();
