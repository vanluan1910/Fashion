"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Upload,
  CheckCircle2,
  Plus,
  Save,
  X,
  Percent
} from "lucide-react";
import RichTextEditor from "@/shared/components/RichTextEditor";
import { Product } from "../types";

interface ProductFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: Product;
  isEditing?: boolean;
}

export default function ProductForm({ onSubmit, onCancel, initialData, isEditing = false }: ProductFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Form States
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    category: initialData?.category || "Thời trang nam",
    subCategory: initialData?.subCategory || "",
    price: initialData?.price || "",
    status: initialData?.status || "Còn hàng",
    image: initialData?.image || "",
    description: initialData?.description || "",
    features: initialData?.features || "",
    oldPrice: initialData?.oldPrice || "",
    discountPercent: 0
  });

  useEffect(() => {
    if (initialData) {
      const p = parseInt(String(initialData.price).replace(/\D/g, ""));
      const op = parseInt(String(initialData.oldPrice || "").replace(/\D/g, ""));
      let dp = 0;
      if (p && op && op > p) {
        dp = Math.round(((op - p) / op) * 100);
      }

      setFormData({
        name: initialData.name,
        category: initialData.category,
        subCategory: initialData.subCategory || "",
        price: initialData.price,
        status: initialData.status,
        image: initialData.image,
        description: initialData.description || "",
        features: initialData.features || "",
        oldPrice: initialData.oldPrice || "",
        discountPercent: dp
      });
      setImagePreview(initialData.image);
    }
  }, [initialData]);

  const formatNumber = (num: number | string) => {
    const val = String(num).replace(/\D/g, "");
    if (!val) return "";
    return new Intl.NumberFormat('vi-VN').format(parseInt(val));
  };

  const handlePriceChange = (val: string, type: 'price' | 'oldPrice' | 'percent') => {
    // Chỉ lấy số
    const cleanVal = val.replace(/\D/g, "");
    
    setFormData(prev => {
      const nextOp = type === 'oldPrice' ? cleanVal : prev.oldPrice;
      const nextP = type === 'price' ? cleanVal : prev.price;
      const nextPct = type === 'percent' ? (parseInt(cleanVal) || 0) : prev.discountPercent;

      let finalOp = nextOp;
      let finalP = nextP;
      let finalPct = Math.min(100, nextPct);

      const opNum = parseInt(String(finalOp).replace(/\D/g, "")) || 0;
      const pNum = parseInt(String(finalP).replace(/\D/g, "")) || 0;

      if (type === 'oldPrice') {
        if (finalPct > 0 && opNum > 0) {
          finalP = String(Math.round(opNum * (1 - finalPct / 100)));
        } else if (pNum > 0 && opNum > pNum) {
          finalPct = Math.round(((opNum - pNum) / opNum) * 100);
        }
      } else if (type === 'percent') {
        if (opNum > 0) {
          finalP = String(Math.round(opNum * (1 - finalPct / 100)));
        }
      } else if (type === 'price') {
        if (opNum > 0 && opNum > pNum) {
          finalPct = Math.round(((opNum - pNum) / opNum) * 100);
        }
      }

      return {
        ...prev,
        oldPrice: finalOp,
        price: finalP,
        discountPercent: finalPct
      };
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceStr = String(formData.price || "");
    const oldPriceStr = String(formData.oldPrice || "");
    onSubmit({
      ...formData,
      image: imagePreview || "https://images.unsplash.com/photo-1598033129183-c4f50c717658?q=80&w=200&auto=format&fit=crop",
      price: priceStr.includes("đ") ? priceStr : (priceStr ? `${priceStr}đ` : ""),
      oldPrice: oldPriceStr ? (oldPriceStr.includes("đ") ? oldPriceStr : `${oldPriceStr}đ`) : null
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
      {/* Cột trái: Thông tin chính */}
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#eee] space-y-6">
          <h3 className="text-lg font-bold text-[#333] border-b pb-4 border-[#eee]">
            {isEditing ? `Sửa mã sản phẩm: ${initialData?.id}` : "Thông tin cơ bản"}
          </h3>

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#555] tracking-tight">Tên sản phẩm</label>
            <input
              required
              type="text"
              placeholder="Nhập tên sản phẩm..."
              className="w-full p-4 bg-[#f3f4f9] border-none rounded-xl text-[14px] text-[#333] font-medium focus:ring-2 focus:ring-[#f74f2e]"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
            <p className="text-[11px] text-[#f74f2e] font-semibold">*Tên sản phẩm không nên vượt quá 30 ký tự</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-[#555] tracking-tight">Danh mục</label>
              <select 
                className="w-full p-4 bg-[#f3f4f9] border-none rounded-xl text-[14px] text-[#333] font-medium focus:ring-2 focus:ring-[#f74f2e] cursor-pointer"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              >
                <option>Thời trang nam</option>
                <option>Thời trang nữ</option>
                <option>Phụ kiện</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-[#555] tracking-tight">Loại sản phẩm</label>
              <select 
                className="w-full p-4 bg-[#f3f4f9] border-none rounded-xl text-[14px] text-[#333] font-medium focus:ring-2 focus:ring-[#f74f2e] cursor-pointer"
                value={formData.subCategory}
                onChange={(e) => setFormData(prev => ({ ...prev, subCategory: e.target.value }))}
              >
                <option value="">Chọn loại sản phẩm...</option>
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
                <option value="Accessories">Phụ kiện khác</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#555] tracking-tight">Mô tả sản phẩm</label>
            <textarea 
              rows={6} 
              placeholder="Nhập mô tả ngắn gọn..." 
              className="w-full p-4 bg-[#f3f4f9] border-none rounded-xl text-[14px] text-[#333] font-medium focus:ring-2 focus:ring-[#f74f2e] focus:bg-white transition-colors"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            ></textarea>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#eee] space-y-6">
          <h3 className="text-lg font-bold text-[#333] border-b pb-4 border-[#eee]">Tính năng & Media</h3>

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#555] tracking-tight">Đặc điểm nổi bật</label>
            <RichTextEditor
              placeholder="Nhập các chi tiết kỹ thuật hoặc tính năng nổi bật..."
              initialValue={formData.features}
              onChange={(content) => {
                setFormData(prev => ({ ...prev, features: content }));
              }}
            />
          </div>

          <div className="space-y-4">
            <label className="text-[13px] font-bold text-[#555]">Hình ảnh sản phẩm</label>
            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#eee] rounded-2xl p-12 bg-[#fcfcff] flex flex-col items-center justify-center gap-3 cursor-pointer group hover:bg-[#f3f4f9] transition-all min-h-[200px]"
            >
              {imagePreview ? (
                <div className="relative group/img">
                  <img src={imagePreview} className="max-h-[160px] rounded-xl shadow-lg" alt="Preview" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center rounded-xl transition-opacity">
                    <Plus className="text-white" size={32} />
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-4 bg-[#f74f2e]/10 rounded-full text-[#f74f2e] group-hover:scale-110 transition-transform">
                    <Upload size={32} />
                  </div>
                  <div className="text-[15px] text-center font-medium text-[#666]">
                    Kéo thả ảnh hoặc <span className="text-[#f74f2e] font-bold underline">Duyệt file</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cột phải: Thiết lập & Giá */}
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#eee] space-y-6">
          <h3 className="text-lg font-bold text-[#333] border-b pb-4 border-[#eee]">Giá & Kho</h3>

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#555] tracking-tight">Giá gốc (Trước khi giảm)</label>
            <div className="relative">
              <input
                type="text"
                placeholder="VD: 1.800.000"
                className="w-full p-4 bg-[#f3f4f9] border-none rounded-xl text-[14px] text-[#333] font-medium focus:ring-2 focus:ring-[#f74f2e] pr-12"
                value={focusedField === 'oldPrice' ? formData.oldPrice : formatNumber(formData.oldPrice)}
                onFocus={() => setFocusedField('oldPrice')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => handlePriceChange(e.target.value, 'oldPrice')}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] font-bold text-[#aaa]">đ</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-[#555] tracking-tight">% Giảm giá</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0"
                  max="100"
                  min="0"
                  className="w-full p-4 bg-[#f3f4f9] border-none rounded-xl text-[14px] text-[#333] font-bold focus:ring-2 focus:ring-[#f74f2e] pr-10"
                  value={formData.discountPercent || ""}
                  onChange={(e) => handlePriceChange(e.target.value, 'percent')}
                />
                <Percent size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999]" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-[#555] tracking-tight">Giá bán thực tế</label>
              <div className="relative">
                <input
                  required
                  type="text"
                  placeholder="VD: 1.500.000"
                  className="w-full p-4 bg-[#f3f4f9] border-none rounded-xl text-[14px] text-[#333] font-bold focus:ring-2 focus:ring-[#f74f2e] pr-12"
                  value={focusedField === 'price' ? formData.price : formatNumber(formData.price)}
                  onFocus={() => setFocusedField('price')}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => handlePriceChange(e.target.value, 'price')}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] font-bold text-[#aaa]">đ</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#555] tracking-tight">Tình trạng kho</label>
            <select
              className="w-full p-4 bg-[#f3f4f9] border-none rounded-xl text-[14px] text-[#333] font-medium focus:ring-2 focus:ring-[#f74f2e] cursor-pointer"
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
            >
              <option>Còn hàng</option>
              <option>Hết hàng</option>
              <option>Cần nhập thêm</option>
              <option>Sắp ra mắt</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-[#f74f2e] text-white rounded-2xl text-[15px] font-bold hover:bg-[#d24327] shadow-xl shadow-[#f74f2e]/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
        >
          {isEditing ? <Save size={22} /> : <CheckCircle2 size={22} />}
          {isEditing ? "Cập nhật sản phẩm" : "Hoàn tất và đăng bán"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="w-full py-4 border border-[#eee] bg-white text-[#666] rounded-2xl text-[15px] font-bold hover:bg-[#f9f9f9] flex items-center justify-center transition-all"
        >
          Hủy bỏ thay đổi
        </button>
      </div>
    </form>
  );
}
