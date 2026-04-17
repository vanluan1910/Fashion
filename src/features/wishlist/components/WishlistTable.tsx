"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface WishlistItem {
  id: number;
  image: string;
  title: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
}

const initialItems: WishlistItem[] = [
  {
    id: 1,
    image: "/images/blue_jacket_img.png",
    title: "Blue Jacket",
    price: 59.95,
    quantity: 1,
    size: "S",
    color: "Red",
  },
  {
    id: 2,
    image: "/images/f_product8.png",
    title: "Black Dotted Dress",
    price: 59.95,
    quantity: 1,
    size: "S",
    color: "Red",
  },
];

export function WishlistTable() {
  const [items, setItems] = useState<WishlistItem[]>(initialItems);

  const updateQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const MobileLabel = ({ text }: { text: string }) => (
    <span className="md:hidden w-1/2 inline-block align-middle text-[16px] font-medium text-[#333] uppercase font-sans text-left pr-[10px]">
      {text}
    </span>
  );

  return (
    <section className="wishlist_section py-[60px]">
      <div className="max-w-[1170px] mx-auto px-[15px]">
        <div className="cart_table">
          <div className="w-full">
            {/* Header */}
            <div className="hidden md:flex border-t border-b border-[#e0dcdc]">
              <div className="py-[13px] text-left text-[16px] font-medium text-[#333] uppercase font-sans w-[379px]">Product</div>
              <div className="py-[13px] text-left text-[16px] font-medium text-[#333] uppercase font-sans w-[191px]">Price</div>
              <div className="py-[13px] text-left text-[16px] font-medium text-[#333] uppercase font-sans w-[191px]">Quantity</div>
              <div className="py-[13px] text-left text-[16px] font-medium text-[#333] uppercase font-sans w-[258px]">Options</div>
              <div className="py-[13px] text-left text-[16px] font-medium text-[#333] uppercase font-sans w-[35px]"></div>
              <div className="py-[13px] text-right text-[16px] font-medium text-[#333] uppercase font-sans flex-1"></div>
            </div>

            {/* Body */}
            <div className="block md:table-row-group">
              {items.map((item) => (
                <motion.div 
                  key={item.id} 
                  className="block md:flex border-b border-[#eee] mb-[30px] md:mb-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Product Cell */}
                  <div className="py-[15px] md:py-[20px] px-0 align-middle block md:flex md:w-[379px] border-b border-[#eee] md:border-b-0">
                    <div className="flex items-center w-full">
                      <MobileLabel text="Product" />
                      <div className="flex items-center w-1/2 md:w-auto">
                        <div className="w-[60px] h-[60px] md:w-[120px] md:h-[120px] flex-shrink-0 mr-[10px] md:mr-[20px] bg-[#eee] flex items-center justify-center p-[5px]">
                          <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain mx-auto" />
                        </div>
                        <div className="product_details pl-[10px] md:pl-[20px]">
                          <Link href={`/products/${item.id}`}>
                            <h5 className="text-[14px] md:text-[16px] font-medium text-[#333] hover:text-[#f74f2e] transition-colors m-0 font-sans">{item.title}</h5>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price Cell */}
                  <div className="py-[15px] md:py-[20px] px-0 text-[16px] text-[#333] font-sans align-middle block md:flex md:items-center md:w-[191px] border-b border-[#eee] md:border-b-0">
                    <div className="flex items-center w-full">
                      <MobileLabel text="Price" />
                      <span className="w-1/2 md:w-auto text-left">${item.price.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Quantity Cell */}
                  <div className="py-[15px] md:py-[20px] px-0 align-middle block md:flex md:items-center md:w-[191px] border-b border-[#eee] md:border-b-0">
                    <div className="flex items-center w-full">
                      <MobileLabel text="Quantity" />
                      <div className="w-1/2 md:w-auto flex justify-start">
                        <div className="quantity_box inline-flex items-center border border-[#aaa] overflow-hidden">
                          <div className="qty_number flex items-center">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-[30px] md:w-[40px] h-[30px] md:h-[45px] bg-[#f9f9f9] flex items-center justify-center text-[14px] md:text-[16px] text-[#333] hover:text-[#f74f2e] transition-colors font-medium border-r border-[#aaa]"
                            >
                              -
                            </button>
                            <input 
                              type="text" 
                              value={item.quantity} 
                              readOnly 
                              className="w-[30px] md:w-[50px] h-[30px] md:h-[45px] text-center border-none outline-none text-[#333] text-[13px] md:text-[15px] bg-white font-sans" 
                            />
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-[30px] md:w-[40px] h-[30px] md:h-[45px] bg-[#f9f9f9] flex items-center justify-center text-[14px] md:text-[16px] text-[#333] hover:text-[#f74f2e] transition-colors font-medium border-l border-[#aaa]"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Options Cell */}
                  <div className="py-[15px] md:py-[20px] px-0 align-middle block md:flex md:items-center md:w-[258px] border-b border-[#eee] md:border-b-0">
                    <div className="flex items-center w-full">
                      <MobileLabel text="Options" />
                      <div className="wishlist_variant flex flex-col gap-[8px] md:gap-[10px] w-1/2 md:w-auto text-left">
                        <div className="flex items-center">
                          <label className="text-[12px] md:text-[14px] font-medium text-[#333] w-[40px] md:w-[50px] uppercase font-sans m-0">Size:</label>
                          <select className="border border-[#aaa] px-[8px] py-[3px] md:px-[10px] md:py-[5px] text-[12px] md:text-[14px] outline-none bg-white">
                            <option>{item.size}</option>
                          </select>
                        </div>
                        <div className="flex items-center">
                          <label className="text-[12px] md:text-[14px] font-medium text-[#333] w-[40px] md:w-[50px] uppercase font-sans m-0">Color:</label>
                          <select className="border border-[#aaa] px-[8px] py-[3px] md:px-[10px] md:py-[5px] text-[12px] md:text-[14px] outline-none bg-white">
                            <option>{item.color}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add To Bag Cell */}
                  <div className="py-[15px] md:py-[20px] px-0 align-middle block md:flex md:items-center md:w-[35px] border-b border-[#eee] md:border-b-0">
                    <div className="flex items-center w-full">
                      <MobileLabel text="Add To Bag" />
                      <div className="cart_bag flex items-center md:justify-center w-1/2 md:w-auto">
                        <Link href="/cart" className="text-[#333] hover:text-[#f74f2e] transition-all block">
                          <i className="flaticon-shopping-bag !text-[18px] md:!text-[23px] before:leading-none"></i>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Remove Cell */}
                  <div className="py-[15px] md:py-[20px] px-0 text-left md:text-right align-middle block md:flex md:items-center flex-1 border-bottom border-[#eee] md:border-b-0">
                    <div className="flex items-center w-full">
                      <MobileLabel text="Remove" />
                      <div className="remove_cart w-1/2 md:w-auto">
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-[#333] hover:text-[#f74f2e] transition-all block md:ml-auto"
                        >
                          <i className="flaticon-close !text-[10px] md:!text-[12px] before:mt-[-2px] before:inline-block before:align-top"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          {items.length === 0 && (
            <div className="py-[100px] text-center">
              <p className="text-[18px] text-[#777]">Your wishlist is currently empty.</p>
              <Link href="/shop" className="mt-4 inline-block background-btn px-[25px] py-[12px] bg-[#f74f2e] text-white uppercase text-[14px] font-bold">
                Return to Shop
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
