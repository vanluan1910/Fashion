"use client";

import Link from "next/link";
import React, { useState } from "react";
import { ADMIN_SIDEBAR_LAYOUT } from "./Sidebar";
import { API_ENDPOINTS } from "@/shared/config/api";
import {
  Bell,
  ChevronDown,
  Globe,
  Grid,
  LogOut,
  Maximize,
  Menu,
  Search,
  User,
} from "lucide-react";

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const QUICK_APPS = [
  { label: "Lịch", tone: "bg-[rgba(86,114,97,0.12)]" },
  { label: "Email", tone: "bg-[rgba(138,90,68,0.14)]" },
  { label: "Files", tone: "bg-[rgba(160,111,55,0.14)]" },
  { label: "Chat", tone: "bg-[rgba(47,41,37,0.08)]" },
  { label: "Cài đặt", tone: "bg-[rgba(117,102,89,0.12)]" },
  { label: "Hỗ trợ", tone: "bg-[rgba(155,87,76,0.12)]" },
];

export function Header({ onToggleSidebar, isSidebarOpen }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [recentSignups, setRecentSignups] = useState<any[]>([]);

  const handleLogout = () => {
    localStorage.removeItem("atelier_admin_auth");
    localStorage.removeItem("atelier_admin_user");
    window.location.href = "/login";
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  React.useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.AUTH}/recent-signups`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result && result.success) {
          setRecentSignups(Array.isArray(result.data) ? result.data : []);
        }
      } catch (error) {
        console.warn("Thông báo: Không thể kết nối tới máy chủ để lấy dữ liệu thông báo mới.");
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diff < 1) return "Vừa xong";
    if (diff < 60) return `${diff} phút trước`;
    return `${Math.floor(diff / 60)} giờ trước`;
  };

  const searchPlaceholder = "Tìm kiếm sản phẩm, đơn hàng hoặc khách hàng...";

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[90] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isSidebarOpen
          ? ADMIN_SIDEBAR_LAYOUT.expandedOffset
          : ADMIN_SIDEBAR_LAYOUT.collapsedOffset
      }`}
    >
      <div className="px-4 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex h-[70px] max-w-[1600px] items-center gap-3 rounded-[24px] border border-[var(--admin-border)] bg-[rgba(255,251,246,0.82)] px-3 shadow-[var(--admin-shadow-md)] backdrop-blur-[18px] sm:px-4">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] border border-[var(--admin-border)] bg-[rgba(255,255,255,0.62)] text-[var(--admin-heading)] transition-all duration-300 hover:-translate-y-px hover:border-[var(--admin-border-strong)] hover:bg-white active:translate-y-0"
              aria-label="Toggle sidebar"
            >
              <Menu size={18} />
            </button>

            <div className="hidden min-w-0 flex-1 md:block">
              <div className="group relative">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)] transition-colors group-focus-within:text-[var(--admin-accent)]"
                />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  className="h-12 w-full rounded-[18px] border border-[var(--admin-border)] bg-[rgba(255,253,249,0.92)] pl-11 pr-16 text-[14px] text-[var(--admin-text)] outline-none transition-all duration-300 placeholder:text-[var(--admin-text-muted)] focus:border-[rgba(138,90,68,0.34)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(138,90,68,0.08)] lg:pr-28"
                />
                <div className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-full border border-[rgba(84,67,52,0.12)] bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--admin-text-muted)] lg:flex">
                  <span>Ctrl</span>
                  <span>K</span>
                </div>
              </div>
            </div>

            <div className="hidden xl:flex flex-col leading-none">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[var(--admin-text-muted)]">
                Command deck
              </span>
              <span className="mt-1 text-sm font-medium text-[var(--admin-heading)]">
                Retail operations overview
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-[18px] border border-[var(--admin-border)] bg-[rgba(255,255,255,0.58)] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:flex">
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex h-9 w-9 items-center justify-center rounded-[14px] text-[var(--admin-text-muted)] transition-all duration-300 hover:bg-white hover:text-[var(--admin-heading)]"
                  aria-label="Change language"
                >
                  <Globe size={16} />
                </button>
                {isLangOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsLangOpen(false)}></div>
                    <div className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-[20px] border border-[var(--admin-border)] bg-[var(--admin-surface-strong)] py-2 shadow-[var(--admin-shadow-md)]">
                      <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-[13px] text-[var(--admin-text)] transition-colors hover:bg-[var(--admin-accent-soft)]">
                        Tiếng Việt
                      </button>
                      <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-[13px] text-[var(--admin-text)] transition-colors hover:bg-[var(--admin-accent-soft)]">
                        English
                      </button>
                      <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-[13px] text-[var(--admin-text)] transition-colors hover:bg-[var(--admin-accent-soft)]">
                        French
                      </button>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={handleFullscreen}
                className="flex h-9 w-9 items-center justify-center rounded-[14px] text-[var(--admin-text-muted)] transition-all duration-300 hover:bg-white hover:text-[var(--admin-heading)]"
                title="Toàn màn hình"
              >
                <Maximize size={16} />
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsGridOpen(!isGridOpen)}
                  className="flex h-9 w-9 items-center justify-center rounded-[14px] text-[var(--admin-text-muted)] transition-all duration-300 hover:bg-white hover:text-[var(--admin-heading)]"
                  aria-label="Quick apps"
                >
                  <Grid size={16} />
                </button>
                {isGridOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsGridOpen(false)}></div>
                    <div className="absolute right-0 z-20 mt-2 w-[280px] rounded-[24px] border border-[var(--admin-border)] bg-[var(--admin-surface-strong)] p-4 shadow-[var(--admin-shadow-md)]">
                      <h6 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--admin-text-muted)]">
                        Tiện ích nhanh
                      </h6>
                      <div className="grid grid-cols-3 gap-3">
                        {QUICK_APPS.map((app) => (
                          <div
                            key={app.label}
                            className="group flex cursor-pointer flex-col items-center gap-2 rounded-[18px] p-2 transition-colors hover:bg-[rgba(138,90,68,0.06)]"
                          >
                            <div className={`flex h-11 w-11 items-center justify-center rounded-[16px] ${app.tone}`}>
                              <div className="h-4 w-4 rounded-full bg-[rgba(111,71,54,0.7)]" />
                            </div>
                            <span className="text-[11px] font-medium text-[var(--admin-text-muted)]">
                              {app.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative flex h-11 items-center gap-2 rounded-[18px] border border-[var(--admin-border)] bg-[rgba(255,255,255,0.58)] px-3 text-[var(--admin-heading)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 hover:-translate-y-px hover:bg-white"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-[14px] bg-[rgba(138,90,68,0.08)] text-[var(--admin-accent-strong)]">
                  <Bell size={16} />
                </span>
                <div className="hidden text-left sm:block">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--admin-text-muted)]">
                    Alerts
                  </p>
                  <p className="text-sm font-medium text-[var(--admin-heading)]">
                    {recentSignups.length > 0 ? `${recentSignups.length} mới` : "Ổn định"}
                  </p>
                </div>
                {recentSignups.length > 0 && (
                  <span className="absolute right-2 top-2 flex min-w-[18px] items-center justify-center rounded-full bg-[var(--admin-accent)] px-1.5 text-[10px] font-bold text-white">
                    {recentSignups.length}
                  </span>
                )}
              </button>
              {isNotificationsOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsNotificationsOpen(false)}></div>
                  <div className="absolute right-0 z-20 mt-2 w-[320px] overflow-hidden rounded-[24px] border border-[var(--admin-border)] bg-[var(--admin-surface-strong)] shadow-[var(--admin-shadow-lg)]">
                    <div className="flex items-center justify-between border-b border-[var(--admin-border)] px-4 py-4">
                      <div>
                        <h5 className="text-sm font-semibold text-[var(--admin-heading)]">Thông báo mới</h5>
                        <p className="mt-1 text-xs text-[var(--admin-text-muted)]">
                          Theo dõi đăng ký khách hàng gần đây
                        </p>
                      </div>
                      <span className="rounded-full bg-[var(--admin-accent-soft)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--admin-accent-strong)]">
                        {recentSignups.length} mới
                      </span>
                    </div>
                    <div className="max-h-[320px] overflow-y-auto">
                      {recentSignups.length > 0 ? (
                        recentSignups.map((n, i) => (
                          <Link
                            key={i}
                            href="/customers"
                            onClick={() => setIsNotificationsOpen(false)}
                            className="flex gap-3 border-b border-[rgba(84,67,52,0.08)] px-4 py-4 transition-colors hover:bg-[rgba(138,90,68,0.05)] last:border-b-0"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] bg-[rgba(138,90,68,0.12)] text-[var(--admin-accent-strong)]">
                              <User size={16} />
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-[13px] font-medium text-[var(--admin-heading)]">
                                Khách mới: {n.full_name}
                              </p>
                              <p className="mt-1 text-[11px] text-[var(--admin-text-muted)]">
                                {formatTime(n.created_at)}
                              </p>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="px-4 py-10 text-center text-[13px] italic text-[var(--admin-text-muted)]">
                          Không có hoạt động mới
                        </div>
                      )}
                    </div>
                    <Link
                      href="/notifications"
                      onClick={() => setIsNotificationsOpen(false)}
                      className="block border-t border-[var(--admin-border)] bg-[rgba(138,90,68,0.04)] px-4 py-3 text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--admin-accent-strong)] transition-colors hover:bg-[rgba(138,90,68,0.08)]"
                    >
                      Xem tất cả thông báo
                    </Link>
                  </div>
                </>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex h-11 items-center gap-3 rounded-[18px] border border-[var(--admin-border)] bg-[rgba(255,255,255,0.58)] px-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 hover:-translate-y-px hover:bg-white"
              >
                <div className="hidden text-right sm:block">
                  <p className="text-[13px] font-semibold text-[var(--admin-heading)]">Quản trị viên</p>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--admin-text-muted)]">
                    Administrator
                  </p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-[14px] bg-[linear-gradient(180deg,rgba(138,90,68,0.92),rgba(111,71,54,0.96))] text-white shadow-[0_14px_24px_-18px_rgba(111,71,54,0.9)]">
                  <User size={16} />
                </div>
                <ChevronDown size={14} className="hidden text-[var(--admin-text-muted)] sm:block" />
              </button>

              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                  <div className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-[24px] border border-[var(--admin-border)] bg-[var(--admin-surface-strong)] py-2 shadow-[var(--admin-shadow-lg)]">
                    <div className="border-b border-[var(--admin-border)] px-4 py-3">
                      <p className="text-[13px] font-semibold text-[var(--admin-heading)]">Chào, Admin</p>
                      <p className="mt-1 text-[11px] text-[var(--admin-text-muted)]">admin@atelier.vn</p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-[13px] text-[var(--admin-text)] transition-colors hover:bg-[var(--admin-accent-soft)]"
                    >
                      <User size={16} /> Hồ sơ của tôi
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-[13px] text-[var(--admin-text)] transition-colors hover:bg-[var(--admin-accent-soft)]"
                    >
                      <Globe size={16} /> Cài đặt chung
                    </Link>
                    <div className="mt-2 border-t border-[var(--admin-border)] pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-[13px] font-semibold text-[var(--admin-danger)] transition-colors hover:bg-[rgba(155,87,76,0.08)]"
                      >
                        <LogOut size={16} /> Đăng xuất
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
