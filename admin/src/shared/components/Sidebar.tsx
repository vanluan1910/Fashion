"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ShoppingCart, 
  Users, 
  FileText, 
  Settings,
  X,
  MessageCircle,
  CreditCard,
  Package
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ADMIN_SIDEBAR_LAYOUT = {
  baseWidth: "w-[17.5rem]",
  expandedWidth: "lg:w-[17.5rem]",
  collapsedWidth: "lg:w-[6.5rem]",
  expandedOffset: "lg:left-[17.5rem]",
  collapsedOffset: "lg:left-[6.5rem]",
  expandedPadding: "lg:pl-[17.5rem]",
  collapsedPadding: "lg:pl-[6.5rem]",
} as const;

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: ShoppingBag, label: "Sản phẩm", href: "/products" },
  { icon: ShoppingCart, label: "Đơn hàng", href: "/orders" },
  { icon: Users, label: "Khách hàng", href: "/customers" },
  { icon: FileText, label: "Bài viết", href: "/blog" },
  { icon: MessageCircle, label: "Bình luận", href: "/reviews" },
  { icon: CreditCard, label: "Giao dịch", href: "/transactions" },
  { icon: Package, label: "Kho hàng", href: "/inventory" },
  { icon: Settings, label: "Cài đặt", href: "/settings" },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[110] bg-[rgba(32,24,19,0.52)] backdrop-blur-[2px] lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-[120] h-full ${ADMIN_SIDEBAR_LAYOUT.baseWidth} border-r border-[var(--admin-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,244,239,0.98)_100%)] text-[var(--admin-text)] shadow-[0_18px_48px_-34px_rgba(54,43,34,0.16)] transition-[width,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen
            ? `translate-x-0 ${ADMIN_SIDEBAR_LAYOUT.expandedWidth}`
            : `-translate-x-full lg:translate-x-0 ${ADMIN_SIDEBAR_LAYOUT.collapsedWidth}`
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(180,165,149,0.12),_transparent_32%),linear-gradient(180deg,rgba(139,119,102,0.06),transparent_24%)]" />

        <div className="relative flex h-full flex-col">
          <div className={`flex h-[64px] items-center border-b border-[var(--admin-border)] ${isOpen ? "justify-between px-4 lg:px-5" : "justify-center px-3 lg:px-3.5"}`}>
            <Link
              href="/"
              className={`group flex min-w-0 items-center ${isOpen ? "gap-3" : "justify-center"} `}
              title="Atelier Admin"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-[var(--admin-border)] bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_10px_20px_-18px_rgba(54,43,34,0.14)]">
                <span className="text-[0.95rem] font-semibold tracking-[0.24em] text-[var(--admin-heading)]">A</span>
              </div>
              <div className={`min-w-0 transition-all duration-300 ${isOpen ? "max-w-[11rem] opacity-100" : "max-w-0 opacity-0 lg:hidden"}`}>
                <p className="truncate text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-[var(--admin-text-muted)]">
                  Atelier
                </p>
                <p className="truncate text-[0.92rem] font-semibold tracking-[-0.03em] text-[var(--admin-heading)]">
                  Admin Suite
                </p>
              </div>
            </Link>

            <button
              onClick={onClose}
              className="rounded-full border border-[var(--admin-border)] p-1.5 text-[var(--admin-text-muted)] transition-colors hover:border-[var(--admin-border-strong)] hover:text-[var(--admin-heading)] lg:hidden"
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="flex-1 px-2.5 py-3">
            <div className={`mb-3 ${isOpen ? "px-2.5" : "px-0 text-center"}`}>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-white/32">
                {isOpen ? "Danh mục chính" : "Menu"}
              </p>
            </div>
            <div className="space-y-0.5">
              {MENU_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={item.label}
                    onClick={() => {
                      if (typeof window !== "undefined" && window.innerWidth < 1024) {
                        onClose();
                      }
                    }}
                    className={`group relative flex items-center overflow-hidden rounded-[16px] border px-2.5 py-2 text-[13px] font-medium transition-all duration-300 ${
                      isOpen ? "gap-3" : "justify-center gap-0"
                    } ${
                      isActive
                        ? "border-[rgba(139,119,102,0.16)] bg-[rgba(139,119,102,0.08)] text-[var(--admin-heading)] shadow-[0_10px_24px_-22px_rgba(54,43,34,0.16)]"
                        : "border-transparent text-[var(--admin-text-muted)] hover:border-[var(--admin-border)] hover:bg-white hover:text-[var(--admin-heading)]"
                    }`}
                  >
                    <span
                      className={`absolute inset-y-2 left-0 w-[3px] rounded-full transition-opacity ${
                        isActive ? "bg-[var(--admin-accent)] opacity-100" : "opacity-0 group-hover:opacity-60"
                      }`}
                    />
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] transition-colors ${
                        isActive ? "bg-white text-[var(--admin-heading)]" : "bg-[rgba(139,119,102,0.06)] text-[var(--admin-text-muted)] group-hover:text-[var(--admin-heading)]"
                      }`}
                    >
                      <Icon size={17} />
                    </span>
                    <span className={`${isOpen ? "opacity-100" : "hidden"} truncate tracking-[0.01em]`}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="border-t border-[var(--admin-border)] px-2.5 py-2.5">
            <div
              className={`rounded-[16px] border border-[var(--admin-border)] bg-[rgba(255,255,255,0.76)] px-2.5 py-2 text-[var(--admin-text-muted)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] ${
                isOpen ? "flex items-center gap-3" : "flex justify-center"
              }`}
            >
              <div className="h-9 w-9 rounded-[12px] border border-[var(--admin-border)] bg-[var(--admin-surface-muted)]" />
              <div className={`${isOpen ? "block" : "hidden"} min-w-0`}>
                <p className="truncate text-[13px] font-medium text-[var(--admin-heading)]">Tóm tắt mùa vụ</p>
                <p className="truncate text-[11px] text-[var(--admin-text-muted)]">Kiểm soát bộ sưu tập Xuân</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
