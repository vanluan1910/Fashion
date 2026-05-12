"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ADMIN_SIDEBAR_LAYOUT } from "./Sidebar";
import { notificationService } from "@/features/notifications/services/notificationService";
import type { NotificationItem } from "@/features/notifications/types";
import {
  Bell,
  ChevronDown,
  FileText,
  Globe,
  Grid,
  LogOut,
  Maximize,
  Menu,
  MessageSquare,
  Package,
  Search,
  ShoppingCart,
  User,
  UserPlus,
} from "lucide-react";

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const QUICK_APPS = [
  { label: "Lịch", tone: "bg-[rgba(86,114,97,0.12)]" },
  { label: "Email", tone: "bg-[rgba(247,79,46,0.14)]" },
  { label: "Files", tone: "bg-[rgba(160,111,55,0.14)]" },
  { label: "Chat", tone: "bg-[rgba(47,41,37,0.08)]" },
  { label: "Cài đặt", tone: "bg-[rgba(117,102,89,0.12)]" },
  { label: "Hỗ trợ", tone: "bg-[rgba(155,87,76,0.12)]" },
];

const notificationLinkMap: Record<string, string> = {
  customer_signup: "/customers",
  order_created: "/orders",
  product_created: "/products",
  blog_created: "/blog",
  product_review_created: "/reviews",
  blog_comment_created: "/blog",
};

const notificationIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  customer_signup: UserPlus,
  order_created: ShoppingCart,
  product_created: Package,
  blog_created: FileText,
  product_review_created: MessageSquare,
  blog_comment_created: MessageSquare,
};

const notificationToneMap: Record<string, string> = {
  customer_signup: "bg-[rgba(69,144,96,0.14)] text-[rgb(69,144,96)]",
  order_created: "bg-[rgba(61,111,215,0.12)] text-[rgb(61,111,215)]",
  product_created: "bg-[rgba(160,111,55,0.14)] text-[rgb(160,111,55)]",
  blog_created: "bg-[rgba(111,71,54,0.12)] text-[rgb(111,71,54)]",
  product_review_created: "bg-[rgba(247,79,46,0.12)] text-[rgb(247,79,46)]",
  blog_comment_created: "bg-[rgba(125,92,196,0.12)] text-[rgb(125,92,196)]",
};

export function Header({ onToggleSidebar, isSidebarOpen }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [recentNotifications, setRecentNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

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

  const loadNotifications = async () => {
    try {
      const [recent, full] = await Promise.all([
        notificationService.getRecent(6),
        notificationService.getNotifications("all"),
      ]);
      setRecentNotifications(recent);
      setUnreadCount(full.pagination.unread_count);
    } catch (error) {
      console.warn("Không thể tải thông báo admin.");
    }
  };

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diff < 1) return "Vừa xong";
    if (diff < 60) return `${diff} phút trước`;
    if (diff < 1440) return `${Math.floor(diff / 60)} giờ trước`;
    return date.toLocaleDateString("vi-VN");
  };

  const markNotificationAsRead = async (notification: NotificationItem) => {
    if (notification.is_read) return;
    try {
      await notificationService.markAsRead(notification.notification_id);
      await loadNotifications();
    } catch (error) {
      console.warn("Không thể cập nhật trạng thái thông báo.");
    }
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
      <div className="w-full">
        <div className="flex h-[64px] w-full items-center justify-between gap-2.5 border-b border-[var(--admin-border)] bg-[rgba(255,255,255,0.78)] px-4 shadow-[0_6px_20px_-18px_rgba(70,48,31,0.14)] backdrop-blur-[16px] sm:px-5 lg:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <button
              onClick={onToggleSidebar}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-[var(--admin-border)] bg-white text-[var(--admin-heading)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 hover:-translate-y-px hover:border-[var(--admin-border-strong)] hover:bg-[var(--admin-surface-muted)] active:translate-y-0"
              aria-label="Toggle sidebar"
            >
              <Menu size={18} />
            </button>

            <div className="hidden min-w-0 flex-1 md:block">
              <div className="group relative">
                <Search
                  size={15}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)] transition-colors group-focus-within:text-[var(--admin-accent)]"
                />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  className="h-10 w-full rounded-[15px] border border-[var(--admin-border)] bg-[rgba(255,255,255,0.84)] pl-10 pr-14 text-[13px] text-[var(--admin-text)] outline-none transition-all duration-300 placeholder:text-[var(--admin-text-muted)] focus:border-[rgba(139,119,102,0.24)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(139,119,102,0.07)] lg:pr-24"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="hidden items-center gap-1 rounded-[16px] border border-[var(--admin-border)] bg-[rgba(255,255,255,0.72)] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] sm:flex">
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex h-8 w-8 items-center justify-center rounded-[12px] text-[var(--admin-text-muted)] transition-all duration-300 hover:bg-white hover:text-[var(--admin-heading)]"
                  aria-label="Change language"
                >
                  <Globe size={15} />
                </button>
                {isLangOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsLangOpen(false)}></div>
                    <div className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-[18px] border border-[var(--admin-border)] bg-[var(--admin-surface-strong)] py-1.5 shadow-[var(--admin-shadow-md)]">
                      <button className="flex w-full items-center gap-2 px-3.5 py-2 text-left text-[13px] text-[var(--admin-text)] transition-colors hover:bg-[var(--admin-accent-soft)]">Tiếng Việt</button>
                      <button className="flex w-full items-center gap-2 px-3.5 py-2 text-left text-[13px] text-[var(--admin-text)] transition-colors hover:bg-[var(--admin-accent-soft)]">English</button>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={handleFullscreen}
                className="flex h-8 w-8 items-center justify-center rounded-[12px] text-[var(--admin-text-muted)] transition-all duration-300 hover:bg-white hover:text-[var(--admin-heading)]"
                title="Toàn màn hình"
              >
                <Maximize size={15} />
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsGridOpen(!isGridOpen)}
                  className="flex h-8 w-8 items-center justify-center rounded-[12px] text-[var(--admin-text-muted)] transition-all duration-300 hover:bg-white hover:text-[var(--admin-heading)]"
                  aria-label="Quick apps"
                >
                  <Grid size={15} />
                </button>
                {isGridOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsGridOpen(false)}></div>
                    <div className="absolute right-0 z-20 mt-2 w-[260px] rounded-[20px] border border-[var(--admin-border)] bg-[var(--admin-surface-strong)] p-3.5 shadow-[var(--admin-shadow-md)]">
                      <h6 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--admin-text-muted)]">
                        Tiện ích nhanh
                      </h6>
                      <div className="grid grid-cols-3 gap-2.5">
                        {QUICK_APPS.map((app) => (
                          <div
                            key={app.label}
                            className="group flex cursor-pointer flex-col items-center gap-1.5 rounded-[16px] p-2 transition-colors hover:bg-[rgba(247,79,46,0.06)]"
                          >
                            <div className={`flex h-10 w-10 items-center justify-center rounded-[14px] ${app.tone}`}>
                              <div className="h-4 w-4 rounded-full bg-[rgba(111,71,54,0.7)]" />
                            </div>
                            <span className="text-[11px] font-medium text-[var(--admin-text-muted)]">{app.label}</span>
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
                className="relative flex h-10 items-center gap-2 rounded-[15px] border border-[var(--admin-border)] bg-[rgba(255,255,255,0.66)] px-2.5 text-[var(--admin-heading)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 hover:-translate-y-px hover:bg-white"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-[12px] bg-[rgba(247,79,46,0.08)] text-[var(--admin-accent-strong)]">
                  <Bell size={15} />
                </span>
                <div className="hidden text-left sm:block">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--admin-text-muted)]">
                    Alerts
                  </p>
                  <p className="text-[13px] font-medium text-[var(--admin-heading)]">
                    {unreadCount > 0 ? `${unreadCount} mới` : "Ổn định"}
                  </p>
                </div>
                {unreadCount > 0 && (
                  <span className="absolute right-1.5 top-1.5 flex min-w-[18px] items-center justify-center rounded-full bg-[var(--admin-accent)] px-1.5 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsNotificationsOpen(false)}></div>
                  <div className="absolute right-0 z-20 mt-2 w-[340px] overflow-hidden rounded-[20px] border border-[var(--admin-border)] bg-[var(--admin-surface-strong)] shadow-[var(--admin-shadow-lg)]">
                    <div className="flex items-center justify-between border-b border-[var(--admin-border)] px-4 py-3.5">
                      <div>
                        <h5 className="text-sm font-semibold text-[var(--admin-heading)]">Thông báo mới</h5>
                        <p className="mt-1 text-xs text-[var(--admin-text-muted)]">
                          Đơn hàng, khách hàng, sản phẩm, bài viết, bình luận
                        </p>
                      </div>
                      <span className="rounded-full bg-[var(--admin-accent-soft)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--admin-accent-strong)]">
                        {unreadCount} mới
                      </span>
                    </div>
                    <div className="max-h-[320px] overflow-y-auto">
                      {recentNotifications.length > 0 ? (
                        recentNotifications.map((notification) => {
                          const Icon = notificationIconMap[notification.type] || Bell;
                          const link = notificationLinkMap[notification.type] || "/notifications";
                          const tone = notificationToneMap[notification.type] || "bg-[rgba(247,79,46,0.12)] text-[var(--admin-accent-strong)]";

                          return (
                            <Link
                              key={notification.notification_id}
                              href={link}
                              onClick={async () => {
                                await markNotificationAsRead(notification);
                                setIsNotificationsOpen(false);
                              }}
                              className={`flex gap-3 border-b border-[rgba(84,67,52,0.08)] px-4 py-3.5 transition-colors hover:bg-[rgba(247,79,46,0.05)] last:border-b-0 ${
                                !notification.is_read ? "bg-[rgba(255,249,247,0.9)]" : ""
                              }`}
                            >
                              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] ${tone}`}>
                                <Icon size={15} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[13px] font-medium text-[var(--admin-heading)]">{notification.title}</p>
                                <p className="mt-1 line-clamp-2 text-[11px] text-[var(--admin-text-muted)]">{notification.message}</p>
                                <p className="mt-1 text-[11px] text-[var(--admin-text-muted)]">{formatTime(notification.created_at)}</p>
                              </div>
                              {!notification.is_read && <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--admin-accent)]"></span>}
                            </Link>
                          );
                        })
                      ) : (
                        <div className="px-4 py-8 text-center text-[13px] italic text-[var(--admin-text-muted)]">
                          Không có hoạt động mới
                        </div>
                      )}
                    </div>
                    <Link
                      href="/notifications"
                      onClick={() => setIsNotificationsOpen(false)}
                      className="block border-t border-[var(--admin-border)] bg-[rgba(247,79,46,0.04)] px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--admin-accent-strong)] transition-colors hover:bg-[rgba(247,79,46,0.08)]"
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
                className="flex h-10 items-center gap-2.5 rounded-[15px] border border-[var(--admin-border)] bg-[rgba(255,255,255,0.66)] px-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 hover:-translate-y-px hover:bg-white"
              >
                <div className="hidden text-right sm:block">
                  <p className="text-[13px] font-semibold text-[var(--admin-heading)]">Quản trị viên</p>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--admin-text-muted)]">
                    Administrator
                  </p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-[12px] bg-[linear-gradient(180deg,rgba(247,79,46,0.9),rgba(111,71,54,0.94))] text-white shadow-[0_10px_18px_-16px_rgba(111,71,54,0.8)]">
                  <User size={15} />
                </div>
                <ChevronDown size={14} className="hidden text-[var(--admin-text-muted)] sm:block" />
              </button>

              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                  <div className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-[20px] border border-[var(--admin-border)] bg-[var(--admin-surface-strong)] py-1.5 shadow-[var(--admin-shadow-lg)]">
                    <div className="border-b border-[var(--admin-border)] px-4 py-3">
                      <p className="text-[13px] font-semibold text-[var(--admin-heading)]">Chào, Admin</p>
                      <p className="mt-1 text-[11px] text-[var(--admin-text-muted)]">admin@atelier.vn</p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex w-full items-center gap-2 px-4 py-2 text-left text-[13px] text-[var(--admin-text)] transition-colors hover:bg-[var(--admin-accent-soft)]"
                    >
                      <User size={16} /> Hồ sơ của tôi
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex w-full items-center gap-2 px-4 py-2 text-left text-[13px] text-[var(--admin-text)] transition-colors hover:bg-[var(--admin-accent-soft)]"
                    >
                      <Globe size={16} /> Cài đặt chung
                    </Link>
                    <div className="mt-2 border-t border-[var(--admin-border)] pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-2 text-left text-[13px] font-semibold text-[var(--admin-danger)] transition-colors hover:bg-[rgba(155,87,76,0.08)]"
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
