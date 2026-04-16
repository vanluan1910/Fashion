"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
    oldPrice?: number;
  } | null;
}

export function QuickViewModal({ isOpen, onClose, product }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("color1");

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[9998] bg-[#333]/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            id="modalone"
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[98%] max-w-[1000px] bg-white z-[9999] overflow-hidden modal-content"
            initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
          >
            <a href="javascript:void(0);" onClick={(e) => { e.preventDefault(); onClose(); }} className="close_popup"><span>×</span></a>
            
            <div className="product_detail_section">
                <div className="container max-w-full lg:p-0">
                    <div className="row flex flex-wrap -mx-[15px] overflow-y-auto max-h-[90vh]">
                        <div className="col-lg-6 w-full lg:w-1/2 px-[15px] pt-[30px] lg:pt-[45px] pb-[30px] lg:pb-[45px]">
                            <div id="q_sync1" className="owl-carousel owl-theme mb-4">
                                <div className="item">
                                    <div className="product_img relative aspect-[470/560] w-full">
                                        <Image 
                                            src={product.image} 
                                            alt={product.title} 
                                            fill 
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            className="vertical_middle img-fluid object-contain" 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div id="q_sync2" className="owl-carousel owl-theme flex gap-2.5 px-4 lg:px-6">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="item">
                                        <div className="product_img relative w-[70px] h-[85px] border border-[#eee] cursor-pointer">
                                            <Image 
                                                src={product.image} 
                                                alt="thumb" 
                                                fill 
                                                sizes="70px"
                                                className="vertical_middle img-fluid object-cover" 
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-6 w-full lg:w-1/2 px-[15px] pt-[30px] lg:pt-[42px] lg:pr-[45px] lg:pb-0 lg:pl-0">
                            <div className="product_content">
                                <div className="product_title">
                                    <span className="product_price title_h4 text-[24px] font-bold text-[#333]"> ${product.price.toFixed(2)}</span>
                                    <span className="stock text-right float-right text-[14px] text-[#4CAF50] font-bold uppercase">In Stock</span>
                                    <p className="sku_text text-[12px] text-[#999] mt-2 mb-4">SKU: 01-2345678</p>
                                    <div className="star flex items-center gap-1">
                                        <img src="/images/star.png" className="img-fluid w-[14px]" alt="star" />
                                        <span className="text-[12px] text-[#777] ml-1">(1 Review)</span>
                                    </div>
                                </div>

                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="product_variant space-y-6 mt-6">
                                        <div className="form-group color_box">
                                            <label className="title_h5 text-capitalize block text-[14px] font-bold mb-4">Color</label>
                                            <div className="flex gap-3">
                                                {["color1", "color2", "color3", "color4"].map((c) => (
                                                    <div key={c} className="radio text-uppercase text-center relative">
                                                        <input 
                                                            type="radio" 
                                                            name="color" 
                                                            id={`modal-${c}`}
                                                            className="hidden peer"
                                                            checked={selectedColor === c}
                                                            onChange={() => setSelectedColor(c)}
                                                        />
                                                        <label htmlFor={`modal-${c}`} className={`${c} block w-[26px] h-[26px] rounded-full cursor-pointer border-[3px] border-white ring-1 ring-[#eee] peer-checked:ring-[#f74f2e]`}></label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="form-group size_box">
                                            <label className="title_h5 text-capitalize block text-[14px] font-bold mb-4">Size</label>
                                            <select className="form-control w-[150px] h-[45px] border border-[#eee] px-4 text-[14px] outline-none rounded-none appearance-none bg-[url('/images/arrow-down.svg')] bg-[length:12px] bg-[90%_center] bg-no-repeat transition-colors focus:border-[#f74f2e]">
                                                <option>XS</option>
                                                <option>S</option>
                                                <option>M</option>
                                                <option>L</option>
                                                <option>XL</option>
                                            </select>
                                        </div>
                                        <div className="form-group quantity_box">
                                            <label className="title_h5 text-capitalize block text-[14px] font-bold mb-4">Quantity</label>
                                            <div className="qty_number inline-block border border-[#eee]">
                                                <input 
                                                    type="text" 
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(parseInt(e.target.value.replace(/\D/g, "")) || 1)}
                                                    className="w-[60px] h-[45px] text-center text-[14px] outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product_btns mt-8 pt-6 border-t border-[#eee]">
                                        <div className="flex flex-wrap gap-4 items-center">
                                            <a href="#" className="wishlist_btn border-btn text-uppercase py-3 px-6 text-[13px] font-bold transition-all hover:bg-[#333] hover:text-white inline-block">add to wishlist </a>
                                            <a href="#" className="background-btn text-uppercase cart_btn py-3 px-8 text-[13px] font-bold bg-[#f74f2e] text-white hover:bg-[#d12807] transition-all inline-block">Add To Bag</a>
                                        </div>
                                        
                                        <div className="product_share mt-8">
                                            <p className="text-[12px] text-[#777] font-medium uppercase mb-4">Share the love</p>
                                            <ul className="social_icons flex gap-4 list-none p-0">
                                                <li className="text-center"><a href="#" className="text-[#333] hover:text-[#f74f2e] transition-colors"><i className="flaticon-facebook vertical_middle text-[18px]"></i></a></li>
                                                <li className="text-center"><a href="#" className="text-[#333] hover:text-[#f74f2e] transition-colors"><i className="flaticon-pinterest vertical_middle text-[18px]"></i></a></li>
                                                <li className="text-center"><a href="#" className="text-[#333] hover:text-[#f74f2e] transition-colors"><i className="flaticon-instagram-logo vertical_middle text-[18px]"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="info_text mt-6">
                                        <a href="#" className="text-[13px] text-[#f74f2e] font-bold uppercase border-b border-[#f74f2e] hover:border-transparent transition-all">View full info</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
