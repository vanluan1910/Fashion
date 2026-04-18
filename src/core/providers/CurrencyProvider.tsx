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

  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency") as Currency;
    if (savedCurrency) {
      setCurrencyState(savedCurrency);
    }
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem("currency", newCurrency);
  };

  const formatPrice = (price: number) => {
    if (currency === "USD") {
      // Giả sử giá gốc trong data là VND, chia cho 25000 để ra USD
      // Nếu giá trong data là USD sẵn (như hiện tại đang để số nhỏ 45.00), 
      // chúng ta sẽ coi đó là USD và nhân lên cho VND.
      
      // Dựa trên dữ liệu hiện tại (ví dụ: 45.00), có vẻ bạn đang dùng giá USD làm gốc.
      return `$${price.toFixed(2)}`;
    } else {
      // Đổi từ USD sang VND (nhân 25000)
      const vndPrice = price * 25000;
      return `${vndPrice.toLocaleString("vi-VN")}đ`;
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
