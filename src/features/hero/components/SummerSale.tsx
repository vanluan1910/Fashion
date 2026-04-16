import React from "react";
import Link from "next/link";

export function SummerSale() {
  return (
    <section className="pt-[60px] bg-white overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-[15px]">
        <div 
          className="w-full bg-no-repeat bg-cover bg-center text-center"
          style={{ 
            backgroundImage: 'url("/images/summer_img.jpg")',
            paddingTop: '78px',
            paddingBottom: '97px'
          }}
        >
          <div className="px-4">
            <h2 className="text-[48px] font-semibold text-[#333] mb-[38px] capitalize leading-tight" style={{ fontFamily: "'Work Sans', sans-serif" }}>
              Summer Sale
            </h2>
            <Link 
              href="/shop"
              className="inline-flex items-center px-[35px] py-[15px] bg-[#f74f2e] text-white text-[16px] font-bold uppercase hover:bg-[#d12807] transition-all duration-300 rounded-none shadow-sm"
            >
              SHOP NOW <i className="flaticon-arrows ml-[3px] text-[18px]"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
