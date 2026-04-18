"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/core/providers/AuthProvider";

export function RegisterForm() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Thu thập dữ liệu form
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("FirstName") as string;
    const lastName = formData.get("LastName") as string;
    const email = formData.get("Email") as string;
    
    // Giả lập gọi API đăng ký
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    login(email, `${firstName} ${lastName}`);
    
    setIsLoading(false);
    setIsSuccess(true);
    
    // Tự động chuyển về trang home sau 2 giây
    setTimeout(() => {
        window.location.href = "/";
    }, 2000);
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-10 bg-[#f9f9f9] border border-[#eee]"
      >
        <div className="w-16 h-16 bg-[#f74f2e] rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="flaticon-arrows-1 text-white text-[24px]"></i>
        </div>
        <h3 className="text-[24px] font-normal text-[#333] mb-2 uppercase" style={{ fontFamily: "'Work Sans', sans-serif" }}>
          Registration Successful!
        </h3>
        <p className="text-[14px] text-[#777]">
          Thank you for joining Earthyellow. You are being redirected to the login page...
        </p>
      </motion.div>
    );
  }

  return (
    <div className="register_form lg:pr-[30px] lg:border-r border-[#eee]">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: "easeOut" }}
      >
        <h2 className="text-[30px] font-normal text-[#333] mb-6 uppercase" style={{ fontFamily: "'Work Sans', sans-serif" }}>
          Create Account
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-[16px]">
            <label htmlFor="first-name" className="block text-[14px] font-bold text-[#333] mb-[8px] uppercase tracking-wider font-sans">
              First Name <span className="text-[#f74f2e]">*</span>
            </label>
            <input 
              type="text" 
              id="first-name" 
              name="FirstName"
              className="w-full h-[50px] px-5 border border-[#eee] focus:border-[#f74f2e] outline-none transition-all duration-300 font-sans"
              required
              suppressHydrationWarning
            />
          </div>

          <div className="mb-[16px]">
            <label htmlFor="last-name" className="block text-[14px] font-bold text-[#333] mb-[8px] uppercase tracking-wider font-sans">
              Last Name <span className="text-[#f74f2e]">*</span>
            </label>
            <input 
              type="text" 
              id="last-name" 
              name="LastName"
              className="w-full h-[50px] px-5 border border-[#eee] focus:border-[#f74f2e] outline-none transition-all duration-300 font-sans"
              required
              suppressHydrationWarning
            />
          </div>

          <div className="mb-[16px]">
            <label htmlFor="reg-email" className="block text-[14px] font-bold text-[#333] mb-[8px] uppercase tracking-wider font-sans">
              Email Address <span className="text-[#f74f2e]">*</span>
            </label>
            <input 
              type="email" 
              id="reg-email" 
              name="Email"
              className="w-full h-[50px] px-5 border border-[#eee] focus:border-[#f74f2e] outline-none transition-all duration-300 font-sans"
              required
              suppressHydrationWarning
            />
          </div>
          
          <div className="mb-[16px]">
            <label htmlFor="reg-password" className="block text-[14px] font-bold text-[#333] mb-[8px] uppercase tracking-wider font-sans">
              Password <span className="text-[#f74f2e]">*</span>
            </label>
            <input 
              type="password" 
              id="reg-password" 
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
              {isLoading ? "Processing..." : "Register"}
            </button>
            <div className="flex items-center ml-[20px]">
              <p className="text-[14px] text-[#777] m-0 mr-4 font-sans italic">or</p>
              <Link href="/login" className="text-[14px] text-[#222] hover:text-[#f74f2e] transition-all font-sans font-medium border-b border-transparent hover:border-[#f74f2e]">
                Back to login
              </Link>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
