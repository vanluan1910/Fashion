"use client";

import React from "react";
import { SHOP_CATEGORIES, SHOP_SIZES, SHOP_COLORS } from "../constants/shop-data";

export function ShopSidebar() {
  return (
    <aside className="w-full lg:w-64 space-y-8 pr-8 border-r border-border hidden lg:block">
      {/* Category List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold border-b border-primary pb-2 uppercase tracking-wider">
          Categories
        </h3>
        <ul className="space-y-2">
          {SHOP_CATEGORIES.map((cat) => (
            <li key={cat.id} className="flex items-center group cursor-pointer">
              <div className="w-4 h-4 border border-border rounded mr-3 group-hover:border-primary transition-colors" />
              <span className="text-sm hover:text-primary transition-colors">{cat.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">({cat.count})</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Size Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold border-b border-primary pb-2 uppercase tracking-wider">
          Size
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {SHOP_SIZES.map((size) => (
            <button 
              key={size}
              className="px-2 py-2 border border-border text-xs font-medium hover:border-primary hover:text-primary transition-all uppercase rounded-md"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold border-b border-primary pb-2 uppercase tracking-wider">
          Color
        </h3>
        <div className="flex flex-wrap gap-3">
          {SHOP_COLORS.map((color) => (
            <button 
              key={color.id}
              className="w-8 h-8 rounded-full border border-border ring-offset-2 hover:ring-2 ring-primary transition-all p-0.5"
              title={color.name}
            >
              <div 
                className="w-full h-full rounded-full" 
                style={{ backgroundColor: color.hex }} 
              />
            </button>
          ))}
        </div>
      </div>

      {/* Price Range placeholder */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold border-b border-primary pb-2 uppercase tracking-wider">
          Price Range
        </h3>
        <input 
          type="range" 
          className="w-full accent-primary"
          min="0"
          max="1000"
        />
        <div className="flex justify-between text-xs font-mono">
          <span>$0</span>
          <span>$1000</span>
        </div>
      </div>
    </aside>
  );
}
