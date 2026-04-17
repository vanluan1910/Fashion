"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface CartItem {
  id: number;
  image: string;
  title: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
}

const initialItems: CartItem[] = [
  {
    id: 1,
    image: "/images/blue_jacket_img.png",
    title: "Blue Jacket",
    price: 59.95,
    quantity: 1,
    color: "Blue",
    size: "XL",
  },
];

export function CartTable() {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [notes, setNotes] = useState("");

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

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const MobileLabel = ({ text }: { text: string }) => (
    <span className="md:hidden w-1/2 inline-block align-middle text-[16px] font-medium text-[#333] uppercase font-sans text-left pr-[10px]">
      {text}
    </span>
  );

  return (
    <div className="login_form">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="cart_table">
          <div className="w-full">
            {/* Header */}
            <div className="hidden md:flex border-t border-b border-[#e0dcdc]">
              <div className="py-[13px] text-left text-[16px] font-medium text-[#333] font-sans w-[570px]">Product</div>
              <div className="py-[13px] text-left text-[16px] font-medium text-[#333] font-sans w-[191px]">Price</div>
              <div className="py-[13px] text-left text-[16px] font-medium text-[#333] font-sans w-[190px]">Quantity</div>
              <div className="py-[13px] text-left text-[16px] font-medium text-[#333] font-sans w-[148px]">Total</div>
              <div className="py-[13px] text-right text-[16px] font-medium text-[#333] font-sans flex-1"></div>
            </div>

            {/* Body */}
            <div className="block md:table-row-group">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div 
                    key={item.id} 
                    layout
                    className="block md:flex border-b border-[#eee] mb-[30px] md:mb-0 overflow-hidden"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Product Cell */}
                    <div className="py-[15px] md:py-[20px] px-0 align-middle block md:flex md:w-[570px] border-b border-[#eee] md:border-b-0">
                      <div className="flex items-center w-full">
                        <MobileLabel text="Product" />
                        <div className="flex items-center w-1/2 md:w-auto">
                          <div className="w-[60px] h-[60px] md:w-[120px] md:h-[120px] flex-shrink-0 mr-[10px] md:mr-[20px] bg-[#eee] flex items-center justify-center p-[5px]">
                            <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain mx-auto" />
                          </div>
                          <div className="product_details pl-[10px] md:pl-[20px]">
                            <Link href={`/products/${item.id}`}>
                              <h5 className="text-[14px] md:text-[16px] font-medium text-[#333] hover:text-primary transition-colors m-0 font-sans leading-tight">{item.title}</h5>
                            </Link>
                            <div className="product_variant mt-[5px]">
                              <p className="text-[14px] text-[#777] m-0 leading-normal font-sans">Color: {item.color}</p>
                              <p className="text-[14px] text-[#777] m-0 leading-normal font-sans">Size: {item.size}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price Cell */}
                    <div className="py-[15px] md:py-[20px] px-0 text-[15px] md:text-[16px] text-[#333] font-sans align-middle block md:flex md:items-center md:w-[191px] border-b border-[#eee] md:border-b-0">
                      <div className="flex items-center w-full">
                        <MobileLabel text="Price" />
                        <span className="w-1/2 md:w-auto text-left font-normal">${item.price.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Quantity Cell */}
                    <div className="py-[15px] md:py-[20px] px-0 align-middle block md:flex md:items-center md:w-[190px] border-b border-[#eee] md:border-b-0">
                      <div className="flex items-center w-full">
                        <MobileLabel text="Quantity" />
                        <div className="w-1/2 md:w-auto flex justify-start">
                          <div className="quantity_box inline-flex items-center border border-[#aaa] overflow-hidden">
                            <div className="qty_number flex items-center">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-[30px] md:w-[40px] h-[30px] md:h-[45px] bg-[#f9f9f9] flex items-center justify-center text-[14px] md:text-[16px] text-[#333] hover:text-primary transition-colors font-medium border-r border-[#aaa]"
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
                                className="w-[30px] md:w-[40px] h-[30px] md:h-[45px] bg-[#f9f9f9] flex items-center justify-center text-[14px] md:text-[16px] text-[#333] hover:text-primary transition-colors font-medium border-l border-[#aaa]"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Total Cell */}
                    <div className="py-[15px] md:py-[20px] px-0 text-[15px] md:text-[16px] text-[#333] font-sans align-middle block md:flex md:items-center md:w-[148px] border-b border-[#eee] md:border-b-0">
                      <div className="flex items-center w-full">
                        <MobileLabel text="Total" />
                        <span className="w-1/2 md:w-auto text-left font-normal">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Remove Cell */}
                    <div className="py-[15px] md:py-[20px] px-0 text-left md:text-right align-middle block md:flex md:items-center flex-1 border-bottom border-[#eee] md:border-b-0">
                      <div className="flex items-center w-full">
                        <MobileLabel text="Remove" />
                        <div className="remove_cart w-1/2 md:w-auto">
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-[#333] hover:text-primary transition-all block md:ml-auto focus:outline-none"
                          >
                            <i className="flaticon-close !text-[10px] md:!text-[12px] before:mt-[-2px] before:inline-block before:align-top"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Subtotal Section */}
        <div className="cart_subtotal text-right mt-[30px] mb-[30px] md:mb-[42px] px-0 md:px-[13px]">
          <div className="inline-block w-1/2 md:w-[29.3%] align-middle text-left md:text-right text-[16px] font-normal text-[#333] font-sans pr-[15px]">Subtotal</div>
          <div className="inline-block w-1/2 md:w-[29.3%] align-middle text-right text-[20px] md:text-[24px] font-bold text-[#333] font-sans leading-none">${subtotal.toFixed(2)}</div>
        </div>

        {/* Action Buttons */}
        <div className="cart_btns text-right space-y-3 md:space-y-0 md:space-x-[7px] flex flex-col md:block items-end">
          <button type="submit" className="border-btn text-uppercase px-[18px] py-[13px] border border-[#333] text-[#333] hover:bg-[#333] hover:text-white transition-all text-[14px] font-bold w-full md:w-auto leading-normal">Update Cart</button>
          <Link href="/shop" className="text-uppercase border-btn px-[18px] py-[13px] border border-[#333] text-[#333] hover:bg-[#333] hover:text-white transition-all text-[14px] font-bold inline-block w-full md:w-auto text-center leading-normal">Continue shopping</Link>
          <Link href="/checkout" className="text-uppercase background-btn px-[25px] py-[13px] bg-[#f74f2e] text-white hover:bg-[#333] transition-all text-[14px] font-bold inline-block w-full md:w-auto text-center leading-normal">Proceed to checkout</Link>
        </div>

        {/* Notes for seller */}
        <div className="form-group cart_notes mt-[40px] text-left">
          <label className="title_h5 block mb-2 text-[16px] font-medium text-[#333] font-sans" htmlFor="notes">Add a note for seller</label>
          <textarea 
            className="form-control w-full p-[15px] border border-[#aaa] h-[100px] outline-none font-sans text-[14px]" 
            id="notes" 
            name="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
      </form>
    </div>
  );
}
