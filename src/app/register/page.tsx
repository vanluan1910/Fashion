import React, { Suspense } from "react";
import { Metadata } from "next";
import { AccountBreadcrumb } from "@/features/account/components/AccountBreadcrumb";
import { RegisterForm } from "@/features/account/components/RegisterForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Đăng ký | Atelier Fashion",
  description: "Tạo tài khoản Atelier Fashion để trải nghiệm mua sắm thời trang cao cấp cá nhân hóa.",
};

export default function RegisterPage() {
  return (
    <main className="flex-grow bg-white">
      <AccountBreadcrumb title="đăng ký" />
      
      <section className="py-[100px] relative overflow-hidden">
        {/* Subtle decorative background touches */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#f74f2e]/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 mt-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#333]/5 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4 mb-[100px]" />

        <div className="max-w-[1170px] mx-auto px-[15px] relative z-10">
          <div className="flex flex-wrap -mx-[15px] items-stretch">
            <div className="w-full lg:w-7/12 px-[15px] mb-[60px] lg:mb-0">
              <Suspense fallback={<div className="h-[400px] flex items-center justify-center font-serif italic text-gray-400">Đang khởi tạo Atelier...</div>}>
                <RegisterForm />
              </Suspense>
            </div>
            <div className="w-full lg:w-5/12 px-[15px] flex">
              <div className="p-10 lg:p-14 bg-[#fcfcff] border border-[#eee] flex flex-col justify-center text-center w-full shadow-sm">
                <span className="text-[11px] font-bold text-[#f74f2e] uppercase tracking-[4px] mb-4 block">Thành viên cũ</span>
                <h3 className="text-[32px] font-normal text-[#333] mb-6 font-serif italic">
                  Bạn đã có tài khoản?
                </h3>
                <p className="text-[15px] text-[#888] mb-10 leading-relaxed font-sans">
                  Đăng nhập vào tài khoản của bạn để quản lý đơn hàng, địa chỉ và thông tin cá nhân dành riêng cho thành viên.
                </p>
                <div className="flex justify-center">
                  <Link 
                    href="/login" 
                    className="inline-flex h-[55px] px-[45px] bg-transparent border border-[#333] text-[#333] font-bold text-[13px] uppercase items-center justify-center hover:bg-[#333] hover:text-white transition-all duration-500 tracking-[3px] font-sans"
                  >
                    Đăng nhập ngay
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
