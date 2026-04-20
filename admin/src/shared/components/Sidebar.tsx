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
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full bg-[#111c43] text-white w-[260px] z-50 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Logo Section */}
        <div className="h-[70px] flex items-center justify-between px-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#f74f2e] rounded flex items-center justify-center font-bold text-lg">
              A
            </div>
            <span className="text-xl font-bold tracking-tight uppercase">Atelier Admin</span>
          </Link>
          <button onClick={onClose} className="lg:hidden text-white/70 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6 px-4 space-y-1">
          <p className="px-2 mb-4 text-[11px] font-bold uppercase tracking-widest text-white/40">Menu chính</p>
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (typeof window !== "undefined" && window.innerWidth < 1024) {
                    onClose();
                  }
                }}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-lg text-[14px] font-medium transition-all
                  ${isActive 
                    ? "bg-[#f74f2e] text-white" 
                    : "text-white/70 hover:bg-white/5 hover:text-white"}
                `}
              >
                <Icon size={18} className={isActive ? "text-white" : "text-white/50"} />
                {item.label}
              </Link>
            );
          })}
        </nav>

      </aside>
    </>
  );
}
