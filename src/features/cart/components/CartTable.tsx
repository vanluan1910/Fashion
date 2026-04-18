"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/core/providers/CartProvider";
import { useCurrency } from "@/core/providers/CurrencyProvider";

export function CartTable() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const { formatPrice } = useCurrency();
  const [notes, setNotes] = useState("");
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
      <div className="text-center py-[100px] border border-[#eee] bg-[#f9f9f9]">
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
        <div className="cart_table">
          <div className="w-full">
            {/* Desktop Header */}
            <div className="hidden md:flex border-t border-b border-[#e0dcdc]">
              <div className="py-[13px] text-left text-[16px] font-medium text-[#333] font-sans w-[570px]">Sản phẩm</div>
              <div className="py-[13px] text-left text-[16px] font-medium text-[#333] font-sans w-[191px]">Giá</div>
              <div className="py-[13px] text-left text-[16px] font-medium text-[#333] font-sans w-[148px]">Số lượng</div>
              <div className="py-[13px] text-left text-[16px] font-medium text-[#333] font-sans w-[148px]">Tổng cộng</div>
              <div className="py-[13px] text-right text-[16px] font-medium text-[#333] font-sans flex-1"></div>
            </div>

            {/* Table Body */}
            <div className="block md:table-row-group">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => (
                  <motion.div 
                    key={item.id} 
                    layout
                    className="block md:flex border-b border-[#eee] mb-[30px] md:mb-0 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {/* Product Info */}
                    <div className="py-[15px] md:py-[20px] px-0 align-middle block md:flex md:w-[570px] border-b border-[#eee] md:border-b-0">
                      <div className="flex items-center w-full">
                        <MobileLabel text="Sản phẩm" />
                        <div className="flex items-center w-1/2 md:w-auto">
                          <div className="w-[80px] h-[100px] md:w-[120px] md:h-[150px] flex-shrink-0 mr-[10px] md:mr-[20px] bg-[#f9f9f9] border border-[#eee] flex items-center justify-center overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="product_details pl-[10px] md:pl-[20px]">
                            <Link href="/shop" className="text-[14px] md:text-[16px] font-normal text-[#333] hover:text-primary transition-colors m-0 font-sans leading-tight block mb-2">{item.name}</Link>
                            {item.size && <p className="text-[13px] text-[#777] m-0 leading-normal font-sans uppercase">Kích cỡ: {item.size}</p>}
                            {item.color && <p className="text-[13px] text-[#777] m-0 leading-normal font-sans">Màu sắc: {item.color}</p>}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="py-[15px] md:py-[20px] px-0 text-[15px] md:text-[16px] text-[#333] font-sans align-middle block md:flex md:items-center md:w-[191px] border-b border-[#eee] md:border-b-0">
                      <div className="flex items-center w-full">
                        <MobileLabel text="Giá" />
                        <span className="w-1/2 md:w-auto text-left font-medium">{formatPrice(item.price)}</span>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="py-[15px] md:py-[20px] px-0 align-middle block md:flex md:items-center md:w-[148px] border-b border-[#eee] md:border-b-0">
                      <div className="flex items-center w-full">
                        <MobileLabel text="Số lượng" />
                        <div className="w-1/2 md:w-auto flex justify-start">
                          <div className="quantity_box inline-flex items-center border border-[#aaa] overflow-hidden">
                            <button 
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-[30px] md:w-[40px] h-[30px] md:h-[45px] bg-[#f9f9f9] flex items-center justify-center text-[#333] border-r border-[#aaa] hover:text-primary"
                            >
                              -
                            </button>
                            <span className="w-[30px] md:w-[45px] h-[30px] md:h-[45px] flex items-center justify-center text-[13px] md:text-[15px] bg-white font-sans font-bold">
                              {item.quantity}
                            </span>
                            <button 
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-[30px] md:w-[40px] h-[30px] md:h-[45px] bg-[#f9f9f9] flex items-center justify-center text-[#333] border-l border-[#aaa] hover:text-primary"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="py-[15px] md:py-[20px] px-0 text-[15px] md:text-[16px] text-primary font-bold font-sans align-middle block md:flex md:items-center md:w-[148px] border-b border-[#eee] md:border-b-0">
                      <div className="flex items-center w-full">
                        <MobileLabel text="Tổng" />
                        <span className="w-1/2 md:w-auto text-left">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>

                    {/* Remove */}
                    <div className="py-[15px] md:py-[20px] px-0 text-left md:text-right align-middle block md:flex md:items-center flex-1">
                      <div className="flex items-center w-full">
                        <MobileLabel text="Xóa" />
                        <button 
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#333] hover:text-red-500 transition-all block md:ml-auto focus:outline-none"
                        >
                          <i className="flaticon-close !text-[12px]"></i>
                        </button>
                      </div>
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

        {/* Note Section */}
        <div className="mt-10 max-w-[500px] text-left">
          <label className="block text-[15px] font-bold text-[#333] uppercase mb-2 font-sans">Thêm ghi chú đơn hàng</label>
          <textarea 
            className="w-full h-[100px] border border-[#aaa] p-4 text-[14px] outline-none focus:border-primary transition-all font-sans"
            placeholder="Yêu cầu đặc biệt cho đơn hàng của bạn..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
      </form>
    </div>
  );
}
