"use client";

import React, { useRef, useState, useEffect } from "react";
import { 
  Upload, 
  CheckCircle2, 
  Plus,
  Save,
  X
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
  
  // Form States
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    category: initialData?.category || "Thời trang nam",
    price: initialData?.price || "",
    status: initialData?.status || "Còn hàng",
    image: initialData?.image || "",
    features: initialData?.features || ""
  });

  // Handle case where initialData might arrive later if fetched
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        category: initialData.category,
        price: initialData.price,
        status: initialData.status,
        image: initialData.image,
        features: initialData.features || ""
      });
      setImagePreview(initialData.image);
    }
  }, [initialData]);

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
    onSubmit({
      ...formData,
      image: imagePreview || "https://images.unsplash.com/photo-1598033129183-c4f50c717658?q=80&w=200&auto=format&fit=crop",
      price: formData.price.includes("đ") ? formData.price : `${formData.price}đ`
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
              <label className="text-[13px] font-bold text-[#555] tracking-tight">Giới tính</label>
              <select className="w-full p-4 bg-[#f3f4f9] border-none rounded-xl text-[14px] text-[#333] font-medium focus:ring-2 focus:ring-[#f74f2e] cursor-pointer">
                <option>Nam</option>
                <option>Nữ</option>
                <option>Unisex</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#555] tracking-tight">Mô tả sản phẩm</label>
            <textarea 
              rows={6} 
              placeholder="Nhập mô tả ngắn gọn..." 
              className="w-full p-4 bg-[#f3f4f9] border-none rounded-xl text-[14px] text-[#333] font-medium focus:ring-2 focus:ring-[#f74f2e] focus:bg-white transition-colors"
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
            <label className="text-[13px] font-bold text-[#555] tracking-tight">Giá bán thực tế</label>
            <input 
              required 
              type="text" 
              placeholder="VD: 1.500.000" 
              className="w-full p-4 bg-[#f3f4f9] border-none rounded-xl text-[14px] text-[#333] font-bold focus:ring-2 focus:ring-[#f74f2e]" 
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
            />
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
