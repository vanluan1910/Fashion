"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { productService } from "@/features/products/services/productService";
import ProductForm from "@/features/products/components/ProductForm";
import Dialog from "@/shared/components/Dialog";
import { Product } from "@/features/products/types";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
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
    const fetchProduct = async () => {
      if (id) {
        setLoading(true);
        const decodedId = decodeURIComponent(id);
        const foundProduct = await productService.getProductById(decodedId);

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          triggerDialog({
            title: "Không tìm thấy!",
            message: `Sản phẩm với mã ${decodedId} không tồn tại hoặc đã bị xóa.`,
            type: "warning"
          });
        }
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const triggerDialog = (config: Omit<typeof dialogConfig, "isOpen">) => {
    setDialogConfig({ ...config, isOpen: true });
  };

  const handleUpdate = (data: any) => {
    if (id) {
      const decodedId = decodeURIComponent(id);
      productService.updateProduct(decodedId, data);
      triggerDialog({
        title: "Thành công!",
        message: "Thông tin sản phẩm đã được cập nhật hoàn tất.",
        type: "success",
        onConfirm: () => {
          router.push("/products");
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <Loader2 className="animate-spin text-[#f74f2e]" size={40} />
        <p className="text-[#666] font-medium">Đang tải dữ liệu sản phẩm...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-[#eee] shadow-sm">
        <h2 className="text-xl font-bold text-[#333] mb-4">Ố cửa! Không tìm thấy sản phẩm</h2>
        <Link href="/products" className="text-[#f74f2e] font-bold hover:underline">Quay lại danh sách</Link>
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
          <h1 className="text-2xl font-extrabold text-[#333] tracking-tight">Chỉnh sửa sản phẩm</h1>
          <p className="text-[13px] text-[#666] font-medium mt-1">Cập nhật thông tin chi tiết cho mã sản phẩm: <span className="text-[#f74f2e] font-bold">{decodeURIComponent(id)}</span></p>
        </div>
      </div>

      <ProductForm
        onSubmit={handleUpdate}
        onCancel={() => router.push("/products")}
        initialData={product}
        isEditing={true}
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
