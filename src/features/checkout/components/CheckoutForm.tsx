"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCart } from "@/core/providers/CartProvider";
import { useCurrency } from "@/core/providers/CurrencyProvider";

export function CheckoutForm({ onSuccess }: { onSuccess?: () => void }) {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [orderSummary, setOrderSummary] = React.useState({ items: [] as any[], total: 0 });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    
    setIsSubmitting(true);
    
    // Lưu lại thông tin đơn hàng hiện tại trước khi xóa giỏ hàng
    setOrderSummary({ items: [...cartItems], total: cartTotal });
    
    // Giả lập gọi API đặt hàng
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Xóa giỏ hàng sau khi đặt hàng thành công
    clearCart();
    
    setIsSubmitting(false);
    setIsSuccess(true);
    if (onSuccess) onSuccess();
    
    // Cuộn lên đầu trang để xem thông báo thành công
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-[40px] border border-[#eee] bg-[#fdfdfd] shadow-sm"
      >
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="flaticon-arrows-1 text-white text-[32px]"></i>
        </div>
        <h2 className="text-[32px] font-normal text-[#333] mb-4 uppercase font-sans">Cảm ơn bạn!</h2>
        <p className="text-[18px] text-[#777] mb-8 font-sans">Đơn hàng của bạn đã được đặt thành công.</p>
        <div className="max-w-[500px] mx-auto bg-white p-6 border border-[#eee] text-left mb-8">
            <h4 className="font-bold uppercase text-[14px] mb-4">Chi tiết đơn hàng</h4>
            <div className="flex justify-between mb-2"><span className="text-[#777]">Mã đơn hàng:</span> <b>#AT-{(Math.floor(Math.random() * 90000) + 10000)}</b></div>
            <div className="flex justify-between mb-2"><span className="text-[#777]">Ngày đặt:</span> <b>{new Date().toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })}</b></div>
            <div className="flex justify-between mb-2"><span className="text-[#777]">Số lượng sản phẩm:</span> <b>{orderSummary.items.length} món</b></div>
            <div className="flex justify-between mb-2"><span className="text-[#777]">Tổng cộng:</span> <b className="text-primary">{formatPrice(orderSummary.total + 10)}</b></div>
            <div className="flex justify-between"><span className="text-[#777]">Trạng thái:</span> <b className="text-green-600">Đang xử lý</b></div>
        </div>
        <div className="flex justify-center space-x-4">
            <button 
                onClick={() => window.location.href = "/"}
                className="px-8 py-3 bg-[#333] text-white uppercase text-[13px] font-bold hover:bg-primary transition-all"
            >
                Về trang chủ
            </button>
            <button 
                onClick={() => window.location.href = "/shop"}
                className="px-8 py-3 border border-[#333] text-[#333] uppercase text-[13px] font-bold hover:bg-[#333] hover:text-white transition-all"
            >
                Tiếp tục mua sắm
            </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="checkout_form_wrapper">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-[15px]">
          {/* Billing Details - Keeping form inputs same */}
          <div className="w-full lg:w-2/3 px-[15px] mb-[40px] lg:mb-0 text-left">
            <h3 className="text-[24px] font-medium text-[#333] mb-[30px] font-sans">Thông tin thanh toán</h3>
            
            <div className="flex flex-wrap -mx-[10px]">
              <div className="w-full md:w-1/2 px-[10px] mb-4">
                <label className="block text-[14px] font-bold text-[#333] uppercase mb-2 font-sans text-left">Tên <span className="text-[#f74f2e]">*</span></label>
                <input type="text" name="FirstName" className="w-full h-[45px] border border-[#eee] px-4 text-[14px] outline-none focus:border-primary transition-colors" required suppressHydrationWarning />
              </div>
              <div className="w-full md:w-1/2 px-[10px] mb-4">
                <label className="block text-[14px] font-bold text-[#333] uppercase mb-2 font-sans text-left">Họ <span className="text-[#f74f2e]">*</span></label>
                <input type="text" name="LastName" className="w-full h-[45px] border border-[#eee] px-4 text-[14px] outline-none focus:border-primary transition-colors" required suppressHydrationWarning />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-[14px] font-bold text-[#333] uppercase mb-2 font-sans text-left">Quốc gia / Khu vực <span className="text-[#f74f2e]">*</span></label>
              <select className="w-full h-[45px] border border-[#eee] px-4 text-[14px] outline-none focus:border-primary transition-colors bg-white font-sans" suppressHydrationWarning>
                <option>Việt Nam</option>
                <option>Hoa Kỳ</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-[14px] font-bold text-[#333] uppercase mb-2 font-sans text-left">Địa chỉ <span className="text-[#f74f2e]">*</span></label>
              <input type="text" placeholder="Số nhà và tên đường" className="w-full h-[45px] border border-[#eee] px-4 text-[14px] outline-none focus:border-primary transition-colors mb-4" required suppressHydrationWarning />
            </div>

            <div className="mb-4">
              <label className="block text-[14px] font-bold text-[#333] uppercase mb-2 font-sans text-left">Thành phố <span className="text-[#f74f2e]">*</span></label>
              <input type="text" className="w-full h-[45px] border border-[#eee] px-4 text-[14px] outline-none focus:border-primary transition-colors" required suppressHydrationWarning />
            </div>

            <div className="flex flex-wrap -mx-[10px]">
              <div className="w-full md:w-1/2 px-[10px] mb-4">
                <label className="block text-[14px] font-bold text-[#333] uppercase mb-2 font-sans text-left">Số điện thoại <span className="text-[#f74f2e]">*</span></label>
                <input type="tel" className="w-full h-[45px] border border-[#eee] px-4 text-[14px] outline-none focus:border-primary transition-colors" required suppressHydrationWarning />
              </div>
              <div className="w-full md:w-1/2 px-[10px] mb-4">
                <label className="block text-[14px] font-bold text-[#333] uppercase mb-2 font-sans text-left">Địa chỉ Email <span className="text-[#f74f2e]">*</span></label>
                <input type="email" className="w-full h-[45px] border border-[#eee] px-4 text-[14px] outline-none focus:border-primary transition-colors" required suppressHydrationWarning />
              </div>
            </div>
          </div>

          {/* Dynamic Order Summary */}
          <div className="w-full lg:w-1/3 px-[15px]">
            <div className="border-[2px] border-[#eee] p-[30px] bg-[#fdfdfd]">
              <h3 className="text-[20px] font-medium text-[#333] mb-[25px] font-sans uppercase text-left">Đơn hàng của bạn</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-4 border-b border-[#eee]">
                  <span className="text-[15px] font-bold text-[#333] uppercase font-sans">Sản phẩm</span>
                  <span className="text-[15px] font-bold text-[#333] uppercase font-sans">Tổng</span>
                </div>
                
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-start py-2">
                    <span className="text-[14px] text-[#777] font-sans text-left pr-4">{item.name} × {item.quantity}</span>
                    <span className="text-[14px] text-[#333] font-medium font-sans">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}

                {cartItems.length === 0 && <p className="text-[14px] text-[#777] font-sans py-4">Giỏ hàng trống.</p>}

                <div className="flex justify-between items-center py-4 border-t border-[#eee]">
                  <span className="text-[15px] font-bold text-[#333] uppercase font-sans">Tạm tính</span>
                  <span className="text-[15px] font-bold font-sans">{formatPrice(cartTotal)}</span>
                </div>

                <div className="flex justify-between items-center py-4 border-t border-[#eee]">
                    <span className="text-[15px] font-bold text-[#333] uppercase font-sans">Vận chuyển</span>
                    <span className="text-[14px] text-[#777] font-sans">Đồng giá: {formatPrice(10)}</span>
                </div>

                <div className="flex justify-between items-center py-4 border-t border-b border-[#eee]">
                  <span className="text-[18px] font-bold text-[#333] uppercase font-sans">Tổng cộng</span>
                  <span className="text-[18px] font-bold text-primary font-sans">{formatPrice(cartTotal + 10)}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="payment_methods space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <input type="radio" name="payment" id="bank" className="mt-1 accent-primary" defaultChecked suppressHydrationWarning />
                  <label htmlFor="bank" className="text-[14px] text-[#333] font-bold font-sans uppercase cursor-pointer">Chuyển khoản ngân hàng</label>
                </div>
                <p className="text-[13px] text-[#777] pl-6 mb-4 font-sans text-left">Thực hiện thanh toán trực tiếp vào tài khoản ngân hàng của chúng tôi. Vui lòng sử dụng Mã đơn hàng làm nội dung thanh toán. Đơn hàng sẽ được giao sau khi tiền đã chuyển vào tài khoản.</p>
                
                <div className="flex items-start space-x-3">
                  <input type="radio" name="payment" id="cod" className="mt-1 accent-primary" suppressHydrationWarning />
                  <label htmlFor="cod" className="text-[14px] text-[#333] font-bold font-sans uppercase cursor-pointer">Thanh toán khi nhận hàng (COD)</label>
                </div>

                <div className="flex items-start space-x-3">
                  <input type="radio" name="payment" id="paypal" className="mt-1 accent-primary" suppressHydrationWarning />
                  <label htmlFor="paypal" className="text-[14px] text-[#333] font-bold font-sans uppercase cursor-pointer">PayPal <img src="/images/payments.png" alt="paypal" className="inline ml-2 h-4" /></label>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full background-btn bg-primary text-white py-[15px] text-[15px] font-bold uppercase transition-all flex items-center justify-center font-sans tracking-widest ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-[#333]"}`}
                suppressHydrationWarning
              >
                {isSubmitting ? "Đang xử lý..." : "Đặt hàng ngay"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
