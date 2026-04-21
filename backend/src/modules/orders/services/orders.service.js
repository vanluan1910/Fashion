const ordersRepo = require('../repositories/orders.repo');
const OrderDTO = require('../dtos/orders.dto');

class OrdersService {
  async getAllOrders() {
    try {
      const orders = await ordersRepo.findAll();
      const mappedOrders = OrderDTO.toCollection(orders);
      console.log('Mapped orders for Admin:', mappedOrders);
      return {
        success: true,
        data: mappedOrders
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error fetching orders: ' + error.message
      };
    }
  }

  async getOrdersByAccountId(accountId) {
    try {
      const orders = await ordersRepo.findByAccountId(accountId);
      return {
        success: true,
        data: OrderDTO.toCollection(orders)
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error fetching account orders: ' + error.message
      };
    }
  }

  async createOrder(data) {
    try {
      const orderId = await ordersRepo.create(data);
      return {
        success: true,
        data: { id: orderId },
        message: 'Order created successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error creating order: ' + error.message
      };
    }
  }

  async getOrderById(id) {
    try {
      const order = await ordersRepo.findById(id);
      if (!order) {
        return { success: false, message: 'Order not found' };
      }
      return {
        success: true,
        data: OrderDTO.toResponse(order)
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error fetching order detail: ' + error.message
      };
    }
  }

  async updateOrderStatus(id, status) {
    try {
      const success = await ordersRepo.updateStatus(id, status);
      return {
        success,
        message: success ? 'Order status updated' : 'Order not found'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error updating status: ' + error.message
      };
    }
  }
}

module.exports = new OrdersService();
