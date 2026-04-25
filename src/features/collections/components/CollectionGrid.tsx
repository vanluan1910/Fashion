import React from "react";
import Image from "next/image";
import Link from "next/link";

const COLLECTIONS = [
  { id: 1, title: "Thời trang Nữ", image: "/images/women.png", link: "/shop?category=Nữ" },
  { id: 2, title: "Thời trang Nam", image: "/images/men.png", link: "/shop?category=Nam" },
  { id: 3, title: "Phụ kiện cao cấp", image: "/images/products.png", link: "/shop?category=Phụ kiện" },
];

export function CollectionGrid() {
  return (
    <section className="pt-[30px] md:pt-[60px] bg-white overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-[15px]">
        <div className="flex flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-[15px] no-scrollbar">
          {COLLECTIONS.map((item) => (
            <div key={item.id} className="w-[85%] md:w-1/3 flex-shrink-0 md:flex-shrink px-4 mb-8 md:mb-0 snap-center">
              <Link 
                href={item.link}
                className="group relative block w-full overflow-hidden text-center home_collection_content"
              >
                {/* Main Category Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  width={370}
                  height={450}
                  className="w-full h-auto object-cover"
                />
                
                {/* White Overlay - Slides up on hover */}
                <div className="absolute inset-0 bg-white/90 translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out z-10"></div>
                
                {/* Category Label - Fades in and moves on hover */}
                <span className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 text-[#333] text-[24px] lg:text-[30px] font-semibold capitalize tracking-wider opacity-0 group-hover:opacity-100 group-hover:top-1/2 transition-all duration-300 z-20 whitespace-nowrap">
                  {item.title}
                  <i className="flaticon-arrows ml-1 text-[20px] align-middle"></i>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
