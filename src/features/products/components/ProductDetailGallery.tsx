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
    <div className="flex flex-col md:flex-row gap-4 items-start">
      {/* Thumbnails */}
      <div className="order-2 md:order-1 flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar md:h-[480px] md:w-[100px] flex-shrink-0">
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`cursor-pointer border-2 transition-all p-1 flex-shrink-0 ${
              activeIndex === index ? "border-primary" : "border-gray-100 hover:border-gray-200"
            }`}
          >
            <div className="relative w-[80px] h-[80px] md:w-full md:h-[90px] bg-[#f9f9f9]">
              <Image 
                src={img.startsWith('http') || img.startsWith('/') || img.startsWith('data:') ? img : `/${img}`} 
                alt={`Thumbnail ${index + 1}`} 
                fill 
                className="object-contain p-1"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="order-1 md:order-2 w-full bg-[#f9f9f9] border border-gray-200 relative overflow-hidden h-[450px] md:h-[480px] rounded-sm flex items-center justify-center">
        {images && images.length > 0 && images[activeIndex] ? (
          <img
            src={images[activeIndex].startsWith('http') || images[activeIndex].startsWith('/') || images[activeIndex].startsWith('data:') ? images[activeIndex] : `/${images[activeIndex]}`}
            alt="Main product image"
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 italic">
            Không có ảnh
          </div>
        )}
      </div>
    </div>
  );
}
