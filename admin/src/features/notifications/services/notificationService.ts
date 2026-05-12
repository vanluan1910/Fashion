import { API_ENDPOINTS } from "@/shared/config/api";
import type { NotificationItem, NotificationListResponse } from "../types";

const normalizeResponse = (payload: any): NotificationListResponse => {
  if (Array.isArray(payload?.data)) {
    return {
      items: payload.data,
      pagination: {
        total: payload.data.length,
        unread_count: payload.data.filter((item: NotificationItem) => !item.is_read).length,
        limit: payload.data.length,
        offset: 0,
        filter: "all"
      }
    };
  }

  return payload?.data || { items: [], pagination: { total: 0, unread_count: 0, limit: 20, offset: 0, filter: "all" } };
};

export const notificationService = {
  async getNotifications(filter: "all" | "unread" = "all"): Promise<NotificationListResponse> {
    const response = await fetch(`${API_ENDPOINTS.NOTIFICATIONS}?limit=20&offset=0&filter=${filter}`);
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Failed to fetch notifications");
    }
    return normalizeResponse(result);
  },

  async getRecent(limit = 5): Promise<NotificationItem[]> {
    const response = await fetch(`${API_ENDPOINTS.NOTIFICATIONS}/recent?limit=${limit}`);
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Failed to fetch notifications");
    }
    return Array.isArray(result.data) ? result.data : [];
  },

  async markAsRead(id: number | string): Promise<void> {
    const response = await fetch(`${API_ENDPOINTS.NOTIFICATIONS}/${id}/read`, { method: "PATCH" });
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Failed to mark notification as read");
    }
  },

  async markAllAsRead(): Promise<void> {
    const response = await fetch(`${API_ENDPOINTS.NOTIFICATIONS}/read-all`, { method: "PATCH" });
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Failed to mark all notifications as read");
    }
  }
};
