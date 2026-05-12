import React from "react";
import Link from "next/link";
import Image from "next/image";

export function SummerSale() {
  return (
    <section className="relative w-full bg-[#f4efe9] mt-[30px] md:mt-[60px] overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-[15px] flex flex-col md:flex-row items-center">
        
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left z-10 py-[40px] md:py-[50px]">
          <span className="text-[#f74f2e] font-bold tracking-[3px] uppercase text-[12px] mb-2 block">
            Ưu đãi đặc biệt
          </span>
          <h2 className="text-[32px] md:text-[42px] font-serif font-bold text-[#222] leading-tight mb-4">
            GIẢM GIÁ <br /> MÙA HÈ
          </h2>
          <p className="text-[14px] text-[#555] mb-6 max-w-[350px] mx-auto md:mx-0">
            Nâng tầm phong cách công sở với những thiết kế mới nhất từ Safetino.
          </p>
          <Link 
            href="/shop?sale=true" 
            className="inline-block px-[35px] py-[12px] bg-[#222] text-white hover:bg-[#f74f2e] transition-all duration-300 text-[13px] font-bold uppercase tracking-widest shadow-md"
          >
            Khám phá ngay
          </Link>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 relative h-[300px] md:h-[380px] flex items-end justify-center md:justify-end">
          <div className="absolute right-0 bottom-0 w-[60%] h-[70%] bg-white/40 -z-0 rounded-tl-[80px]"></div>
          <div className="relative w-full h-full">
            <Image 
              src="/images/safetino/S848-19.jpg" 
              alt="Summer Sale" 
              fill 
              className="object-contain object-bottom z-10 drop-shadow-xl"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
