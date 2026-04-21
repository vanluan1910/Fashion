"use client";

import React, { useState } from "react";
import { Product } from "../types/product";
import { useCart } from "@/core/providers/CartProvider";
import { useCurrency } from "@/core/providers/CurrencyProvider";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface ProductDetailInfoProps {
  product: Product;
}

export function ProductDetailInfo({ product }: ProductDetailInfoProps) {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors && product.colors.length > 0 ? product.colors[0] : "Tiêu chuẩn");
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      color: selectedColor
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      color: selectedColor
    });
    router.push("/cart");
  };

  return (
    <div className="space-y-8 font-sans">
      <div>
        <div className="flex items-center gap-2 mb-2">
          {product.isNew && <span className="px-2 py-0.5 bg-[#333] text-white text-[10px] uppercase font-bold">Mới</span>}
          {product.label === 'sale' && <span className="px-2 py-0.5 bg-[#f74f2e] text-white text-[10px] uppercase font-bold">Giảm giá</span>}
        </div>
        <h1 className="text-3xl font-bold text-[#333] mb-4 tracking-tight">{product.name}</h1>
        <div className="flex items-center gap-6 text-[14px]">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★★★★★</span>
            <span className="text-[#666]">{product.rating || 4.5} Đánh giá</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="text-[#666]">{(product.reviewsCount || 10).toLocaleString()} Nhận xét</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="text-[#666]">{(product.unitsSold || 50).toLocaleString()} Đã bán</span>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-[#f74f2e]/5 inline-block rounded-sm">
          <p className="text-[14px]">
            <strong className="text-[#f74f2e]">92%</strong> người mua thích sản phẩm này!
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-[14px] font-bold uppercase tracking-wider text-[#333]">Mô tả ngắn</h4>
        <p className="text-[14px] text-gray-500 leading-relaxed">
          {product.shortDescription || "Mẫu sản phẩm thời trang cao cấp, thiết kế hiện đại phù hợp với nhiều phong cách khác nhau. Chất liệu bền bỉ và thoải mái khi sử dụng."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-100 pt-8">
        <div className="space-y-6">
          <div className="flex items-center">
            <span className="w-32 font-bold text-[14px] text-[#333]">Trạng thái:</span>
            <span className="text-green-600 font-bold text-[14px]">{product.status || "Còn hàng"}</span>
          </div>

          <div className="flex items-center">
            <span className="w-32 font-bold text-[14px] text-[#333]">Giá bán:</span>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-[#f74f2e]">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="text-[#999] line-through text-[16px]">{formatPrice(product.oldPrice)}</span>
              )}
            </div>
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className="space-y-4">
              <span className="font-bold text-[14px] text-[#333] block">Màu sắc:</span>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    suppressHydrationWarning={true}
                    className={`px-4 py-2 text-[12px] border transition-all ${
                      selectedColor === color
                        ? "border-[#f74f2e] bg-[#f74f2e] text-white"
                        : "border-gray-200 hover:border-[#f74f2e] text-[#666]"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button 
              onClick={handleAddToCart}
              suppressHydrationWarning={true}
              className={`flex-grow font-bold py-3 uppercase tracking-widest text-[13px] transition-all duration-300 ${
                isAdded ? "bg-green-600 text-white" : "bg-[#f74f2e] text-white hover:bg-[#333]"
              }`}
            >
              {isAdded ? "Đã Thêm Vào Giỏ!" : "Thêm Vào Giỏ"}
            </button>
            <button 
              onClick={handleBuyNow}
              suppressHydrationWarning={true}
              className="flex-grow border border-[#f74f2e] text-[#f74f2e] font-bold py-3 uppercase tracking-widest text-[13px] hover:bg-[#f74f2e] hover:text-white transition-colors"
            >
              Mua Ngay
            </button>
          </div>
        </div>

        {/* Set Order Card */}
        <div className="bg-white border border-gray-100 rounded-sm overflow-hidden">
          <div className="p-4 bg-gray-50/50 border-b border-gray-100">
            <h3 className="font-bold text-[15px] text-[#333] uppercase tracking-wide">Đặt hàng nhanh</h3>
          </div>
          <div className="p-4 space-y-4">
            <table className="w-full text-left text-[14px]">
              <tbody className="divide-y divide-gray-50">
                <tr className="border-none">
                  <td className="py-2 text-[#999] w-24">Phân loại:</td>
                  <td className="py-2 text-[#333] font-medium">{selectedColor}</td>
                </tr>
                <tr>
                  <td className="py-2 text-[#999]">Tính năng:</td>
                  <td className="py-2 text-[#333] font-medium">Chất liệu cao cấp, bền bỉ</td>
                </tr>
                <tr>
                  <td className="py-2 text-[#999]">Giao hàng:</td>
                  <td className="py-2 text-[#333] font-medium">Toàn quốc (2-4 ngày)</td>
                </tr>
                <tr>
                  <td className="py-2 text-[#999]">Số lượng:</td>
                  <td className="py-2">
                    <div className="flex items-center border border-gray-200 w-fit">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        suppressHydrationWarning={true}
                        className="px-4 py-1 hover:bg-gray-50 text-[#f74f2e] border-r border-gray-200 font-bold text-lg leading-none"
                      >
                        -
                      </button>
                      <input 
                        type="text" 
                        value={quantity}
                        readOnly
                        className="w-10 text-center focus:outline-none bg-transparent font-bold"
                      />
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        suppressHydrationWarning={true}
                        className="px-4 py-1 hover:bg-gray-50 text-[#f74f2e] border-l border-gray-200 font-bold text-lg leading-none"
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-[#999]">Tổng cộng:</td>
                  <td className="py-2 text-2xl font-bold text-[#333]">{formatPrice(product.price * quantity)}</td>
                </tr>
              </tbody>
            </table>
            <div className="bg-gray-50 p-3 text-[12px] text-[#777] italic border-l-2 border-[#f74f2e]">
              Dự kiến giao hàng vào: 25 Tháng 4, 2026
            </div>
            
            <div className="pt-4 flex items-center gap-3 border-t border-gray-50">
              <span className="text-[12px] font-bold text-[#333] uppercase">Chia sẻ :</span>
              <div className="flex gap-4">
                <button className="text-[#666] hover:text-[#f74f2e] transition-colors">
                  <i className="flaticon-facebook text-[18px]"></i>
                </button>
                <button className="text-[#666] hover:text-[#f74f2e] transition-colors">
                  <i className="flaticon-instagram-logo text-[18px]"></i>
                </button>
                <button className="text-[#666] hover:text-[#f74f2e] transition-colors">
                  <i className="flaticon-pinterest text-[18px]"></i>
                </button>
                <button className="text-[#666] hover:text-[#f74f2e] transition-colors">
                  <i className="flaticon-social text-[18px]"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
