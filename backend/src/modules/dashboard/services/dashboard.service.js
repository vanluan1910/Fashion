const dashboardRepo = require('../repositories/dashboard.repo');

class DashboardService {
  async getDashboardData(period = 'year', year = new Date().getFullYear()) {
    try {
      const stats = await dashboardRepo.getStats();
      const recentOrders = await dashboardRepo.getRecentOrders(5);
      const revenueStats = await dashboardRepo.getRevenueStats(period, year);
      const categoryStats = await dashboardRepo.getCategoryStats();

      // Helper to calculate percentage change
      const calculateChange = (current, previous) => {
        if (previous === 0) return current > 0 ? 100 : 0;
        const change = ((current - previous) / previous) * 100;
        return parseFloat(change.toFixed(1));
      };

      return {
        success: true,
        data: {
          stats: {
            revenue: {
              value: stats.revenue.current,
              change: calculateChange(stats.revenue.current, stats.revenue.previous),
              isUp: stats.revenue.current >= stats.revenue.previous
            },
            orders: {
              value: stats.orders.current,
              change: calculateChange(stats.orders.current, stats.orders.previous),
              isUp: stats.orders.current >= stats.orders.previous
            },
            customers: {
              value: stats.customers.current,
              change: calculateChange(stats.customers.current, stats.customers.previous),
              isUp: stats.customers.current >= stats.customers.previous
            },
            conversionRate: stats.conversionRate
          },
          recentOrders: recentOrders.map(order => ({
            id: `#ORD-${order.order_id}`,
            customer: order.customer_name,
            product: order.product_name || "N/A",
            amount: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total_amount),
            status: order.status,
            date: order.order_date
          })),
          revenueStats: period === 'year' 
            ? Array.from({ length: 12 }, (_, i) => {
                const monthNum = i + 1;
                const found = revenueStats.find(item => item.label_num === monthNum);
                return {
                  name: `Th ${monthNum}`,
                  revenue: found ? parseFloat(found.revenue) : 0
                };
              })
            : revenueStats.map(item => ({
                name: period === 'month' ? `Ngày ${item.label_num}` : item.label_num,
                revenue: parseFloat(item.revenue) || 0
              })),
          categoryStats: categoryStats.map(item => ({
            name: item.name,
            value: parseFloat(item.value) || 0
          }))
        }
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error fetching dashboard data: ' + error.message
      };
    }
  }
}

module.exports = new DashboardService();
