const API_URL = "http://localhost:5000/api/orders";

export interface OrderData {
  items: any[];
  total: number;
  customerInfo: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    phone: string;
    email: string;
  };
}

export const orderService = {
  createOrder: async (orderData: OrderData, accountId: number | string): Promise<{ success: boolean; orderId?: string }> => {
    try {
      const payload = {
        account_id: accountId || 3, // Sử dụng ID người dùng thực tế hoặc mặc định là 3
        total_amount: orderData.total,
        status: "Đang xử lý",
        items: orderData.items // Bổ sung danh sách sản phẩm
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      return { 
        success: result.success, 
        orderId: result.data?.id 
      };
    } catch (error) {
      console.error("Failed to create order:", error);
      return { success: false };
    }
  },

  getAccountOrders: async (accountId: number | string): Promise<any[]> => {
    try {
      const response = await fetch(`${API_URL}/account/${accountId}`);
      const result = await response.json();
      if (result.success) {
        return result.data;
      }
      return [];
    } catch (error) {
      console.error("Failed to fetch account orders:", error);
      return [];
    }
  }
};
