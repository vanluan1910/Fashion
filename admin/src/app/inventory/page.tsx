"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  AlertTriangle,
  Package,
  RefreshCw,
  TrendingDown,
  X,
  Check
} from "lucide-react";
import { useInventory } from "@/features/inventory/hooks/useInventory";
import Dialog from "@/shared/components/Dialog";
import Modal from "@/shared/components/Modal";

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Còn hàng":
      return "bg-green-100 text-green-700";
    case "Sắp hết":
      return "bg-orange-100 text-orange-700";
    case "Hết hàng":
      return "bg-red-100 text-red-700";
    case "Ngừng bán":
      return "bg-gray-100 text-gray-700";
    default:
      return "bg-blue-100 text-blue-700";
  }
};

export default function InventoryPage() {
  const {
    inventory,
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
  } = useInventory();

  const [dialogConfig, setDialogConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "warning" | "info" | "confirm";
    onConfirm?: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editQuantity, setEditQuantity] = useState("0");
  const [actionType, setActionType] = useState<"stock" | "restock">("stock");

  const triggerDialog = (config: Omit<typeof dialogConfig, "isOpen">) => {
    setDialogConfig({ ...config, isOpen: true });
  };

  const handleEditStock = (item: any, type: "stock" | "restock") => {
    setSelectedItem(item);
    setActionType(type);
    setEditQuantity(type === "stock" ? String(item.currentStock) : "0");
    setEditModalOpen(true);
  };

  const handleSaveStock = async () => {
    if (!selectedItem) return;
    const quantity = parseInt(editQuantity) || 0;

    if (actionType === "stock") {
      await updateStock(selectedItem.id, quantity);
      triggerDialog({
        title: "Thành công",
        message: "Kho hàng đã được cập nhật.",
        type: "success"
      });
    } else {
      await restock(selectedItem.id, quantity);
      triggerDialog({
        title: "Thành công",
        message: "Nhập kho thành công.",
        type: "success"
      });
    }

    setEditModalOpen(false);
  };

  const handleDelete = (id: string) => {
    triggerDialog({
      title: "Xóa sản phẩm?",
      message: "Hành động này không thể hoàn tác.",
      type: "confirm",
      onConfirm: async () => {
        await deleteItem(id);
        triggerDialog({
          title: "Thành công",
          message: "Sản phẩm đã được xóa khỏi kho.",
          type: "success"
        });
      }
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="admin-page-surface overflow-hidden">
        <div className="flex flex-col gap-4 p-6 sm:p-7">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--admin-heading)]">Quản lý kho hàng</h1>
        </div>
      </div>

      </section>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="admin-page-surface p-4 shadow-admin-sm">
          <p className="text-xs text-[var(--admin-text-muted)] font-medium uppercase tracking-wide">Tổng SKU</p>
          <p className="text-xl font-semibold text-[var(--admin-heading)] mt-2">{stats.total}</p>
        </div>
        <div className="admin-page-surface p-4 shadow-admin-sm">
          <p className="text-xs text-[var(--admin-text-muted)] font-medium uppercase tracking-wide">Còn hàng</p>
          <p className="text-xl font-semibold text-green-600 mt-2">{stats.inStock}</p>
        </div>
        <div className="admin-page-surface p-4 shadow-admin-sm">
          <p className="text-xs text-[var(--admin-text-muted)] font-medium uppercase tracking-wide">Sắp hết</p>
          <p className="text-xl font-semibold text-orange-600 mt-2">{stats.lowStock}</p>
        </div>
        <div className="admin-page-surface p-4 shadow-admin-sm">
          <p className="text-xs text-[var(--admin-text-muted)] font-medium uppercase tracking-wide">Hết hàng</p>
          <p className="text-xl font-semibold text-red-600 mt-2">{stats.outOfStock}</p>
        </div>
      </div>

      {/* Value Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="admin-page-surface p-4 shadow-admin-sm">
          <p className="text-xs text-[var(--admin-text-muted)] font-medium uppercase tracking-wide">Giá trị kho</p>
          <p className="text-xl font-semibold text-[var(--admin-heading)] mt-2">
            {formatCurrency(stats.totalValue)}
          </p>
        </div>
        <div className="admin-page-surface p-4 shadow-admin-sm">
          <p className="text-xs text-[var(--admin-text-muted)] font-medium uppercase tracking-wide">Giá thành</p>
          <p className="text-xl font-semibold text-[var(--admin-heading)] mt-2">
            {formatCurrency(stats.totalCost)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-page-surface p-5 shadow-admin-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Search size={18} className="text-[var(--admin-text-muted)]" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên sản phẩm, SKU, nhà cung cấp..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-[var(--admin-text)]"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-[#666] uppercase tracking-wide block mb-2">
                Trạng thái
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full px-3 py-2 border border-[var(--admin-border)] rounded-lg text-sm font-medium focus:outline-none focus:border-[var(--admin-border-strong)]"
              >
                <option value="all">Tất cả</option>
                <option value="Còn hàng">Còn hàng</option>
                <option value="Sắp hết">Sắp hết</option>
                <option value="Hết hàng">Hết hàng</option>
                <option value="Ngừng bán">Ngừng bán</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[#666] uppercase tracking-wide block mb-2">
                Danh mục
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-[var(--admin-border)] rounded-lg text-sm font-medium focus:outline-none focus:border-[var(--admin-border-strong)]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "Tất cả danh mục" : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="admin-page-surface overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--admin-accent)]"></div>
          </div>
        ) : inventory.length === 0 ? (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-[#ddd] mb-3" />
            <p className="text-[var(--admin-text-muted)]">Không có sản phẩm nào</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#eee] bg-[#f9f9f9]">
                  <th className="px-5 py-3 text-left text-xs font-bold text-[var(--admin-text-muted)] uppercase tracking-wider">
                    Tên sản phẩm
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-[var(--admin-text-muted)] uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-bold text-[var(--admin-text-muted)] uppercase tracking-wider">
                    Kho chính
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-bold text-[var(--admin-text-muted)] uppercase tracking-wider">
                    Kho PK
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-bold text-[var(--admin-text-muted)] uppercase tracking-wider">
                    Giá bán
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-bold text-[var(--admin-text-muted)] uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-bold text-[var(--admin-text-muted)] uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id} className="border-b border-[#eee] hover:bg-[#f9f9f9] transition-colors">
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-medium text-[#1a1a1a]">{item.productName}</p>
                        <p className="text-xs text-[var(--admin-text-muted)]">{item.supplier}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-[var(--admin-text-muted)] font-mono">
                      {item.sku}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <div className="text-sm font-bold text-[#1a1a1a]">
                        {item.currentStock}
                      </div>
                      {item.currentStock <= item.restockLevel && (
                        <div className="flex items-center justify-center gap-1 text-xs text-orange-600 mt-1">
                          <AlertTriangle size={12} /> Cảnh báo
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4 text-center text-sm text-[var(--admin-text-muted)]">
                      {item.warehouseStock}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <p className="text-sm font-bold text-[#1a1a1a]">
                        {formatCurrency(item.price)}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEditStock(item, "stock")}
                          className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Cập nhật kho"
                        >
                          <Edit2 size={16} className="text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleEditStock(item, "restock")}
                          className="p-1.5 hover:bg-green-100 rounded-lg transition-colors"
                          title="Nhập kho"
                        >
                          <RefreshCw size={16} className="text-green-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <Trash2 size={16} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <div className="bg-white rounded-2xl p-6 max-w-md w-full">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-[#1a1a1a]">
              {actionType === "stock" ? "Cập nhật kho" : "Nhập kho"}
            </h2>
            <button onClick={() => setEditModalOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-[#666] mb-2">
                {selectedItem?.productName}
              </p>
              <p className="text-xs text-[var(--admin-text-muted)]">SKU: {selectedItem?.sku}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--admin-text)] block mb-2">
                {actionType === "stock"
                  ? "Số lượng hiện tại"
                  : "Số lượng nhập kho"}
              </label>
              <input
                type="number"
                min="0"
                value={editQuantity}
                onChange={(e) => setEditQuantity(e.target.value)}
                className="w-full px-3 py-2 border border-[var(--admin-border)] rounded-lg text-sm focus:outline-none focus:border-[var(--admin-border-strong)]"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setEditModalOpen(false)}
                className="flex-1 px-4 py-2 border border-[var(--admin-border)] rounded-lg text-sm font-medium text-[#666] hover:bg-[#f9f9f9] transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveStock}
                className="flex-1 px-4 py-2 bg-[#f74f2e] text-white rounded-lg text-sm font-medium hover:bg-[#d24327] transition-colors flex items-center justify-center gap-2"
              >
                <Check size={16} /> Lưu
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Dialog {...dialogConfig} onClose={() => setDialogConfig({ ...dialogConfig, isOpen: false })} />
    </div>
  );
}
