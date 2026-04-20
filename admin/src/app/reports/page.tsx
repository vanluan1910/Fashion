"use client";

import React from "react";
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  Download, 
  Calendar,
  ArrowUpRight,
  Filter
} from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#333]">Báo cáo & Thống kê</h1>
          <p className="text-[#888] text-[13px]">Phân tích chi tiết hiệu quả kinh doanh của cửa hàng.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#eee] rounded-lg text-[13px] font-bold text-[#333]">
            <Calendar size={16} className="text-[#845adf]" />
            <span>Tháng này (Tháng 4, 2024)</span>
          </div>
          <button 
            onClick={() => alert("Hệ thống đang khởi tạo tệp tin PDF... Vui lòng đợi trong giây lát.")}
            className="flex items-center gap-2 px-4 py-2 bg-[#845adf] text-white rounded-lg text-[13px] font-bold hover:bg-[#7248c8]"
          >
            <Download size={16} />
            Tải báo cáo PDF
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: "Doanh thu thuần", value: "850.400.000đ", trend: "+15.2%", icon: <BarChart3 size={20} />, color: "text-blue-600 bg-blue-50" },
           { label: "Lợi nhuận ước tính", value: "320.150.000đ", trend: "+10.8%", icon: <LineChart size={20} />, color: "text-green-600 bg-green-50" },
           { label: "Chi phí marketing", value: "45.000.000đ", trend: "-5.4%", icon: <PieChart size={20} />, color: "text-red-600 bg-red-50" },
         ].map((stat, i) => (
           <div key={i} className="bg-white p-6 rounded-xl border border-[#f1f1f1] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                 <div className={`p-3 rounded-xl ${stat.color}`}>{stat.icon}</div>
                 <span className="text-[12px] font-bold text-green-500 flex items-center gap-1">
                   <ArrowUpRight size={14} /> {stat.trend}
                 </span>
              </div>
              <p className="text-[13px] text-[#999] font-medium mb-1">{stat.label}</p>
              <h3 className="text-xl font-bold text-[#333]">{stat.value}</h3>
           </div>
         ))}
      </div>

      {/* Chart Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white p-6 rounded-xl border border-[#f1f1f1] shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h5 className="font-bold text-[#333]">Xu hướng doanh thu</h5>
               <button className="text-[#999] hover:text-[#333]"><Filter size={18} /></button>
            </div>
            <div className="h-[250px] bg-[#fcfcff] border border-dashed border-[#eee] rounded-lg flex items-center justify-center text-[#bbb]">
               [ Biểu đồ đường Doanh thu tháng ]
            </div>
         </div>
         <div className="bg-white p-6 rounded-xl border border-[#f1f1f1] shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h5 className="font-bold text-[#333]">Phân bổ danh mục</h5>
               <button className="text-[#999] hover:text-[#333]"><Filter size={18} /></button>
            </div>
            <div className="h-[250px] bg-[#fcfcff] border border-dashed border-[#eee] rounded-lg flex items-center justify-center text-[#bbb]">
               [ Biểu đồ tròn Danh mục sản phẩm ]
            </div>
         </div>
      </div>
    </div>
  );
}
