import { useState, useEffect, useMemo } from "react";
import { InventoryItem } from "../types";
import { inventoryService } from "../services/inventoryService";

export const useInventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "Còn hàng" | "Sắp hết" | "Hết hàng" | "Ngừng bán">("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchInventory = async () => {
    setLoading(true);
    const data = await inventoryService.getInventory();
    setInventory(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const updateStock = async (id: string, quantity: number) => {
    await inventoryService.updateStock(id, quantity);
    await fetchInventory();
  };

  const restock = async (id: string, quantity: number) => {
    await inventoryService.restock(id, quantity);
    await fetchInventory();
  };

  const updateRestockLevel = async (id: string, level: number) => {
    await inventoryService.updateRestockLevel(id, level);
    await fetchInventory();
  };

  const deleteItem = async (id: string) => {
    await inventoryService.deleteItem(id);
    await fetchInventory();
  };

  const filteredInventory = useMemo(() => {
    return inventory.filter(item => {
      const matchesSearch = 
        item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [inventory, searchQuery, statusFilter, categoryFilter]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(inventory.map(i => i.category)));
    return ["all", ...unique];
  }, [inventory]);

  const stats = useMemo(() => {
    return {
      total: inventory.length,
      inStock: inventory.filter(i => i.status === "Còn hàng").length,
      lowStock: inventory.filter(i => i.status === "Sắp hết").length,
      outOfStock: inventory.filter(i => i.status === "Hết hàng").length,
      discontinued: inventory.filter(i => i.status === "Ngừng bán").length,
      totalValue: inventory.reduce((sum, i) => sum + (i.currentStock * i.price), 0),
      totalCost: inventory.reduce((sum, i) => sum + (i.currentStock * i.cost), 0)
    };
  }, [inventory]);

  return {
    inventory: filteredInventory,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    categories,
    loading,
    updateStock,
    restock,
    updateRestockLevel,
    deleteItem,
    stats
  };
};
