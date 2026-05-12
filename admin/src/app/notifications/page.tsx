"use client";

import React from "react";
import { notificationService } from "@/features/notifications/services/notificationService";
import type { NotificationItem } from "@/features/notifications/types";
import { Bell, Check, Filter, MessageSquare, Package, ShoppingCart, Trash2, UserPlus, FileText, AlertTriangle } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  customer_signup: UserPlus,
  order_created: ShoppingCart,
  product_created: Package,
  blog_created: FileText,
  product_review_created: MessageSquare,
  blog_comment_created: MessageSquare,
};

const toneMap: Record<string, string> = {
  customer_signup: "bg-green-100 text-green-600",
  order_created: "bg-blue-100 text-blue-600",
  product_created: "bg-amber-100 text-amber-700",
  blog_created: "bg-orange-100 text-orange-700",
  product_review_created: "bg-red-100 text-red-600",
  blog_comment_created: "bg-violet-100 text-violet-600",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>([]);
  const [filter, setFilter] = React.useState<"all" | "unread">("all");
  const [isLoading, setIsLoading] = React.useState(true);

  const [modal, setModal] = React.useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "info" | "confirm";
    onConfirm?: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const result = await notificationService.getNotifications(filter);
      setNotifications(result.items);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchNotifications();
  }, [filter]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const handleMarkAsRead = async (id: number) => {
    await notificationService.markAsRead(id);
    await fetchNotifications();
  };

  const handleMarkAllAsRead = async () => {
    await notificationService.markAllAsRead();
    await fetchNotifications();
    setModal({
      isOpen: true,
      title: "Thành công",
      message: "Đã đánh dấu tất cả thông báo là đã đọc!",
      type: "info",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 60000);
    if (diff < 1) return "Vừa xong";
    if (diff < 60) return `${diff} phút trước`;
    if (diff < 1440) return `${Math.floor(diff / 60)} giờ trước`;
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-1.5">
          <span className="admin-section-kicker">Thông báo</span>
          <h1 className="admin-section-title">Trung tâm báo cáo & Thông báo</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleMarkAllAsRead}
            className="flex items-center gap-2 rounded-[calc(var(--admin-radius-md)-4px)] border border-[var(--admin-border)] bg-white px-4 py-2.5 text-[13px] font-semibold text-[var(--admin-heading)] shadow-admin-sm transition hover:bg-[var(--admin-surface-strong)]"
          >
            <Check size={16} className="text-green-600" />
            Đánh dấu đã đọc tất cả
          </button>
          <button className="flex items-center gap-2 rounded-[calc(var(--admin-radius-md)-4px)] border border-[var(--admin-border)] bg-white px-4 py-2.5 text-[13px] font-semibold text-red-600 shadow-admin-sm transition hover:bg-red-50">
            <Trash2 size={16} />
            Xóa lịch sử
          </button>
        </div>
      </section>

      <div className="admin-page-surface overflow-hidden text-[14px]">
        <div className="flex items-center justify-between border-b border-[var(--admin-border)] p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-[calc(var(--admin-radius-sm)-2px)] px-4 py-2 text-[13px] font-semibold transition-all ${
                filter === "all" ? "bg-[var(--admin-accent)] text-white" : "text-[var(--admin-text-muted)] hover:text-[var(--admin-text)]"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`flex items-center gap-2 rounded-[calc(var(--admin-radius-sm)-2px)] px-4 py-2 text-[13px] font-semibold transition-all ${
                filter === "unread" ? "bg-[var(--admin-accent)] text-white" : "text-[var(--admin-text-muted)] hover:text-[var(--admin-text)]"
              }`}
            >
              Chưa đọc
              {unreadCount > 0 && (
                <span className={`rounded-full px-2 py-0.5 text-[10px] ${filter === "unread" ? "bg-white text-[var(--admin-accent)]" : "bg-red-100 text-red-600"}`}>
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button onClick={handleMarkAllAsRead} className="px-3 text-[12px] font-semibold text-[var(--admin-accent-strong)] hover:underline">
                Đánh dấu tất cả là đã đọc
              </button>
            )}
            <button className="rounded-[calc(var(--admin-radius-sm)-2px)] p-2 text-[var(--admin-text-muted)] hover:bg-[rgba(255,255,255,0.75)]">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="divide-y divide-[#f9f9f9]">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4 p-20 text-center italic text-[var(--admin-text-muted)]">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--admin-accent)] border-t-transparent"></div>
              Đang tải dữ liệu...
            </div>
          ) : notifications.length > 0 ? (
            notifications.map((notif) => {
              const Icon = iconMap[notif.type] || Bell;
              const tone = toneMap[notif.type] || "bg-gray-100 text-gray-500";
              return (
                <div
                  key={notif.notification_id}
                  onClick={() => handleMarkAsRead(notif.notification_id)}
                  className={`flex cursor-pointer items-start gap-4 p-5 transition-all hover:bg-[rgba(255,255,255,0.72)] ${notif.is_read ? "" : "bg-[rgba(139,119,102,0.06)]"}`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tone}`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-grow">
                    <div className="mb-1 flex items-center justify-between gap-4">
                      <p className={`text-[14px] ${notif.is_read ? "font-medium text-[var(--admin-text-muted)]" : "font-semibold text-[var(--admin-heading)]"}`}>
                        {notif.title}
                      </p>
                      <span className="text-[12px] text-[var(--admin-text-muted)]">{formatTime(notif.created_at)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[12px] text-[var(--admin-text-muted)]">{notif.message}</p>
                      {!notif.is_read && <span className="h-2.5 w-2.5 rounded-full bg-[var(--admin-accent)] shadow-[0_0_8px_rgba(139,119,102,0.35)]"></span>}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-20 text-center italic text-[var(--admin-text-muted)]">Không có thông báo nào.</div>
          )}
        </div>

        <div className="border-t border-[var(--admin-border)] bg-[rgba(255,255,255,0.68)] p-5 text-center">
          <button className="text-[13px] font-semibold text-[var(--admin-accent-strong)] hover:underline">Tải thêm thông báo cũ hơn</button>
        </div>
      </div>

      {modal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="p-8">
              <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-full ${modal.type === "confirm" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                {modal.type === "confirm" ? <AlertTriangle size={24} /> : <Check size={24} />}
              </div>
              <h3 className="mb-3 text-[20px] font-black tracking-tight text-[#222]">{modal.title}</h3>
              <p className="mb-8 text-[14px] font-semibold leading-relaxed text-[#555]">{modal.message}</p>

              <div className="flex items-center gap-3">
                {modal.type === "confirm" ? (
                  <>
                    <button
                      onClick={() => setModal((prev) => ({ ...prev, isOpen: false }))}
                      className="flex-1 rounded-xl bg-[#f3f4f9] px-4 py-3 text-[13px] font-black uppercase tracking-widest text-[#666] transition-all hover:bg-[#eee]"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      onClick={modal.onConfirm}
                      className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-[13px] font-black uppercase tracking-widest text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-700"
                    >
                      Xác nhận xóa
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setModal((prev) => ({ ...prev, isOpen: false }))}
                    className="w-full rounded-xl bg-[#222] px-4 py-3 text-[13px] font-black uppercase tracking-widest text-white shadow-lg shadow-black/10 transition-all hover:bg-[#333]"
                  >
                    Đóng lại
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
