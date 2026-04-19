import React from "react";
import ProductDetail from "@/features/products/components/ProductDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Detail | Yoha Fashion Store",
  description: "Explore high-end leather handbags and premium fashion items at Yoha Store.",
};

import { SHOP_PRODUCTS } from "@/features/shop/constants/shop-data";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = parseInt(id);
  
  const product = SHOP_PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product as any} />;
}
