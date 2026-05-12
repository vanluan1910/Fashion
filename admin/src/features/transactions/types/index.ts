export interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  paymentMethod: "Thẻ tín dụng" | "Chuyển khoản" | "Ví điện tử" | "Trả sau";
  status: "Thành công" | "Đang xử lý" | "Thất bại" | "Hoàn tiền";
  date: string;
  customerName: string;
  description: string;
  fee: number;
  netAmount: number;
}
