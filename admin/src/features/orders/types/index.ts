export type OrderStatus = "Tất cả" | "Chờ xác nhận" | "Đang xử lý" | "Đang giao" | "Hoàn thành" | "Đã hủy" | "Chờ thanh toán";

export interface Order {
  id: string | number;
  customerName: string;
  email?: string;
  phone?: string;
  date: string;
  total: number;
  payment?: string;
  status: OrderStatus;
  items?: any;
}
