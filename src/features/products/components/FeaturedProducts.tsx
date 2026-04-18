"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  isNew?: boolean;
  isSale?: boolean;
  isSoldOut?: boolean;
  oldPrice?: number;
  sizes?: string[];
}

const SAMPLE_PRODUCTS: Product[] = [
  { id: 1, title: "Silk Dress", price: 59.95, image: "/images/f_product1.png", sizes: ["xs", "s", "m", "l", "xl"] },
  { id: 2, title: "Premium Party Suit", price: 79.95, image: "/images/f_product2.png", sizes: ["s", "m", "l"] },
  { id: 3, title: "Silk Party Dress", price: 99.95, image: "/images/f_product3.png", isNew: true, sizes: ["l"] },
  { id: 4, title: "Jeans Pant", price: 39.95, image: "/images/f_product4.png", isSale: true, sizes: ["m"] },
  { id: 5, title: "Man T-Shirt", price: 19.95, image: "/images/f_product5.png", isNew: true, sizes: ["m", "l"] },
  { id: 6, title: "Flower Floral Dupioni Dress", price: 79.95, image: "/images/f_product6.png", isSoldOut: true },
  { id: 7, title: "Check Shirt", price: 29.95, image: "/images/f_product7.png", isSale: true, oldPrice: 39.95, sizes: ["m"] },
  { id: 8, title: "Black Dotted Dress", price: 29.95, image: "/images/f_product8.png", sizes: ["l"] },
];

import { QuickViewModal } from "./QuickViewModal";

export function FeaturedProducts({ title }: { title: string }) {
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <section className="pt-[60px] bg-white overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-[15px]">
        <h3 className="text-[30px] font-normal text-[#333] text-center mb-[40px] capitalize" style={{ fontFamily: "'Work Sans', sans-serif" }}>
          {title}
        </h3>
        
        <div className="flex flex-wrap -mx-[15px]">
          {SAMPLE_PRODUCTS.map((product, index) => {
            // Logic to replicate wow fadeInLeft (first 4) and fadeInRight (next 4)
            const isSlideFromLeft = index < 4;
            const delay = (index % 4) * 0.2;

            return (
              <motion.div 
                key={product.id} 
                className="w-1/2 md:w-1/3 lg:w-1/4 px-[15px] mb-[40px]"
                initial={{ opacity: 0, x: isSlideFromLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.3, delay: delay, ease: "easeOut" }}
              >
                <div className="group flex flex-col featured_content">
                  {/* Image Section with Hover Actions */}
                  <div className="relative overflow-hidden mb-5 featured_img_content">
                    <div className="relative w-full featured_img_box" style={{ aspectRatio: '270/340' }}>
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Labels */}
                    {product.isNew && (
                      <div className="absolute top-0 left-0 bg-[#333] text-white text-[12px] font-bold px-3 py-1 capitalize z-20">
                        Mới<span className="absolute -bottom-1 left-1 w-2 h-2 bg-[#333] rotate-45 transform"></span>
                      </div>
                    )}
                    {product.isSale && (
                      <div className="absolute top-0 left-0 bg-[#f74f2e] text-white text-[12px] font-bold px-3 py-1 capitalize z-20">
                        Giảm giá<span className="absolute -bottom-1 left-1 w-2 h-2 bg-[#f74f2e] rotate-45 transform"></span>
                      </div>
                    )}

                    {/* Home Collection Style Hover - Heavy White Wipe UP */}
                    <div className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-full bg-white/90 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-in-out z-10 pointer-events-none" />

                    {/* Hover Buttons Overlay - Centered with Slide Up */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 flex flex-col items-center justify-center">
                      {!product.isSoldOut ? (
                        <div className="flex flex-col space-y-[11px] w-full items-center transform translate-y-4 group-hover:-translate-y-2 transition-transform duration-200">
                          <Link 
                            href="/cart"
                            className="inline-flex items-center justify-center py-[4px] px-[28px] bg-[#f74f2e] text-white text-[14px] font-bold capitalize hover:bg-[#d12807] transition-all duration-200 text-center leading-normal"
                          >
                            Thêm vào giỏ <i className="flaticon-arrows ml-2 text-[12px]"></i>
                          </Link>
                          <button 
                            onClick={() => handleQuickView(product)}
                            className="inline-flex items-center justify-center py-[4px] px-[28px] border border-[#f74f2e] text-[#f74f2e] text-[14px] font-bold capitalize bg-transparent hover:bg-[#f74f2e] hover:text-white transition-all duration-200 text-center leading-normal"
                            suppressHydrationWarning
                          >
                            Xem nhanh <i className="flaticon-arrows ml-2 text-[12px]"></i>
                          </button>
                        </div>
                      ) : (
                        <span className="inline-table py-[4px] px-[28px] bg-[#333] text-white text-[14px] font-bold capitalize text-center transform translate-y-4 group-hover:-translate-y-2 transition-transform duration-200">
                          Hết hàng
                        </span>
                      )}
                    </div>

                    {/* Wishlist Heart - Snappy 0.2s Transition */}
                    <button 
                      className="absolute bottom-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#333] hover:bg-[#f74f2e] hover:text-white transition-all duration-200 shadow-md z-20 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0"
                      suppressHydrationWarning
                    >
                      <i className="flaticon-heart text-[16px]"></i>
                    </button>
                  </div>

                  {/* Details Section */}
                  <div className="text-center featured_detail_content">
                    <Link href={`/product/${product.id}`} className="block mb-1">
                      <span className="block text-[15px] text-[#333] hover:text-[#f74f2e] transition-colors capitalize font-medium" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                        {product.title}
                      </span>
                    </Link>
                    <p className="text-[18px] font-bold text-[#333] mb-3" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                      {product.oldPrice && (
                        <span className="text-[#999] line-through mr-2 font-normal text-[14px]">${product.oldPrice.toFixed(2)}</span>
                      )}
                      <span>${product.price.toFixed(2)}</span>
                    </p>
                    
                    {/* Size Variants - Boxed Style */}
                    {product.sizes && (
                      <div className="flex justify-center items-center gap-[5px] featured_variyant">
                        {product.sizes.map((size) => (
                          <div key={size} className="radio inline-block">
                            <input 
                              type="radio" 
                              name={`size-${product.id}`} 
                              id={`size-${product.id}-${size}`}
                              className="hidden peer"
                            />
                            <label 
                              htmlFor={`size-${product.id}-${size}`}
                              className="flex items-center justify-center w-[25px] h-[28px] border border-[#aaa] text-[12px] text-[#333] uppercase cursor-pointer hover:border-[#f74f2e] hover:text-[#f74f2e] peer-checked:border-[#f74f2e] peer-checked:text-[#f74f2e] transition-all duration-200"
                            >
                              {size}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Quick View Modal Hook */}
        <QuickViewModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProduct}
        />
      </div>
    </section>
  );
}
