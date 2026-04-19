export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[];
  description?: string;
  shortDescription?: string;
  category: string;
  subCategory?: string;
  rating?: number;
  reviewsCount?: number;
  unitsSold?: number;
  status?: "Còn hàng" | "Hết hàng";
  colors?: string[];
  sizes?: string[];
  sku?: string;
  label?: "new" | "sale" | "hot";
  isNew?: boolean;
  discount?: boolean;
  specifications?: {
    brand?: string;
    connectorType?: string;
    batteryCapacity?: string;
    specialFeature?: string;
    weight?: string;
    warranty?: string;
    ports?: string;
    dimensions?: string;
    display?: string;
    origin?: string;
  };
}
