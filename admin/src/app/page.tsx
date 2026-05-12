"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { API_ENDPOINTS } from "@/shared/config/api";

const YEAR_OPTIONS = [2024, 2023] as const;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.DASHBOARD}?period=month&year=2024`);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--admin-accent)] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-12 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content (9 Columns) */}
        <div className="lg:col-span-9 space-y-8">
          
          {/* Hero Section */}
          <section className="relative h-[440px] rounded-[32px] overflow-hidden group shadow-2xl">
            <img 
              src="/images/dashboard/hero-bg.png" 
              alt="Store Interior" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
            <div className="absolute inset-0 flex flex-col justify-center px-12 text-white">
              <p className="admin-section-kicker !text-white/80 !mb-3">Tổng doanh thu tháng này</p>
              <h1 className="text-5xl font-bold tracking-tighter mb-8 tabular-nums">
                2.480.000.000<span className="text-2xl ml-1 underline decoration-2 underline-offset-8 font-medium">đ</span>
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-[var(--admin-danger)]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                  <TrendingUp size={14} />
                  <span className="text-[11px] font-black uppercase tracking-wider">+12.5% so với tháng trước</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  <Clock size={14} className="opacity-60" />
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Cập nhật: 12 phút trước</span>
                </div>
              </div>
            </div>
          </section>

          {/* Metrics Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard 
              label="Đơn hàng mới" 
              value="1,240" 
              change="+8.2%" 
              isUp={true} 
              icon={ShoppingBag} 
            />
            <MetricCard 
              label="Khách hàng mới" 
              value="482" 
              change="+15.4%" 
              isUp={true} 
              icon={Users} 
            />
            <MetricCard 
              label="Giá trị trung bình" 
              value="2,150,000" 
              change="-2.1%" 
              isUp={false} 
              isCurrency={true}
              icon={TrendingUp} 
            />
          </section>

          {/* Featured Products */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="admin-section-kicker">Sản phẩm</span>
                <h2 className="admin-section-title !text-2xl">Sản phẩm nổi bật</h2>
                <p className="text-sm text-[var(--admin-text-muted)]">Bộ sưu tập thu đông mới nhất</p>
              </div>
              <Link href="/products" className="group flex items-center gap-1.5 text-[13px] font-semibold text-[var(--admin-accent)] hover:text-[var(--admin-accent-strong)] transition-colors">
                Xem tất cả <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ProductCard 
                name="Áo Khoác Wool Camel" 
                category="Coats" 
                price="12.500.000đ" 
                image="/images/dashboard/product-coat.png" 
              />
              <ProductCard 
                name="Váy Lụa Champagne" 
                category="Silk Dresses" 
                price="8.200.000đ" 
                image="/images/dashboard/product-dress.png" 
              />
              <ProductCard 
                name="Túi Da Charcoal Minimal" 
                category="Handbags" 
                price="15.900.000đ" 
                image="/images/dashboard/product-bag.png" 
              />
            </div>
          </section>
        </div>

        {/* Sidebar (3 Columns) */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Activity Section */}
          <section className="admin-page-surface p-8 min-h-[500px]">
            <h3 className="admin-section-kicker !text-[var(--admin-heading)] mb-8 pb-4 border-b border-[var(--admin-border)]">Hoạt động</h3>
            <div className="space-y-8">
              <ActivityItem 
                title="Đơn hàng mới #4920 đã được xác nhận" 
                time="15 phút trước" 
                dotColor="bg-[var(--admin-danger)]" 
              />
              <ActivityItem 
                title="Khách hàng Minh Anh vừa đăng ký thành viên" 
                time="42 phút trước" 
                dotColor="bg-slate-300" 
              />
              <ActivityItem 
                title="Sản phẩm Silk Scarf đã hết hàng" 
                time="2 giờ trước" 
                dotColor="bg-slate-300" 
              />
              <ActivityItem 
                title="Cập nhật kho hàng cho bộ sưu tập Satin Blue" 
                time="5 giờ trước" 
                dotColor="bg-slate-300" 
              />
            </div>
          </section>

          {/* Quick Analysis */}
          <section className="admin-page-surface p-8 bg-[rgba(247,244,239,0.5)]">
            <h3 className="admin-section-kicker !mb-6">Phân tích nhanh</h3>
            <div className="space-y-6">
              <AnalysisItem label="Lượt truy cập" value="14,205" />
              <AnalysisItem label="Tỷ lệ chuyển đổi" value="3.4%" progress={35} />
            </div>
          </section>

          {/* Pro Plan Banner */}
          <div className="relative overflow-hidden rounded-[24px] bg-black p-6 text-white shadow-xl group">
             <div className="absolute top-0 right-0 p-3 opacity-20 transform translate-x-1 translate-y--1">
                <ShoppingBag size={80} />
             </div>
             <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">Pro Plan</p>
             <p className="text-sm font-bold mb-4 leading-snug">Nâng cấp trải nghiệm quản lý của bạn</p>
             <button className="w-full py-2.5 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-colors">
                Xem chi tiết
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function MetricCard({ label, value, change, isUp, icon: Icon, isCurrency = false }: any) {
  return (
    <article className="admin-page-surface p-8 group hover:border-[var(--admin-accent)] transition-colors">
      <div className="flex items-start justify-between mb-8">
        <div className="h-10 w-10 rounded-xl bg-[var(--admin-canvas)] flex items-center justify-center text-[var(--admin-accent-strong)] border border-[var(--admin-border)]">
          <Icon size={18} />
        </div>
        <div className={`flex items-center gap-1 text-[11px] font-black ${isUp ? 'text-[var(--admin-success)]' : 'text-[var(--admin-danger)]'}`}>
          {change}
        </div>
      </div>
      <div className="space-y-1">
        <p className="admin-section-kicker">{label}</p>
        <h3 className="text-3xl font-bold text-[var(--admin-heading)] tracking-tight tabular-nums">
          {value}{isCurrency && <span className="text-xl ml-1 font-medium underline decoration-2 underline-offset-4">đ</span>}
        </h3>
      </div>
    </article>
  );
}

function ProductCard({ name, category, price, image }: any) {
  return (
    <div className="group space-y-4">
      <div className="aspect-[3/4] rounded-[24px] overflow-hidden bg-slate-100 relative">
        <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </div>
      <div className="space-y-1">
        <p className="admin-section-kicker !tracking-[0.1em] !opacity-70">{category}</p>
        <h4 className="text-[15px] font-bold text-[var(--admin-heading)] tracking-tight">{name}</h4>
        <p className="text-sm font-bold text-[var(--admin-accent)] tracking-tight">{price}</p>
      </div>
    </div>
  );
}

function ActivityItem({ title, time, dotColor }: any) {
  return (
    <div className="flex gap-4 group">
      <div className="mt-1.5 flex flex-col items-center">
        <div className={`w-2 h-2 rounded-full ${dotColor} shrink-0 ring-4 ring-white shadow-sm`} />
        <div className="w-px h-full bg-[var(--admin-border)] mt-2" />
      </div>
      <div className="space-y-1.5">
        <p className="text-[14px] font-semibold text-[var(--admin-heading)] leading-snug group-hover:text-[var(--admin-accent)] transition-colors">
          {title}
        </p>
        <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--admin-text-muted)] opacity-50">
          {time}
        </p>
      </div>
    </div>
  );
}

function AnalysisItem({ label, value, progress }: any) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-bold text-[var(--admin-text-muted)]">{label}</p>
        <p className="text-[14px] font-bold text-[var(--admin-heading)] tracking-tight">{value}</p>
      </div>
      <div className="w-full h-1 bg-[var(--admin-border)] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[var(--admin-accent)] transition-all duration-1000" 
          style={{ width: progress ? `${progress}%` : '60%' }} 
        />
      </div>
    </div>
  );
}
