"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Currency = "VND" | "USD";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (price: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrencyState] = useState<Currency>("VND");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency") as Currency;
    if (savedCurrency) {
      setCurrencyState(savedCurrency);
    }
    setMounted(true);
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem("currency", newCurrency);
  };

  const formatPrice = (price: number) => {
    // Luôn trả về chuỗi rỗng hoặc giá trị mặc định khi chưa nạp xong ở Client
    // Điều này ngăn chặn lỗi Hydration do sai khác giữa Server và Client
    if (!mounted) return ""; 

    if (currency === "USD") {
      // Giá gốc trong Database hiện tại là VND (ví dụ: 1.500.000)
      // Chuyển từ VND sang USD (chia 25000)
      const usdPrice = price / 25000;
      return `$${usdPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      // Giá gốc là VND, chỉ cần định dạng
      return `${price.toLocaleString("vi-VN")}đ`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
