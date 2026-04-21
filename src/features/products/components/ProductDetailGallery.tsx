"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProductDetailGalleryProps {
  images: string[];
}

export function ProductDetailGallery({ images }: ProductDetailGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="order-2 md:order-1 flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar md:h-[560px] md:w-[100px] flex-shrink-0">
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`cursor-pointer border-2 transition-all p-1 flex-shrink-0 ${
              activeIndex === index ? "border-primary" : "border-gray-100 hover:border-gray-200"
            }`}
          >
            <div className="relative w-[80px] h-[80px] md:w-full md:h-[90px]">
              <Image 
                src={img.startsWith('http') || img.startsWith('/') || img.startsWith('data:') ? img : `/${img}`} 
                alt={`Thumbnail ${index + 1}`} 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="order-1 md:order-2 flex-grow bg-white border border-gray-100 relative group overflow-hidden h-[400px] md:h-[560px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <Image
              src={images[activeIndex].startsWith('http') || images[activeIndex].startsWith('/') || images[activeIndex].startsWith('data:') ? images[activeIndex] : `/${images[activeIndex]}`}
              alt="Main product image"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
