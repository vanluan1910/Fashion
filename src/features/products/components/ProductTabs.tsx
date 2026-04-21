"use client";

import React, { useState } from "react";
import { Product } from "../types/product";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ProductTabsProps {
  product: Product;
}

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const tabs = [
    { id: "description", label: "Mô tả sản phẩm" },
    { id: "reviews", label: "Đánh giá & Nhận xét" },
    { id: "shipping", label: "Giao hàng & Đổi trả" },
    { id: "features", label: "Tính năng bổ sung" },
  ];

  if (!isMounted) return null;

  return (
    <div className="bg-white border border-gray-100 mt-12 font-sans" suppressHydrationWarning={true}>
      <div className="border-b border-gray-100 overflow-x-auto no-scrollbar">
        <ul className="flex min-w-max">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                suppressHydrationWarning={true}
                className={`px-8 py-5 text-[14px] font-bold uppercase tracking-widest transition-all relative ${
                  activeTab === tab.id ? "text-primary" : "text-[#666] hover:text-[#333]"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-8">
        <AnimatePresence mode="wait">
          {activeTab === "description" && (
            <motion.div
              key="description"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <p className="text-[15px] text-[#666] leading-relaxed">
                  {product.description || "Đây là sản phẩm cao cấp được tuyển chọn kỹ lưỡng từ bộ sưu tập mới nhất. Với chất liệu tốt nhất và thiết kế dẫn đầu xu hướng, sản phẩm hứa hẹn sẽ mang lại trải nghiệm tuyệt vời cho người dùng."}
                </p>
                <ul className="list-disc pl-5 space-y-4 text-[14px] text-[#666] leading-relaxed">
                  <li>Sản phẩm được gia công tỉ mỉ, đảm bảo chất lượng xuất khẩu.</li>
                  <li>Chất liệu cao cấp, mang lại cảm giác mềm mại và sang trọng.</li>
                  <li>Phù hợp với nhiều phong cách thời trang khác nhau, từ năng động đến thanh lịch.</li>
                </ul>
              </div>

              {product.specifications && (
                <div className="pt-8 border-t border-gray-50">
                  <h6 className="font-bold text-[15px] text-[#333] mb-6 uppercase tracking-wider">Thông số kỹ thuật :</h6>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    {Object.entries(product.specifications).map(([key, value]) => {
                      const labelMap: Record<string, string> = {
                        brand: "Thương hiệu",
                        connectorType: "Kiểu khóa",
                        batteryCapacity: "Dung lượng pin",
                        specialFeature: "Tính năng đặc biệt",
                        weight: "Trọng lượng",
                        warranty: "Bảo hành",
                        ports: "Số ngăn",
                        dimensions: "Kích thước",
                        display: "Kiểu hiển thị",
                        origin: "Xuất xứ"
                      };
                      return (
                        <div key={key} className="flex justify-between border-b border-gray-50 pb-2">
                          <span className="text-[14px] text-gray-400">{labelMap[key] || key}</span>
                          <span className="text-[14px] text-[#333] font-medium">{value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "reviews" && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                <div className="w-full md:w-1/3 space-y-4">
                  <h5 className="font-bold text-[18px] text-[#333]">Đánh giá khách hàng</h5>
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <div className="w-16 h-16 bg-warning/10 text-warning rounded-full flex items-center justify-center text-2xl font-bold">
                      {product.rating || 4.5}
                    </div>
                    <div className="text-left">
                      <div className="flex text-yellow-500">
                        {[1,2,3,4,5].map(s => <span key={s}>★</span>)}
                      </div>
                      <span className="text-[12px] text-gray-400">Dựa trên {(product.reviewsCount || 25).toLocaleString()} lượt đánh giá</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-grow space-y-2 w-full">
                  {[95, 75, 55, 45, 30].map((percent, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <span className="text-[12px] text-gray-500 w-4">{5 - idx}</span>
                      <span className="text-yellow-500 text-[14px]">★</span>
                      <div className="flex-grow h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-primary" 
                          initial={{ width: 0 }}
                          animate={{ width: `${percent}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                      <span className="text-[12px] text-gray-400 w-12 text-right">{(15000 / (idx + 1)).toFixed(0)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Review */}
              <div className="border border-gray-100 rounded-sm p-6 space-y-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-400">DL</div>
                    <div>
                      <h6 className="font-bold text-[14px] text-[#333]">Khách hàng Ẩn Danh</h6>
                      <span className="text-[12px] text-gray-400">29 Tháng 9, 2023</span>
                    </div>
                  </div>
                  <div className="flex text-yellow-500">
                    {[1,2,3,4,5].map(s => <span key={s}>★</span>)}
                  </div>
                </div>
                <p className="text-[14px] text-[#666] italic sentence">"Sản phẩm thực sự rất đẹp! Chất liệu và đường may cực kỳ chắc chắn. Rất đáng tiền."</p>
              </div>
            </motion.div>
          )}

          {activeTab === "shipping" && (
            <motion.div
              key="shipping"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-[14px] text-[#666] leading-relaxed space-y-4"
            >
              <p>Bạn có thể đổi trả sản phẩm trong vòng 30 ngày kể từ khi nhận hàng. Phí vận chuyển cho lần đổi đầu tiên là hoàn toàn miễn phí.</p>
              <p>Nếu bạn muốn đổi lại sau đó (từ lần thứ 2 trở đi), bạn sẽ chịu trách nhiệm cho chi phí vận chuyển phát sinh.</p>
              <h6 className="font-bold text-[#333] uppercase text-[13px] pt-4">Quy trình đổi trả:</h6>
              <ul className="list-decimal pl-5 space-y-2">
                <li>Liên hệ bộ phận chăm sóc khách hàng.</li>
                <li>Đóng gói sản phẩm còn nguyên tem mác.</li>
                <li>Gửi về địa chỉ kho của chúng tôi.</li>
              </ul>
            </motion.div>
          )}

          {activeTab === "features" && (
            <motion.div
              key="features"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
               <ul className="space-y-3">
                {["Thiết kế ergonomic mang lại sự thoải mái tối đa", 
                  "Khóa kéo mạ vàng chống rỉ sét vĩnh viễn", 
                  "Nhiều ngăn chứa bí mật tiện dụng",
                  "Bảo hành chính hãng 1 đổi 1 trong tuần đầu"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-[14px] text-[#666]">
                    <span className="text-green-600 font-bold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
