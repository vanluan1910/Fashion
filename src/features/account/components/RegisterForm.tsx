"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/core/providers/AuthProvider";
import { useSearchParams } from "next/navigation";
import { FaArrowRight, FaUser, FaEnvelope, FaLock, FaCheckCircle } from "react-icons/fa";

export function RegisterForm() {
  const { register } = useAuth();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("FirstName") as string;
    const lastName = formData.get("LastName") as string;
    const email = formData.get("Email") as string;
    const password = formData.get("Password") as string;
    
    try {
      await register({
        first_name: firstName,
        last_name: lastName,
        email,
        password
      });
      
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error: any) {
      setErrorMsg(error.message || "Đã xảy ra lỗi kết nối với máy chủ. Vui lòng kiểm tra lại.");
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-12 bg-white border border-[#eee] shadow-sm rounded-sm"
      >
        <div className="w-20 h-20 bg-[#f74f2e] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#f74f2e]/20">
          <FaCheckCircle className="text-white text-[32px]" />
        </div>
        <h3 className="text-[28px] font-normal text-[#333] mb-3 font-serif italic">
          Chào mừng thành viên mới!
        </h3>
        <p className="text-[15px] text-[#888] font-sans leading-relaxed mb-8">
          Tài khoản của bạn đã sẵn sàng.<br/>Nhấn vào nút bên dưới để bắt đầu khám phá Atelier.
        </p>
        <button 
          onClick={() => window.location.href = "/"}
          className="h-[50px] px-10 bg-[#333] text-white text-[12px] font-bold uppercase tracking-[2px] hover:bg-primary transition-all font-sans"
        >
          Đăng nhập ngay
        </button>
      </motion.div>
    );
  }

  return (
    <div className="register_form lg:pr-[60px] lg:border-r border-[#eee]">
      {/* Status Modal */}
      {errorMsg && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 max-w-md w-full shadow-2xl border border-[#eee]"
          >
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold">!</span>
            </div>
            <h3 className="text-[20px] font-serif italic mb-2">Thông báo</h3>
            <p className="text-[14px] text-[#666] font-sans mb-6 leading-relaxed">
              {errorMsg}
            </p>
            <button 
              onClick={() => setErrorMsg(null)}
              className="w-full h-[45px] bg-[#333] text-white text-[12px] font-bold uppercase tracking-[2px] hover:bg-primary transition-all"
            >
              Tôi đã hiểu
            </button>
          </motion.div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-[32px] font-normal text-[#333] mb-2 font-serif italic">Tạo tài khoản</h2>
        <p className="text-[14px] text-[#888] mb-10 font-sans tracking-wide">Trở thành một phần của thế giới thời trang quý phái Atelier.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="group">
              <label htmlFor="first-name" className="block text-[11px] font-bold text-[#333] mb-2 uppercase tracking-[2px] font-sans">
                Tên <span className="text-[#f74f2e]">*</span>
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  id="first-name" 
                  name="FirstName"
                  placeholder="Nhập tên"
                  className="w-full h-[55px] px-0 bg-transparent border-b border-[#eee] focus:border-primary outline-none transition-all duration-300 font-sans text-[15px] placeholder:text-gray-300"
                  required
                  suppressHydrationWarning
                />
                <FaUser size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" />
              </div>
            </div>

            <div className="group">
              <label htmlFor="last-name" className="block text-[11px] font-bold text-[#333] mb-2 uppercase tracking-[2px] font-sans">
                Họ <span className="text-[#f74f2e]">*</span>
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  id="last-name" 
                  name="LastName"
                  placeholder="Nhập họ"
                  className="w-full h-[55px] px-0 bg-transparent border-b border-[#eee] focus:border-primary outline-none transition-all duration-300 font-sans text-[15px] placeholder:text-gray-300"
                  required
                  suppressHydrationWarning
                />
                <FaUser size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" />
              </div>
            </div>
          </div>

          <div className="group">
            <label htmlFor="reg-email" className="block text-[11px] font-bold text-[#333] mb-2 uppercase tracking-[2px] font-sans">
              Địa chỉ Email <span className="text-[#f74f2e]">*</span>
            </label>
            <div className="relative">
              <input 
                type="email" 
                id="reg-email" 
                name="Email"
                defaultValue={initialEmail}
                placeholder="email@example.com"
                className="w-full h-[55px] px-0 bg-transparent border-b border-[#eee] focus:border-primary outline-none transition-all duration-300 font-sans text-[15px] placeholder:text-gray-300"
                required
                suppressHydrationWarning
              />
              <FaEnvelope size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" />
            </div>
          </div>
          
          <div className="group">
            <label htmlFor="reg-password" className="block text-[11px] font-bold text-[#333] mb-2 uppercase tracking-[2px] font-sans">
              Mật khẩu <span className="text-[#f74f2e]">*</span>
            </label>
            <div className="relative">
              <input 
                type="password" 
                id="reg-password" 
                name="Password"
                placeholder="••••••••"
                className="w-full h-[55px] px-0 bg-transparent border-b border-[#eee] focus:border-primary outline-none transition-all duration-300 font-sans text-[15px] placeholder:text-gray-300"
                required
                suppressHydrationWarning
              />
              <FaLock size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" />
            </div>
          </div>
          
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-6">
            <button 
              type="submit" 
              disabled={isLoading}
              className={`flex-1 h-[55px] bg-primary text-white text-[13px] font-bold uppercase transition-all duration-500 flex items-center justify-center font-sans tracking-[3px] hover:bg-[#333] group overflow-hidden shadow-lg shadow-primary/20 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
              suppressHydrationWarning
            >
              {isLoading ? "Đang xử lý..." : "Đăng ký thành viên"}
              {!isLoading && <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />}
            </button>
            <div className="flex items-center">
              <span className="text-[13px] text-[#888] mr-4 italic">Hoặc</span>
              <Link href="/login" className="text-[12px] text-[#333] font-bold uppercase tracking-[2px] border-b border-[#333] pb-1 hover:text-[#f74f2e] hover:border-[#f74f2e] transition-all">
                Đăng nhập
              </Link>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
