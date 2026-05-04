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
  X
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ADMIN_SIDEBAR_LAYOUT = {
  baseWidth: "w-[18rem]",
  expandedWidth: "lg:w-[18rem]",
  collapsedWidth: "lg:w-[7rem]",
  expandedOffset: "lg:left-[18rem]",
  collapsedOffset: "lg:left-[7rem]",
  expandedPadding: "lg:pl-[18rem]",
  collapsedPadding: "lg:pl-[7rem]",
} as const;

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: ShoppingBag, label: "Sản phẩm", href: "/products" },
  { icon: ShoppingCart, label: "Đơn hàng", href: "/orders" },
  { icon: Users, label: "Khách hàng", href: "/customers" },
  { icon: FileText, label: "Bài viết", href: "/blog" },
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
        className={`fixed left-0 top-0 z-[120] h-full ${ADMIN_SIDEBAR_LAYOUT.baseWidth} border-r border-white/10 bg-[linear-gradient(180deg,#1d1917_0%,#171311_52%,#120f0d_100%)] text-white shadow-[0_30px_80px_-42px_rgba(10,6,4,0.85)] transition-[width,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen
            ? `translate-x-0 ${ADMIN_SIDEBAR_LAYOUT.expandedWidth}`
            : `-translate-x-full lg:translate-x-0 ${ADMIN_SIDEBAR_LAYOUT.collapsedWidth}`
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_32%),linear-gradient(180deg,rgba(138,90,68,0.18),transparent_24%)]" />

        <div className="relative flex h-full flex-col">
          <div className={`flex h-[70px] items-center border-b border-white/10 ${isOpen ? "justify-between px-5 lg:px-6" : "justify-center px-3 lg:px-4"}`}>
            <Link
              href="/"
              className={`group flex min-w-0 items-center ${isOpen ? "gap-3" : "justify-center"} `}
              title="Atelier Admin"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] border border-[rgba(255,255,255,0.14)] bg-[linear-gradient(180deg,rgba(191,146,115,0.95),rgba(111,71,54,0.95))] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_18px_34px_-22px_rgba(138,90,68,0.75)]">
                <span className="text-base font-semibold tracking-[0.28em] text-[#fff8f0]">A</span>
              </div>
              <div className={`min-w-0 transition-all duration-300 ${isOpen ? "max-w-[11rem] opacity-100" : "max-w-0 opacity-0 lg:hidden"}`}>
                <p className="truncate text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/45">
                  Atelier
                </p>
                <p className="truncate text-[0.98rem] font-semibold tracking-[-0.03em] text-white">
                  Admin Suite
                </p>
              </div>
            </Link>

            <button
              onClick={onClose}
              className="rounded-full border border-white/10 p-2 text-white/70 transition-colors hover:border-white/20 hover:text-white lg:hidden"
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          </div>

          <div className={`border-b border-white/10 px-4 pb-5 pt-5 ${isOpen ? "block" : "hidden lg:block lg:px-3"}`}>
            <div className={`rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${isOpen ? "" : "lg:px-2"}`}>
              <p className={`text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-white/38 ${isOpen ? "" : "lg:text-center"}`}>
                {isOpen ? "Navigation" : "Nav"}
              </p>
              <div className={`mt-3 flex items-center ${isOpen ? "gap-3" : "justify-center"}`}>
                <div className="h-2.5 w-2.5 rounded-full bg-[var(--admin-accent)] shadow-[0_0_0_6px_rgba(138,90,68,0.12)]" />
                <div className={`${isOpen ? "block" : "hidden"}`}>
                  <p className="text-sm font-medium text-white">Control room</p>
                  <p className="text-xs text-white/45">Premium operations shell</p>
                </div>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-3 py-5">
            <div className={`mb-4 ${isOpen ? "px-3" : "px-0 text-center"}`}>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-white/32">
                {isOpen ? "Main menu" : "Menu"}
              </p>
            </div>
            <div className="space-y-1.5">
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
                    className={`group relative flex items-center overflow-hidden rounded-[18px] border px-3 py-3 text-[13px] font-medium transition-all duration-300 ${
                      isOpen ? "gap-3.5" : "justify-center gap-0"
                    } ${
                      isActive
                        ? "border-[rgba(220,180,145,0.3)] bg-[linear-gradient(135deg,rgba(138,90,68,0.78),rgba(96,63,48,0.92))] text-white shadow-[0_22px_34px_-26px_rgba(138,90,68,0.95)]"
                        : "border-transparent text-white/62 hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    <span
                      className={`absolute inset-y-2 left-0 w-[3px] rounded-full transition-opacity ${
                        isActive ? "bg-[#f3d7be] opacity-100" : "opacity-0 group-hover:opacity-60"
                      }`}
                    />
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] transition-colors ${
                        isActive ? "bg-white/10 text-white" : "bg-white/[0.03] text-white/55 group-hover:text-white"
                      }`}
                    >
                      <Icon size={18} />
                    </span>
                    <span className={`${isOpen ? "opacity-100" : "hidden"} truncate tracking-[0.01em]`}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="border-t border-white/10 px-3 py-4">
            <div
              className={`rounded-[18px] border border-white/10 bg-white/[0.04] px-3 py-3 text-white/55 ${
                isOpen ? "flex items-center gap-3" : "flex justify-center"
              }`}
            >
              <div className="h-10 w-10 rounded-[14px] border border-white/10 bg-white/[0.05]" />
              <div className={`${isOpen ? "block" : "hidden"} min-w-0`}>
                <p className="truncate text-sm font-medium text-white">Season briefing</p>
                <p className="truncate text-xs text-white/42">Spring collection controls</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
