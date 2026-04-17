"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

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
              <li className="mt-[25px] mx-[19px] pb-[30px] group">
                <Link
                  href="/shop"
                  className="text-[17px] text-[#333] uppercase hover:text-primary transition-colors flex items-center cursor-pointer select-none duration-300 font-sans font-normal"
                >
                  <span className="group-hover:text-primary transition-colors">Shop</span>
                  <span className="ml-[6px] transition-transform duration-300 group-hover:rotate-180 group-hover:text-primary opacity-60 flaticon-down-arrow-1 !text-[7px]"></span>
                </Link>

                {/* Mega menu - Full Screen Parity */}
                <div className="absolute top-full left-0 w-full bg-white transition-all duration-300 z-[100] opacity-0 invisible -translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 border-t border-[#eee] shadow-[0px_15px_15px_-5px_rgba(0,0,0,0.1)] bg-[url('/images/menu-bg.png')] bg-no-repeat bg-bottom">
                  {/* Further reduced padding and font sizes for a more compact look */}
                  <div className="max-w-[1170px] mx-auto px-[15px] pt-[25px] pb-[30px] flex text-left">
                    <div className="w-1/3 px-[15px]">
                      <h5 className="font-bold uppercase mb-3 text-[16px] text-[#333] font-sans">Products</h5>
                      <ul className="space-y-1.5 list-none p-0 m-0">
                        <li className="flex items-center"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span><Link href="/shop" className="text-[13px] text-[#333] hover:text-primary transition-colors capitalize font-sans leading-relaxed">Men</Link></li>
                        <li className="flex items-center"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span><Link href="/shop" className="text-[13px] text-[#333] hover:text-primary transition-colors capitalize font-sans leading-relaxed">Women</Link></li>
                        <li className="flex items-center"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span><Link href="/shop" className="text-[13px] text-[#333] hover:text-primary transition-colors capitalize font-sans leading-relaxed">Accessories</Link></li>
                      </ul>
                    </div>
                    <div className="w-1/3 px-[15px]">
                      <h5 className="font-bold uppercase mb-3 text-[16px] text-[#333] font-sans">Category-1</h5>
                      <ul className="space-y-1.5 list-none p-0 m-0">
                        <li className="flex items-center"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span><Link href="/shop" className="text-[13px] text-[#333] hover:text-primary transition-colors capitalize font-sans leading-relaxed">Dresses</Link></li>
                        <li className="flex items-center"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span><Link href="/shop" className="text-[13px] text-[#333] hover:text-primary transition-colors capitalize font-sans leading-relaxed">Skirts</Link></li>
                        <li className="flex items-center"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span><Link href="/shop" className="text-[13px] text-[#333] hover:text-primary transition-colors capitalize font-sans leading-relaxed">Shirts</Link></li>
                        <li className="flex items-center"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span><Link href="/shop" className="text-[13px] text-[#333] hover:text-primary transition-colors capitalize font-sans leading-relaxed">Jeans</Link></li>
                        <li className="flex items-center"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span><Link href="/shop" className="text-[13px] text-[#333] hover:text-primary transition-colors capitalize font-sans leading-relaxed">Sweaters</Link></li>
                        <li className="flex items-center"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span><Link href="/shop" className="text-[13px] text-[#333] hover:text-primary transition-colors capitalize font-sans leading-relaxed">Sweatshirts</Link></li>
                        <li className="flex items-center"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span><Link href="/shop" className="text-[13px] text-[#333] hover:text-primary transition-colors capitalize font-sans leading-relaxed">Pants Short</Link></li>
                        <li className="flex items-center"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span><Link href="/shop" className="text-[13px] text-[#333] hover:text-primary transition-colors capitalize font-sans leading-relaxed">Cords</Link></li>
                        <li className="flex items-center"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span><Link href="/shop" className="text-[13px] text-[#333] hover:text-primary transition-colors capitalize font-sans leading-relaxed">Tracks & Joggers</Link></li>
                      </ul>
                    </div>
                    <div className="w-1/3 px-[15px]">
                      <h5 className="font-bold uppercase mb-3 text-[16px] text-[#333] font-sans">Category-2</h5>
                      <ul className="space-y-1.5 list-none p-0 m-0">
                        <li className="flex items-center"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span><Link href="/shop" className="text-[13px] text-[#333] hover:text-primary transition-colors capitalize font-sans leading-relaxed">Winter Wear</Link></li>
                        <li className="flex items-center"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span><Link href="/shop" className="text-[13px] text-[#333] hover:text-primary transition-colors capitalize font-sans leading-relaxed">Summer Specials</Link></li>
                        <li className="flex items-center"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span><Link href="/shop" className="text-[13px] text-[#333] hover:text-primary transition-colors capitalize font-sans leading-relaxed">Inner Wears</Link></li>
                        <li className="flex items-center"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span><Link href="/shop" className="text-[13px] text-[#333] hover:text-primary transition-colors capitalize font-sans leading-relaxed">Tops</Link></li>
                        <li className="flex items-center"><span className="flaticon-down-arrow-1 !text-[7px] -rotate-90 mr-2 opacity-50"></span><Link href="/shop" className="text-[13px] text-[#333] hover:text-primary transition-colors capitalize font-sans leading-relaxed">Jackets</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li className="pt-[34px] pb-[30px] mx-[19px] group relative">
                <div className="text-[17px] text-[#333] uppercase hover:text-primary transition-colors flex items-center cursor-pointer duration-300 font-medium">
                  <Link href="/blog" className="group-hover:text-primary">Blog</Link>
                  <span className="ml-[6px] transition-transform duration-300 group-hover:rotate-180 group-hover:text-primary opacity-60 flaticon-down-arrow-1 !text-[7px]"></span>
                </div>

                {/* Blog Dropdown - Refined for Parity */}
                <ul className="absolute top-full left-0 w-[280px] bg-white transition-all duration-300 z-[100] opacity-0 invisible -translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 border border-[#eee] shadow-[0px_0px_15px_3px_rgba(0,0,0,0.15)] list-none p-[34px_30px_26px_37px] m-0">
                  <li className="w-full mb-[9px] group/item">
                    <Link href="/blog" className="flex items-center text-[14px] text-[#333] hover:text-primary transition-all duration-300 hover:ml-[9px] font-sans">
                      <span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span>
                      1 Grid Blog List With Sidebar
                    </Link>
                  </li>
                  <li className="w-full group/item active">
                    <Link href="/blog" className="flex items-center text-[14px] text-primary ml-[9px] transition-all duration-300 font-sans">
                      <span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span>
                      2 Grids Blog List
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="pt-[34px] pb-[30px] mx-[19px] group relative">
                <Link 
                  href="/shop"
                  className="text-[17px] text-[#333] uppercase hover:text-primary transition-colors flex items-center cursor-pointer duration-300 font-medium"
                >
                  <span className="group-hover:text-primary">Other Pages</span>
                  <span className="ml-[6px] transition-transform duration-300 group-hover:rotate-180 group-hover:text-primary opacity-60 flaticon-down-arrow-1 !text-[7px]"></span>
                </Link>

                {/* Other Pages Dropdown - Refined for Parity & Usability */}
                <ul className="absolute top-full left-0 w-[450px] bg-white transition-all duration-300 z-[100] opacity-0 invisible -translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 border border-[#eee] shadow-[0px_0px_15px_3px_rgba(0,0,0,0.15)] list-none p-[30px] m-0 grid grid-cols-2 gap-x-[30px]">
                  {[
                    { label: "Mega menu full screen", href: "#" },
                    { label: "Categories menu", href: "#" },
                    { label: "Menu with sale section", href: "#" },
                    { label: "Collection list", href: "#" },
                    { label: "Product list with filter", href: "/shop" },
                    { label: "Product list with sidebar", href: "/shop" },
                    { label: "Lookbook", href: "#" },
                    { label: "Coming soon page", href: "#" },
                    { label: "My account", href: "/account" },
                    { label: "404 page", href: "/404" }
                  ].map((item, idx) => (
                    <li key={idx} className="mb-[12px] group/item">
                      <Link href={item.href} className="flex items-center text-[12px] text-[#333] hover:text-primary transition-all duration-300 hover:ml-[5px]">
                        <span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="pt-[34px] pb-[30px] mx-[19px]">
                <Link href="/sale" className="text-[17px] text-[#333] uppercase hover:text-primary transition-colors text-primary font-bold duration-300">Sale</Link>
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
              <Link href="/wishlist" className="text-[#333] hover:text-primary transition-all duration-300 block">
                <i className="flaticon-heart !text-[18px]"></i>
              </Link>
            </li>
            <li className="relative ml-[33px]">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-[#333] hover:text-primary transition-all duration-300 block focus:outline-none"
              >
                <i className="flaticon-magnifying-glass !text-[18px]"></i>
              </button>
              
              {/* Desktop Search Form Dropdown */}
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-[calc(100%+25px)] right-0 w-[320px] bg-white z-[110] shadow-[0px_20px_40px_rgba(0,0,0,0.12)] p-1 rounded-sm overflow-hidden"
                  >
                    <form className="relative flex items-center">
                      <input 
                        type="text" 
                        placeholder="Search for premium products..." 
                        className="w-full h-[54px] border border-[#eee] focus:border-primary pl-[20px] pr-[60px] text-[15px] text-[#333] outline-none capitalize font-sans transition-all duration-300 placeholder:text-gray-300"
                        autoFocus
                      />
                      <button 
                        type="submit" 
                        className="absolute right-1 top-1 h-[46px] w-[50px] flex items-center justify-center text-[#333] hover:text-primary transition-all duration-300 bg-white"
                      >
                        <i className="flaticon-magnifying-glass !text-[18px]"></i>
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
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
          {/* Language Dropdown */}
          <div className="relative group">
            <div 
              onClick={() => { setIsLangOpen(!isLangOpen); setIsCurrencyOpen(false); }}
              className="flex items-center space-x-2 cursor-pointer hover:text-primary transition-all duration-300 font-sans font-normal"
            >
              <div className="relative w-6 h-4 overflow-hidden rounded-[2px] shadow-sm border border-gray-100 bg-gray-50 flex items-center justify-center">
                <img src="https://flagcdn.com/w20/vn.png" alt="VN" className="w-full h-full object-cover" />
              </div>
              <span>VIE</span>
              <span className={`flaticon-down-arrow-1 !text-[7px] opacity-40 transition-transform duration-300 ${isLangOpen ? "rotate-180" : ""}`}></span>
            </div>
            
            <AnimatePresence>
              {isLangOpen && (
                <motion.ul 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-3 w-[120px] bg-white border border-[#eee] shadow-lg z-[150] list-none p-2 m-0"
                >
                  <li className="p-2 hover:bg-gray-50 flex items-center space-x-2 cursor-pointer text-[13px] transition-colors" onClick={() => setIsLangOpen(false)}>
                    <img src="https://flagcdn.com/w20/vn.png" alt="VN" className="w-4 h-3 object-cover" />
                    <span>Vietnamese</span>
                  </li>
                  <li className="p-2 hover:bg-gray-50 flex items-center space-x-2 cursor-pointer text-[13px] transition-colors" onClick={() => setIsLangOpen(false)}>
                    <img src="https://flagcdn.com/w20/gb.png" alt="GB" className="w-4 h-3 object-cover" />
                    <span>English</span>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Currency Dropdown */}
          <div className="relative group border-l border-gray-200 pl-3">
            <div 
              onClick={() => { setIsCurrencyOpen(!isCurrencyOpen); setIsLangOpen(false); }}
              className="flex items-center space-x-2 cursor-pointer hover:text-primary transition-all duration-300 font-sans font-normal"
            >
              <span>VND</span>
              <span className={`flaticon-down-arrow-1 !text-[7px] opacity-40 transition-transform duration-300 ${isCurrencyOpen ? "rotate-180" : ""}`}></span>
            </div>

            <AnimatePresence>
              {isCurrencyOpen && (
                <motion.ul 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-3 w-[100px] bg-white border border-[#eee] shadow-lg z-[150] list-none p-2 m-0"
                >
                  <li className="p-2 hover:bg-gray-50 cursor-pointer text-[13px] transition-colors" onClick={() => setIsCurrencyOpen(false)}>VND</li>
                  <li className="p-2 hover:bg-gray-50 cursor-pointer text-[13px] transition-colors" onClick={() => setIsCurrencyOpen(false)}>USD</li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Header Layout */}
      <div className="lg:hidden flex flex-col p-4 md:p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          {/* Currency Mob */}
          <div className="flex space-x-4 text-xs font-bold text-gray-500 uppercase items-center">
            <span className="flex items-center">
              <img src="https://flagcdn.com/w20/vn.png" alt="VN" className="w-3 h-2 mr-1 object-cover" />
              Vie ▼
            </span>
            <span>VND / USD ▼</span>
          </div>
          {/* Icons Mob */}
          <div className="flex space-x-4 items-center relative">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-800 hover:text-primary transition-colors focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link href="/login"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></Link>
            <Link href="/cart" className="relative text-gray-800 hover:text-primary transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              <span className="absolute -bottom-1 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
            </Link>

            {/* Mobile Search Form Dropdown */}
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-[calc(100%+25px)] right-0 w-[calc(100vw-64px)] sm:w-[320px] bg-white z-[110] shadow-[0px_20px_40px_rgba(0,0,0,0.15)] p-1 rounded-sm"
                >
                  <form className="relative flex items-center">
                    <input 
                      type="text" 
                      placeholder="Search..." 
                      className="w-full h-[50px] border border-[#eee] focus:border-primary pl-[15px] pr-[50px] text-[14px] text-[#333] outline-none capitalize font-sans transition-all duration-300"
                      autoFocus
                    />
                    <button 
                      type="submit" 
                      className="absolute right-1 top-1 h-[42px] w-[45px] flex items-center justify-center text-[#333] hover:text-primary transition-all duration-300 bg-white"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            suppressHydrationWarning
            className="p-2 -ml-2 text-gray-800"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>

          <Link href="/">
            <Image src="/images/logo.png" alt="logo" width={140} height={32} />
          </Link>

          <div className="w-8" /> {/* Spacer */}
        </div>

        {/* Mobile Menu Content - Accordion Implementation for Shop Parity */}
        {isMenuOpen && (
          <div className="mt-4 border-t pt-4 animate-in fade-in slide-in-from-top-4 duration-300 overflow-y-auto max-h-[70vh]">
            <ul className="flex flex-col space-y-0 font-bold uppercase tracking-widest text-[#333]">
              <li className="border-b border-gray-100 py-3"><Link href="/" onClick={() => setIsMenuOpen(false)} className="text-[15px]">Home</Link></li>
              <li className="border-b border-gray-100 py-3">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setIsShopOpen(!isShopOpen)}
                >
                  <span className={`text-[15px] ${isShopOpen ? "text-primary" : ""}`}>Shop</span>
                  <span className={`flaticon-down-arrow-1 !text-[7px] transition-transform duration-300 ${isShopOpen ? "rotate-180 text-primary" : "opacity-60"}`}></span>
                </div>
                {isShopOpen && (
                  <ul className="mt-2 space-y-0 font-normal text-[13px] normal-case tracking-normal animate-in slide-in-from-top-2 duration-300">
                    {/* Products Mobile Submenu */}
                    <li className="py-2 border-t border-gray-50">
                      <span className="block font-bold text-[#333] mb-1.5 text-[11px] uppercase pt-1">Products</span>
                      <ul className="pl-4 space-y-2 pb-1.5">
                        <li><Link href="/shop" onClick={() => setIsMenuOpen(false)}>Men</Link></li>
                        <li><Link href="/shop" onClick={() => setIsMenuOpen(false)}>Women</Link></li>
                        <li><Link href="/shop" onClick={() => setIsMenuOpen(false)}>Accessories</Link></li>
                      </ul>
                    </li>
                    {/* Category-1 Mobile Submenu */}
                    <li className="py-2 border-t border-gray-50">
                      <span className="block font-bold text-[#333] mb-1.5 text-[11px] uppercase pt-1">Category-1</span>
                      <ul className="pl-4 space-y-2 pb-1.5">
                        <li><Link href="/shop" onClick={() => setIsMenuOpen(false)}>Dresses</Link></li>
                        <li><Link href="/shop" onClick={() => setIsMenuOpen(false)}>Skirts</Link></li>
                        <li><Link href="/shop" onClick={() => setIsMenuOpen(false)}>Shirts</Link></li>
                        <li><Link href="/shop" onClick={() => setIsMenuOpen(false)}>Jeans</Link></li>
                        <li><Link href="/shop" onClick={() => setIsMenuOpen(false)}>Sweaters</Link></li>
                      </ul>
                    </li>
                    {/* Category-2 Mobile Submenu */}
                    <li className="py-2 border-t border-gray-50">
                      <span className="block font-bold text-[#333] mb-1.5 text-[11px] uppercase pt-1">Category-2</span>
                      <ul className="pl-4 space-y-2 pb-1.5">
                        <li><Link href="/shop" onClick={() => setIsMenuOpen(false)}>Winter Wear</Link></li>
                        <li><Link href="/shop" onClick={() => setIsMenuOpen(false)}>Summer Specials</Link></li>
                        <li><Link href="/shop" onClick={() => setIsMenuOpen(false)}>Inner Wears</Link></li>
                      </ul>
                    </li>
                  </ul>
                )}
              </li>
              <li className="border-b border-gray-100 py-3">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setIsBlogOpen(!isBlogOpen)}
                >
                  <span className={`text-[15px] ${isBlogOpen ? "text-primary" : ""}`}>Blog</span>
                  <span className={`flaticon-down-arrow-1 !text-[7px] transition-transform duration-300 ${isBlogOpen ? "rotate-180 text-primary" : "opacity-60"}`}></span>
                </div>
                {isBlogOpen && (
                  <ul className="mt-2 space-y-0 font-normal text-[13px] normal-case tracking-normal animate-in slide-in-from-top-2 duration-300">
                    <li className="py-2 border-t border-gray-50">
                      <Link href="/blog" onClick={() => setIsMenuOpen(false)}>1 Grid Blog List With Sidebar</Link>
                    </li>
                    <li className="py-2 border-t border-gray-50">
                      <Link href="/blog" onClick={() => setIsMenuOpen(false)}>2 Grids Blog List</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="border-b border-gray-100 py-3"><Link href="/sale" onClick={() => setIsMenuOpen(false)} className="text-red-500 font-bold text-[15px]">Sale</Link></li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
