"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/features/shop/types/shop-types";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <div className="featured_content group relative mt-[40px]">
      <div className="featured_img_content relative overflow-hidden bg-white mb-5">
        {/* Main Image Section */}
        <div className="relative aspect-[270/340] w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority={priority}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>

        {/* Home Collection Style Hover - Heavy White Wipe UP */}
        <div className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-full bg-white/90 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-in-out z-10 pointer-events-none" />

        {/* Hover Actions Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 flex flex-col items-center justify-center">
          <div className="flex flex-col space-y-[11px] w-full items-center transform translate-y-4 group-hover:-translate-y-2 transition-transform duration-200">
            <Link 
              href="/cart"
              className="inline-flex items-center justify-center py-[4px] px-[28px] bg-[#f74f2e] text-white text-[14px] font-bold uppercase hover:bg-[#d12807] transition-all duration-200 text-center leading-normal"
            >
              Add To Bag <i className="flaticon-arrows ml-2 text-[12px]"></i>
            </Link>
            <button 
              suppressHydrationWarning 
              className="inline-flex items-center justify-center py-[4px] px-[28px] border border-[#f74f2e] text-[#f74f2e] text-[14px] font-bold uppercase bg-transparent hover:bg-[#f74f2e] hover:text-white transition-all duration-200 text-center leading-normal"
            >
              Quick View <i className="flaticon-arrows ml-2 text-[12px]"></i>
            </button>
          </div>
        </div>

        {/* Wishlist Heart */}
        <button 
          suppressHydrationWarning
          className="heart absolute bottom-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#333] hover:bg-[#f74f2e] hover:text-white transition-all duration-200 shadow-md z-20 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0"
        >
          <i className="flaticon-heart text-[16px]"></i>
        </button>
      </div>

      {/* Product Info Section */}
      <div className="featured_detail_content pt-[5px] text-center">
        <Link href={`/shop/${product.id}`}>
          <h5 className="featured_title text-[15px] text-[#333] mb-1 hover:text-[#f74f2e] transition-colors uppercase font-medium" style={{ fontFamily: "'Work Sans', sans-serif" }}>
            {product.name}
          </h5>
        </Link>
        <div className="featured_price text-[18px] font-bold text-[#333] mb-3" style={{ fontFamily: "'Work Sans', sans-serif" }}>
          {product.discount ? (
            <div className="flex items-center justify-center gap-2">
              <span className="text-[#999] line-through font-normal text-[14px]">${product.originalPrice?.toFixed(2)}</span>
              <span className="text-[#f74f2e]">${product.price.toFixed(2)}</span>
            </div>
          ) : (
            <span>${product.price.toFixed(2)}</span>
          )}
        </div>

        {/* Size Variants */}
        <div className="featured_variyant flex items-center justify-center gap-[5px] mt-[10px]">
          {product.sizes?.map((size) => (
            <div key={size} className="radio inline-block">
              <input type="radio" name={`size-${product.id}`} id={`size-${product.id}-${size}`} className="hidden peer" />
              <label 
                htmlFor={`size-${product.id}-${size}`} 
                className="flex items-center justify-center w-[25px] h-[28px] border border-[#aaa] text-[12px] text-[#333] uppercase cursor-pointer hover:border-[#f74f2e] hover:text-[#f74f2e] peer-checked:border-[#f74f2e] peer-checked:text-[#f74f2e] transition-all duration-200 p-0"
              >
                {size}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
