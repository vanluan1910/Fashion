import { API_ENDPOINTS } from "@/shared/config/api";
import { Review } from "../types";

const parseReviews = (payload: any): Review[] => {
  if (Array.isArray(payload?.data)) {
    return payload.data as Review[];
  }
  return [];
};

export const reviewService = {
  async getReviews(): Promise<Review[]> {
    const response = await fetch(API_ENDPOINTS.REVIEWS);
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Không thể tải đánh giá");
    }
    return parseReviews(result);
  },

  async approveReview(id: string): Promise<void> {
    const response = await fetch(`${API_ENDPOINTS.REVIEWS}/${id}/approve`, { method: "PATCH" });
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Không thể duyệt đánh giá");
    }
  },

  async hideReview(id: string): Promise<void> {
    const response = await fetch(`${API_ENDPOINTS.REVIEWS}/${id}/hide`, { method: "PATCH" });
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Không thể ẩn đánh giá");
    }
  },

  async deleteReview(id: string): Promise<void> {
    const response = await fetch(`${API_ENDPOINTS.REVIEWS}/${id}`, { method: "DELETE" });
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Không thể xóa đánh giá");
    }
  },

  async markHelpful(): Promise<void> {
    return Promise.resolve();
  },

  async rejectReview(id: string): Promise<void> {
    await this.hideReview(id);
  }
};
