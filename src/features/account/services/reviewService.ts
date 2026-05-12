const API_URL = "http://127.0.0.1:5000/api/reviews";

export interface CreateReviewPayload {
  orderId: number | string;
  productId: number | string;
  rating: number;
  comment: string;
  accountId: number | string;
}

export const reviewService = {
  createReview: async (payload: CreateReviewPayload): Promise<{ success: boolean; reviewId?: string; message?: string }> => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: payload.orderId,
          product_id: payload.productId,
          rating: payload.rating,
          comment: payload.comment,
          account_id: payload.accountId
        })
      });
      const result = await response.json();
      return {
        success: Boolean(result.success),
        reviewId: result.data?.id,
        message: result.message
      };
    } catch (error) {
      console.error("Failed to create review:", error);
      return { success: false };
    }
  }
};
