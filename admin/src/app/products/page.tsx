"use client";

import React, { useState } from "react";
import { Plus, Search, Filter, Download } from "lucide-react";
import Link from "next/link";
import { useProducts } from "@/features/products/hooks/useProducts";
import ProductTable from "@/features/products/components/ProductTable";
import Dialog from "@/shared/components/Dialog";

export default function ProductsPage() {
  const {
    filteredProducts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    selectedProducts,
    toggleSelectAll,
    toggleSelectProduct,
    deleteProduct,
    products,
  } = useProducts();

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
    type: "info",
  });

  const triggerDialog = (config: Omit<typeof dialogConfig, "isOpen">) => {
    setDialogConfig({ ...config, isOpen: true });
  };

  const handleDeleteRequest = (id: string) => {
    triggerDialog({
      title: "Xác nhận xóa?",
      message: "Sản phẩm này sẽ bị gỡ bỏ vĩnh viễn khỏi hệ thống. Hành động này không thể hoàn tác.",
      type: "confirm",
      onConfirm: () => {
        deleteProduct(id);
        triggerDialog({
          title: "Đã xóa thành công!",
          message: "Dữ liệu sản phẩm đã được gỡ bỏ hoàn tất.",
          type: "success",
        });
      },
    });
  };

  return (
    <div className="space-y-6">
      <section className="admin-page-surface overflow-hidden">
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-7">
          <div className="space-y-1.5">
            <span className="admin-section-kicker">Danh mục</span>
            <h1 className="admin-section-title">Quản lý sản phẩm</h1>
            <p className="text-sm text-[var(--admin-text-muted)]">Danh sách gọn, đọc nhanh, cùng nhịp với dashboard mới.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-[calc(var(--admin-radius-md)-4px)] border border-[var(--admin-border)] bg-white px-4 py-2.5 text-[13px] font-semibold text-[var(--admin-heading)] shadow-admin-sm transition hover:bg-[var(--admin-surface-strong)]">
              <Download size={18} /> Xuất báo cáo
            </button>
            <Link
              href="/products/add"
              className="flex items-center gap-2 rounded-[calc(var(--admin-radius-md)-4px)] bg-[var(--admin-accent)] px-5 py-2.5 text-[13px] font-semibold text-white shadow-admin-md transition hover:-translate-y-0.5 hover:bg-[var(--admin-accent-strong)]"
            >
              <Plus size={18} /> Thêm sản phẩm
            </Link>
          </div>
        </div>
      </section>

      <div className="admin-page-surface overflow-hidden">
        <div className="admin-toolbar !rounded-none !border-x-0 !border-t-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,251,246,0.88))]">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)]" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc mã SP..."
              className="admin-control pl-10 text-[14px] font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-[var(--admin-radius-sm)] bg-[rgba(255,255,255,0.65)] px-3 py-2">
              <Filter size={16} className="text-[var(--admin-text-muted)]" />
              <select
                className="cursor-pointer bg-transparent text-[13px] font-semibold text-[var(--admin-text)] outline-none focus:ring-0"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="Tất cả">Tất cả danh mục</option>
                <option value="Thời trang nam">Thời trang nam</option>
                <option value="Thời trang nữ">Thời trang nữ</option>
                <option value="Phụ kiện">Phụ kiện</option>
              </select>
            </div>

            <div className="flex items-center gap-2 rounded-[var(--admin-radius-sm)] bg-[rgba(255,255,255,0.65)] px-3 py-2">
              <select
                className="cursor-pointer bg-transparent text-[13px] font-semibold text-[var(--admin-text)] outline-none focus:ring-0"
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
              >
                <option value="Tất cả loại">Tất cả loại SP</option>
                <option value="T-Shirts">Áo thun (T-Shirts)</option>
                <option value="Shirts">Áo sơ mi (Shirts)</option>
                <option value="Jackets">Áo khoác (Jackets)</option>
                <option value="Sweaters">Áo len (Sweaters)</option>
                <option value="Jeans">Quần Jeans</option>
                <option value="Dresses">Váy liền (Dresses)</option>
                <option value="Skirts">Chân váy (Skirts)</option>
                <option value="Suits">Bộ Suit / Vest</option>
                <option value="Handbags">Túi xách (Handbags)</option>
                <option value="Shoes">Giày dép (Shoes)</option>
                <option value="Hats">Mũ nón (Hats)</option>
              </select>
            </div>
            <p className="ml-2 text-[13px] font-medium text-[var(--admin-text-muted)]">Đã chọn: {selectedProducts.length}</p>
          </div>
        </div>

        <ProductTable
          products={filteredProducts}
          selectedProducts={selectedProducts}
          toggleSelectProduct={toggleSelectProduct}
          toggleSelectAll={toggleSelectAll}
          isAllSelected={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
          onDelete={handleDeleteRequest}
        />

        <div className="flex items-center justify-between border-t border-[var(--admin-border)] bg-[rgba(255,255,255,0.7)] px-5 py-4">
          <p className="text-[13px] font-medium text-[var(--admin-text-muted)]">
            Hiển thị {filteredProducts.length} của {products.length} sản phẩm
          </p>
          <div className="flex items-center gap-2" />
        </div>
      </div>

      <Dialog {...dialogConfig} onClose={() => setDialogConfig((prev) => ({ ...prev, isOpen: false }))} />
    </div>
  );
}
