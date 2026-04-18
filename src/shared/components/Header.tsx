"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/core/providers/AuthProvider";
import { useCart } from "@/core/providers/CartProvider";
import { useWishlist } from "@/core/providers/WishlistProvider";
import { useCurrency } from "@/core/providers/CurrencyProvider";
import { SHOP_PRODUCTS } from "@/features/shop/constants/shop-data";

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const { currency, setCurrency, formatPrice } = useCurrency();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const filteredProducts = searchQuery.trim() === "" 
    ? [] 
    : SHOP_PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="bg-white w-full border-b border-gray-100 relative">
      {/* Desktop Header Layout - Compact Mode matching index.html */}
      <div className="hidden lg:flex items-center w-full max-w-[1920px] mx-auto px-[30px] min-h-[60px]">

        {/* 1. Header Logo (20.1%) with Tight Primary Badge */}
        <div className="flex-[0_0_20.1%] max-w-[20.1%] flex items-center h-full">
          <Link href="/" className="flex items-center bg-primary py-[2px] px-3 rounded-sm shadow-sm hover:opacity-90 transition-opacity">
            <Image 
              src="/images/lo_go.png" 
              alt="Atelier Fashion" 
              width={90} 
              height={22} 
              className="object-contain brightness-0 invert" 
              priority
            />
          </Link>
        </div>

        {/* 2. Header Navigation (43%) */}
        <div className="flex-[0_0_43%] max-w-[43%] self-stretch flex items-center">
          <nav className="w-full">
            <ul className="flex items-center list-none p-0 m-0">
              <li className="mx-[19px]">
                <Link href="/" className="text-[15px] text-primary capitalize transition-colors duration-300 font-sans font-bold">Trang chủ</Link>
              </li>
              <li className="mx-[19px] group">
                <Link
                  href="/shop"
                  className="text-[17px] text-[#333] capitalize hover:text-primary transition-colors flex items-center cursor-pointer select-none duration-300 font-sans font-normal py-7"
                >
                  <span className="group-hover:text-primary transition-colors">Cửa hàng</span>
                  <span className="ml-[6px] transition-transform duration-300 group-hover:rotate-180 group-hover:text-primary opacity-60 flaticon-down-arrow-1 !text-[7px]"></span>
                </Link>

                {/* Mega menu - Full Screen Parity Fix with Decorative Background */}
                <div className="absolute top-full left-0 w-full bg-white bg-[url('/images/menu-bg.png')] bg-no-repeat bg-right-bottom transition-all duration-300 z-[100] opacity-0 invisible -translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 border-t border-[#eee] shadow-[0px_25px_30px_-5px_rgba(0,0,0,0.1)]">
                  <div className="max-w-[1170px] mx-auto px-[15px] pt-[45px] pb-[50px] flex text-left">
                    <div className="w-1/3 px-[15px]">
                      <h5 className="font-bold capitalize mb-[22px] text-[16px] text-[#333] font-sans tracking-widest">Sản phẩm</h5>
                      <ul className="space-y-[10px] list-none p-0 m-0">
                        <li><Link href="/shop?category=Men" className="flex items-center text-[14px] text-[#777] hover:text-primary transition-colors capitalize font-sans"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span>Nam</Link></li>
                        <li><Link href="/shop?category=Women" className="flex items-center text-[14px] text-[#777] hover:text-primary transition-colors capitalize font-sans"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span>Nữ</Link></li>
                        <li><Link href="/shop?category=Accessories" className="flex items-center text-[14px] text-[#777] hover:text-primary transition-colors capitalize font-sans"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span>Phụ kiện</Link></li>
                      </ul>
                    </div>
                    <div className="w-1/3 px-[15px]">
                      <h5 className="font-bold uppercase mb-[22px] text-[16px] text-[#333] font-sans tracking-widest">Category-1</h5>
                      <ul className="space-y-[10px] list-none p-0 m-0">
                        <li><Link href="/shop?category=Dresses" className="flex items-center text-[14px] text-[#777] hover:text-primary transition-colors capitalize font-sans"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span>Dresses</Link></li>
                        <li><Link href="/shop?category=Skirts" className="flex items-center text-[14px] text-[#777] hover:text-primary transition-colors capitalize font-sans"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span>Skirts</Link></li>
                        <li><Link href="/shop?category=Shirts" className="flex items-center text-[14px] text-[#777] hover:text-primary transition-colors capitalize font-sans"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span>Shirts</Link></li>
                        <li><Link href="/shop?category=Jeans" className="flex items-center text-[14px] text-[#777] hover:text-primary transition-colors capitalize font-sans"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span>Jeans</Link></li>
                        <li><Link href="/shop?category=Sweaters" className="text-[14px] text-[#777] hover:text-primary transition-colors capitalize font-sans"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span>Sweaters</Link></li>
                        <li><Link href="/shop?category=Sweatshirts" className="flex items-center text-[14px] text-[#777] hover:text-primary transition-colors capitalize font-sans"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span>Sweatshirts</Link></li>
                        <li><Link href="/shop?category=Pants" className="flex items-center text-[14px] text-[#777] hover:text-primary transition-colors capitalize font-sans"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span>Pants Short</Link></li>
                        <li><Link href="/shop?category=Accessories" className="flex items-center text-[14px] text-[#777] hover:text-primary transition-colors capitalize font-sans"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span>Cords</Link></li>
                        <li><Link href="/shop?category=Activewear" className="flex items-center text-[14px] text-[#777] hover:text-primary transition-colors capitalize font-sans"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span>Tracks & Joggers</Link></li>
                      </ul>
                    </div>
                    <div className="w-1/3 px-[15px]">
                      <h5 className="font-bold uppercase mb-[22px] text-[16px] text-[#333] font-sans tracking-widest">category-2</h5>
                      <ul className="space-y-[10px] list-none p-0 m-0">
                        <li><Link href="/shop?category=Winter Wear" className="flex items-center text-[14px] text-[#777] hover:text-primary transition-colors capitalize font-sans"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span>winter wear</Link></li>
                        <li><Link href="/shop?category=Summer Specials" className="flex items-center text-[14px] text-[#777] hover:text-primary transition-colors capitalize font-sans"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span>summer specials</Link></li>
                        <li><Link href="/shop?category=Tops" className="flex items-center text-[14px] text-[#777] hover:text-primary transition-colors capitalize font-sans"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span>inner wears</Link></li>
                        <li><Link href="/shop?category=Tops" className="flex items-center text-[14px] text-[#777] hover:text-primary transition-colors capitalize font-sans"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span>tops</Link></li>
                        <li><Link href="/shop?category=Jackets" className="flex items-center text-[14px] text-[#777] hover:text-primary transition-colors capitalize font-sans"><span className="flaticon-down-arrow-1 !text-[6px] -rotate-90 mr-2 opacity-50"></span>jackets</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li className="mx-[19px]">
                <Link href="/blog" className="text-[17px] text-[#333] capitalize hover:text-primary transition-colors duration-300 font-sans font-normal py-7 block">Tin tức</Link>
              </li>
              <li className="mx-[19px] group relative">
                <Link 
                  href="/shop"
                  className="text-[17px] text-[#333] capitalize hover:text-primary transition-colors flex items-center cursor-pointer duration-300 font-medium py-7"
                >
                  <span className="group-hover:text-primary">Trang khác</span>
                  <span className="ml-[6px] transition-transform duration-300 group-hover:rotate-180 group-hover:text-primary opacity-60 flaticon-down-arrow-1 !text-[7px]"></span>
                </Link>

                {/* Other Pages Dropdown - Refined for Parity & Usability */}
                <ul className="absolute top-full left-0 w-[450px] bg-white transition-all duration-300 z-[100] opacity-0 invisible -translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 border border-[#eee] shadow-[0px_0px_15px_3px_rgba(0,0,0,0.15)] list-none p-[30px] m-0 grid grid-cols-2 gap-x-[30px]">
                  {[
                    { label: "Menu rộng toàn màn hình", href: "#" },
                    { label: "Menu danh mục", href: "#" },
                    { label: "Menu khuyến mãi", href: "#" },
                    { label: "Danh sách bộ sưu tập", href: "#" },
                    { label: "Danh sách sản phẩm có bộ lọc", href: "/shop" },
                    { label: "Danh sách có thanh bên", href: "/shop" },
                    { label: "Lookbook thời trang", href: "#" },
                    { label: "Sắp ra mắt", href: "#" },
                    { label: "Tài khoản của tôi", href: "/account" },
                    { label: "Trang 404", href: "/404" }
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
              <li className="mx-[19px]">
                <Link href="/shop?sale=true" className="text-[17px] text-[#333] capitalize hover:text-primary transition-colors text-primary font-bold duration-300 py-7 block">Khuyến mãi</Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* 3. Social Icons (16.66%) */}
        <div className="flex-[0_0_16.66%] max-w-[16.66%] flex items-center h-full">
          <ul className="flex items-center space-x-[22px] list-none p-0 m-0 w-full justify-start">
            <li className="relative group/acc">
              {isAuthenticated ? (
                <div className="relative group">
                  <button 
                    onClick={() => setIsAccountOpen(!isAccountOpen)}
                    suppressHydrationWarning
                    className="flex items-center space-x-1 text-[#333] hover:text-primary transition-all duration-300"
                  >
                    <i className="flaticon-social !text-[18px]"></i>
                    <span className="text-[12px] font-bold capitalize tracking-tighter">Chào, {user?.name.split(' ')[0]}</span>
                  </button>
                  
                  {/* Account Dropdown */}
                  <ul className="absolute top-full right-0 w-[160px] bg-white border border-[#eee] shadow-lg z-[150] list-none p-2 m-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <li className="p-2 hover:bg-gray-50 cursor-pointer text-[13px] border-b border-gray-100"><Link href="/account">Tài khoản</Link></li>
                    <li className="p-2 hover:bg-gray-50 cursor-pointer text-[13px] text-red-500" onClick={logout}>Đăng xuất</li>
                  </ul>
                </div>
              ) : (
                <Link href="/login" className="text-[#333] hover:text-primary transition-all duration-300 block">
                  <i className="flaticon-social !text-[18px]"></i>
                </Link>
              )}
            </li>
            <li className="relative ml-[33px]">
              <Link href="/wishlist" className="text-[#333] hover:text-primary transition-all duration-300 block">
                <i className="flaticon-heart !text-[18px]"></i>
                <span className="absolute -top-[8px] -right-[12px] bg-primary text-white text-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold">
                  {mounted ? wishlistItems.length : 0}
                </span>
              </Link>
            </li>
            <li className="relative ml-[33px]">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                suppressHydrationWarning
                className="text-[#333] hover:text-primary transition-all duration-300 block focus:outline-none"
              >
                <i className="flaticon-magnifying-glass !text-[18px]"></i>
              </button>
              
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-[calc(100%+25px)] right-0 w-[350px] bg-white z-[110] shadow-[0px_20px_40px_rgba(0,0,0,0.15)] p-0 rounded-sm overflow-hidden border border-gray-100"
                  >
                    <div className="p-4 border-b border-gray-50 bg-white">
                      <div className="relative flex items-center">
                        <input 
                          type="text" 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Tìm kiếm sản phẩm..." 
                          className="w-full h-[46px] border border-gray-200 focus:border-primary pl-[15px] pr-[45px] text-[14px] text-[#333] outline-none font-sans transition-all duration-300 placeholder:text-gray-400 rounded-sm"
                          autoFocus
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <i className="flaticon-magnifying-glass !text-[16px]"></i>
                        </div>
                      </div>
                    </div>

                    <div className="max-h-[350px] overflow-y-auto bg-white">
                      {searchQuery.trim() !== "" && (
                        <>
                          {filteredProducts.length > 0 ? (
                            <div className="py-2">
                              {filteredProducts.map((p) => (
                                <Link 
                                  key={p.id} 
                                  href={`/shop?id=${p.id}`}
                                  onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                                  className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors group"
                                >
                                  <div className="w-12 h-14 bg-gray-50 relative overflow-hidden flex-shrink-0 rounded-sm">
                                    <Image src={p.image} alt={p.name} fill className="object-cover" />
                                  </div>
                                  <div className="ml-4 flex-grow">
                                    <h6 className="text-[14px] font-medium text-[#333] group-hover:text-primary transition-colors line-clamp-1">{p.name}</h6>
                                    <p className="text-[12px] text-primary font-bold">{formatPrice(p.price)}</p>
                                  </div>
                                </Link>
                              ))}
                              <div className="px-4 py-2 border-t border-gray-50 bg-gray-50/50">
                                <Link 
                                  href={`/shop?q=${searchQuery}`} 
                                  onClick={() => setIsSearchOpen(false)}
                                  className="text-[12px] text-gray-500 hover:text-primary font-bold capitalize tracking-wider block text-center"
                                >
                                  Xem tất cả kết quả
                                </Link>
                              </div>
                            </div>
                          ) : (
                            <div className="p-8 text-center bg-white">
                              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                <i className="flaticon-magnifying-glass text-gray-300 !text-[20px]"></i>
                              </div>
                              <p className="text-[14px] text-gray-500 font-sans italic">Không tìm thấy sản phẩm nào khớp với "{searchQuery}"</p>
                              <button 
                                onClick={() => setSearchQuery("")}
                                className="mt-2 text-[12px] text-primary font-bold capitalize hover:underline"
                              >
                                Xóa tìm kiếm
                              </button>
                            </div>
                          )}
                        </>
                      )}
                      {searchQuery.trim() === "" && (
                        <div className="p-6 text-center text-gray-400 text-[13px] font-sans italic">
                          Bắt đầu nhập để khám phá các sản phẩm cao cấp...
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            <li className="relative ml-[33px] pr-[9px]">
              <Link href="/cart" className="text-[#333] hover:text-primary transition-all duration-300 block font-normal">
                <div className="relative">
                  <i className="flaticon-shopping-bag !text-[18px]"></i>
                  <span className="absolute -bottom-[6px] -right-[12px] bg-primary text-white text-[11px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold font-sans">
                    {mounted ? cartCount : 0}
                  </span>
                </div>
              </Link>
            </li>
          </ul>
        </div>

        {/* 4. Currency Section (20.2%) */}
        <div className="flex-[0_0_20.2%] max-w-[20.2%] py-[25px] flex items-center justify-end space-x-[21px] text-[16px] capitalize text-[#333]">
          {/* Language Display (Fixed to VN) */}
          <div className="relative group flex items-center space-x-2 font-sans font-normal">
            <div className="relative w-6 h-4 overflow-hidden rounded-[2px] shadow-sm border border-gray-100 bg-gray-50 flex items-center justify-center">
              <img src="https://flagcdn.com/w20/vn.png" alt="VN" className="w-full h-full object-cover" />
            </div>
            <span>VIE</span>
          </div>

          {/* Currency Dropdown */}
          <div className="relative group border-l border-gray-200 pl-3">
            <div 
              onClick={() => { setIsCurrencyOpen(!isCurrencyOpen); setIsLangOpen(false); }}
              suppressHydrationWarning
              className="flex items-center space-x-2 cursor-pointer hover:text-primary transition-all duration-300 font-sans font-normal"
            >
              <div className="relative w-6 h-4 overflow-hidden rounded-[2px] shadow-sm border border-gray-100 bg-gray-50 flex items-center justify-center">
                <img 
                  src={currency === "USD" ? "https://flagcdn.com/w20/us.png" : "https://flagcdn.com/w20/vn.png"} 
                  alt="Flag" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <span>{currency}</span>
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
                  <li 
                    className={`p-2 hover:bg-gray-50 cursor-pointer text-[13px] transition-colors flex items-center space-x-2 ${currency === "VND" ? "text-primary font-bold" : "text-gray-600"}`} 
                    onClick={() => { setCurrency("VND"); setIsCurrencyOpen(false); }}
                  >
                    <img src="https://flagcdn.com/w20/vn.png" alt="VN" className="w-4 h-3 object-cover" />
                    <span>VND</span>
                  </li>
                  <li 
                    className={`p-2 hover:bg-gray-50 cursor-pointer text-[13px] transition-colors flex items-center space-x-2 ${currency === "USD" ? "text-primary font-bold" : "text-gray-600"}`} 
                    onClick={() => { setCurrency("USD"); setIsCurrencyOpen(false); }}
                  >
                    <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-4 h-3 object-cover" />
                    <span>USD</span>
                  </li>
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
              <span className="absolute -bottom-1 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {mounted ? cartCount : 0}
              </span>
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
            <Image src="/images/lo_go.png" alt="logo" width={120} height={30} className="object-contain" />
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
                        <li><Link href="/shop?category=Men" onClick={() => setIsMenuOpen(false)}>Men</Link></li>
                        <li><Link href="/shop?category=Women" onClick={() => setIsMenuOpen(false)}>Women</Link></li>
                        <li><Link href="/shop?category=Accessories" onClick={() => setIsMenuOpen(false)}>Accessories</Link></li>
                      </ul>
                    </li>
                    {/* Category-1 Mobile Submenu */}
                    <li className="py-2 border-t border-gray-50">
                      <span className="block font-bold text-[#333] mb-1.5 text-[11px] uppercase pt-1">Category-1</span>
                      <ul className="pl-4 space-y-2 pb-1.5">
                        <li><Link href="/shop?category=Dresses" onClick={() => setIsMenuOpen(false)}>Dresses</Link></li>
                        <li><Link href="/shop?category=Skirts" onClick={() => setIsMenuOpen(false)}>Skirts</Link></li>
                        <li><Link href="/shop?category=Shirts" onClick={() => setIsMenuOpen(false)}>Shirts</Link></li>
                        <li><Link href="/shop?category=Bottoms" onClick={() => setIsMenuOpen(false)}>Jeans</Link></li>
                        <li><Link href="/shop?category=Sweaters" onClick={() => setIsMenuOpen(false)}>Sweaters</Link></li>
                      </ul>
                    </li>
                    {/* Category-2 Mobile Submenu */}
                    <li className="py-2 border-t border-gray-50">
                      <span className="block font-bold text-[#333] mb-1.5 text-[11px] uppercase pt-1">Category-2</span>
                      <ul className="pl-4 space-y-2 pb-1.5">
                        <li><Link href="/shop?category=Winter Wear" onClick={() => setIsMenuOpen(false)}>Winter Wear</Link></li>
                        <li><Link href="/shop?category=Summer Specials" onClick={() => setIsMenuOpen(false)}>Summer Specials</Link></li>
                        <li><Link href="/shop?category=Tops" onClick={() => setIsMenuOpen(false)}>Inner Wears</Link></li>
                      </ul>
                    </li>
                  </ul>
                )}
              </li>
              <li className="border-b border-gray-100 py-3">
                <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="text-[15px] font-bold uppercase tracking-widest text-[#333] block">
                  Blog
                </Link>
              </li>
              <li className="border-b border-gray-100 py-3"><Link href="/shop?sale=true" onClick={() => setIsMenuOpen(false)} className="text-red-500 font-bold text-[15px]">Sale</Link></li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
