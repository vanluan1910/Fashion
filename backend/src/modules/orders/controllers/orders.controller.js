const ordersService = require('../services/orders.service');

class OrdersController {
  async getAll(req, res) {
    const result = await ordersService.getAllOrders();
    res.json(result);
  }

  async create(req, res) {
    console.log('Incoming order request:', req.body);
    const result = await ordersService.createOrder(req.body);
    console.log('Order creation result:', result);
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  }

  async getById(req, res) {
    const result = await ordersService.getOrderById(req.params.id);
    if (result.success) {
      res.json(result);
    } else {
      res.status(404).json(result);
    }
  }

  async getByAccount(req, res) {
    const result = await ordersService.getOrdersByAccountId(req.params.accountId);
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  }

  async updateStatus(req, res) {
    const { status } = req.body;
    const result = await ordersService.updateOrderStatus(req.params.id, status);
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  }
}

module.exports = new OrdersController();
