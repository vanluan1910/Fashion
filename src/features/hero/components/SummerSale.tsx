import React from "react";
import Link from "next/link";

export function SummerSale() {
  return (
    <section 
      className="summer_sale_area bg-cover bg-no-repeat bg-center w-full mt-[60px] mb-0 relative py-[60px]" 
      style={{ backgroundImage: 'url("/images/summer_img.jpg")' }}
    >
      <div className="max-w-[1170px] mx-auto px-[15px]">
        <div className="summer_collection_section text-center relative z-10">
          <h2 className="title_h2 text-[48px] font-semibold text-[#333] capitalize mb-[38px] font-sans tracking-normal">Giảm giá mùa hè</h2>
          <Link 
            href="/shop" 
            className="background-btn inline-block px-[35px] py-[15px] bg-[#f74f2e] text-white border border-transparent hover:bg-[#d12807] hover:border-[#d12807] transition-all duration-300 text-[14px] font-bold capitalize font-sans decoration-none tracking-widest"
          >
            MUA NGAY <i className="flaticon-arrows ml-[3px] text-[12px]"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
