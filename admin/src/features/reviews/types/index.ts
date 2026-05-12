export interface Review {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  status: "Đã duyệt" | "Chưa duyệt" | "Đã ẩn";
  helpful: number;
  unhelpful: number;
}
