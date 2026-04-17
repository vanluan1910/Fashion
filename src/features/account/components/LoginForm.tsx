"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export function LoginForm() {
  return (
    <div className="login_form lg:pr-[30px] lg:border-r border-[#eee]">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: "easeOut" }}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-[20px]">
            <label htmlFor="email" className="block text-[16px] font-medium text-[#333] mb-[12px] tracking-wider font-sans">
              Email
            </label>
            <input 
              type="email" 
              id="email" 
              name="Email"
              className="w-full h-[50px] px-5 border border-[#eee] focus:border-[#f74f2e] outline-none transition-all duration-300 font-sans"
              required
            />
          </div>
          
          <div className="mb-[20px]">
            <label htmlFor="password" className="block text-[16px] font-medium text-[#333] mb-[12px] tracking-wider font-sans">
              Password
            </label>
            <input 
              type="password" 
              id="password" 
              name="Password"
              className="w-full h-[50px] px-5 border border-[#eee] focus:border-[#f74f2e] outline-none transition-all duration-300 font-sans"
              required
            />
          </div>
          
          <div className="login_links mt-[20px] flex flex-wrap items-center">
            <button 
              type="submit" 
              className="background-btn h-[52px] px-[19px] bg-[#f74f2e] text-white text-[18px] font-normal uppercase hover:bg-transparent hover:text-[#f74f2e] hover:border-[#f74f2e] border border-transparent transition-all duration-300 flex items-center justify-center font-sans tracking-normal"
            >
              login
            </button>
            <p className="inline-block pl-[14px] text-[14px] text-[#333] m-0 mr-4 font-sans">or</p>
            <Link href="/shop" className="text-[14px] text-[#222] hover:text-[#f74f2e] transition-all font-sans mr-auto">
              Return to shop
            </Link>
            <Link href="#" className="text-[14px] text-[#222] hover:text-[#f74f2e] transition-all font-sans text-right w-full lg:w-[45%] lg:mt-[-2px] mt-4 lg:text-right text-left">
              <u>Forgot Password?</u>
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
          Create Account
        </h3>
        <p className="text-[16px] text-[#777] leading-relaxed max-w-[400px]">
          If you have not registered yet. Please{" "}
          <Link href="#" className="text-[#333] hover:text-[#f74f2e] transition-all underline underline-offset-4 font-normal">
            click here
          </Link>{" "}
          to create an account.
        </p>
      </motion.div>
    </div>
  );
}
