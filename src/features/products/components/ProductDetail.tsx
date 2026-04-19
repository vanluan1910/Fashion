"use client";

import React from "react";
import { Breadcrumb } from "@/shared/components/Breadcrumb";
import { ProductDetailGallery } from "./ProductDetailGallery";
import { ProductDetailInfo } from "./ProductDetailInfo";
import { ProductTabs } from "./ProductTabs";
import { SAMPLE_PRODUCT } from "../constants";

import { Product } from "../types/product";

export default function ProductDetail({ product }: { product: Product }) {

  return (
    <main className="bg-white min-h-screen pb-20 font-sans">
      <Breadcrumb 
        title="Chi Tiết Sản Phẩm" 
        items={[
          { label: "Cửa hàng", href: "/shop" },
          { label: "Chi tiết sản phẩm" }
        ]} 
      />

      <div className="max-w-[1170px] mx-auto px-[15px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Gallery */}
          <div className="lg:col-span-5">
            <ProductDetailGallery images={product.images || [product.image]} />
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-7">
            <ProductDetailInfo product={product} />
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <ProductTabs product={product} />
        </div>
      </div>
    </main>
  );
}
