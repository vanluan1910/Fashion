const dashboardService = require('../services/dashboard.service');

class DashboardController {
  async getStats(req, res) {
    try {
      const { period, year } = req.query;
      const result = await dashboardService.getDashboardData(period, year);
      if (result.success) {
        res.status(200).json(result.data);
      } else {
        res.status(500).json({ message: result.message });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new DashboardController();
