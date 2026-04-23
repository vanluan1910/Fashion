"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
} from "lucide-react";
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
    products
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
    type: "info"
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
          type: "success"
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#333] tracking-tight">Quản lý sản phẩm</h1>
          <p className="text-[13px] text-[#666] font-medium mt-1">Xem, lọc và quản lý danh mục sản phẩm của bạn.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#eee] rounded-xl text-[13px] font-bold text-[#555] hover:bg-[#fcfcff] transition-all shadow-sm">
            <Download size={18} /> Xuất báo cáo
          </button>
          <Link href="/products/add" className="flex items-center gap-2 px-6 py-2.5 bg-[#f74f2e] text-white rounded-xl text-[13px] font-bold hover:bg-[#d24327] transition-all shadow-lg shadow-[#f74f2e]/20">
            <Plus size={18} /> Thêm sản phẩm
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#eee] overflow-hidden">
        {/* Filters & Search */}
        <div className="p-4 border-b border-[#eee] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#fcfcff]">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" size={18} />
            <input 
              type="text" 
              placeholder="Tìm kiếm theo tên hoặc mã SP..." 
              className="w-full pl-10 pr-4 py-2.5 bg-[#f3f4f9] border-none rounded-xl text-[14px] text-[#333] font-bold placeholder:text-[#aaa] focus:ring-2 focus:ring-[#f74f2e] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 px-3 py-2 bg-[#f3f4f9] rounded-xl border-none">
                <Filter size={16} className="text-[#666]" />
                <select 
                  className="bg-transparent border-none text-[13px] font-bold text-[#555] focus:ring-0 outline-none cursor-pointer"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                   <option value="Tất cả">Tất cả danh mục</option>
                   <option value="Thời trang nam">Thời trang nam</option>
                   <option value="Thời trang nữ">Thời trang nữ</option>
                   <option value="Phụ kiện">Phụ kiện</option>
                </select>
             </div>
             
             <div className="flex items-center gap-2 px-3 py-2 bg-[#f3f4f9] rounded-xl border-none">
                <select 
                  className="bg-transparent border-none text-[13px] font-bold text-[#555] focus:ring-0 outline-none cursor-pointer"
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
             <p className="text-[13px] text-[#999] font-bold ml-2">Đã chọn: {selectedProducts.length}</p>
          </div>
        </div>

        {/* Product Table Component */}
        <ProductTable 
          products={filteredProducts}
          selectedProducts={selectedProducts}
          toggleSelectProduct={toggleSelectProduct}
          toggleSelectAll={toggleSelectAll}
          isAllSelected={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
          onDelete={handleDeleteRequest}
        />

        {/* Pagination Summary */}
        <div className="p-4 border-t border-[#f1f1f1] flex items-center justify-between bg-[#fcfcff]">
          <p className="text-[13px] text-[#555] font-bold tracking-tight">
            Hiển thị {filteredProducts.length} của {products.length} sản phẩm
          </p>
          <div className="flex items-center gap-2">
            {/* Pagination logic would go here */}
          </div>
        </div>
      </div>

      <Dialog 
        {...dialogConfig} 
        onClose={() => setDialogConfig(prev => ({ ...prev, isOpen: false }))} 
      />
    </div>
  );
}
