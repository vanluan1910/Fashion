"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/core/providers/CartProvider";
import { useWishlist } from "@/core/providers/WishlistProvider";

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
    oldPrice?: number;
    colors?: string[];
  } | null;
}

export function QuickViewModal({ isOpen, onClose, product }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("M");

  useEffect(() => {
    if (product?.colors?.length) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor
    });
  };

  const handleAddToWishlist = () => {
    if (!product) return;
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image
      });
    }
  };

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
            className="fixed top-1/2 left-1/2 w-[95%] sm:w-[90%] max-w-[1000px] max-h-[90vh] bg-white z-[9999] overflow-hidden overflow-y-auto modal-content"
            initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <a href="javascript:void(0);" onClick={(e) => { e.preventDefault(); onClose(); }} className="close_popup"><span>×</span></a>
            
            <div className="product_detail_section">
                <div className="container max-w-full lg:p-0">
                    <div className="row flex flex-wrap -mx-[15px] overflow-y-auto max-h-[90vh]">
                        <div className="col-lg-6 w-full lg:w-1/2 px-[15px] pt-[30px] lg:pt-[45px] pb-[30px] lg:pb-[45px]">
                            <div id="q_sync1" className="owl-carousel owl-theme mb-4">
                                <div className="item">
                                    <div className="product_img relative w-full" style={{ aspectRatio: '470/560' }}>
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
                            <div className="product_content px-4 lg:px-0">
                                <div className="product_title">
                                    <h2 className="text-[20px] font-medium text-[#333] mb-2">{product.title}</h2>
                                    <span className="product_price title_h4 text-[24px] font-bold text-[#f74f2e]"> ${product.price.toFixed(2)}</span>
                                    <span className="stock text-right float-right text-[14px] text-[#4CAF50] font-bold">Còn hàng</span>
                                    <p className="sku_text text-[12px] text-[#999] mt-2 mb-4">SKU: 01-2345678</p>
                                    <div className="star flex items-center gap-1">
                                        <span className="text-yellow-500 text-[14px]">★★★★★</span>
                                        <span className="text-[12px] text-[#777] ml-1">(1 Nhận xét)</span>
                                    </div>
                                </div>

                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="product_variant space-y-6 mt-6">
                                        <div className="form-group color_box">
                                            <label className="title_h5 text-capitalize block text-[14px] font-bold mb-4">Màu sắc</label>
                                            <div className="flex gap-3">
                                                {(product.colors || ["#333", "#f74f2e", "#eee"]).map((c) => (
                                                    <div key={c} className="radio text-uppercase text-center relative">
                                                        <input 
                                                            type="radio" 
                                                            name="color" 
                                                            id={`modal-${c}`}
                                                            className="hidden peer"
                                                            checked={selectedColor === c}
                                                            onChange={() => setSelectedColor(c)}
                                                        />
                                                        <label 
                                                            htmlFor={`modal-${c}`} 
                                                            className="block w-[26px] h-[26px] rounded-full cursor-pointer border-[3px] border-white ring-1 ring-[#eee] peer-checked:ring-[#f74f2e]"
                                                            style={{ backgroundColor: c }}
                                                        ></label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="form-group size_box">
                                            <label className="title_h5 text-capitalize block text-[14px] font-bold mb-4">Kích thước</label>
                                            <select 
                                                value={selectedSize}
                                                onChange={(e) => setSelectedSize(e.target.value)}
                                                className="form-control w-[150px] h-[45px] border border-[#eee] px-4 text-[14px] outline-none rounded-none appearance-none bg-[url('/images/arrow-down.svg')] bg-[length:12px] bg-[90%_center] bg-no-repeat transition-colors focus:border-[#f74f2e]"
                                                suppressHydrationWarning
                                            >
                                                <option value="XS">XS</option>
                                                <option value="S">S</option>
                                                <option value="M">M</option>
                                                <option value="L">L</option>
                                                <option value="XL">XL</option>
                                            </select>
                                        </div>
                                        <div className="form-group quantity_box">
                                            <label className="title_h5 text-capitalize block text-[14px] font-bold mb-4">Số lượng</label>
                                            <div className="qty_number inline-block border border-[#eee]">
                                                <input 
                                                    type="text" 
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(parseInt(e.target.value.replace(/\D/g, "")) || 1)}
                                                    className="w-[60px] h-[45px] text-center text-[14px] outline-none font-bold"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product_btns mt-8 pt-6 border-t border-[#eee]">
                                        <div className="flex flex-wrap gap-4 items-center">
                                            <button 
                                                type="button"
                                                onClick={handleAddToWishlist}
                                                className={`wishlist_btn w-[45px] h-[45px] rounded-full flex items-center justify-center transition-all border ${
                                                    isInWishlist(product.id) ? "bg-[#f74f2e] text-white border-[#f74f2e]" : "hover:bg-[#f3f4f9] hover:text-[#f74f2e] border-[#eee] text-[#333]"
                                                }`} 
                                                title={isInWishlist(product.id) ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                                                suppressHydrationWarning
                                            >
                                                <i className="flaticon-heart text-[18px]"></i>
                                            </button>
                                            <button 
                                                type="button"
                                                onClick={handleAddToCart}
                                                className="background-btn capitalize cart_btn py-3 px-8 text-[13px] font-bold bg-[#f74f2e] text-white hover:bg-[#d12807] transition-all inline-block" 
                                                suppressHydrationWarning
                                            >
                                                Thêm vào giỏ
                                            </button>
                                        </div>
                                        
                                        <div className="product_share mt-8">
                                            <p className="text-[12px] text-[#777] font-medium mb-4">Chia sẻ</p>
                                            <ul className="social_icons flex gap-4 list-none p-0">
                                                <li className="text-center"><a href="#" className="text-[#333] hover:text-[#f74f2e] transition-colors"><i className="flaticon-facebook vertical_middle text-[18px]"></i></a></li>
                                                <li className="text-center"><a href="#" className="text-[#333] hover:text-[#f74f2e] transition-colors"><i className="flaticon-pinterest vertical_middle text-[18px]"></i></a></li>
                                                <li className="text-center"><a href="#" className="text-[#333] hover:text-[#f74f2e] transition-colors"><i className="flaticon-instagram-logo vertical_middle text-[18px]"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="info_text mt-6">
                                        <Link 
                                            href={`/product/${product.id}`} 
                                            onClick={onClose}
                                            className="text-[13px] text-[#f74f2e] font-bold capitalize border-b border-[#f74f2e] hover:border-transparent transition-all"
                                        >
                                            Xem chi tiết
                                        </Link>
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
