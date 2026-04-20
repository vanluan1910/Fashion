"use client";

import React from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical
} from "lucide-react";

const STATS = [
  {
    label: "Tổng doanh thu",
    value: "1.284.000.000đ",
    change: "+12.5%",
    isUp: true,
    icon: CreditCard,
    color: "bg-blue-100 text-blue-600",
  },
  {
    label: "Đơn hàng mới",
    value: "156",
    change: "+8.2%",
    isUp: true,
    icon: ShoppingBag,
    color: "bg-purple-100 text-purple-600",
  },
  {
    label: "Khách hàng mới",
    value: "2.420",
    change: "-2.4%",
    isUp: false,
    icon: Users,
    color: "bg-green-100 text-green-600",
  },
  {
    label: "Tỷ lệ chuyển đổi",
    value: "3.24%",
    change: "+1.5%",
    isUp: true,
    icon: TrendingUp,
    color: "bg-orange-100 text-orange-600",
  },
];

const RECENT_ORDERS = [
  { id: "#ORD-7421", customer: "Nguyễn Văn A", product: "Áo sơ mi lụa", amount: "1.200.000đ", status: "Hoàn thành" },
  { id: "#ORD-7422", customer: "Trần Thị B", product: "Đầm dạ hội", amount: "3.500.000đ", status: "Đang xử lý" },
  { id: "#ORD-7423", customer: "Lê Văn C", product: "Quần tây Âu", amount: "850.000đ", status: "Đã hủy" },
  { id: "#ORD-7424", customer: "Phạm Minh D", product: "Giày da cao cấp", amount: "2.100.000đ", status: "Hoàn thành" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#333]">Tổng quan Dashboard</h1>
          <p className="text-[#555] text-[14px]">Chào mừng trở lại, đây là những gì đang diễn ra với cửa hàng của bạn hôm nay.</p>
        </div>
        <div className="flex items-center gap-3 text-[13px]">
          <Link href="/reports" className="px-4 py-2 bg-white border border-[#eee] rounded-lg font-bold text-[#333] hover:bg-[#f3f4f9] transition-all shadow-sm">
            Xuất báo cáo
          </Link>
          <Link href="/orders" className="px-4 py-2 bg-[#845adf] text-white rounded-lg font-medium hover:bg-[#7248c8] transition-all">
            Lịch sử giao dịch
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-xl border border-[#f1f1f1] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <button className="text-[#999] hover:text-[#333]">
                  <MoreVertical size={18} />
                </button>
              </div>
              <p className="text-[#666] text-[13px] font-bold mb-1 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-bold text-[#333] mb-2">{stat.value}</h3>
              <div className="flex items-center gap-1">
                <span className={`flex items-center text-[12px] font-bold ${stat.isUp ? "text-green-600" : "text-red-600"}`}>
                  {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.change}
                </span>
                <span className="text-[#666] text-[11px] font-medium">so với tháng trước</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid Layout for Charts & Lists */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Chart Placeholder */}
        <div className="xl:col-span-2 bg-white p-6 rounded-xl border border-[#f1f1f1] shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-[16px] font-bold text-[#333]">Doanh thu theo thời gian</h4>
              <p className="text-[#666] text-[12px] font-medium">Thống kê chi tiết doanh thu từ đầu năm 2024</p>
            </div>
            <div className="flex items-center gap-2">
              <select className="text-[12px] bg-[#f3f4f9] border-none rounded px-3 py-1.5 focus:ring-0">
                <option>Hàng tuần</option>
                <option>Hàng tháng</option>
                <option>Hàng năm</option>
              </select>
            </div>
          </div>
          <div className="h-[300px] w-full bg-[#fcfcfc] rounded-lg border border-dashed border-[#eee] flex items-center justify-center text-[#bbb] text-[14px]">
            [ Biểu đồ sự tăng trưởng doanh thu ]
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-xl border border-[#f1f1f1] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-[16px] font-bold text-[#333]">Đơn hàng gần đây</h4>
            <Link href="/orders" className="text-[#845adf] text-[12px] font-bold hover:underline">
              Xem tất cả
            </Link>
          </div>
          <div className="space-y-6">
            {RECENT_ORDERS.map((order, idx) => (
              <div key={idx} className="flex items-center justify-between pb-4 border-b border-[#f9f9f9] last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#f3f4f9] rounded-full flex items-center justify-center text-[#845adf] font-bold text-[12px]">
                    {order.customer.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-[#333] mb-0.5">{order.customer}</p>
                    <p className="text-[11px] text-[#666] uppercase font-bold">{order.id} • {order.product}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-bold text-[#333] mb-0.5">{order.amount}</p>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    order.status === "Hoàn thành" ? "bg-green-100 text-green-600" : 
                    order.status === "Đang xử lý" ? "bg-orange-100 text-orange-600" : 
                    "bg-red-100 text-red-600"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
