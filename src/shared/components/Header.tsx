"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);

  return (
    <header className="bg-white w-full border-b border-gray-100 relative">
      {/* Desktop Header Layout - Using Exact Percentage Grid for 100% Parity */}
      <div className="hidden lg:flex items-start w-full max-w-[1920px] mx-auto px-[30px]">
        
        {/* 1. Header Logo (20.1%) */}
        <div className="flex-[0_0_20.1%] max-w-[20.1%] py-[25px]">
          <Link href="/" className="flex items-center">
            <span className="text-[28px] font-medium tracking-[0.1em] text-[#333] font-sans uppercase">Earth</span>
            <span className="text-[28px] font-medium tracking-[0.1em] text-primary font-sans uppercase">yellow</span>
          </Link>
        </div>

        {/* 2. Header Navigation (43%) */}
        <div className="flex-[0_0_43%] max-w-[43%]">
          <nav className="flex justify-start">
            <ul className="flex items-center list-none p-0 m-0">
              <li className="mt-[25px] mx-[19px] pb-[30px]">
                <Link href="/" className="text-[17px] text-primary uppercase transition-colors duration-300 font-sans font-normal">Home</Link>
              </li>
              <li className="mt-[25px] mx-[19px] pb-[30px] group relative">
                <div 
                  className="text-[17px] text-[#333] uppercase hover:text-primary transition-colors flex items-center cursor-pointer select-none duration-300 font-sans font-normal"
                >
                  <span className="group-hover:text-primary transition-colors">Shop</span> 
                  <span className="ml-[6px] transition-transform duration-300 group-hover:rotate-180 group-hover:text-primary opacity-60 flaticon-down-arrow-1 !text-[12px]"></span>
                </div>
                
                {/* Mega menu */}
                <div className="absolute top-full left-0 w-[900px] bg-white transition-all duration-300 z-[100] p-10 flex text-left space-x-16 opacity-0 invisible -translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 border border-[#eee] shadow-[0px_0px_15px_3px_rgba(0,0,0,0.15)]">
                  <div className="flex-1">
                    <h5 className="font-bold uppercase mb-6 text-[18px] border-b pb-2 text-[#333] font-sans">Products</h5>
                    <ul className="space-y-3 text-[14px] text-[#333] font-normal capitalize font-sans">
                      <li><Link href="/shop" className="hover:text-primary transition-colors">Men</Link></li>
                      <li><Link href="/shop" className="hover:text-primary transition-colors">Women</Link></li>
                      <li><Link href="/shop" className="hover:text-primary transition-colors">Accessories</Link></li>
                    </ul>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold uppercase mb-6 text-[18px] border-b pb-2 text-[#333] font-sans">Category-1</h5>
                    <ul className="space-y-3 text-[14px] text-[#333] font-normal capitalize font-sans">
                      <li><Link href="/shop" className="hover:text-primary transition-colors">Dresses</Link></li>
                      <li><Link href="/shop" className="hover:text-primary transition-colors">Skirts</Link></li>
                      <li><Link href="/shop" className="hover:text-primary transition-colors">Shirts</Link></li>
                      <li><Link href="/shop" className="hover:text-primary transition-colors">Jeans</Link></li>
                      <li><Link href="/shop" className="hover:text-primary transition-colors">Sweaters</Link></li>
                      <li><Link href="/shop" className="hover:text-primary transition-colors">Sweatshirts</Link></li>
                      <li><Link href="/shop" className="hover:text-primary transition-colors">Pants Short</Link></li>
                      <li><Link href="/shop" className="hover:text-primary transition-colors">Cords</Link></li>
                      <li><Link href="/shop" className="hover:text-primary transition-colors">Tracks & Joggers</Link></li>
                    </ul>
                  </div>
                  <div className="flex-1 border-r border-gray-100 pr-8">
                    <h5 className="font-bold uppercase mb-6 text-[18px] border-b pb-2 text-[#333] font-sans">Category-2</h5>
                    <ul className="space-y-3 text-[14px] text-[#333] font-normal capitalize font-sans">
                      <li><Link href="/shop" className="hover:text-primary transition-colors">Winter Wear</Link></li>
                      <li><Link href="/shop" className="hover:text-primary transition-colors">Summer Specials</Link></li>
                      <li><Link href="/shop" className="hover:text-primary transition-colors">Inner Wears</Link></li>
                      <li><Link href="/shop" className="hover:text-primary transition-colors">Tops</Link></li>
                      <li><Link href="/shop" className="hover:text-primary transition-colors">Jackets</Link></li>
                    </ul>
                  </div>
                  <div className="flex-[0_0_200px] flex flex-col justify-center text-center space-y-4">
                     <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-2 shadow-sm">
                        <Image src="/images/menu_img.png" alt="Menu Promo" fill className="object-cover" />
                     </div>
                     <Link href="/shop" className="text-[12px] font-bold uppercase tracking-widest bg-primary text-white py-3 hover:bg-[#d12807] transition-colors font-sans">View Collection</Link>
                  </div>
                </div>
              </li>
              <li className="mt-[25px] mx-[19px] pb-[30px] group relative">
                <div className="text-[17px] text-[#333] uppercase hover:text-primary transition-colors flex items-center cursor-pointer duration-300 font-sans font-normal">
                  <Link href="/blog" className="group-hover:text-primary">Blog</Link>
                  <span className="ml-[6px] flaticon-down-arrow-1 !text-[12px] opacity-60"></span>
                </div>
              </li>
              <li className="mt-[25px] mx-[19px] pb-[30px] group relative">
                <div className="text-[17px] text-[#333] uppercase hover:text-primary transition-colors flex items-center cursor-pointer duration-300 font-sans font-normal">
                  <Link href="/pages" className="group-hover:text-primary">Other Pages</Link>
                  <span className="ml-[6px] flaticon-down-arrow-1 !text-[12px] opacity-60"></span>
                </div>
              </li>
              <li className="mt-[25px] mx-[19px] pb-[30px]">
                <Link href="/sale" className="text-[17px] text-[#333] uppercase hover:text-primary transition-colors text-primary font-bold duration-300 font-sans">Sale</Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* 3. Social Icons (16.66%) */}
        <div className="flex-[0_0_16.66%] max-w-[16.66%] py-[25px]">
          <ul className="flex items-center justify-end list-none m-0 p-0">
            <li className="relative">
              <Link href="/login" className="text-[#333] hover:text-primary transition-all duration-300 block">
                <i className="flaticon-social !text-[18px]"></i>
              </Link>
            </li>
            <li className="relative ml-[33px]">
               <button className="text-[#333] hover:text-primary transition-all duration-300 block">
                <i className="flaticon-heart !text-[18px]"></i>
              </button>
            </li>
            <li className="relative ml-[33px]">
              <button className="text-[#333] hover:text-primary transition-all duration-300 block">
                <i className="flaticon-magnifying-glass !text-[18px]"></i>
              </button>
            </li>
            <li className="relative ml-[33px] pr-[9px]">
              <Link href="/cart" className="text-[#333] hover:text-primary transition-all duration-300 block font-normal">
                <div className="relative">
                  <i className="flaticon-shopping-bag !text-[18px]"></i>
                  <span className="absolute -bottom-[6px] -right-[12px] bg-primary text-white text-[11px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold font-sans">0</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>

        {/* 4. Currency Section (20.2%) */}
        <div className="flex-[0_0_20.2%] max-w-[20.2%] py-[25px] flex items-center justify-end space-x-[21px] text-[16px] uppercase text-[#333]">
          <div className="flex items-center space-x-2 cursor-pointer group hover:text-primary transition-all duration-300 font-sans font-normal">
            <div className="relative w-6 h-4 overflow-hidden rounded-[2px] shadow-sm border border-gray-100 bg-gray-50 flex items-center justify-center">
              <img src="https://flagcdn.com/w20/gb.png" alt="UK" className="w-full h-full object-cover" />
            </div>
            <span>ENG</span>
            <span className="flaticon-down-arrow-1 !text-[10px] opacity-40 transition-transform group-hover:rotate-180"></span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer group hover:text-primary transition-all duration-300 font-sans font-normal">
            <span>USD</span>
            <span className="flaticon-down-arrow-1 !text-[10px] opacity-40 transition-transform group-hover:rotate-180"></span>
          </div>
        </div>
      </div>

      {/* Mobile Header Layout */}
      <div className="lg:hidden flex flex-col p-4 md:p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
           {/* Currency Mob */}
           <div className="flex space-x-4 text-xs font-bold text-gray-500 uppercase">
             <span>Eng ▼</span>
             <span>USD ▼</span>
           </div>
           {/* Icons Mob */}
           <div className="flex space-x-4 items-center">
              <Link href="/login"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></Link>
              <Link href="/cart" className="relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                <span className="absolute -bottom-1 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
              </Link>
           </div>
        </div>

        <div className="flex items-center justify-between">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 -ml-2 text-gray-800"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>

          <Link href="/">
            <Image src="/images/logo.png" alt="logo" width={140} height={32} />
          </Link>

          <div className="w-8" /> {/* Spacer */}
        </div>

        {/* Mobile Menu Content */}
        {isMenuOpen && (
          <div className="mt-4 border-t pt-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <ul className="flex flex-col space-y-4 font-bold uppercase tracking-widest text-[#333]">
              <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
              <li><Link href="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link></li>
              <li><Link href="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link></li>
              <li><Link href="/sale" onClick={() => setIsMenuOpen(false)} className="text-red-500">Sale</Link></li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
