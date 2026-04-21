"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { productService } from "@/features/products/services/productService";
import ProductForm from "@/features/products/components/ProductForm";
import Dialog from "@/shared/components/Dialog";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Product } from "@/features/products/types";

export default function AddProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id"); // Get ID from query string if editing
  
  const [initialData, setInitialData] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(!!editId);

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

  useEffect(() => {
    if (editId) {
      const loadProduct = async () => {
        setLoading(true);
        const foundProduct = await productService.getProductById(editId);
        if (foundProduct) {
          setInitialData(foundProduct);
        } else {
          triggerDialog({
            title: "Không tìm thấy!",
            message: "Sản phẩm cần chỉnh sửa không tồn tại hoặc đã bị xóa.",
            type: "warning"
          });
        }
        setLoading(false);
      };
      loadProduct();
    }
  }, [editId]);

  const triggerDialog = (config: Omit<typeof dialogConfig, "isOpen">) => {
    setDialogConfig({ ...config, isOpen: true });
  };

  const handleFormSubmit = async (data: any) => {
    if (editId) {
      // Edit Mode
      const success = await productService.updateProduct(editId, data);
      if (success) {
        triggerDialog({
          title: "Đã cập nhật!",
          message: "Thông tin sản phẩm đã được cập nhật thành công.",
          type: "success",
          onConfirm: () => router.push("/products")
        });
      }
    } else {
      // Create Mode
      const result = await productService.addProduct(data);
      if (result) {
        triggerDialog({
          title: "Đã thêm mới!",
          message: "Sản phẩm mới đã được đăng bán thành công trên hệ thống.",
          type: "success",
          onConfirm: () => router.push("/products")
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <Loader2 className="animate-spin text-[#f74f2e]" size={40} />
        <p className="text-[#666] font-medium">Đang nạp dữ liệu chỉnh sửa...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.push("/products")}
          className="p-2 hover:bg-[#f74f2e]/10 text-[#f74f2e] rounded-xl transition-all"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-[#333] tracking-tight">
            {editId ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
          </h1>
          <p className="text-[13px] text-[#666] font-medium mt-1">
            {editId ? `Cập nhật thông tin cho mã sản phẩm: ${editId}` : "Điền đầy đủ thông tin bên dưới để đăng bán sản phẩm mới vào cửa hàng."}
          </p>
        </div>
      </div>

      <ProductForm 
        onSubmit={handleFormSubmit} 
        onCancel={() => router.push("/products")}
        initialData={initialData}
        isEditing={!!editId}
      />

      <Dialog 
        {...dialogConfig} 
        onClose={() => {
          setDialogConfig(prev => ({ ...prev, isOpen: false }));
          if (dialogConfig.type === "success" && dialogConfig.onConfirm) {
            dialogConfig.onConfirm();
          }
        }} 
      />
    </div>
  );
}
