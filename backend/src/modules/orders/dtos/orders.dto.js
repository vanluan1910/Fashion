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
      items: (order.items || []).map((item) => ({
        id: item.order_item_id,
        order_id: item.order_id,
        variant_id: item.variant_id,
        product_id: item.product_id,
        product_name: item.product_name,
        color: item.color,
        size: item.size,
        sku: item.sku,
        quantity: item.quantity,
        price_at_purchase: item.price_at_purchase
      }))
    };
  }

  static toCollection(orders) {
    return orders.map(order => this.toResponse(order));
  }
}

module.exports = OrderDTO;
