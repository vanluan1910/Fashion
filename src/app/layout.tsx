import React from "react";
import type { Metadata } from "next";
import { Work_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./flaticon.css";

import { Header } from "../shared/components/Header";
import { Footer } from "../shared/components/Footer";
import { NewsletterPopup } from "../shared/components/NewsletterPopup";
import { ScrollToTop } from "../shared/components/ScrollToTop";

// Configure the luxury font
const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-work-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Atelier Fashion | Luxury Clothing Store",
  description: "A premium management platform for high-end fashion houses and wedding ateliers.",
  icons: {
    icon: "/favicon.ico",
  },
};

import { AuthProvider } from "@/core/providers/AuthProvider";
import { CartProvider } from "@/core/providers/CartProvider";
import WishlistProvider from "@/core/providers/WishlistProvider";
import { CurrencyProvider } from "@/core/providers/CurrencyProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${workSans.variable} ${playfair.variable} font-sans antialiased text-[#333] flex flex-col min-h-screen`}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <CurrencyProvider>
                <Header />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
                <NewsletterPopup />
                <ScrollToTop />
              </CurrencyProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
