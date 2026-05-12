"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      bg: "bg-[#f4efe9]",
      kicker: "Phong Cách",
      title: "CÔNG SỞ NAM",
      desc: "Lịch lãm – Tinh tế – Đẳng cấp\nCùng bạn chinh phục mọi thành công",
      leftImg: "/images/safetino/M816_a.webp",
      rightImg: "/images/safetino/S840-04.jpg",
      type: "diagonal"
    },
    {
      id: 2,
      bg: "bg-[#e8ebed]",
      kicker: "Chuẩn Gu",
      title: "QUÝ ÔNG HIỆN ĐẠI",
      desc: "Trang phục công sở thời thượng\nTôn dáng – Tôn phong thái",
      leftImg: "/images/safetino/S843-16.jpg",
      polaroids: [
        "/images/safetino/M817_a.webp",
        "/images/safetino/M818_a.webp",
        "/images/safetino/M819_a.webp"
      ],
      type: "polaroid"
    },
    {
      id: 3,
      bg: "bg-[#efe8df]",
      kicker: "Nâng Tầm",
      title: "PHONG CÁCH",
      desc: "Bộ sưu tập công sở nam cao cấp\nChất liệu chọn lọc – Kiểu dáng tinh tế",
      leftImg: "/images/safetino/S847-04.jpg",
      rightImg: "/images/safetino/S849-15.jpg",
      type: "floating"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden bg-white">
      {/* 1. Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-black/5 z-[60]">
        <motion.div
          key={currentSlide}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 7, ease: "linear" }}
          className="h-full bg-[#f74f2e]"
        ></motion.div>
      </div>

      {/* 2. Slider Controls */}
      <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 z-50 flex items-center space-x-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-[10px] h-[10px] rounded-full transition-all duration-300 border border-[#333] ${
              i === currentSlide ? "bg-[#333] scale-150" : "bg-transparent hover:bg-[#333]/20"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 w-full h-full ${slides[currentSlide].bg}`}
        >
          {/* Slide 1: Diagonal Left */}
          {slides[currentSlide].type === "diagonal" && (
            <div className="absolute inset-0 flex flex-col md:flex-row">
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative w-full md:w-[45%] h-[40%] md:h-full z-10 hidden md:block"
                style={{ clipPath: "polygon(0 0, 100% 0, 75% 100%, 0% 100%)" }}
              >
                <Image src={slides[currentSlide].leftImg} alt="Hero" fill className="object-cover object-top" />
              </motion.div>
              
              <div className="absolute top-1/2 left-1/2 md:left-[45%] -translate-y-1/2 -translate-x-1/2 w-full md:w-max z-30 text-center px-4">
                <motion.h3 
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                  className="text-[24px] md:text-[32px] font-serif font-medium text-[#555] mb-2"
                >{slides[currentSlide].kicker}</motion.h3>
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                  className="text-[40px] md:text-[65px] font-bold text-[#222] font-serif mb-6 tracking-wide"
                >{slides[currentSlide].title}</motion.h2>
                <motion.div 
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}
                  className="w-[60px] h-[2px] bg-[#f74f2e] mx-auto mb-6"
                />
                <motion.p 
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.9 }}
                  className="text-[14px] md:text-[18px] text-[#555] mb-10 leading-relaxed whitespace-pre-line"
                >{slides[currentSlide].desc}</motion.p>
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.1 }}>
                  <Link href="/shop" className="inline-flex items-center px-[30px] py-[12px] border border-[#f74f2e] text-[#f74f2e] hover:bg-[#f74f2e] hover:text-white transition-all duration-300 font-bold text-[14px] uppercase tracking-wider bg-transparent">
                    MUA NGAY <span className="ml-2">→</span>
                  </Link>
                </motion.div>
              </div>

              <motion.div 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute right-0 top-0 w-full md:w-[45%] h-[40%] md:h-full opacity-30 md:opacity-100 mix-blend-multiply"
              >
                <Image src={slides[currentSlide].rightImg || ""} alt="Hero" fill className="object-contain p-10" />
              </motion.div>
            </div>
          )}

          {/* Slide 2: Polaroids */}
          {slides[currentSlide].type === "polaroid" && (
            <div className="absolute inset-0 flex flex-col md:flex-row items-center">
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute left-0 top-0 w-full md:w-[45%] h-full opacity-20 md:opacity-80 hidden md:block"
                style={{ clipPath: "polygon(0 0, 100% 0, 60% 100%, 0% 100%)" }}
              >
                <Image src={slides[currentSlide].leftImg} alt="Hero" fill className="object-cover mix-blend-multiply" />
              </motion.div>
              
              <div className="absolute top-1/2 left-1/2 md:left-[35%] -translate-x-1/2 md:-translate-x-0 -translate-y-1/2 w-full md:w-max z-30 text-center md:text-left px-4">
                <motion.h3 
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                  className="text-[24px] md:text-[32px] font-serif font-medium text-[#555] mb-2"
                >{slides[currentSlide].kicker}</motion.h3>
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                  className="text-[40px] md:text-[65px] font-bold text-[#222] font-serif mb-6 tracking-wide"
                >{slides[currentSlide].title}</motion.h2>
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: 60 }} transition={{ delay: 0.7, duration: 0.5 }}
                  className="h-[2px] bg-[#f74f2e] mb-6 mx-auto md:mx-0"
                />
                <motion.p 
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.9 }}
                  className="text-[14px] md:text-[18px] text-[#555] mb-10 leading-relaxed whitespace-pre-line"
                >{slides[currentSlide].desc}</motion.p>
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.1 }}>
                  <Link href="/shop" className="inline-flex items-center px-[30px] py-[12px] border border-[#f74f2e] text-[#f74f2e] hover:bg-[#f74f2e] hover:text-white transition-all duration-300 font-bold text-[14px] uppercase tracking-wider bg-transparent">
                    MUA NGAY <span className="ml-2">→</span>
                  </Link>
                </motion.div>
              </div>

              <div className="absolute right-[5%] top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-[45%] h-[80%] z-40">
                {slides[currentSlide].polaroids?.map((src, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ y: 50, opacity: 0, rotate: 0 }}
                    animate={{ y: 0, opacity: 1, rotate: idx === 0 ? -8 : idx === 1 ? 2 : 12 }}
                    transition={{ delay: 0.5 + idx * 0.2, type: "spring", stiffness: 100 }}
                    className="relative w-[220px] h-[300px] bg-white p-3 pb-12 shadow-2xl"
                    style={{ marginLeft: idx > 0 ? "-80px" : "0", zIndex: 30 - idx }}
                  >
                    <div className="relative w-full h-full bg-gray-100">
                      <Image src={src} alt="Polaroid" fill className="object-cover object-top" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Slide 3: Floating Flatlays */}
          {slides[currentSlide].type === "floating" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute left-0 bottom-0 w-full md:w-[40%] h-[50%] md:h-[90%] opacity-20 md:opacity-100 mix-blend-multiply hidden md:block"
              >
                <Image src={slides[currentSlide].leftImg} alt="Hero" fill className="object-contain object-bottom" />
              </motion.div>
              
              <div className="relative z-30 text-center w-full md:w-[40%] mx-auto px-4">
                <motion.h3 
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                  className="text-[24px] md:text-[32px] font-serif font-medium text-[#555] mb-2"
                >{slides[currentSlide].kicker}</motion.h3>
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                  className="text-[40px] md:text-[65px] font-bold text-[#222] font-serif mb-6 tracking-wide"
                >{slides[currentSlide].title}</motion.h2>
                <motion.div 
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.7, duration: 0.5 }}
                  className="w-[60px] h-[2px] bg-[#f74f2e] mx-auto mb-6 origin-center"
                />
                <motion.p 
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.9 }}
                  className="text-[14px] md:text-[18px] text-[#555] mb-10 leading-relaxed whitespace-pre-line"
                >{slides[currentSlide].desc}</motion.p>
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.1 }}>
                  <Link href="/shop" className="inline-flex items-center px-[30px] py-[12px] border border-[#f74f2e] text-[#f74f2e] hover:bg-[#f74f2e] hover:text-white transition-all duration-300 font-bold text-[14px] uppercase tracking-wider bg-transparent">
                    MUA NGAY <span className="ml-2">→</span>
                  </Link>
                </motion.div>
              </div>

              <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute right-0 md:right-[5%] top-0 md:top-1/2 md:-translate-y-1/2 w-[50%] md:w-[35%] h-[50%] md:h-[80%] opacity-30 md:opacity-100 mix-blend-multiply"
              >
                <Image src={slides[currentSlide].rightImg || ""} alt="Hero" fill className="object-contain" />
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
