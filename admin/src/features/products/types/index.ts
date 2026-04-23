export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: "Còn hàng" | "Hết hàng" | "Cần nhập thêm" | string;
  image: string;
  features?: string;
  oldPrice?: string;
  description?: string;
  subCategory?: string;
}

export interface ProductFormData {
  name: string;
  category: string;
  gender: string;
  size: string;
  brand: string;
  description: string;
  features: string;
  actualPrice: string;
  discount: string;
  status: string;
  availability: string;
  image: string | null;
  oldPrice: string;
  subCategory: string;
}
