const authRepo = require('../repositories/auth.repo');
const authModel = require('../models/auth.model');
const { authDTO, authListDTO } = require('../dtos/auth.dto');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
  async register(data) {
    const { email, password, first_name, last_name } = data;

    // 1. Kiểm tra email tồn tại
    const existingUser = await authRepo.findByEmail(email);
    if (existingUser) {
      throw new Error('Email này đã được sử dụng');
    }

    // 2. Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Lưu vào DB
    const finalFullName = data.full_name || `${data.first_name || ''} ${data.last_name || ''}`.trim();
    
    const account_id = await authRepo.create({
      email,
      password: hashedPassword,
      full_name: finalFullName,
      phone: data.phone || null,
      role_id: 3, // Giả định 3 là Customer
      created_at: new Date()
    });

    const user = await authRepo.findById(account_id);

    // 4. Tạo token để login luôn
    const token = jwt.sign(
      { id: user.account_id, email: user.email, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return { 
      token, 
      user: authDTO(user), 
      message: 'Đăng ký tài khoản thành công' 
    };
  }

  async login(email, password) {
    // 1. Tìm user
    const user = await authRepo.findByEmail(email);
    if (!user) {
      throw new Error('Email hoặc mật khẩu không chính xác');
    }

    // 2. Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Email hoặc mật khẩu không chính xác');
    }

    // 3. Tạo token
    const token = jwt.sign(
      { id: user.account_id, email: user.email, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      token,
      user: authDTO(user)
    };
  }

  async getProfile(id) {
    const user = await authRepo.findById(id);
    if (!user) {
      throw new Error('Người dùng không tồn tại');
    }
    return authDTO(user);
  }

  async getRecentSignups() {
    return await authRepo.findRecent();
  }
}


module.exports = new AuthService();
