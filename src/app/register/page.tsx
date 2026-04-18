import React from "react";
import { Metadata } from "next";
import { AccountBreadcrumb } from "@/features/account/components/AccountBreadcrumb";
import { RegisterForm } from "@/features/account/components/RegisterForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register | Earthyellow",
  description: "Create your Earthyellow account for a personalized luxury shopping experience.",
};

export default function RegisterPage() {
  return (
    <main className="flex-grow bg-white">
      <AccountBreadcrumb title="register" />
      
      <section className="py-[50px]">
        <div className="max-w-[1170px] mx-auto px-[15px]">
          <div className="flex flex-wrap -mx-[15px] items-center">
            <div className="w-full lg:w-1/2 px-[15px] mb-[40px] lg:mb-0 lg:border-r border-[#aaa]">
              <RegisterForm />
            </div>
            <div className="w-full lg:w-1/2 px-[15px] text-center">
              <div className="p-8 bg-[#f9f9f9] border border-[#eee]">
                <h3 className="text-[24px] font-normal text-[#333] mb-4" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                  Already have an account?
                </h3>
                <p className="text-[14px] text-[#777] mb-6 leading-relaxed">
                  Log in to your account to manage your orders, address book and personal details.
                </p>
                <Link 
                  href="/login" 
                  className="inline-block px-[35px] py-[12px] border border-[#333] text-[#333] font-bold text-[14px] uppercase hover:bg-[#333] hover:text-white transition-all duration-300 tracking-widest"
                >
                  Log In Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
