"use client";

import React, { useState } from "react";
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  Download, 
  Calendar,
  ArrowUpRight,
  Filter
} from "lucide-react";
import Dialog from "@/shared/components/Dialog";

export default function ReportsPage() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#333] tracking-tight">Báo cáo & Thống kê</h1>
          <p className="text-[#888] text-[13px] font-medium mt-1">Phân tích chi tiết hiệu quả kinh doanh của cửa hàng.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#eee] rounded-xl text-[13px] font-bold text-[#333] shadow-sm">
            <Calendar size={18} className="text-[#f74f2e]" />
            <span>Tháng này (Tháng 4, 2024)</span>
          </div>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#f74f2e] text-white rounded-xl text-[13px] font-bold hover:bg-[#d24327] shadow-lg shadow-[#f74f2e]/20 transition-all active:scale-95"
          >
            <Download size={18} />
            Tải báo cáo PDF
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: "Doanh thu thuần", value: "850.400.000đ", trend: "+15.2%", icon: <BarChart3 size={24} />, color: "text-blue-600 bg-blue-50" },
           { label: "Lợi nhuận ước tính", value: "320.150.000đ", trend: "+10.8%", icon: <LineChart size={24} />, color: "text-green-600 bg-green-50" },
           { label: "Chi phí marketing", value: "45.000.000đ", trend: "-5.4%", icon: <PieChart size={24} />, color: "text-red-600 bg-red-50" },
         ].map((stat, i) => (
           <div key={i} className="bg-white p-6 rounded-2xl border border-[#eee] shadow-sm hover:border-[#f74f2e]/30 transition-all group">
              <div className="flex items-center justify-between mb-4">
                 <div className={`p-3.5 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform`}>{stat.icon}</div>
                 <span className="px-3 py-1 bg-green-50 rounded-full text-[12px] font-black text-green-600 flex items-center gap-1 border border-green-100">
                   <ArrowUpRight size={14} /> {stat.trend}
                 </span>
              </div>
              <p className="text-[12px] text-[#999] font-black uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-[#333] tracking-tight">{stat.value}</h3>
           </div>
         ))}
      </div>

      {/* Chart Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white p-6 rounded-2xl border border-[#eee] shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-8">
               <h5 className="font-extrabold text-[#333] text-[16px]">Xu hướng doanh thu</h5>
               <button className="p-2 text-[#999] hover:bg-gray-100 rounded-lg transition-all"><Filter size={20} /></button>
            </div>
            <div className="h-[300px] bg-[#fcfcff] border border-dashed border-[#eee] rounded-2xl flex flex-col items-center justify-center text-[#bbb] gap-3">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#eee]">
                  <LineChart size={32} className="opacity-20" />
               </div>
               <p className="text-[14px] font-bold">[ Biểu đồ đường Doanh thu tháng ]</p>
            </div>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-[#eee] shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-8">
               <h5 className="font-extrabold text-[#333] text-[16px]">Phân bổ danh mục</h5>
               <button className="p-2 text-[#999] hover:bg-gray-100 rounded-lg transition-all"><Filter size={20} /></button>
            </div>
            <div className="h-[300px] bg-[#fcfcff] border border-dashed border-[#eee] rounded-2xl flex flex-col items-center justify-center text-[#bbb] gap-3">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#eee]">
                  <PieChart size={32} className="opacity-20" />
               </div>
               <p className="text-[14px] font-bold">[ Biểu đồ tròn Danh mục sản phẩm ]</p>
            </div>
         </div>
      </div>

      {/* Export Dialog */}
      <Dialog
        isOpen={isExporting}
        onClose={() => setIsExporting(false)}
        title="Đang khởi tạo báo cáo"
        message="Hệ thống đang tổng hợp dữ liệu và khởi tạo tệp tin PDF chất lượng cao. Quá trình này có thể mất vài giây, vui lòng không đóng trình duyệt."
        type="info"
      />
    </div>
  );
}
