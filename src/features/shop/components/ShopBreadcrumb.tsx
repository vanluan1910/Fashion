import React from "react";
import Link from "next/link";

export function ShopBreadcrumb() {
  return (
    <section className="bg-[#f9f9f9] border-t border-[#eee] py-[12px] mb-[10px]">
      <div className="max-w-[1170px] mx-auto px-[15px]">
        <nav aria-label="breadcrumb">
          <ol className="flex items-center space-x-2 text-[14px] mb-[4px] p-0 list-none bg-transparent">
            <li className="flex items-center">
              <Link href="/" className="text-[#f74f2e] hover:text-[#333] transition-colors">Trang chủ</Link>
              <span className="flaticon-arrows-4 ml-2 text-[15px] text-[#d5d5d5] leading-none"></span>
            </li>
            <li className="text-[#888888] capitalize ml-2">Cửa hàng</li>
          </ol>
        </nav>
        <h1 className="title_h1 text-[32px] font-normal capitalize text-[#333] font-sans m-0 leading-tight">Cửa hàng</h1>
      </div>
    </section>
  );
}
