export interface Order {
  id: string | number;
  customerName: string;
  email: string;
  date: string;
  total: number;
  status: 'Đang xử lý' | 'Hoàn thành' | 'Đã hủy' | 'Đang giao hàng';
  items?: any[];
}

const API_URL = "http://localhost:5000/api/orders";

export const orderService = {
  getOrders: async (): Promise<Order[]> => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      if (result.success) {
        return result.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  },

  getOrderById: async (id: string | number): Promise<Order | null> => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      const result = await response.json();
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error("Error fetching order detail:", error);
      return null;
    }
  },

  updateOrderStatus: async (id: string | number, status: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error("Error updating order status:", error);
      return false;
    }
  }
};
