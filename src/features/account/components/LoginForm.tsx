"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/core/providers/AuthProvider";

export function LoginForm() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Giả lập login
    const formData = new FormData(e.currentTarget);
    const email = formData.get("Email") as string;
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    login(email, email.split('@')[0]); // Lấy phần trước @ làm tên tạm thời
    window.location.href = "/";
  };

  return (
    <div className="login_form lg:pr-[30px] lg:border-r border-[#eee]">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: "easeOut" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-[16px]">
            <label htmlFor="email" className="block text-[14px] font-bold text-[#333] mb-[8px] uppercase tracking-wider font-sans text-left">
              Địa chỉ Email <span className="text-[#f74f2e]">*</span>
            </label>
            <input 
              type="email" 
              id="email" 
              name="Email"
              className="w-full h-[50px] px-5 border border-[#eee] focus:border-[#f74f2e] outline-none transition-all duration-300 font-sans"
              required
              suppressHydrationWarning
            />
          </div>
          
          <div className="mb-[16px]">
            <label htmlFor="password" className="block text-[14px] font-bold text-[#333] mb-[8px] uppercase tracking-wider font-sans text-left">
              Mật khẩu <span className="text-[#f74f2e]">*</span>
            </label>
            <input 
              type="password" 
              id="password" 
              name="Password"
              className="w-full h-[50px] px-5 border border-[#eee] focus:border-[#f74f2e] outline-none transition-all duration-300 font-sans"
              required
              suppressHydrationWarning
            />
          </div>
          
          <div className="login_links mt-[25px] flex flex-wrap items-center gap-y-4">
            <button 
              type="submit" 
              disabled={isLoading}
              className={`background-btn h-[50px] px-[35px] bg-[#f74f2e] text-white text-[16px] font-bold uppercase transition-all duration-300 flex items-center justify-center font-sans tracking-widest ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#333]"}`}
              suppressHydrationWarning
            >
              {isLoading ? "Đang đăng nhập..." : "đăng nhập"}
            </button>
            <div className="flex items-center ml-[20px]">
              <p className="text-[14px] text-[#777] m-0 mr-4 font-sans italic">hoặc</p>
              <Link href="/shop" className="text-[14px] text-[#222] hover:text-[#f74f2e] transition-all font-sans font-medium border-b border-transparent hover:border-[#f74f2e]">
                Quay lại cửa hàng
              </Link>
            </div>
            <Link href="#" className="text-[13px] text-[#777] hover:text-[#f74f2e] transition-all font-sans text-right ml-auto">
              Quên mật khẩu?
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export function CreateAccountSection() {
  return (
    <div className="create_account lg:pl-[30px] flex flex-col items-center justify-center h-full">
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: "easeOut" }}
        className="text-center"
      >
        <h3 className="text-[30px] font-normal text-[#333] mb-4" style={{ fontFamily: "'Work Sans', sans-serif" }}>
          Tạo tài khoản mới
        </h3>
        <p className="text-[16px] text-[#777] leading-relaxed max-w-[400px]">
          Nếu bạn chưa có tài khoản, vui lòng{" "}
          <Link href="/register" className="text-[#333] hover:text-[#f74f2e] transition-all underline underline-offset-4 font-normal">
            nhấn vào đây
          </Link>{" "}
          để đăng ký thành viên mới.
        </p>
      </motion.div>
    </div>
  );
}
