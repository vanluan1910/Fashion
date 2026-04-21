"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/core/providers/AuthProvider";
import { FaArrowRight, FaEnvelope, FaLock } from "react-icons/fa";

export function LoginForm() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("Email") as string;
    const password = formData.get("Password") as string;
    
    try {
      await login(email, password);
      window.location.href = "/";
    } catch (error: any) {
      alert(error.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại.");
      setIsLoading(false);
    }
  };

  return (
    <div className="login_form lg:pr-[60px] lg:border-r border-[#eee]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-[32px] font-normal text-[#333] mb-2 font-serif italic">Chào mừng trở lại</h2>
        <p className="text-[14px] text-[#888] mb-10 font-sans tracking-wide">Vui lòng đăng nhập để tiếp tục trải nghiệm cùng Atelier.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label htmlFor="email" className="block text-[11px] font-bold text-[#333] mb-2 uppercase tracking-[2px] font-sans">
              Địa chỉ Email <span className="text-[#f74f2e]">*</span>
            </label>
            <div className="relative">
              <input 
                type="email" 
                id="email" 
                name="Email"
                placeholder="email@example.com"
                className="w-full h-[55px] px-0 bg-transparent border-b border-[#eee] focus:border-primary outline-none transition-all duration-300 font-sans text-[15px] placeholder:text-gray-300"
                required
                suppressHydrationWarning
              />
              <FaEnvelope className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" />
            </div>
          </div>
          
          <div className="group">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="block text-[11px] font-bold text-[#333] uppercase tracking-[2px] font-sans">
                Mật khẩu <span className="text-[#f74f2e]">*</span>
              </label>
              <Link href="#" className="text-[11px] text-[#999] hover:text-[#f74f2e] transition-all uppercase tracking-wider">
                Quên mật khẩu?
              </Link>
            </div>
            <div className="relative">
              <input 
                type="password" 
                id="password" 
                name="Password"
                placeholder="••••••••"
                className="w-full h-[55px] px-0 bg-transparent border-b border-[#eee] focus:border-primary outline-none transition-all duration-300 font-sans text-[15px] placeholder:text-gray-300"
                required
                suppressHydrationWarning
              />
              <FaLock className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" />
            </div>
          </div>
          
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full h-[55px] bg-primary text-white text-[13px] font-bold uppercase transition-all duration-500 flex items-center justify-center font-sans tracking-[3px] scale-100 hover:bg-[#333] group relative overflow-hidden shadow-lg shadow-primary/20 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
              suppressHydrationWarning
            >
              <span className="relative z-10">{isLoading ? "Đang xử lý..." : "Đăng nhập tài khoản"}</span>
              {!isLoading && <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />}
            </button>
          </div>

          <div className="lg:hidden text-center mt-10 p-8 bg-[#fcfcff] border border-dashed border-[#eee]">
             <p className="text-[14px] text-[#888] mb-4 font-sans italic">Bạn chưa có tài khoản?</p>
             <Link href="/register" className="text-[12px] font-bold text-[#333] uppercase tracking-[2px] border-b border-[#333] pb-1 hover:text-[#f74f2e] hover:border-[#f74f2e] transition-all">
                Tạo tài khoản mới
             </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export function CreateAccountSection() {
  return (
    <div className="create_account lg:pl-[60px] flex flex-col justify-center h-full">
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <span className="text-[11px] font-bold text-[#f74f2e] uppercase tracking-[4px] mb-4 block">Gia nhập cộng đồng</span>
        <h3 className="text-[36px] font-normal text-[#333] mb-6 font-serif italic">
          Khám phá những đặc quyền dành riêng cho bạn
        </h3>
        <ul className="space-y-4 mb-10">
          {[
            "Nhận ưu đãi 15% cho đơn hàng đầu tiên",
            "Theo dõi trạng thái đơn hàng dễ dàng",
            "Lưu danh sách sản phẩm yêu thích",
            "Tích điểm đổi quà tặng độc quyền"
          ].map((item, i) => (
            <li key={i} className="flex items-center text-[14px] text-[#666] font-sans">
              <span className="w-1.5 h-1.5 bg-[#f74f2e] rounded-full mr-3"></span>
              {item}
            </li>
          ))}
        </ul>
        <Link 
          href="/register" 
          className="inline-flex h-[55px] px-[40px] bg-[#333] text-white text-[13px] font-bold uppercase items-center justify-center hover:bg-primary transition-all duration-500 font-sans tracking-[3px] shadow-lg shadow-black/5"
        >
          Đăng ký ngay <FaArrowRight className="ml-3 font-bold" />
        </Link>
      </motion.div>
    </div>
  );
}
