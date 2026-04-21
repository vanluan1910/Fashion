class OrderDTO {
  static toResponse(order) {
    if (!order) return null;
    return {
      id: order.order_id,
      customerName: order.customer_name,
      email: order.customer_email,
      phone: order.customer_phone,
      date: order.order_date,
      total: order.total_amount,
      status: order.status,
      itemsCount: order.items_count || 0,
      items: [] // Can be populated via order_items repo later
    };
  }

  static toCollection(orders) {
    return orders.map(order => this.toResponse(order));
  }
}

module.exports = OrderDTO;
