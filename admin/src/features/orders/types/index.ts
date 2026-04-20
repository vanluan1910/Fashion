export type OrderStatus = "Tất cả" | "Chờ xác nhận" | "Đang xử lý" | "Đang giao" | "Hoàn thành" | "Đã hủy" | "Chờ thanh toán";

export interface Order {
  id: string;
  customer: string;
  date: string;
  amount: string;
  payment: "COD" | "Chuyển khoản" | "Ví điện tử" | string;
  status: OrderStatus;
  items: number;
}
