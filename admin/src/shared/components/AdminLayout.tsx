"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const isLoginPage = pathname === "/login";

  useEffect(() => {
    const isAuth = localStorage.getItem("atelier_admin_auth");
    
    if (isAuth !== "true" && !isLoginPage) {
      setIsAuthenticated(false);
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router, isLoginPage]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Trả về nội dung thô cho trang Login
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Chống nháy (flicker) bằng cách trả về null trong khi đang xác thực và chưa ở trang login
  if (isAuthenticated === false && !isLoginPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-[#f74f2e] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isAuthenticated === null && !isLoginPage) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f3f4f9] font-sans">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className={`transition-all duration-500 ease-in-out ${isSidebarOpen ? "lg:pl-[260px]" : "pl-0"}`}>
        <Header onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        
        {/* Spacer to push content below fixed header */}
        <div className="h-[70px]" />

        <main className="p-6 lg:p-10 min-h-[calc(100vh-126px)] animate-in fade-in duration-700">
          {children}
        </main>

        <footer className="h-14 flex items-center justify-center text-[11px] font-bold uppercase tracking-wider text-gray-400 border-t border-gray-100 bg-white lg:bg-transparent">
          <p>© 2024. Chế tác bởi <span className="text-[#f74f2e]">Atelier Luxury Team</span>. Bảo lưu mọi quyền.</p>
        </footer>
      </div>
    </div>
  );
}
