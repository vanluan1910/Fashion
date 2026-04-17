"use client";

import React from "react";
import { motion } from "framer-motion";

export function CheckoutForm() {
  return (
    <div className="login_form">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-wrap -mx-[15px]">
          {/* Billing Details */}
          <div className="w-full lg:w-2/3 px-[15px] mb-[40px] lg:mb-0">
            <h3 className="text-[24px] font-medium text-[#333] mb-[30px] font-sans">Billing Details</h3>
            
            <div className="flex flex-wrap -mx-[10px]">
              <div className="w-full md:w-1/2 px-[10px] mb-4">
                <label className="block text-[14px] font-bold text-[#333] uppercase mb-2 font-sans">First Name <span className="text-[#f74f2e]">*</span></label>
                <input type="text" className="w-full h-[45px] border border-[#eee] px-4 text-[14px] outline-none focus:border-primary transition-colors" required />
              </div>
              <div className="w-full md:w-1/2 px-[10px] mb-4">
                <label className="block text-[14px] font-bold text-[#333] uppercase mb-2 font-sans">Last Name <span className="text-[#f74f2e]">*</span></label>
                <input type="text" className="w-full h-[45px] border border-[#eee] px-4 text-[14px] outline-none focus:border-primary transition-colors" required />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-[14px] font-bold text-[#333] uppercase mb-2 font-sans">Company Name (Optional)</label>
              <input type="text" className="w-full h-[45px] border border-[#eee] px-4 text-[14px] outline-none focus:border-primary transition-colors" />
            </div>

            <div className="mb-4">
              <label className="block text-[14px] font-bold text-[#333] uppercase mb-2 font-sans">Country / Region <span className="text-[#f74f2e]">*</span></label>
              <select className="w-full h-[45px] border border-[#eee] px-4 text-[14px] outline-none focus:border-primary transition-colors bg-white">
                <option>Vietnam</option>
                <option>United States</option>
                <option>United Kingdom</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-[14px] font-bold text-[#333] uppercase mb-2 font-sans">Street Address <span className="text-[#f74f2e]">*</span></label>
              <input type="text" placeholder="House number and street name" className="w-full h-[45px] border border-[#eee] px-4 text-[14px] outline-none focus:border-primary transition-colors mb-4" required />
              <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" className="w-full h-[45px] border border-[#eee] px-4 text-[14px] outline-none focus:border-primary transition-colors" />
            </div>

            <div className="mb-4">
              <label className="block text-[14px] font-bold text-[#333] uppercase mb-2 font-sans">Town / City <span className="text-[#f74f2e]">*</span></label>
              <input type="text" className="w-full h-[45px] border border-[#eee] px-4 text-[14px] outline-none focus:border-primary transition-colors" required />
            </div>

            <div className="flex flex-wrap -mx-[10px]">
              <div className="w-full md:w-1/2 px-[10px] mb-4">
                <label className="block text-[14px] font-bold text-[#333] uppercase mb-2 font-sans">State / County <span className="text-[#f74f2e]">*</span></label>
                <input type="text" className="w-full h-[45px] border border-[#eee] px-4 text-[14px] outline-none focus:border-primary transition-colors" required />
              </div>
              <div className="w-full md:w-1/2 px-[10px] mb-4">
                <label className="block text-[14px] font-bold text-[#333] uppercase mb-2 font-sans">Postcode / ZIP <span className="text-[#f74f2e]">*</span></label>
                <input type="text" className="w-full h-[45px] border border-[#eee] px-4 text-[14px] outline-none focus:border-primary transition-colors" required />
              </div>
            </div>

            <div className="flex flex-wrap -mx-[10px]">
              <div className="w-full md:w-1/2 px-[10px] mb-4">
                <label className="block text-[14px] font-bold text-[#333] uppercase mb-2 font-sans">Phone <span className="text-[#f74f2e]">*</span></label>
                <input type="tel" className="w-full h-[45px] border border-[#eee] px-4 text-[14px] outline-none focus:border-primary transition-colors" required />
              </div>
              <div className="w-full md:w-1/2 px-[10px] mb-4">
                <label className="block text-[14px] font-bold text-[#333] uppercase mb-2 font-sans">Email Address <span className="text-[#f74f2e]">*</span></label>
                <input type="email" className="w-full h-[45px] border border-[#eee] px-4 text-[14px] outline-none focus:border-primary transition-colors" required />
              </div>
            </div>

            <div className="mt-[20px]">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-primary" />
                <span className="text-[14px] text-[#333] font-sans">Create an account?</span>
              </label>
            </div>

            <div className="mt-[30px]">
              <h3 className="text-[20px] font-medium text-[#333] mb-[20px] font-sans">Additional Information</h3>
              <label className="block text-[14px] font-bold text-[#333] uppercase mb-2 font-sans">Order Notes (Optional)</label>
              <textarea placeholder="Notes about your order, e.g. special notes for delivery." className="w-full h-[120px] border border-[#eee] p-4 text-[14px] outline-none focus:border-primary transition-colors"></textarea>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3 px-[15px]">
            <div className="border-[2px] border-[#eee] p-[30px] bg-[#fdfdfd]">
              <h3 className="text-[20px] font-medium text-[#333] mb-[25px] font-sans uppercase">Your Order</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-4 border-b border-[#eee]">
                  <span className="text-[15px] font-bold text-[#333] uppercase font-sans">Product</span>
                  <span className="text-[15px] font-bold text-[#333] uppercase font-sans">Total</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-[14px] text-[#777] font-sans">Blue Jacket × 1</span>
                  <span className="text-[14px] text-[#333] font-medium font-sans">$59.95</span>
                </div>

                <div className="flex justify-between items-center py-4 border-t border-[#eee]">
                  <span className="text-[15px] font-bold text-[#333] uppercase font-sans">Subtotal</span>
                  <span className="text-[15px] font-bold text-primary font-sans">$59.95</span>
                </div>

                <div className="flex justify-between items-center py-4 border-t border-[#eee]">
                    <span className="text-[15px] font-bold text-[#333] uppercase font-sans">Shipping</span>
                    <span className="text-[14px] text-[#777] font-sans">Flat rate: $10.00</span>
                </div>

                <div className="flex justify-between items-center py-4 border-t border-b border-[#eee]">
                  <span className="text-[18px] font-bold text-[#333] uppercase font-sans">Total</span>
                  <span className="text-[18px] font-bold text-primary font-sans">$69.95</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="payment_methods space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <input type="radio" name="payment" id="bank" className="mt-1 accent-primary" defaultChecked />
                  <label htmlFor="bank" className="text-[14px] text-[#333] font-bold font-sans uppercase cursor-pointer">Direct Bank Transfer</label>
                </div>
                <p className="text-[13px] text-[#777] pl-6 mb-4">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                
                <div className="flex items-start space-x-3">
                  <input type="radio" name="payment" id="cod" className="mt-1 accent-primary" />
                  <label htmlFor="cod" className="text-[14px] text-[#333] font-bold font-sans uppercase cursor-pointer">Cash on Delivery</label>
                </div>

                <div className="flex items-start space-x-3">
                  <input type="radio" name="payment" id="paypal" className="mt-1 accent-primary" />
                  <label htmlFor="paypal" className="text-[14px] text-[#333] font-bold font-sans uppercase cursor-pointer">PayPal <img src="/images/payments.png" alt="paypal" className="inline ml-2 h-4" /></label>
                </div>
              </div>

              <button className="w-full background-btn bg-primary text-white py-[15px] text-[15px] font-bold uppercase hover:bg-[#333] transition-all">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
