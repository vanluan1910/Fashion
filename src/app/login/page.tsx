import React from "react";
import { Metadata } from "next";
import { AccountBreadcrumb } from "@/features/account/components/AccountBreadcrumb";
import { LoginForm, CreateAccountSection } from "@/features/account/components/LoginForm";

export const metadata: Metadata = {
  title: "Đăng nhập | Atelier Fashion",
  description: "Trang đăng nhập an toàn cho cửa hàng thời trang cao cấp Atelier Fashion.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <AccountBreadcrumb title="đăng nhập" />
      
      <section className="py-[100px] relative overflow-hidden">
        {/* Subtle decorative background touches */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#f74f2e]/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 mt-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#333]/5 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4 mb-[100px]" />

        <div className="max-w-[1170px] mx-auto px-[15px] relative z-10">
          <div className="flex flex-wrap -mx-[15px] items-stretch">
            <div className="w-full lg:w-1/2 px-[15px] mb-[60px] lg:mb-0">
              <LoginForm />
            </div>
            <div className="w-full lg:w-1/2 px-[15px]">
              <CreateAccountSection />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
