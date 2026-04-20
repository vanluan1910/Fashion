"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-[#f3f4f9]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className={`transition-all duration-300 ${isSidebarOpen ? "lg:pl-[260px]" : "pl-0"}`}>
        <Header onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        
        {/* Spacer to push content below fixed header */}
        <div className="h-[70px]" />

        <main className="p-6 lg:p-8 min-h-[calc(100vh-70px)]">
          {children}
        </main>

        <footer className="h-14 flex items-center justify-center text-[12px] text-[#999] border-t border-[#eee] bg-white lg:bg-transparent">
          <p>© 2024. Được xây dựng bởi <span className="font-bold text-[#845adf]">Antigravity</span>. Tất cả quyền được bảo lưu.</p>
        </footer>
      </div>
    </div>
  );
}
