"use client";

import React from "react";
import { WishlistTable } from "@/features/wishlist/components/WishlistTable";

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Wishlist Header/Breadcrumb */}
      <section className="bg-[#f9f9f9] border-t border-[#eee] py-[24px] mb-[60px]">
        <div className="max-w-[1170px] mx-auto px-[15px]">
          <nav aria-label="breadcrumb">
            <ol className="flex items-center space-x-2 text-[14px] mb-[4px] p-0 list-none bg-transparent font-sans">
              <li className="flex items-center">
                <a href="/" className="text-[#f74f2e] hover:text-[#333] transition-colors">Trang chủ</a>
                <span className="flaticon-arrows-4 ml-2 text-[15px] text-[#d5d5d5] leading-none"></span>
              </li>
              <li className="text-[#888888] capitalize ml-2">Yêu thích</li>
            </ol>
          </nav>
          <h1 className="text-[32px] font-normal capitalize text-[#333] font-sans m-0 leading-tight">Danh sách yêu thích của tôi</h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-[1170px] mx-auto px-[15px] pb-[100px]">
        <WishlistTable />
      </main>
    </div>
  );
}
