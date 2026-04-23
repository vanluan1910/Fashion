"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getproductsData } from "@/features/products/services/productsService";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = async () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          const storedItems = JSON.parse(savedCart) as any[];
          if (storedItems.length > 0) {
            // Lấy dữ liệu sản phẩm mới nhất để "hydrate" (lấy name, price, image)
            const allProducts = await getproductsData();
            
            const hydratedItems = storedItems.map(item => {
              const product = allProducts.find(p => p.id === item.id);
              if (product) {
                return {
                  ...item,
                  name: product.name,
                  price: product.price,
                  image: product.image
                };
              }
              return item;
            }).filter(item => item.name); // Chỉ giữ lại nếu tìm thấy sản phẩm

            setCartItems(hydratedItems);
          }
        } catch (e) {
          console.error("Failed to parse cart", e);
        }
      }
      setIsLoaded(true);
    };
    loadCart();
  }, []);

  // Save cart to localStorage whenever it changes (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      // Chỉ lưu các thông tin tùy chọn của người dùng, không lưu ảnh/tên (để tránh đầy bộ nhớ)
      const slimItems = cartItems.map(({ id, quantity, size, color }) => ({
        id, quantity, size, color
      }));
      localStorage.setItem("cart", JSON.stringify(slimItems));
    }
  }, [cartItems, isLoaded]);

  const addToCart = (newItem: CartItem) => {
    console.log("Adding to cart:", newItem);
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === newItem.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === newItem.id 
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      cartCount, 
      cartTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
