"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/core/providers/CartProvider";
import { useCurrency } from "@/core/providers/CurrencyProvider";

export function CartTable() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const { formatPrice } = useCurrency();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateCart = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      // Hiệu ứng giả lập cập nhật thành công
    }, 800);
  };

  const MobileLabel = ({ text }: { text: string }) => (
    <span className="md:hidden w-1/2 inline-block align-middle text-[16px] font-medium text-[#333] uppercase font-sans text-left pr-[10px]">
      {text}
    </span>
  );

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-[60px] border border-[#eee] bg-[#f9f9f9]">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="flaticon-shopping-bag text-[#aaa] text-[24px]"></i>
        </div>
        <h3 className="text-[24px] font-normal text-[#333] mb-4 uppercase font-sans">Giỏ hàng đang trống</h3>
        <p className="text-[16px] text-[#777] mb-8 font-sans">Có vẻ như bạn chưa thêm bất kỳ sản phẩm nào vào giỏ hàng.</p>
        <Link href="/shop" className="background-btn px-[35px] py-[15px] bg-[#f74f2e] text-white hover:bg-[#333] transition-all text-[14px] font-bold inline-block">
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  return (
    <div className="cart_form">
      <form onSubmit={handleUpdateCart}>
        <div className="cart_table mb-10">
          <div className="w-full">
            {/* Desktop Header */}
            <div className="hidden md:flex border-t border-b border-[#e0dcdc]">
              <div className="py-[13px] text-left text-[16px] font-medium text-[#333] font-sans w-[570px]">Sản phẩm</div>
              <div className="py-[13px] text-left text-[16px] font-medium text-[#333] font-sans w-[191px]">Giá</div>
              <div className="py-[13px] text-left text-[16px] font-medium text-[#333] font-sans w-[148px]">Số lượng</div>
              <div className="py-[13px] text-left text-[16px] font-medium text-[#333] font-sans w-[148px]">Tổng cộng</div>
              <div className="py-[13px] text-right flex-1"></div>
            </div>
 
            {/* Table Body */}
            <div className="block">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => (
                    <motion.div 
                    key={item.id} 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col md:flex-row border-b border-[#eee] py-5 md:py-0"
                  >
                    {/* Product Info - Mobile Card Header */}
                    <div className="flex items-start md:items-center md:w-[570px] md:py-[12px]">
                      <div className="w-[80px] h-[100px] md:w-[90px] md:h-[110px] flex-shrink-0 bg-[#f9f9f9] border border-[#eee] flex items-center justify-center overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow pl-[15px] md:pl-[20px]">
                        <Link href="/shop" className="text-[14px] md:text-[16px] font-bold text-[#333] hover:text-primary transition-colors block mb-1">{item.name}</Link>
                        <div className="space-y-1">
                          {item.size && <p className="text-[12px] text-[#777] uppercase">Size: {item.size}</p>}
                          {item.color && <p className="text-[12px] text-[#777]">Màu: {item.color}</p>}
                        </div>
                        
                        {/* Mobile Only: Inline Price */}
                        <div className="md:hidden mt-2 text-[14px] font-bold text-primary">
                          {formatPrice(item.price)}
                        </div>
                      </div>
                      
                      {/* Mobile Only: Remove Button */}
                      <button 
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="md:hidden text-[#ccc] hover:text-red-500 p-2"
                      >
                        <i className="flaticon-close !text-[10px]"></i>
                      </button>
                    </div>

                    {/* Price - Desktop Only */}
                    <div className="hidden md:flex items-center w-[191px] md:py-[12px] text-[16px] text-[#333]">
                      {formatPrice(item.price)}
                    </div>

                    {/* Quantity & Subtotal - Responsive Grid on Mobile */}
                    <div className="flex flex-wrap md:flex-nowrap items-center justify-between mt-4 md:mt-0 md:w-[320px] gap-4 md:gap-0">
                      {/* Quantity */}
                      <div className="flex items-center md:w-[160px] md:py-[12px]">
                        <div className="quantity_box flex items-center border border-[#ddd] bg-white">
                          <button 
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-[30px] h-[30px] md:w-[35px] md:h-[40px] flex items-center justify-center hover:text-primary transition-colors"
                          >
                            -
                          </button>
                          <span className="w-[35px] md:w-[40px] text-center text-[13px] md:text-[15px] font-bold">
                            {item.quantity}
                          </span>
                          <button 
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-[30px] h-[30px] md:w-[35px] md:h-[40px] flex items-center justify-center hover:text-primary transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="flex items-center md:w-[160px] md:py-[12px] text-right justify-end md:pr-4">
                        <span className="md:hidden text-[12px] text-[#999] mr-2">Tổng:</span>
                        <span className="text-[16px] md:text-[16px] font-bold text-[#333] md:text-primary">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>

                    {/* Remove Button - Desktop Only */}
                    <div className="hidden md:flex items-center justify-end flex-1 md:py-[12px]">
                      <button 
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#333] hover:text-red-500 transition-colors"
                      >
                        <i className="flaticon-close !text-[12px]"></i>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Cart Total Summary */}
        <div className="cart_subtotal text-right mt-[30px] mb-[40px] px-0 md:px-[13px]">
          <div className="inline-block w-1/2 md:w-auto text-left md:text-right text-[16px] font-normal text-[#333] font-sans pr-[15px]">Tạm tính:</div>
          <div className="inline-block w-1/2 md:w-auto text-right text-[24px] font-bold text-primary font-sans leading-none">{formatPrice(cartTotal)}</div>
        </div>

        {/* Footer Actions */}
        <div className="cart_btns flex flex-col md:flex-row justify-end space-y-3 md:space-y-0 md:space-x-[12px]">
          <button 
            type="submit" 
            disabled={isUpdating}
            className={`px-[25px] py-[13px] border border-[#333] text-[#333] font-bold uppercase text-[13px] hover:bg-[#333] hover:text-white transition-all ${isUpdating ? "opacity-50" : ""}`}
          >
            {isUpdating ? "Đang cập nhật..." : "Cập nhật giỏ hàng"}
          </button>
          <Link href="/shop" className="px-[25px] py-[13px] border border-[#333] text-[#333] font-bold uppercase text-[13px] hover:bg-[#333] hover:text-white transition-all text-center">
            Tiếp tục mua sắm
          </Link>
          <Link href="/checkout" className="px-[30px] py-[13px] bg-[#f74f2e] text-white font-bold uppercase text-[13px] hover:bg-[#333] transition-all text-center">
            Tiến hành thanh toán
          </Link>
        </div>
      </form>
    </div>
  );
}
