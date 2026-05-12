const ordersRepo = require('../repositories/orders.repo');
const OrderDTO = require('../dtos/orders.dto');
const notificationsService = require('../../notifications/services/notifications.service');

class OrdersService {
  async emitNotificationSafely(payload) {
    try {
      await notificationsService.createNotification(payload);
    } catch (error) {
      console.warn('[notifications] create failed:', error.message);
    }
  }

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

      await this.emitNotificationSafely({
        type: 'order_created',
        title: `Đơn hàng mới #${orderId}`,
        message: `Đơn hàng #${orderId} vừa được tạo.`,
        entity_type: 'order',
        entity_id: String(orderId),
        actor_account_id: data.account_id || null,
        metadata_json: {
          order_id: orderId,
          account_id: data.account_id || null,
          total_amount: data.total_amount || 0,
          status: data.status || 'Đang xử lý'
        }
      });

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
