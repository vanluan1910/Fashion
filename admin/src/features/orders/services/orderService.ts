import { Order } from "../types";

const STORAGE_KEY = "atelier_orders_data";

const INITIAL_ORDERS: Order[] = [
  { id: "#ORD-9821", customer: "Nguyễn Văn A", date: "20 Tháng 4, 2024", amount: "1.200.000đ", payment: "Chuyển khoản", status: "Hoàn thành", items: 2 },
  { id: "#ORD-9822", customer: "Trần Thị B", date: "19 Tháng 4, 2024", amount: "3.500.000đ", payment: "COD", status: "Đang xử lý", items: 1 },
  { id: "#ORD-9823", customer: "Lê Văn C", date: "19 Tháng 4, 2024", amount: "850.000đ", payment: "Ví điện tử", status: "Chờ thanh toán", items: 3 },
  { id: "#ORD-9824", customer: "Phạm Minh D", date: "18 Tháng 4, 2024", amount: "2.100.000đ", payment: "Chuyển khoản", status: "Đang giao", items: 1 },
  { id: "#ORD-9825", customer: "Hoàng Thị E", date: "18 Tháng 4, 2024", amount: "4.800.000đ", payment: "COD", status: "Đã hủy", items: 2 },
];

export const orderService = {
  getOrders: (): Order[] => {
    if (typeof window === "undefined") return INITIAL_ORDERS;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(stored);
  },

  saveOrders: (orders: Order[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    }
  },

  updateOrderStatus: (id: string, status: Order["status"]) => {
    const orders = orderService.getOrders();
    const index = orders.findIndex(o => o.id === id);
    if (index !== -1) {
      orders[index].status = status;
      orderService.saveOrders(orders);
      return orders[index];
    }
    return undefined;
  },

  deleteOrder: (id: string) => {
    const orders = orderService.getOrders();
    const filtered = orders.filter(o => o.id !== id);
    orderService.saveOrders(filtered);
  },

  createOrder: (orderData: Omit<Order, "id" | "date">) => {
    const orders = orderService.getOrders();
    const newOrder: Order = {
      ...orderData,
      id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString("vi-VN", {
        day: "numeric",
        month: "long",
        year: "numeric"
      })
    };
    
    const updatedOrders = [newOrder, ...orders];
    orderService.saveOrders(updatedOrders);
    return newOrder;
  }
};
