const authService = require('../services/auth.service');
const authRepo = require('../repositories/auth.repo');

class AuthController {
  async register(req, res) {
    try {
      const result = await authService.register(req.body);
      res.status(201).json({ success: true, ...result });
    } catch (error) {
      console.error("Register Error:", error);
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await authRepo.findAll();
      res.json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getRecentSignups(req, res) {
    try {
      console.log("Fetching recent signups...");
      const data = await authService.getRecentSignups();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json({ success: true, ...result });
    } catch (error) {
      res.status(401).json({ success: false, message: error.message });
    }
  }

  async getProfile(req, res) {
    try {
      const data = await authService.getProfile(req.user.id);
      res.json({ success: true, data });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }
}

module.exports = new AuthController();
