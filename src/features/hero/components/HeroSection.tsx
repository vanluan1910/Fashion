"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
// In a real project, we would use Swiper or Framer Motion for the slider logic
// For this conversion, we'll create the structure for a premium slider

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  
  const slides = [
    {
      id: 1,
      image: "/images/banner_img.jpg",
      title: "Bộ Sưu Tập Mới",
      subtitle: "Khám phá những mẫu thiết kế mới nhất dành riêng cho bạn",
      link: "/shop",
    },
    {
      id: 2,
      image: "/images/Banner-2.jpg",
      title: "Phong Cách Sang Trọng",
      subtitle: "Nâng tầm gu thời trang đẳng cấp cùng Atelier",
      link: "/shop",
    },
    {
      id: 3,
      image: "/images/Banner-3.jpg",
      title: "Vẻ Đẹp Tự Nhiên",
      subtitle: "Thời trang bền vững và thân thiện với môi trường",
      link: "/shop",
    },
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden bg-background">
      {/* 1. Progress Bar under Header - Resets on slide change */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-black/5 z-[60]">
        <div 
          key={currentSlide}
          className="h-full bg-primary animate-progress origin-left"
        ></div>
      </div>

      {/* 2. Slider Controls (Simplified Dots in Corner) */}
      <div className="absolute bottom-[40px] right-[40px] z-50 flex items-center space-x-3 bg-white/10 backdrop-blur-sm p-3 rounded-full">
        {slides.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrentSlide(i)}
            className={`w-[10px] h-[10px] rounded-full transition-all duration-300 border border-white/50 ${i === currentSlide ? "bg-primary w-[25px]" : "bg-white hover:bg-primary/50"}`}
            aria-label={`Go to slide ${i + 1}`}
            suppressHydrationWarning
          ></button>
        ))}
      </div>

      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ${index === currentSlide ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"}`}
          >
            <div 
              className={`absolute inset-0 transition-transform duration-[6000ms] ease-linear ${index === currentSlide ? "scale-110" : "scale-100"}`}
              style={{ position: 'absolute', inset: 0 }}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="100vw"
                priority={index === 0}
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-transparent flex flex-col items-center justify-center text-center p-4">
              <h2 className={`text-[36px] md:text-[60px] font-semibold text-[#333] mb-4 font-sans capitalize transition-all duration-1000 delay-300 ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                {slide.title}
              </h2>
              <p className={`text-[18px] md:text-[24px] text-[#333] mb-10 max-w-2xl font-sans font-normal transition-all duration-1000 delay-500 ${index === currentSlide ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
                {slide.subtitle}
              </p>
              <div className={`transition-all duration-1000 delay-700 ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                <Link 
                  href={slide.link}
                  className="inline-flex items-center px-[40px] py-[15px] border-[1px] border-[#f74f2e] bg-transparent text-[#f74f2e] hover:!bg-[#f74f2e] hover:!text-white transition-all duration-300 text-[16px] font-bold font-sans capitalize tracking-widest rounded-none group z-20 cursor-pointer"
                >
                  MUA NGAY <i className="ml-3 flaticon-arrows vertical_middle transition-colors"></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
