"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShopBreadcrumb } from "@/features/shop/components/ShopBreadcrumb";
import { ShopSidebar } from "@/features/shop/components/ShopSidebar";
import { ProductGrid } from "@/features/shop/components/ProductGrid";

export default function ShopPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="bg-white min-h-screen">
      <ShopBreadcrumb />

      <div className="max-w-[1170px] mx-auto px-[15px] pb-[60px]">
        <div className="flex flex-col lg:flex-row gap-[30px]">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-[270px] flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <React.Suspense fallback={<div className="h-40 bg-gray-50 animate-pulse rounded-lg" />}>
                <ShopSidebar />
              </React.Suspense>
            </motion.div>
          </div>

          {/* Mobile Sidebar Drawer */}
          <AnimatePresence>
            {isFilterOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsFilterOpen(false)}
                  className="fixed inset-0 bg-black/50 z-[1000] lg:hidden"
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed inset-y-0 left-0 w-[85%] max-w-[320px] bg-white z-[1001] lg:hidden shadow-2xl p-5 overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-[#333]">Bộ lọc</h3>
                    <button onClick={() => setIsFilterOpen(false)} className="p-2 text-gray-500 hover:text-primary transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <ShopSidebar isMobile={true} />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <React.Suspense fallback={<div className="py-20 text-center text-[#999] italic">Đang chuẩn bị sản phẩm...</div>}>
              <ProductGrid onFilterOpen={() => setIsFilterOpen(true)} />
            </React.Suspense>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
