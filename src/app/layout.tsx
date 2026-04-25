import type { Metadata } from "next";
import { Work_Sans, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "./flaticon.css";
import { Header } from "@/shared/components/Header";
import { Footer } from "@/shared/components/Footer";
import { CartProvider } from "@/core/providers/CartProvider";
import WishlistProvider from "@/core/providers/WishlistProvider";
import { CurrencyProvider } from "@/core/providers/CurrencyProvider";
import { AuthProvider } from "@/core/providers/AuthProvider";
import { NewsletterPopup } from "@/shared/components/NewsletterPopup";
import { ScrollToTop } from "@/shared/components/ScrollToTop";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const elegantoSans = localFont({
  src: [
    {
      path: "../../public/fonts/eleganto-sans/ElegantoSans-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/eleganto-sans/ElegantoSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/eleganto-sans/ElegantoSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/eleganto-sans/ElegantoSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/eleganto-sans/ElegantoSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/eleganto-sans/ElegantoSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-eleganto",
});

export const metadata: Metadata = {
  title: "Yoha Fashion Store | Premium Clothing & Accessories",
  description: "Shop luxury fashion items including handbags, dresses, and man-style t-shirts at Yoha Store.",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${workSans.variable} ${playfair.variable} ${elegantoSans.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased">
        <AuthProvider>
          <CurrencyProvider>
            <CartProvider>
              <WishlistProvider>
                <Header />
                <main>{children}</main>
                <Footer />
                <NewsletterPopup />
                <ScrollToTop />
              </WishlistProvider>
            </CartProvider>
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
