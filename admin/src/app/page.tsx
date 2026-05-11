"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  TrendingUp,
  Users,
  ShoppingBag,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Loader2 as Spinner,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { API_ENDPOINTS } from "@/shared/config/api";

interface StatItem {
  label: string;
  value: string;
  change?: string;
  isUp?: boolean;
  icon: LucideIcon;
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

const PIE_COLORS = ["#8b7766", "#c6875b", "#567261", "#a06f37", "#6e7f96"];
const YEAR_OPTIONS = [2024, 2023] as const;

const NOTIFICATIONS = [
  { title: "Đơn hàng #7425 đã hoàn thành", time: "2 phút trước", tone: "success" },
  { title: "Sản phẩm 'Áo lụa' sắp hết hàng", time: "15 phút trước", tone: "warning" },
  { title: "Khách hàng mới đăng ký", time: "1 giờ trước", tone: "neutral" },
  { title: "Báo cáo doanh thu tháng đã sẵn sàng", time: "3 giờ trước", tone: "accent" },
] as const;

function getStatusTone(status: string) {
  if (status === "Hoàn thành") return "success";
  if (status === "Đang xử lý") return "warning";
  return "danger";
}

export default function DashboardPage() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("year");
  const [selectedYear, setSelectedYear] = useState(YEAR_OPTIONS[0]);
  const categoryTotal = categoryData.reduce((sum, item) => sum + item.value, 0);

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
              value: new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(s.revenue.value),
              change: `${s.revenue.change >= 0 ? "+" : ""}${s.revenue.change}%`,
              isUp: s.revenue.isUp,
              icon: CreditCard,
              compareLabel: "so với tháng trước",
            },
            {
              label: "Đơn hàng mới",
              value: s.orders.value.toString(),
              change: `${s.orders.change >= 0 ? "+" : ""}${s.orders.change}%`,
              isUp: s.orders.isUp,
              icon: ShoppingBag,
              compareLabel: "so với hôm qua",
            },
            {
              label: "Tổng khách hàng",
              value: s.customers.value.toLocaleString("vi-VN"),
              change: `${s.customers.change >= 0 ? "+" : ""}${s.customers.change}%`,
              isUp: s.customers.isUp,
              icon: Users,
              compareLabel: "tăng trưởng tổng",
            },
            {
              label: "Tỷ lệ chuyển đổi",
              value: `${s.conversionRate}%`,
              change: undefined,
              icon: TrendingUp,
              compareLabel: "chưa có dữ liệu so sánh",
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
      <div className="admin-page-surface flex min-h-[380px] items-center justify-center px-5 py-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--admin-border)] bg-[rgba(255,255,255,0.78)] shadow-admin-sm">
            <Spinner className="h-8 w-8 animate-spin text-[var(--admin-accent)]" />
          </div>
          <p className="text-sm font-semibold text-[var(--admin-text-muted)]">Đang tải dữ liệu dashboard...</p>
        </div>
      </div>
    );
  }

  const heroSnapshots = [
    {
      label: "Đơn trong kỳ",
      value: recentOrders.length.toString(),
      note: "Số đơn đã ghi nhận",
    },
    {
      label: "Tổng nhóm hàng",
      value: categoryData.length.toString(),
      note: `${categoryTotal.toLocaleString("vi-VN")} mục`,
    },
  ];

  return (
    <div className="space-y-6">
      <section className="admin-page-surface overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative p-6 sm:p-7 lg:p-8">
            <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-[rgba(139,119,102,0.08)] blur-3xl" />
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--admin-border)] bg-[rgba(255,255,255,0.68)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--admin-text-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--admin-accent)]" />
              Tổng quan
            </div>
            <div className="mt-4 max-w-2xl space-y-3">
              <h1 className="text-[2rem] font-semibold tracking-[-0.05em] text-[var(--admin-heading)] sm:text-[2.4rem] lg:text-[2.7rem]">
                Tổng quan
              </h1>
              <p className="max-w-xl text-sm leading-6 text-[var(--admin-text-muted)]">
                Bố cục sáng, gọn, dễ quét. Khối trên giữ nhịp nhìn, dải chỉ số giữ tín hiệu chính, phần dưới tách phân tích và vận hành.
              </p>
            </div>
          </div>

          <div className="border-t border-[var(--admin-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.58),rgba(255,253,249,0.86))] p-6 sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
            <div className="grid gap-3 sm:grid-cols-2">
              {heroSnapshots.map((snapshot, idx) => (
                <article
                  key={idx}
                  className="rounded-[calc(var(--admin-radius-md)-4px)] border border-[var(--admin-border)] bg-white/78 p-4 shadow-admin-sm"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--admin-text-muted)]">
                    {snapshot.label}
                  </p>
                  <p className="mt-2 text-[1.35rem] font-semibold tracking-[-0.05em] text-[var(--admin-heading)]">
                    {snapshot.value}
                  </p>
                  <p className="mt-1 text-sm text-[var(--admin-text-muted)]">{snapshot.note}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;

          return (
            <article key={idx} className="admin-page-surface p-5 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-[calc(var(--admin-radius-md)-4px)]"
                  style={{ background: "var(--admin-accent-soft)", color: "var(--admin-accent-strong)" }}
                >
                  <Icon size={20} />
                </div>
                <div className="text-right">
                  {stat.change ? (
                    <p
                      className="inline-flex items-center gap-1 text-sm font-semibold"
                      style={{ color: stat.isUp ? "var(--admin-success)" : "var(--admin-danger)" }}
                    >
                      {stat.isUp ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
                      {stat.change}
                    </p>
                  ) : null}
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--admin-text-muted)]">{stat.compareLabel}</p>
                </div>
              </div>

              <div className="mt-5 space-y-1.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--admin-text-muted)]">{stat.label}</p>
                <h3 className="text-[1.55rem] font-semibold tracking-[-0.05em] text-[var(--admin-heading)] sm:text-[1.7rem]">
                  {stat.value}
                </h3>
              </div>
            </article>
          );
        })}
      </section>

      <section className="admin-page-surface overflow-hidden">
        <div className="flex flex-col gap-4 px-5 py-5 sm:px-6 sm:py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-2">
              <span className="admin-section-kicker">Phân tích</span>
              <h2 className="admin-section-title">Hiệu suất kinh doanh</h2>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-end lg:w-auto">
              <div className="w-full min-w-0 sm:flex-1 sm:basis-[12rem] lg:w-auto">
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--admin-text-muted)]">
                  Năm hiển thị
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="admin-select w-full text-[13px] font-medium"
                >
                  {YEAR_OPTIONS.map((year) => (
                    <option key={year} value={year}>
                      Năm {year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full min-w-0 sm:flex-1 sm:basis-[12rem] lg:w-auto">
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--admin-text-muted)]">
                  Chu kỳ phân tích
                </label>
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="admin-select w-full text-[13px] font-medium"
                >
                  <option value="week">Hàng tuần</option>
                  <option value="month">Hàng tháng</option>
                  <option value="year">Hàng năm</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <div className="min-w-0 rounded-[calc(var(--admin-radius-lg)-8px)] border border-[var(--admin-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(255,252,247,0.86))] p-4 shadow-admin-sm">
              <div className="min-w-0" style={{ width: "100%", height: 250, minHeight: 250 }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={250}>
                  <BarChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b7766" />
                        <stop offset="100%" stopColor="#c69678" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(84, 67, 52, 0.12)" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#756659", fontSize: 11, fontWeight: 600 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#756659", fontSize: 11, fontWeight: 600 }}
                      tickFormatter={(value) => `${(value / 1000000).toFixed(0)}tr`}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(139, 119, 102, 0.08)" }}
                      contentStyle={{
                        borderRadius: "18px",
                        border: "1px solid rgba(84, 67, 52, 0.12)",
                        boxShadow: "0 18px 40px -28px rgba(70, 48, 31, 0.42)",
                        fontSize: "12px",
                        fontWeight: "700",
                        padding: "12px 14px",
                        backgroundColor: "rgba(255, 253, 249, 0.96)",
                      }}
                      formatter={(value: any) => [
                        new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(value) || 0),
                        "Doanh thu",
                      ]}
                    />
                    <Bar dataKey="revenue" fill="url(#revenueFill)" radius={[10, 10, 0, 0]} barSize={40} animationDuration={1500} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-[calc(var(--admin-radius-lg)-8px)] border border-[var(--admin-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(255,252,247,0.86))] p-4 shadow-admin-sm">
              <div className="relative min-w-0" style={{ width: "100%", height: 220, minHeight: 220 }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={220}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={92}
                      paddingAngle={6}
                      dataKey="value"
                      animationDuration={1500}
                    >
                      {categoryData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "14px",
                        border: "1px solid rgba(84, 67, 52, 0.12)",
                        boxShadow: "0 18px 40px -28px rgba(70, 48, 31, 0.42)",
                        fontWeight: 700,
                        backgroundColor: "rgba(255, 253, 249, 0.96)",
                      }}
                      formatter={(value: any) =>
                        new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(value) || 0)
                      }
                    />
                  </PieChart>
                </ResponsiveContainer>

                <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--admin-text-muted)]">Danh mục</p>
                  <p className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-[var(--admin-heading)]">{categoryData.length}</p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {categoryData.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-[calc(var(--admin-radius-md)-4px)] border border-[var(--admin-border)] bg-[rgba(255,255,255,0.58)] px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }} />
                      <span className="text-sm font-medium text-[var(--admin-text)]">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-[var(--admin-text-muted)]">
                      {categoryTotal > 0 ? ((item.value / categoryTotal) * 100).toFixed(0) : 0}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <article className="admin-page-surface xl:col-span-1">
          <div className="flex flex-col gap-4 px-5 py-5 sm:px-6 sm:py-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <span className="admin-section-kicker">Vận hành</span>
                <h2 className="admin-section-title">Đơn hàng mới nhất</h2>
              </div>

              <Link
                href="/orders"
                className="inline-flex items-center gap-2 self-start rounded-[calc(var(--admin-radius-md)-4px)] border border-[var(--admin-border)] bg-[rgba(255,255,255,0.68)] px-4 py-2.5 text-sm font-semibold text-[var(--admin-heading)] transition hover:-translate-y-0.5 hover:bg-[var(--admin-surface-strong)]"
              >
                Xem tất cả
                <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="admin-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Khách hàng / Mã đơn</th>
                    <th className="hidden md:table-cell">Sản phẩm</th>
                    <th>Trạng thái</th>
                    <th className="text-right">Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-[calc(var(--admin-radius-md)-4px)] bg-[var(--admin-accent-soft)] text-sm font-semibold text-[var(--admin-accent-strong)]">
                              {order.customer.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[var(--admin-heading)]">{order.customer}</p>
                              <p className="mt-1 text-xs text-[var(--admin-text-muted)]">{order.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="hidden md:table-cell">
                          <div className="text-sm font-medium text-[var(--admin-text)]">{order.product}</div>
                        </td>
                        <td>
                          <span className="admin-status-chip" data-tone={getStatusTone(order.status)}>
                            {order.status}
                          </span>
                        </td>
                        <td className="text-right text-sm font-semibold text-[var(--admin-heading)]">{order.amount}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-16 text-center text-sm font-medium text-[var(--admin-text-muted)]">
                        Chưa có đơn hàng nào được ghi nhận.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </article>

        <article className="admin-page-surface px-5 py-5 sm:px-6 sm:py-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <span className="admin-section-kicker">Nhịp đập của hàng</span>
              <h2 className="admin-section-title">Thông báo mới</h2>
            </div>

            <div className="space-y-3">
              {NOTIFICATIONS.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-[calc(var(--admin-radius-md)-4px)] border border-[var(--admin-border)] bg-[rgba(255,255,255,0.58)] px-4 py-4 transition hover:bg-[rgba(255,255,255,0.78)]"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-1.5 h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor:
                          item.tone === "success"
                            ? "var(--admin-success)"
                            : item.tone === "warning"
                              ? "var(--admin-warning)"
                              : item.tone === "accent"
                                ? "var(--admin-accent)"
                                : "var(--admin-text-muted)",
                      }}
                    />
                    <div>
                      <p className="text-sm font-medium leading-6 text-[var(--admin-text)]">{item.title}</p>
                      <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-[var(--admin-text-muted)]">{item.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/notifications"
              className="inline-flex w-full items-center justify-center rounded-[calc(var(--admin-radius-md)-4px)] border border-[var(--admin-border-strong)] bg-[rgba(255,255,255,0.72)] px-4 py-3 text-sm font-semibold text-[var(--admin-heading)] transition hover:-translate-y-0.5 hover:bg-[var(--admin-surface-strong)]"
            >
              Xem tất cả thông báo
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}
