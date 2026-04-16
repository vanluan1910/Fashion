"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const BRANDS = [
  { id: 1, image: "/images/brand_logo1.png" },
  { id: 2, image: "/images/brand_logo2.png" },
  { id: 3, image: "/images/brand_logo3.png" },
  { id: 4, image: "/images/brand_logo4.png" },
];

export function BrandLogos() {
  return (
    <section className="pt-[60px] pb-[60px] brand_logo_section bg-white overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-[15px]">
        {/* Title with fadeInDown animation */}
        <motion.h3 
          className="text-[30px] font-normal text-[#333] text-center mb-[50px] capitalize title_h3  home_title_h3"
          style={{ fontFamily: "'Work Sans', sans-serif" }}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: "easeOut" }}
        >
          As Seen In
        </motion.h3>
        
        <div className="flex flex-wrap items-center -mx-[15px]">
          {BRANDS.map((brand, index) => (
            <motion.div 
              key={brand.id} 
              className="col-3 w-1/4 px-[15px] align-self-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.3, delay: index * 0.1, ease: "easeOut" }}
            >
              <div className="brand_logo_img text-center">
                <img 
                  src={brand.image} 
                  alt="brand_logo" 
                  className="max-w-full h-auto inline-block" 
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
