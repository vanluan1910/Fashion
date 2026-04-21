"use client";

import React, { useState } from "react";
import { SHOP_CATEGORIES, SHOP_SIZES, SHOP_COLORS } from "../constants/shop-data";

// Simple Close Icon component for perfect scaling
const CloseIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

import { useRouter, useSearchParams } from "next/navigation";
import { useCurrency } from "@/core/providers/CurrencyProvider";

export function ShopSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currency } = useCurrency();

  // Mặc định giới hạn (VND: 10tr, USD: 400)
  const isUSD = currency === "USD";
  const maxLimit = isUSD ? 500 : 10000000;
  const step = isUSD ? 10 : 100000;

  const [minPrice, setMinPrice] = useState(Number(searchParams.get("minPrice")) || 0);
  const [maxPrice, setMaxPrice] = useState(Number(searchParams.get("maxPrice")) || maxLimit);

  const updateUrl = (min: number, max: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("minPrice", min.toString());
    params.set("maxPrice", max.toString());
    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - step);
    setMinPrice(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + step);
    setMaxPrice(value);
  };

  // Chỉ cập nhật URL khi người dùng nhả chuột (tối ưu hiệu năng)
  // Tự động reset giá trị thanh trượt khi đổi tiền tệ để không bị lệch dải giá
  React.useEffect(() => {
    setMinPrice(0);
    setMaxPrice(maxLimit);
  }, [currency, maxLimit]);

  const toggleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.get(key)?.split(",") || [];
    
    if (currentValues.includes(value.toLowerCase())) {
      const newValues = currentValues.filter(v => v !== value.toLowerCase());
      if (newValues.length > 0) params.set(key, newValues.join(","));
      else params.delete(key);
    } else {
      currentValues.push(value.toLowerCase());
      params.set(key, currentValues.join(","));
    }
    
    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  const isChecked = (key: string, value: string) => {
    return (searchParams.get(key)?.split(",") || []).includes(value.toLowerCase());
  };

  const clearAll = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  const { formatPrice } = useCurrency();

  return (
    <div className="collection_sidebar">
      <div className="flex items-center justify-between lg:hidden mb-[30px] pb-[20px] border-b border-[#ececec]">
        <h3 className="text-[24px] font-normal text-[#333]">Bộ lọc</h3>
        <button className="text-[#333]" onClick={() => router.back()}>
          <CloseIcon className="w-5 h-5" />
        </button>
      </div>

      {/* 1. Shopping by (Đang lọc theo) */}
      {(searchParams.get("category") || searchParams.get("minPrice") || searchParams.get("sale")) && (
        <div className="category_list border border-[#e0dcdc] mb-[20px] bg-white">
          <div className="category_list_title border-b border-[#e0dcdc] px-[10px] pt-[12px] pb-[16px] flex items-center justify-between cursor-pointer">
            <h2 className="text-[18px] font-medium text-[#333] mb-0 leading-none capitalize tracking-tighter" style={{ fontFamily: "'Work Sans', sans-serif" }}>Bộ lọc đang chọn</h2>
          </div>
          
          <div className="layer-filter shopping_by_select p-[18px_10px_15px] space-y-[15px]">
            {searchParams.get("category") && (
              <div className="flex flex-wrap gap-2">
                {searchParams.get("category")?.split(",").map(cat => (
                  <span key={cat} className="bg-gray-100 px-2 py-1 text-[12px] flex items-center gap-1">
                    {cat} <CloseIcon className="w-2 h-2 cursor-pointer" />
                  </span>
                ))}
              </div>
            )}
            <button 
              onClick={() => router.push("/shop")}
              className="text-[#f74f2e] font-bold text-[13px] uppercase"
            >
              Xóa tất cả
            </button>
          </div>
        </div>
      )}

      {/* 2. Availability (Trạng thái) */}
      <div className="category_list border border-[#e0dcdc] mb-[20px] bg-white">
        <div className="category_list_title border-b border-[#e0dcdc] px-[10px] pt-[12px] pb-[16px] flex items-center justify-between cursor-pointer">
          <h5 className="text-[16px] font-medium text-[#333] mb-0 leading-none tracking-widest" style={{ fontFamily: "'Work Sans', sans-serif" }}>Trạng thái</h5>
          <span className="flaticon-down-arrow text-[14px] text-[#333] leading-none"></span>
        </div>
        <div className="layer-filter pt-[9px] px-[10px] pb-[12px]">
          <ul className="m-0 p-0 list-none space-y-[10px]">
            <li className="flex items-center gap-2 cursor-pointer" onClick={() => toggleFilter("sale", "true")}>
              <div className={`w-3 h-3 rounded-full border ${isChecked("sale", "true") ? "bg-primary border-primary" : "border-gray-300"}`}></div>
              <span className={`text-[14px] ${isChecked("sale", "true") ? "text-primary font-bold" : "text-[#666]"}`}>Đang giảm giá</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. Categories (Danh mục) */}
      <div className="category_list border border-[#e0dcdc] mb-[20px] bg-white">
        <div className="category_list_title border-b border-[#e0dcdc] px-[10px] pt-[12px] pb-[16px] flex items-center justify-between cursor-pointer">
          <h5 className="text-[16px] font-medium text-[#333] mb-0 leading-none tracking-widest" style={{ fontFamily: "'Work Sans', sans-serif" }}>Danh mục</h5>
          <span className="flaticon-down-arrow text-[14px] text-[#333] leading-none"></span>
        </div>
        <div className="layer-filter pt-[12px] px-[10px] pb-[15px]">
          <ul className="m-0 p-0 list-none space-y-[10px]">
            {["Thời trang nam", "Thời trang nữ", "Phụ kiện"].map((cat) => (
              <li 
                key={cat} 
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => toggleFilter("category", cat)}
              >
                <div className={`w-3 h-3 border ${isChecked("category", cat) ? "bg-primary border-primary" : "border-gray-300"}`}></div>
                <span className={`text-[14px] transition-colors ${isChecked("category", cat) ? "text-primary font-bold" : "text-[#666] group-hover:text-primary"}`}>
                  {cat}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4. Men Category */}
      <div className="category_list border border-[#e0dcdc] mb-[20px] bg-white">
        <div className="category_list_title border-b border-[#e0dcdc] px-[10px] pt-[12px] pb-[16px] flex items-center justify-between cursor-pointer">
          <h5 className="text-[16px] font-medium text-[#333] mb-0 leading-none tracking-widest" style={{ fontFamily: "'Work Sans', sans-serif" }}>Sản phẩm Nam</h5>
          <span className="flaticon-down-arrow text-[14px] text-[#333] leading-none"></span>
        </div>
        <div className="layer-filter">
          <div className="search_tag p-[8px_10px_0] relative">
            <input
              type="text"
              placeholder="tìm kiếm"
              suppressHydrationWarning
              className="w-full border-0 border-b border-[#e0dcdc] px-[9px] pb-[7px] text-[12px] text-[#888888] focus:border-primary outline-none"
            />
            <button 
              suppressHydrationWarning
              className="absolute right-[19px] top-[10px] flaticon-magnifying-glass text-[12px] text-[#888888]"
            ></button>
          </div>
          <ul className="men m-0 p-[12px_10px_15px] list-none space-y-[10px]">
            {["T-Shirts", "Outerwear", "Basics", "Activewear"].map((cat, idx) => (
              <li key={cat}>
                <div className="checkbox flex items-center">
                  <input
                    type="checkbox"
                    id={`men-side-new-${cat}`}
                    suppressHydrationWarning
                    defaultChecked={true}
                    className="w-[13px] h-[13px] border-[#e0dcdc] accent-primary rounded-full cursor-pointer"
                  />
                  <label htmlFor={`men-side-new-${cat}`} className="ml-[10px] text-[14px] text-[#666] hover:text-primary cursor-pointer transition-colors leading-none">
                    {cat}
                  </label>
                </div>
              </li>
            ))}
          </ul>
          <div className="loadMore px-[15px] pb-[18px] text-[12px] text-[#333] font-bold cursor-pointer hover:text-primary transition-colors">Xem thêm 4 sản phẩm</div>
        </div>
      </div>

      {/* 5. Accessories */}
      <div className="category_list border border-[#e0dcdc] mb-[20px] bg-white">
        <div className="category_list_title border-b border-[#e0dcdc] px-[10px] pt-[12px] pb-[16px] flex items-center justify-between cursor-pointer">
          <h5 className="text-[16px] font-medium text-[#333] mb-0 leading-none tracking-widest" style={{ fontFamily: "'Work Sans', sans-serif" }}>Phụ kiện</h5>
          <span className="flaticon-down-arrow text-[14px] text-[#333] leading-none"></span>
        </div>
        <div className="layer-filter pt-[9px] px-[10px] pb-[12px]">
          <ul className="m-0 p-0 list-none space-y-[10px]">
            {["Glasses", "Handbags", "Apparel", "Shoes"].map(item => (
              <li key={item}>
                <div className="checkbox flex items-center">
                  <input 
                    type="checkbox" 
                    id={`acc-side-new-${item}`} 
                    suppressHydrationWarning
                    className="w-[13px] h-[13px] border-[#e0dcdc] accent-primary rounded-full cursor-pointer" 
                  />
                  <label htmlFor={`acc-side-new-${item}`} className="ml-[10px] text-[14px] text-[#666] hover:text-primary cursor-pointer transition-colors leading-none">{item}</label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 6. Price Slider */}
      <div className="category_list border border-[#e0dcdc] mb-[20px] bg-white">
        <div className="category_list_title border-b border-[#e0dcdc] px-[10px] pt-[12px] pb-[16px] flex items-center justify-between cursor-pointer">
          <h5 className="text-[16px] font-medium text-[#333] mb-0 leading-none tracking-widest" style={{ fontFamily: "'Work Sans', sans-serif" }}>Giá cả</h5>
          <span className="flaticon-down-arrow text-[14px] text-[#333] leading-none"></span>
        </div>
        <div className="layer-filter pt-[22px] px-[30px] pb-[39px]">
           <div className="range_slider">
              <div className="h-[10px] bg-[#e1dede] relative mb-[17px]">
                {/* Active range bar */}
                <div 
                  className="absolute top-0 bottom-0 bg-primary" 
                  style={{ 
                    left: `${(minPrice / maxLimit) * 100}%`, 
                    right: `${100 - (maxPrice / maxLimit) * 100}%` 
                  }}
                ></div>
                
                 {/* Real hidden inputs for functionality */}
                <input 
                  type="range" 
                  min={0} 
                  max={maxLimit} 
                  step={step}
                  value={minPrice} 
                  onChange={handleMinChange}
                  onMouseUp={() => updateUrl(minPrice, maxPrice)}
                  suppressHydrationWarning
                  className="dual-range-input absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
                />
                <input 
                  type="range" 
                  min={0} 
                  max={maxLimit} 
                  step={step}
                  value={maxPrice} 
                  onChange={handleMaxChange}
                  onMouseUp={() => updateUrl(minPrice, maxPrice)}
                  suppressHydrationWarning
                  className="dual-range-input absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
                />

                {/* Simulated Visual Thumbs */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-[15px] h-[15px] bg-[#f74f2e] pointer-events-none z-10"
                  style={{ left: `calc(${(minPrice / maxLimit) * 100}% - 7px)` }}
                ></div>
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-[15px] h-[15px] bg-[#f74f2e] pointer-events-none z-10"
                  style={{ left: `calc(${(maxPrice / maxLimit) * 100}% - 7px)` }}
                ></div>
              </div>

              <div className="range_value overflow-hidden">
                <p className="range_title float-left text-[14px] font-bold text-[#333] mr-[5px] mb-0">Giá:</p>
                <input 
                  type="text" 
                  value={`${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`} 
                  readOnly 
                  suppressHydrationWarning
                  className="float-left border-0 !p-0 bg-transparent text-[#333] font-bold text-[14px] w-full -mt-[3px] focus:outline-none"
                />
              </div>
           </div>
        </div>
      </div>

      {/* 7. Size Selection */}
      <div className="category_list border border-[#e0dcdc] mb-[20px] bg-white">
        <div className="category_list_title border-b border-[#e0dcdc] px-[10px] pt-[12px] pb-[16px] flex items-center justify-between cursor-pointer">
          <h5 className="text-[16px] font-medium text-[#333] mb-0 leading-none tracking-widest" style={{ fontFamily: "'Work Sans', sans-serif" }}>Kích cỡ</h5>
          <span className="flaticon-down-arrow text-[14px] text-[#333] leading-none"></span>
        </div>
        <div className="layer-filter">
          <ul className="size m-0 p-[12px_10px_15px] list-none space-y-[10px]">
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <li 
                key={size}
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => toggleFilter("size", size)}
              >
                <div className={`w-3 h-3 border ${isChecked("size", size) ? "bg-primary border-primary" : "border-gray-300"}`}></div>
                <span className={`text-[14px] uppercase ${isChecked("size", size) ? "text-primary font-bold" : "text-[#666] group-hover:text-primary"}`}>
                  {size}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 8. Color Selection */}
      <div className="category_list color_box border border-[#e0dcdc] bg-white">
        <div className="category_list_title border-b border-[#e0dcdc] px-[10px] pt-[12px] pb-[16px] flex items-center justify-between cursor-pointer">
          <h5 className="text-[16px] font-medium text-[#333] mb-0 leading-none tracking-widest" style={{ fontFamily: "'Work Sans', sans-serif" }}>Màu sắc</h5>
          <span className="flaticon-down-arrow text-[14px] text-[#333] leading-none"></span>
        </div>
        <div className="layer-filter">
          <ul className="color m-0 p-[12px_10px_15px] flex flex-wrap gap-[10px] list-none">
            {SHOP_COLORS.map((color) => (
              <li 
                key={color.id} 
                onClick={() => toggleFilter("color", color.name)}
                className={`w-[34px] h-[34px] border flex items-center justify-center p-[2px] cursor-pointer transition-all ${isChecked("color", color.name) ? "border-primary scale-110 shadow-sm" : "border-[#e0dcdc] hover:border-gray-400"}`}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <div
                    className="w-full h-full block relative"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {isChecked("color", color.name) && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="w-[5px] h-[10px] border-white border-b-[1.5px] border-r-[1.5px] rotate-45 mb-[1px]"></span>
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
