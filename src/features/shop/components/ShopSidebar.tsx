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

export function ShopSidebar() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(700);
  const minLimit = 0;
  const maxLimit = 1000;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 50);
    setMinPrice(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 50);
    setMaxPrice(value);
  };

  return (
    <div className="collection_sidebar">
      {/* Mobile Title */}
      <div className="flex items-center justify-between lg:hidden mb-[30px] pb-[20px] border-b border-[#ececec]">
        <h3 className="text-[24px] font-normal text-[#333]">Filter</h3>
        <button className="text-[#333]">
          <CloseIcon className="w-5 h-5" />
        </button>
      </div>

      {/* 1. Shopping by */}
      <div className="category_list border border-[#e0dcdc] mb-[20px] bg-white">
        <div className="category_list_title border-b border-[#e0dcdc] px-[10px] pt-[12px] pb-[16px] flex items-center justify-between cursor-pointer">
          <h2 className="text-[20px] font-bold text-[#333] mb-0 leading-none capitalize">Shopping by</h2>
          <span className="flaticon-down-arrow text-[14px] text-[#333] leading-none"></span>
        </div>
        
        <div className="layer-filter shopping_by_select p-[18px_10px_15px] space-y-[15px]">
          {/* Women Category Select */}
          <div className="select_category flex flex-col mb-[15px]">
            <div className="fill_type overflow-hidden mb-[8px]">
              <p className="fill_name text-[14px] text-[#333] font-normal float-left w-1/2 mb-0">Women</p>
              <a href="#" className="clear text-[#333] text-[14px] text-right float-left w-1/2 capitalize hover:text-primary transition-colors">Clear</a>
            </div>
            <div className="fill_value relative -mt-[7px] block w-[85%] pr-[20px]">
              {["Tops", "Outerwear", "Bottoms", "Activewear"].map(tag => (
                <p key={tag} className="text-[14px] text-[#797979] float-left mr-[11px] mb-[8px] leading-normal inline-flex items-center">
                  {tag} <span className="ml-[6px] cursor-pointer hover:text-primary"><CloseIcon className="w-2 h-2" /></span>
                </p>
              ))}
              <a href="#" className="text-[#797979] hover:text-primary absolute right-0 top-[-4px]">
                <CloseIcon className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Price Select */}
          <div className="select_category">
            <div className="fill_type overflow-hidden mb-[8px]">
              <p className="fill_name text-[14px] text-[#333] font-normal float-left w-1/2 mb-0">Price</p>
              <a href="#" className="clear text-[#333] text-[14px] text-right float-left w-1/2 capitalize hover:text-primary transition-colors">Clear</a>
            </div>
            <div className="fill_value relative -mt-[7px] block w-[85%] pr-[20px]">
              <p className="text-[14px] text-[#797979] mb-[8px] leading-normal">${minPrice} - ${maxPrice}</p>
              <a href="#" className="text-[#797979] hover:text-primary absolute right-0 top-[-4px]">
                <CloseIcon className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Size Select */}
          <div className="select_category flex flex-col mb-[15px]">
            <div className="fill_type overflow-hidden mb-[8px]">
              <p className="fill_name text-[14px] text-[#333] font-normal float-left w-1/2 mb-0">Size</p>
              <a href="#" className="clear text-[#333] text-[14px] text-right float-left w-1/2 capitalize hover:text-primary transition-colors">Clear</a>
            </div>
            <div className="fill_value relative -mt-[7px] block w-[85%] pr-[20px]">
              {["XS", "S", "M", "L", "XL"].map(size => (
                <p key={size} className="text-[14px] text-[#797979] float-left mr-[11px] mb-[8px] leading-normal inline-flex items-center uppercase font-normal">
                  {size} <span className="ml-[6px] cursor-pointer hover:text-primary"><CloseIcon className="w-2 h-2" /></span>
                </p>
              ))}
              <a href="#" className="text-[#797979] hover:text-primary absolute right-0 top-[-4px]">
                <CloseIcon className="w-3 h-3" />
              </a>
            </div>
          </div>

           {/* Color Select */}
          <div className="select_category flex flex-col pb-0 mb-0">
            <div className="fill_type overflow-hidden mb-[8px]">
              <p className="fill_name text-[14px] text-[#333] font-normal float-left w-1/2 mb-0">Color</p>
              <a href="#" className="clear text-[#333] text-[14px] text-right float-left w-1/2 capitalize hover:text-primary transition-colors">Clear</a>
            </div>
            <div className="fill_value relative block w-[85%] pr-[20px] -mt-[7px]">
              <p className="float-left mr-[11px] mb-[8px] leading-normal inline-flex items-center text-[#797979]">
                <span className="w-[13px] h-[13px] bg-[#fbcee0] inline-block mr-[6px]"></span>
                <span className="cursor-pointer hover:text-primary"><CloseIcon className="w-2 h-2" /></span>
              </p>
              <p className="float-left mr-[11px] mb-[8px] leading-normal inline-flex items-center text-[#797979]">
                <span className="w-[13px] h-[13px] bg-[#9cb3f1] inline-block mr-[6px]"></span>
                <span className="cursor-pointer hover:text-primary"><CloseIcon className="w-2 h-2" /></span>
              </p>
              <p className="float-left mr-[11px] mb-[8px] leading-normal inline-flex items-center text-[#797979]">
                <span className="w-[13px] h-[13px] bg-[#fda430] inline-block mr-[6px]"></span>
                <span className="cursor-pointer hover:text-primary"><CloseIcon className="w-2 h-2" /></span>
              </p>
              <a href="#" className="text-[#797979] hover:text-primary absolute right-0 top-[-2px]">
                <CloseIcon className="w-3 h-3" />
              </a>
            </div>
            <a href="#" className="claerall text-uppercase inline-block mt-[15px] text-[15px] font-bold text-[#f74f2e] hover:text-[#333] transition-all">CLEAR ALL</a>
          </div>
        </div>
      </div>

      {/* 2. Availability */}
      <div className="category_list border border-[#e0dcdc] mb-[20px] bg-white">
        <div className="category_list_title border-b border-[#e0dcdc] px-[10px] pt-[12px] pb-[16px] flex items-center justify-between cursor-pointer">
          <h5 className="text-[16px] font-bold uppercase text-[#333] mb-0 leading-none">Availability</h5>
          <span className="flaticon-down-arrow text-[14px] text-[#333] leading-none"></span>
        </div>
        <div className="layer-filter pt-[9px] px-[10px] pb-[12px]">
          <ul className="m-0 p-0 list-none space-y-[7px]">
            <li><a href="#" className="text-[14px] text-[#666] hover:text-primary transition-colors leading-none"> On Sale</a></li>
            <li><a href="#" className="text-[14px] text-[#666] hover:text-primary transition-colors leading-none">In Stock</a></li>
          </ul>
        </div>
      </div>

      {/* 3. Women Category */}
      <div className="category_list border border-[#e0dcdc] mb-[20px] bg-white">
        <div className="category_list_title border-b border-[#e0dcdc] px-[10px] pt-[12px] pb-[16px] flex items-center justify-between cursor-pointer">
          <h5 className="text-[16px] font-bold uppercase text-[#333] mb-0 leading-none">Women</h5>
          <span className="flaticon-down-arrow text-[14px] text-[#333] leading-none"></span>
        </div>
        <div className="layer-filter">
          <div className="search_tag p-[8px_10px_0] relative">
            <input
              type="text"
              placeholder="search"
              className="w-full border-0 border-b border-[#e0dcdc] px-[9px] pb-[7px] text-[12px] text-[#888888] focus:border-primary outline-none"
            />
            <button className="absolute right-[19px] top-[10px] flaticon-magnifying-glass text-[12px] text-[#888888]"></button>
          </div>
          <ul className="women m-0 p-[12px_10px_15px] list-none space-y-[10px]">
            {SHOP_CATEGORIES.map((cat, idx) => (
              <li key={cat.id}>
                <div className="checkbox flex items-center">
                  <input
                    type="checkbox"
                    id={`cat-side-new-${cat.id}`}
                    defaultChecked={idx < 4}
                    className="w-[13px] h-[13px] border-[#e0dcdc] accent-primary rounded-full cursor-pointer"
                  />
                  <label htmlFor={`cat-side-new-${cat.id}`} className="ml-[10px] text-[14px] text-[#666] hover:text-primary cursor-pointer transition-colors leading-none">
                    {cat.name}
                  </label>
                </div>
              </li>
            ))}
          </ul>
          <div className="loadMore px-[15px] pb-[18px] text-[12px] uppercase text-[#333] font-bold cursor-pointer hover:text-primary transition-colors">4 More</div>
        </div>
      </div>

      {/* 4. Men Category */}
      <div className="category_list border border-[#e0dcdc] mb-[20px] bg-white">
        <div className="category_list_title border-b border-[#e0dcdc] px-[10px] pt-[12px] pb-[16px] flex items-center justify-between cursor-pointer">
          <h5 className="text-[16px] font-bold uppercase text-[#333] mb-0 leading-none">Men</h5>
          <span className="flaticon-down-arrow text-[14px] text-[#333] leading-none"></span>
        </div>
        <div className="layer-filter">
          <div className="search_tag p-[8px_10px_0] relative">
            <input
              type="text"
              placeholder="search"
              className="w-full border-0 border-b border-[#e0dcdc] px-[9px] pb-[7px] text-[12px] text-[#888888] focus:border-primary outline-none"
            />
            <button className="absolute right-[19px] top-[10px] flaticon-magnifying-glass text-[12px] text-[#888888]"></button>
          </div>
          <ul className="men m-0 p-[12px_10px_15px] list-none space-y-[10px]">
            {["T-Shirts", "Outerwear", "Basics", "Activewear"].map((cat, idx) => (
              <li key={cat}>
                <div className="checkbox flex items-center">
                  <input
                    type="checkbox"
                    id={`men-side-new-${cat}`}
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
          <div className="loadMore px-[15px] pb-[18px] text-[12px] uppercase text-[#333] font-bold cursor-pointer hover:text-primary transition-colors">4 More</div>
        </div>
      </div>

      {/* 5. Accessories */}
      <div className="category_list border border-[#e0dcdc] mb-[20px] bg-white">
        <div className="category_list_title border-b border-[#e0dcdc] px-[10px] pt-[12px] pb-[16px] flex items-center justify-between cursor-pointer">
          <h5 className="text-[16px] font-bold uppercase text-[#333] mb-0 leading-none">Accessories</h5>
          <span className="flaticon-down-arrow text-[14px] text-[#333] leading-none"></span>
        </div>
        <div className="layer-filter pt-[9px] px-[10px] pb-[12px]">
          <ul className="m-0 p-0 list-none space-y-[10px]">
            {["Glasses", "Handbags", "Apparel", "Shoes"].map(item => (
              <li key={item}>
                <div className="checkbox flex items-center">
                  <input type="checkbox" id={`acc-side-new-${item}`} className="w-[13px] h-[13px] border-[#e0dcdc] accent-primary rounded-full cursor-pointer" />
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
          <h5 className="text-[16px] font-bold uppercase text-[#333] mb-0 leading-none">Price</h5>
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
                  min={minLimit} 
                  max={maxLimit} 
                  value={minPrice} 
                  onChange={handleMinChange}
                  className="dual-range-input absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
                />
                <input 
                  type="range" 
                  min={minLimit} 
                  max={maxLimit} 
                  value={maxPrice} 
                  onChange={handleMaxChange}
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
                <p className="range_title float-left text-[14px] font-bold text-[#333] mr-[5px] mb-0">Price:</p>
                <input 
                  type="text" 
                  value={`$${minPrice} - $${maxPrice}`} 
                  readOnly 
                  className="float-left border-0 !p-0 bg-transparent text-[#333] font-bold text-[14px] w-[110px] -mt-[3px] focus:outline-none"
                />
              </div>
           </div>
        </div>
      </div>

      {/* 7. Size Selection */}
      <div className="category_list border border-[#e0dcdc] mb-[20px] bg-white">
        <div className="category_list_title border-b border-[#e0dcdc] px-[10px] pt-[12px] pb-[16px] flex items-center justify-between cursor-pointer">
          <h5 className="text-[16px] font-bold uppercase text-[#333] mb-0 leading-none">Size</h5>
          <span className="flaticon-down-arrow text-[14px] text-[#333] leading-none"></span>
        </div>
        <div className="layer-filter">
          <div className="search_tag p-[8px_10px_0] relative">
            <input
              type="text"
              placeholder="search"
              className="w-full border-0 border-b border-[#e0dcdc] px-[9px] pb-[7px] text-[12px] text-[#888888] focus:border-primary outline-none"
            />
            <button className="absolute right-[19px] top-[10px] flaticon-magnifying-glass text-[12px] text-[#888888]"></button>
          </div>
          <ul className="size m-0 p-[12px_10px_15px] list-none space-y-[10px]">
            {["XL", "S", "M", "L", "XL", "XXL", "XXXL", "UK 6"].slice(0, 4).map((size) => (
              <li key={size}>
                <div className="checkbox flex items-center uppercase">
                  <input
                    type="checkbox"
                    id={`size-side-new-${size}`}
                    defaultChecked={true}
                    className="w-[13px] h-[13px] border-[#e0dcdc] accent-primary rounded-full cursor-pointer"
                  />
                  <label htmlFor={`size-side-new-${size}`} className="ml-[10px] text-[14px] text-[#666] hover:text-primary cursor-pointer transition-colors leading-none">
                    {size}
                  </label>
                </div>
              </li>
            ))}
          </ul>
          <div className="loadMore px-[15px] pb-[18px] text-[12px] uppercase text-[#333] font-bold cursor-pointer hover:text-primary transition-colors">4 More</div>
        </div>
      </div>

      {/* 8. Color Selection */}
      <div className="category_list color_box border border-[#e0dcdc] bg-white">
        <div className="category_list_title border-b border-[#e0dcdc] px-[10px] pt-[12px] pb-[16px] flex items-center justify-between cursor-pointer">
          <h5 className="text-[16px] font-bold uppercase text-[#333] mb-0 leading-none">Color</h5>
          <span className="flaticon-down-arrow text-[14px] text-[#333] leading-none"></span>
        </div>
        <div className="layer-filter">
          <div className="search_tag p-[8px_10px_0] relative">
            <input
              type="text"
              placeholder="search"
              className="w-full border-0 border-b border-[#e0dcdc] px-[9px] pb-[7px] text-[12px] text-[#888888] focus:border-primary outline-none"
            />
            <button className="absolute right-[19px] top-[10px] flaticon-magnifying-glass text-[12px] text-[#888888]"></button>
          </div>
          <ul className="color m-0 p-[12px_10px_15px] flex flex-wrap gap-[10px] list-none">
            {SHOP_COLORS.map((color, idx) => (
              <li key={color.id} className="w-[34px] h-[34px] border border-[#e0dcdc] flex items-center justify-center p-[2px]">
                <div className="relative w-full h-full flex items-center justify-center">
                  <input
                    type="checkbox"
                    id={`color-side-new-${color.id}`}
                    className="peer hidden"
                    defaultChecked={idx < 3}
                  />
                  <label
                    htmlFor={`color-side-new-${color.id}`}
                    className="w-[28px] h-[28px] block cursor-pointer transition-all relative"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity">
                      <span className="w-[5px] h-[10px] border-white border-b-[1.5px] border-r-[1.5px] rotate-45 mb-[1px]"></span>
                    </span>
                  </label>
                </div>
              </li>
            ))}
          </ul>
          <div className="loadMore px-[15px] pb-[18px] ml-[5px] text-[12px] uppercase text-[#333] font-bold cursor-pointer hover:text-primary transition-colors">2 More</div>
        </div>
      </div>
    </div>
  );
}
