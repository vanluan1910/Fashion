"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/core/providers/WishlistProvider";
import { formatImageUrl } from "@/features/products/utils/productImages.mjs";
import { useCart } from "@/core/providers/CartProvider";
import { useCurrency } from "@/core/providers/CurrencyProvider";

export function WishlistTable() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const handleMoveToCart = (item: any) => {
    addToCart({
      ...item,
      quantity: 1
    });
    removeFromWishlist(item.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-20 bg-white border border-[#eee] rounded-sm">
        <div className="mb-6 opacity-20">
          <i className="flaticon-heart !text-[80px]"></i>
        </div>
        <h3 className="text-[24px] font-medium text-[#333] mb-4">Danh sách yêu thích đang trống</h3>
        <p className="text-[#777] mb-8">Hãy lưu lại những món đồ bạn yêu thích để dễ dàng xem lại và mua sắm sau này.</p>
        <Link 
          href="/shop" 
          className="inline-block px-[40px] py-[15px] bg-[#f74f2e] text-white uppercase font-bold text-[14px] hover:bg-[#333] transition-all"
        >
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist_table w-full overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[600px] table-auto">
        <thead>
          <tr className="border-b border-[#eee]">
            <th className="pb-4 pr-4 font-bold text-[#333] uppercase text-[13px] tracking-[1px] w-[100px]">Hình ảnh</th>
            <th className="pb-4 px-4 font-bold text-[#333] uppercase text-[13px] tracking-[1px] w-auto">Tên sản phẩm</th>
            <th className="pb-4 px-4 font-bold text-[#333] uppercase text-[13px] tracking-[1px] w-[150px]">Giá</th>
            <th className="pb-4 px-4 font-bold text-[#333] uppercase text-[13px] tracking-[1px] w-[180px]">Hành động</th>
            <th className="pb-4 pl-4 font-bold text-[#333] uppercase text-[13px] tracking-[1px] text-right w-[60px]">Xóa</th>
          </tr>
        </thead>
        <tbody>
          {wishlistItems.map((item) => (
            <tr key={item.id} className="border-b border-[#eee] last:border-0 group">
              <td className="py-5 pr-4">
                <div className="relative w-[80px] h-[100px] bg-[#f9f9f9] shadow-sm rounded-sm overflow-hidden">
                  <Image src={formatImageUrl(item.image)} alt={item.name} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </td>
              <td className="py-5 px-4">
                <Link href={`/shop?id=${item.id}`} className="text-[15px] text-[#333] hover:text-primary font-sans font-bold transition-colors line-clamp-2">
                  {item.name}
                </Link>
              </td>
              <td className="py-5 px-4">
                <span className="text-[14px] font-bold text-primary">{formatPrice(item.price)}</span>
              </td>
              <td className="py-5 px-4">
                <button 
                  onClick={() => handleMoveToCart(item)}
                  className="h-[36px] px-6 bg-[#333] text-white text-[10px] tracking-[2px] uppercase font-bold hover:bg-primary transition-all inline-flex items-center justify-center whitespace-nowrap"
                >
                  Thêm vào giỏ
                </button>
              </td>
              <td className="py-5 pl-4 text-right">
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-[#ccc] hover:text-red-500 transition-all ml-auto"
                >
                  <span className="flaticon-close text-[12px]"></span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
