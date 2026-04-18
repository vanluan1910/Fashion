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
    <main className="min-h-screen bg-white">
      <AccountBreadcrumb title="đăng nhập" />
      
      <section className="py-[50px]">
        <div className="max-w-[1170px] mx-auto px-[15px]">
          <div className="flex flex-wrap -mx-[15px] items-center">
            <div className="w-full lg:w-1/2 px-[15px] mb-[40px] lg:mb-0 lg:border-r border-[#aaa]">
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
