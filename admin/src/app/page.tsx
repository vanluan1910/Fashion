"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Loader2 as Spinner
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar
} from "recharts";
import { API_ENDPOINTS } from "@/shared/config/api";

interface StatItem {
  label: string;
  value: string;
  change: string;
  isUp: boolean;
  icon: any;
  color: string;
  compareLabel: string;
}

interface RecentOrder {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: string;
  date: string;
}

interface RevenueData {
  name: string;
  revenue: number;
}

interface CategoryData {
  name: string;
  value: number;
}

const PIE_COLORS = ["#f74f2e", "#2563eb", "#10b981", "#f59e0b", "#8b5cf6"];

export default function DashboardPage() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("year");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.DASHBOARD}?period=${period}&year=${selectedYear}`);
        const data = await response.json();
        
        if (data && data.stats) {
          const { stats: s } = data;
          setStats([
            {
              label: "Tổng doanh thu",
              value: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(s.revenue.value),
              change: `${s.revenue.change >= 0 ? "+" : ""}${s.revenue.change}%`, 
              isUp: s.revenue.isUp,
              icon: CreditCard,
              color: "bg-blue-100 text-blue-600",
              compareLabel: "so với tháng trước"
            },
            {
              label: "Đơn hàng mới",
              value: s.orders.value.toString(),
              change: `${s.orders.change >= 0 ? "+" : ""}${s.orders.change}%`,
              isUp: s.orders.isUp,
              icon: ShoppingBag,
              color: "bg-purple-100 text-purple-600",
              compareLabel: "so với hôm qua"
            },
            {
              label: "Tổng khách hàng",
              value: s.customers.value.toLocaleString(),
              change: `${s.customers.change >= 0 ? "+" : ""}${s.customers.change}%`,
              isUp: s.customers.isUp,
              icon: Users,
              color: "bg-green-100 text-green-600",
              compareLabel: "tăng trưởng tổng"
            },
            {
              label: "Tỷ lệ chuyển đổi",
              value: s.conversionRate + "%",
              change: "+1.5%", // This one can remain dummy or be calculated if logic added
              isUp: true,
              icon: TrendingUp,
              color: "bg-orange-100 text-orange-600",
              compareLabel: "so với tháng trước"
            },
          ]);

          setRecentOrders(data.recentOrders);
          setRevenueData(data.revenueStats);
          setCategoryData(data.categoryStats);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [period, selectedYear]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Spinner className="w-10 h-10 text-[#f74f2e] animate-spin" />
          <p className="text-[#666] font-medium">Đang tải dữ liệu dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#333]">Tổng quan Dashboard</h1>
          <p className="text-[#444] text-[14px] font-medium">Chào mừng trở lại, đây là những gì đang diễn ra với cửa hàng của bạn hôm nay.</p>
        </div>
        <div className="flex items-center gap-3 text-[13px]">
          <Link href="/reports" className="px-4 py-2 bg-white border border-[#eee] rounded-lg font-bold text-[#333] hover:bg-[#f3f4f9] transition-all shadow-sm">
            Xuất báo cáo
          </Link>
          <Link href="/orders" className="px-4 py-2 bg-[#f74f2e] text-white rounded-lg font-medium hover:bg-[#d24327] transition-all">
            Lịch sử giao dịch
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
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
              <p className="text-[#444] text-[13px] font-black mb-1 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-[#222] mb-2">{stat.value}</h3>
              <div className="flex items-center gap-1">
                <span className={`flex items-center text-[12px] font-black ${stat.isUp ? "text-green-600" : "text-red-600"}`}>
                  {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.change}
                </span>
                <span className="text-[#555] text-[11px] font-bold">{stat.compareLabel}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-[#f1f1f1] shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h4 className="text-[18px] font-black text-[#222] tracking-tight">Hiệu suất Doanh thu</h4>
              <p className="text-[#555] text-[13px] font-semibold mt-1">
                Biểu đồ tăng trưởng doanh thu chi tiết theo {period === 'year' ? 'tháng' : period === 'month' ? 'ngày' : 'thứ'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="text-[12px] font-black text-[#333] bg-[#f3f4f9] border border-[#eee] rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#f74f2e]/20 transition-all"
              >
                <option value={2024}>Năm 2024</option>
                <option value={2023}>Năm 2023</option>
              </select>
              <select 
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="text-[12px] font-black text-[#333] bg-[#f3f4f9] border border-[#eee] rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#f74f2e]/20 transition-all"
              >
                <option value="week">Hàng tuần</option>
                <option value="month">Hàng tháng</option>
                <option value="year">Hàng năm</option>
              </select>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#777', fontSize: 11, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#777', fontSize: 11, fontWeight: 700 }}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(0)}tr`}
                />
                <Tooltip 
                  cursor={{ fill: '#f74f2e', opacity: 0.05 }}
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    fontSize: '12px',
                    fontWeight: '800',
                    padding: '12px 16px'
                  }}
                  formatter={(value: any) => [new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value), "Doanh thu"]}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="#f74f2e" 
                  radius={[8, 8, 0, 0]} 
                  barSize={40}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-8 rounded-2xl border border-[#f1f1f1] shadow-sm hover:shadow-md transition-all">
           <h4 className="text-[18px] font-black text-[#222] tracking-tight mb-2">Phân loại Sản phẩm</h4>
           <p className="text-[#555] text-[12px] font-semibold mb-8">Phân bổ doanh thu theo danh mục</p>
           <div className="h-[280px] w-full relative">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                    animationDuration={1500}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                    formatter={(value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                 <p className="text-[10px] font-black uppercase text-[#999] tracking-widest">Sản phẩm</p>
                 <p className="text-[16px] font-black text-[#333]">{categoryData.length}</p>
              </div>
           </div>
           <div className="mt-8 space-y-4">
              {categoryData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}></div>
                      <span className="text-[13px] font-bold text-[#444]">{item.name}</span>
                   </div>
                   <span className="text-[12px] font-black text-[#777]">
                      {((item.value / categoryData.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(0)}%
                   </span>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Second Row: Recent Orders & Top Activities */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="xl:col-span-2 bg-white p-8 rounded-2xl border border-[#f1f1f1] shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-[18px] font-black text-[#222] tracking-tight">Đơn hàng mới nhất</h4>
              <p className="text-[#555] text-[12px] font-semibold mt-1">Danh sách các giao dịch vừa phát sinh</p>
            </div>
            <Link href="/orders" className="flex items-center gap-2 px-5 py-2.5 bg-[#f3f4f9] text-[#f74f2e] text-[12px] font-black rounded-xl hover:bg-[#f74f2e] hover:text-white transition-all group">
              Xem tất cả <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
          <div className="space-y-1">
            <div className="grid grid-cols-5 p-4 text-[11px] font-black text-[#999] uppercase tracking-widest border-b border-[#f9f9f9]">
              <div className="col-span-2">Khách hàng / Mã đơn</div>
              <div className="text-center">Sản phẩm</div>
              <div className="text-center">Trạng thái</div>
              <div className="text-right">Tổng tiền</div>
            </div>
            {recentOrders.length > 0 ? (
              recentOrders.map((order, idx) => (
                <div key={idx} className="grid grid-cols-5 items-center p-4 hover:bg-[#fcfcff] rounded-xl transition-colors group">
                  <div className="col-span-2 flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#f3f4f9] rounded-2xl flex items-center justify-center text-[#f74f2e] font-black text-[16px] group-hover:scale-110 transition-transform">
                      {order.customer.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[14px] font-black text-[#222] mb-0.5">{order.customer}</p>
                      <p className="text-[11px] text-[#888] font-bold">{order.id}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-[13px] font-bold text-[#555] line-clamp-1">{order.product}</span>
                  </div>
                  <div className="text-center">
                    <span className={`text-[10px] font-black uppercase px-4 py-1.5 rounded-full border transition-all ${
                      order.status === "Hoàn thành" ? "bg-green-50 text-green-600 border-green-100" : 
                      order.status === "Đang xử lý" ? "bg-orange-50 text-orange-600 border-orange-100" : 
                      "bg-red-50 text-red-600 border-red-100"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-[14px] font-black text-[#222]">{order.amount}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center text-[#999] text-[13px] font-bold">
                Chưa có đơn hàng nào được ghi nhận.
              </div>
            )}
          </div>
        </div>

        {/* Top Products / Activities placeholder */}
        <div className="bg-white p-8 rounded-2xl border border-[#f1f1f1] shadow-sm hover:shadow-md transition-all">
           <h4 className="text-[18px] font-black text-[#222] tracking-tight mb-2">Thông báo mới</h4>
           <p className="text-[#555] text-[12px] font-semibold mb-8">Hoạt động gần đây từ cửa hàng</p>
           <div className="space-y-6">
              {[
                { title: "Đơn hàng #7425 đã hoàn thành", time: "2 phút trước", color: "bg-green-500" },
                { title: "Sản phẩm 'Áo lụa' sắp hết hàng", time: "15 phút trước", color: "bg-orange-500" },
                { title: "Khách hàng mới đăng ký", time: "1 giờ trước", color: "bg-blue-500" },
                { title: "Báo cáo doanh thu tháng đã sẵn sàng", time: "3 giờ trước", color: "bg-purple-500" }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                   <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${item.color}`}></div>
                   <div>
                      <p className="text-[13px] font-bold text-[#444] leading-tight">{item.title}</p>
                      <p className="text-[11px] text-[#999] mt-1">{item.time}</p>
                   </div>
                </div>
              ))}
           </div>
           <Link 
             href="/notifications"
             className="block w-full mt-10 py-3 bg-[#f3f4f9] text-[#666] font-black text-[12px] text-center rounded-xl hover:bg-[#333] hover:text-white transition-all uppercase tracking-widest"
           >
              Xem tất cả thông báo
           </Link>
        </div>
      </div>
    </div>
  );
}
