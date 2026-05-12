const authRepo = require('../repositories/auth.repo');
const authModel = require('../models/auth.model');
const { authDTO, authListDTO } = require('../dtos/auth.dto');
const notificationsService = require('../../notifications/services/notifications.service');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
  async emitNotificationSafely(payload) {
    try {
      await notificationsService.createNotification(payload);
    } catch (error) {
      console.warn('[notifications] create failed:', error.message);
    }
  }

  async register(data) {
    const { email, password, first_name, last_name } = data;

    const existingUser = await authRepo.findByEmail(email);
    if (existingUser) {
      throw new Error('Email này đã được sử dụng');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const finalFullName = data.full_name || `${data.first_name || ''} ${data.last_name || ''}`.trim();

    const account_id = await authRepo.create({
      email,
      password: hashedPassword,
      full_name: finalFullName,
      phone: data.phone || null,
      role_id: 3,
      created_at: new Date()
    });

    const user = await authRepo.findById(account_id);

    await this.emitNotificationSafely({
      type: 'customer_signup',
      title: `Khách hàng mới: ${user.full_name}`,
      message: `${user.full_name} vừa đăng ký tài khoản.`,
      entity_type: 'account',
      entity_id: String(user.account_id),
      actor_account_id: user.account_id,
      metadata_json: {
        full_name: user.full_name,
        email: user.email
      }
    });

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
    const user = await authRepo.findByEmail(email);
    if (!user) {
      throw new Error('Email hoặc mật khẩu không chính xác');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Email hoặc mật khẩu không chính xác');
    }

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
