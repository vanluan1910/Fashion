import React from "react";
import { ShopSidebar } from "@/features/shop/components/ShopSidebar";
import { ProductGrid } from "@/features/shop/components/ProductGrid";
import Link from "next/link";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Map slug to display title
  const categoryTitles: Record<string, string> = {
    women: "Thời trang Nữ",
    men: "Thời trang Nam",
    accessories: "Phụ kiện",
  };

  const title = categoryTitles[slug] || slug;

  return (
    <div className="bg-white">
      {/* Category Breadcrumb */}
      <section className="bg-[#f9f9f9] border-t border-[#eee] py-[24px] mb-[60px]">
        <div className="max-w-[1170px] mx-auto px-[15px]">
          <nav aria-label="breadcrumb">
            <ol className="flex items-center space-x-2 text-[14px] mb-[4px] p-0 list-none bg-transparent">
              <li className="flex items-center">
                <Link href="/" className="text-[#f74f2e] hover:text-[#333] transition-colors">Trang chủ</Link>
                <span className="flaticon-arrows-4 ml-2 text-[15px] text-[#d5d5d5] leading-none"></span>
              </li>
              <li className="flex items-center">
                <Link href="/shop" className="text-[#f74f2e] hover:text-[#333] transition-colors">Cửa hàng</Link>
                <span className="flaticon-arrows-4 ml-2 text-[15px] text-[#d5d5d5] leading-none"></span>
              </li>
              <li className="text-[#888888] capitalize ml-2">{title}</li>
            </ol>
          </nav>
          <h1 className="title_h1 text-[32px] font-normal capitalize text-[#333] font-sans m-0 leading-tight">{title}</h1>
        </div>
      </section>

      <div className="max-w-[1170px] mx-auto px-[15px] pb-[100px]">
        <div className="flex flex-col lg:flex-row gap-[30px]">
          <aside className="w-full lg:w-[270px] flex-shrink-0">
            <ShopSidebar />
          </aside>

          <main className="flex-1">
            <ProductGrid category={slug} />
          </main>
        </div>
      </div>
    </div>
  );
}
