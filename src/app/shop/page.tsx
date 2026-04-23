"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShopBreadcrumb } from "@/features/shop/components/ShopBreadcrumb";
import { ShopSidebar } from "@/features/shop/components/ShopSidebar";
import { ProductGrid } from "@/features/shop/components/ProductGrid";

export default function ShopPage() {
  return (
    <div className="bg-white">
      <ShopBreadcrumb />

      <div className="max-w-[1170px] mx-auto px-[15px] pb-[60px] overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-[30px]">
          {/* Sidebar - fadeInLeft equivalent (1.3s duration) */}
          <motion.div
            className="w-full lg:w-[270px] flex-shrink-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: "easeOut" }}
          >
            <React.Suspense fallback={<div className="h-40 bg-gray-50 animate-pulse rounded-lg" />}>
              <ShopSidebar />
            </React.Suspense>
          </motion.div>

          {/* Product Grid - fadeInRight equivalent (1.3s duration) */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: "easeOut" }}
          >
            <React.Suspense fallback={<div className="py-20 text-center text-[#999] italic">Đang chuẩn bị sản phẩm...</div>}>
              <ProductGrid />
            </React.Suspense>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
