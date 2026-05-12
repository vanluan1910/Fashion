export interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  category: string;
  currentStock: number;
  warehouseStock: number;
  lastRestocked: string;
  restockLevel: number;
  status: "Còn hàng" | "Sắp hết" | "Hết hàng" | "Ngừng bán";
  price: number;
  cost: number;
  supplier: string;
}
