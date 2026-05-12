import { InventoryItem } from "../types";

const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: "inv1",
    productId: "p1",
    productName: "Áo lụa Hàng Dữu",
    sku: "SILK-001",
    category: "Áo",
    currentStock: 45,
    warehouseStock: 120,
    lastRestocked: "2024-04-20",
    restockLevel: 30,
    status: "Còn hàng",
    price: 2500000,
    cost: 1200000,
    supplier: "Lụa Hàng Dữu"
  },
  {
    id: "inv2",
    productId: "p2",
    productName: "Túi xách da Ý",
    sku: "BAG-001",
    category: "Túi xách",
    currentStock: 8,
    warehouseStock: 25,
    lastRestocked: "2024-04-15",
    restockLevel: 15,
    status: "Sắp hết",
    price: 8500000,
    cost: 4200000,
    supplier: "Nhập khẩu Ý"
  },
  {
    id: "inv3",
    productId: "p3",
    productName: "Giày cao gót Paris",
    sku: "SHOE-001",
    category: "Giày",
    currentStock: 2,
    warehouseStock: 8,
    lastRestocked: "2024-04-18",
    restockLevel: 20,
    status: "Sắp hết",
    price: 3200000,
    cost: 1600000,
    supplier: "Paris Fashion Import"
  },
  {
    id: "inv4",
    productId: "p4",
    productName: "Quần jeans Premium",
    sku: "JEAN-001",
    category: "Quần",
    currentStock: 0,
    warehouseStock: 5,
    lastRestocked: "2024-04-10",
    restockLevel: 25,
    status: "Hết hàng",
    price: 1800000,
    cost: 800000,
    supplier: "Denim Global"
  },
  {
    id: "inv5",
    productId: "p5",
    productName: "Khăn tweed cổ điển",
    sku: "SCARF-001",
    category: "Phụ kiện",
    currentStock: 0,
    warehouseStock: 0,
    lastRestocked: "2024-03-20",
    restockLevel: 15,
    status: "Ngừng bán",
    price: 950000,
    cost: 400000,
    supplier: "Tweed Heritage"
  },
];

export const inventoryService = {
  getInventory: async (): Promise<InventoryItem[]> => {
    return new Promise(resolve => {
      setTimeout(() => resolve(MOCK_INVENTORY), 300);
    });
  },

  updateStock: async (id: string, quantity: number): Promise<void> => {
    const item = MOCK_INVENTORY.find(i => i.id === id);
    if (item) {
      item.currentStock = Math.max(0, quantity);
      if (item.currentStock === 0) {
        item.status = "Hết hàng";
      } else if (item.currentStock <= item.restockLevel) {
        item.status = "Sắp hết";
      } else {
        item.status = "Còn hàng";
      }
    }
    return Promise.resolve();
  },

  restock: async (id: string, quantity: number): Promise<void> => {
    const item = MOCK_INVENTORY.find(i => i.id === id);
    if (item) {
      item.warehouseStock += quantity;
      item.lastRestocked = new Date().toISOString().split('T')[0];
    }
    return Promise.resolve();
  },

  updateRestockLevel: async (id: string, level: number): Promise<void> => {
    const item = MOCK_INVENTORY.find(i => i.id === id);
    if (item) {
      item.restockLevel = level;
    }
    return Promise.resolve();
  },

  deleteItem: async (id: string): Promise<void> => {
    const index = MOCK_INVENTORY.findIndex(i => i.id === id);
    if (index > -1) MOCK_INVENTORY.splice(index, 1);
    return Promise.resolve();
  }
};
