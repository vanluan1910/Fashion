"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";


export function InstagramSection() {
  return (
    <section className="pt-[60px] instagram_section bg-white overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-[15px]">
        <div className="flex flex-wrap -mx-[15px] items-center">
          {/* Instagram Title - Col-md-4 with legacy styled box */}
          <motion.div
            className="w-full md:w-1/3 px-[15px] mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: "easeOut" }}
          >
            <div className="instagram_title">
              <i className="flaticon-instagram-logo"></i>
              <h3 className="title_h3 text-capitalize text-[30px] !leading-[43px]">Follow Us <br />On Instagram</h3>
              <p className="text-[15px] mt-2">#Safetino #MensFashion #Style #Luxury #CongSoNam</p>
            </div>
          </motion.div>

          {/* Instagram Slider Container - Col-md-8 */}
          <motion.div 
            className="w-full md:w-2/3 px-[15px]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, delay: 0.2, ease: "easeOut" }}
          >
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {["M816_a.webp", "M817_a.webp", "M818_a.webp", "M819_a.webp"].map((img, idx) => (
                <div key={idx} className="relative min-w-[200px] h-[250px] flex-shrink-0 group cursor-pointer overflow-hidden rounded-sm shadow-sm">
                  <Image 
                    src={`/images/safetino/${img}`} 
                    alt="Instagram" 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <i className="flaticon-instagram-logo text-white text-2xl"></i>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
