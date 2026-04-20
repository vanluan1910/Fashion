import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AdminLayout from "@/shared/components/AdminLayout";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Atelier - Admin Dashboard",
  description: "Trang quản trị cho hệ thống thời trang Atelier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} antialiased`}>
      <body className={`${inter.className} h-full`}>
        <AdminLayout>{children}</AdminLayout>
      </body>
    </html>
  );
}
