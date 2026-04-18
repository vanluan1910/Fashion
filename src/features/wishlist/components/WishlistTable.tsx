"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/core/providers/WishlistProvider";
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
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-[#eee]">
            <th className="pb-5 font-bold text-[#333] uppercase text-[15px] w-[120px]">Hình ảnh</th>
            <th className="pb-5 font-bold text-[#333] uppercase text-[15px]">Tên sản phẩm</th>
            <th className="pb-5 font-bold text-[#333] uppercase text-[15px]">Giá</th>
            <th className="pb-5 font-bold text-[#333] uppercase text-[15px]">Hành động</th>
            <th className="pb-5 font-bold text-[#333] uppercase text-[15px] text-right">Xóa</th>
          </tr>
        </thead>
        <tbody>
          {wishlistItems.map((item) => (
            <tr key={item.id} className="border-b border-[#eee] last:border-0 group">
              <td className="py-6">
                <div className="relative w-[100px] h-[120px] bg-[#f9f9f9]">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
              </td>
              <td className="py-6">
                <Link href={`/shop?id=${item.id}`} className="text-[16px] text-[#333] hover:text-[#f74f2e] font-sans font-medium transition-colors">
                  {item.name}
                </Link>
              </td>
              <td className="py-6">
                <span className="text-[16px] font-bold text-[#333]">{formatPrice(item.price)}</span>
              </td>
              <td className="py-6">
                <button 
                  onClick={() => handleMoveToCart(item)}
                  className="px-6 py-2 bg-[#333] text-white text-[12px] uppercase font-bold hover:bg-[#f74f2e] transition-colors leading-none inline-flex items-center"
                >
                  Thêm vào giỏ
                </button>
              </td>
              <td className="py-6 text-right">
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-50 text-[#aaa] hover:text-red-500 transition-all ml-auto"
                >
                  <span className="flaticon-close text-[14px]"></span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
