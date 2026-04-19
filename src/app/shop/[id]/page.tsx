import React from "react";
import ProductDetail from "@/features/products/components/ProductDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Detail | Yoha Fashion Store",
  description: "Explore high-end leather handbags and premium fashion items at Yoha Store.",
};

export default function ProductDetailPage() {
  return <ProductDetail />;
}
