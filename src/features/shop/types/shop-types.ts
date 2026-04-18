export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  subCategory?: string;
  label?: "new" | "sale" | "sold-out";
  isNew?: boolean;
  discount?: boolean;
  sizes: string[];
  daysLeft?: number;
}

export interface ShopCategory {
  id: string;
  name: string;
  count: number;
}

export interface ShopColor {
  id: string;
  hex: string;
  name: string;
}
