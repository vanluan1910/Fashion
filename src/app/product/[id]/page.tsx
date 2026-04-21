import React from "react";
import ProductDetail from "@/features/products/components/ProductDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Detail | Yoha Fashion Store",
  description: "Explore high-end leather handbags and premium fashion items at Yoha Store.",
};

import { getProductById } from "@/features/products/services/productsService";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product as any} />;
}
