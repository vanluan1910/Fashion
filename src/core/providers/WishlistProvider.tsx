"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getproductsData } from "@/features/products/services/productsService";

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export default function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadWishlist = async () => {
      const savedWishlistIds = localStorage.getItem("wishlist");
      if (savedWishlistIds) {
        try {
          const ids = JSON.parse(savedWishlistIds) as number[];
          if (ids.length > 0) {
            // Lấy toàn bộ sản phẩm để "hydrate" dữ liệu cho danh sách yêu thích
            const allProducts = await getproductsData();
            const filtered = allProducts.filter(p => ids.includes(p.id));
            setWishlistItems(filtered);
          }
        } catch (e) {
          console.error("Failed to parse wishlist ids", e);
        }
      }
      setIsLoaded(true);
    };
    loadWishlist();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      // Chỉ lưu danh sách ID vào localStorage để tránh lỗi QuotaExceeded (do ảnh Base64 quá nặng)
      const ids = wishlistItems.map(item => item.id);
      localStorage.setItem("wishlist", JSON.stringify(ids));
    }
  }, [wishlistItems, isLoaded]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWishlist = (id: number) => {
    return wishlistItems.some((item) => item.id === id);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
