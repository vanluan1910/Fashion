"use client";

import Link from "next/link";
import React, { useState } from "react";
import { 
  Menu, 
  Search, 
  Bell, 
  User, 
  Globe, 
  Maximize, 
  Grid
} from "lucide-react";

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function Header({ onToggleSidebar, isSidebarOpen }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isGridOpen, setIsGridOpen] = useState(false);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <header className={`h-[70px] bg-white border-b border-[#f1f1f1] fixed top-0 right-0 z-[99] shadow-sm transition-all duration-300 ${
      isSidebarOpen ? "left-0 lg:left-[260px]" : "left-0"
    }`}>
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left: Menu & Search ... */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleSidebar}
            className="p-2 text-[#333] hover:bg-[#f3f4f9] rounded-lg transition-colors border border-transparent active:border-[#845adf]"
          >
            <Menu size={20} />
          </button>

          <div className="hidden md:flex items-center relative w-[280px] group">
            <input 
              type="text" 
              placeholder="Tìm kiếm nhanh..."
              className="w-full h-11 pl-10 pr-4 bg-[#f3f4f9] border border-transparent rounded-lg text-[14px] text-[#333] font-medium placeholder:text-[#999] focus:bg-white focus:border-[#845adf] focus:ring-4 focus:ring-[#845adf]/5 transition-all outline-none"
            />
            <Search size={16} className="absolute left-3 text-[#999] group-focus-within:text-[#845adf]" />
          </div>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="hidden sm:flex p-2 text-[#333] hover:bg-[#f3f4f9] rounded-lg transition-colors"
            >
              <Globe size={18} />
            </button>
            {isLangOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsLangOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-[#eee] z-20 py-2 overflow-hidden animate-in fade-in zoom-in duration-200">
                   <button className="w-full text-left px-4 py-2 text-[13px] text-[#333] font-medium hover:bg-[#f3f4f9] flex items-center gap-2">🇻ietnam Tiếng Việt</button>
                   <button className="w-full text-left px-4 py-2 text-[13px] text-[#333] font-medium hover:bg-[#f3f4f9] flex items-center gap-2">🇺🇸 English</button>
                   <button className="w-full text-left px-4 py-2 text-[13px] text-[#333] font-medium hover:bg-[#f3f4f9] flex items-center gap-2">🇫🇷 French</button>
                </div>
              </>
            )}
          </div>

          {/* Fullscreen */}
          <button 
            onClick={handleFullscreen}
            className="hidden sm:flex p-2 text-[#333] hover:bg-[#f3f4f9] rounded-lg transition-colors"
            title="Toàn màn hình"
          >
            <Maximize size={18} />
          </button>

          {/* Apps Grid */}
          <div className="relative">
            <button 
              onClick={() => setIsGridOpen(!isGridOpen)}
              className="hidden sm:flex p-2 text-[#333] hover:bg-[#f3f4f9] rounded-lg transition-colors"
            >
              <Grid size={18} />
            </button>
            {isGridOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsGridOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-[280px] bg-white rounded-xl shadow-xl border border-[#eee] z-20 p-4 animate-in fade-in zoom-in duration-200">
                   <h6 className="text-[13px] font-bold text-[#333] mb-4">Tiện ích nhanh</h6>
                   <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "Lịch", icon: "📅", color: "bg-blue-50" },
                        { label: "Email", icon: "📧", color: "bg-pink-50" },
                        { label: "Files", icon: "📂", color: "bg-yellow-50" },
                        { label: "Chat", icon: "💬", color: "bg-green-50" },
                        { label: "Cài đặt", icon: "⚙️", color: "bg-gray-50" },
                        { label: "Hỗ trợ", icon: "❤️", color: "bg-red-50" },
                      ].map((app, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group">
                           <div className={`w-12 h-12 ${app.color} rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
                             {app.icon}
                           </div>
                           <span className="text-[11px] font-medium text-[#666]">{app.label}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </>
            )}
          </div>

          {/* Notifications Selector */}
          <div className="relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 text-[#333] hover:bg-[#f3f4f9] rounded-lg transition-colors relative"
            >
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#f74f2e] rounded-full border-2 border-white"></span>
            </button>
            {isNotificationsOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsNotificationsOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-[300px] bg-white rounded-xl shadow-xl border border-[#eee] z-20 overflow-hidden animate-in fade-in zoom-in duration-200">
                  <div className="p-4 border-b border-[#eee] flex items-center justify-between">
                    <h5 className="font-bold text-[14px]">Thông báo mới</h5>
                    <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">4 Mới</span>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {[
                      { title: "Đơn hàng mới #9821", time: "2 phút trước", icon: "🛒", href: "/orders" },
                      { title: "Khách mới đăng ký", time: "15 phút trước", icon: "👤", href: "/customers" },
                      { title: "Bình luận cần duyệt", time: "1 giờ trước", icon: "💬", href: "/blog" },
                      { title: "Kho hàng sắp hết", time: "3 giờ trước", icon: "⚠️", href: "/products" },
                    ].map((n, i) => (
                      <Link 
                        key={i} 
                        href={n.href}
                        onClick={() => setIsNotificationsOpen(false)}
                        className="block p-4 hover:bg-[#f3f4f9] cursor-pointer border-b border-[#f9f9f9] last:border-0"
                      >
                        <div className="flex gap-3">
                          <span className="text-xl">{n.icon}</span>
                          <div>
                            <p className="text-[13px] font-medium text-[#333]">{n.title}</p>
                            <p className="text-[11px] text-[#999]">{n.time}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link 
                    href="/notifications"
                    onClick={() => setIsNotificationsOpen(false)}
                    className="block w-full p-3 text-[12px] font-bold text-center text-[#845adf] bg-[#fcfcff] hover:bg-[#f3f4f9] transition-colors border-t border-[#eee]"
                  >
                    Xem tất cả thông báo
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative ml-2">
            <div 
              className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-[#f3f4f9] rounded-lg transition-all"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="text-right hidden sm:block">
                <p className="text-[14px] font-bold text-[#333] leading-none mb-1">Quản Trị Viên</p>
                <p className="text-[11px] text-[#999] uppercase font-medium">Administrator</p>
              </div>
              <div className="w-9 h-9 bg-[#845adf] rounded-full flex items-center justify-center text-white overflow-hidden border border-[#eee]">
                <User size={20} />
              </div>
            </div>

            {isProfileOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-[#eee] z-20 py-2 overflow-hidden animate-in fade-in zoom-in duration-200">
                  <div className="px-4 py-2 border-b border-[#eee] mb-2">
                    <p className="text-[13px] font-bold text-[#333]">Chào, Admin!</p>
                    <p className="text-[11px] text-[#999]">admin@atelier.vn</p>
                  </div>
                  <Link 
                    href="/profile" 
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full text-left px-4 py-2 text-[13px] text-[#555] hover:bg-[#f3f4f9] flex items-center gap-2"
                  >
                    <User size={16} /> Hồ sơ của tôi
                  </Link>
                  <Link 
                    href="/settings" 
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full text-left px-4 py-2 text-[13px] text-[#555] hover:bg-[#f3f4f9] flex items-center gap-2"
                  >
                    <Globe size={16} /> Cài đặt chung
                  </Link>
                  <div className="border-t border-[#eee] mt-2 pt-2">
                    <Link 
                      href="/" 
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full text-left px-4 py-2 text-[13px] text-red-600 hover:bg-red-50 flex items-center gap-2 font-bold"
                    >
                       Đăng xuất
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
