const reviewsRepo = require('../repositories/reviews.repo');
const ordersRepo = require('../../orders/repositories/orders.repo');
const productsRepo = require('../../products/repositories/products.repo');
const authRepo = require('../../auth/repositories/auth.repo');
const notificationsService = require('../../notifications/services/notifications.service');

class ReviewsService {
  async emitNotificationSafely(payload) {
    try {
      await notificationsService.createNotification(payload);
    } catch (error) {
      console.warn('[notifications] create failed:', error.message);
    }
  }

  mapStatusToUi(status) {
    if (status === 'Hiển thị') return 'Đã duyệt';
    if (status === 'Chờ duyệt') return 'Chưa duyệt';
    if (status === 'Ẩn') return 'Đã ẩn';
    return status || 'Chưa duyệt';
  }

  toUiReview(review) {
    const content = review.comment || '';
    return {
      id: String(review.review_id),
      productId: String(review.product_id),
      productName: review.product_name || 'Sản phẩm',
      customerName: review.customer_name || 'Khách hàng',
      rating: Number(review.rating) || 0,
      title: content ? content.slice(0, 60) : 'Đánh giá sản phẩm',
      content,
      date: review.created_at ? new Date(review.created_at).toLocaleDateString('vi-VN') : '',
      status: this.mapStatusToUi(review.status),
      helpful: 0,
      unhelpful: 0
    };
  }

  async getReviews() {
    const reviews = await reviewsRepo.findAll();
    return {
      success: true,
      data: reviews.map((review) => this.toUiReview(review))
    };
  }

  async createReview(data) {
    const order = await ordersRepo.findById(data.order_id);
    if (!order) throw new Error('Order not found');

    if (String(order.account_id) !== String(data.account_id)) {
      throw new Error('Order does not belong to account');
    }

    const product = await productsRepo.findById(data.product_id);
    if (!product) throw new Error('Product not found');

    const purchased = Array.isArray(order.items) && order.items.some((item) => String(item.product_id) === String(data.product_id));
    if (!purchased) {
      throw new Error('Product is not in order');
    }

    const reviewId = await reviewsRepo.create({
      product_id: data.product_id,
      account_id: data.account_id,
      order_id: data.order_id,
      rating: data.rating,
      comment: data.comment,
      status: 'Chờ duyệt'
    });

    const account = await authRepo.findById(data.account_id);

    await this.emitNotificationSafely({
      type: 'product_review_created',
      title: `Đánh giá mới: ${product.product_name}`,
      message: `${account?.full_name || 'Khách hàng'} vừa gửi đánh giá ${data.rating} sao.`,
      entity_type: 'product_review',
      entity_id: String(reviewId),
      actor_account_id: data.account_id,
      metadata_json: {
        product_id: data.product_id,
        product_name: product.product_name,
        order_id: data.order_id,
        rating: data.rating,
        comment_snippet: String(data.comment || '').slice(0, 120)
      }
    });

    return {
      success: true,
      data: { id: reviewId },
      message: 'Review created successfully'
    };
  }

  async approveReview(id) {
    const success = await reviewsRepo.updateStatus(id, 'Hiển thị');
    return { success };
  }

  async hideReview(id) {
    const success = await reviewsRepo.updateStatus(id, 'Ẩn');
    return { success };
  }

  async deleteReview(id) {
    const success = await reviewsRepo.delete(id);
    return { success };
  }
}

module.exports = new ReviewsService();
