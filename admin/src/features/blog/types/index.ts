export interface BlogPost {
  id: string;
  title: string;
  author: string;
  category: string;
  date: string;
  status: "Đã xuất bản" | "Bản nháp";
  views: number;
  image: string;
  summary: string;
  content: string;
}
