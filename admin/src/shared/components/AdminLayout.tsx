"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ADMIN_SIDEBAR_LAYOUT, Sidebar } from "./Sidebar";
import { Header } from "./Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const isLoginPage = pathname === "/login";

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    setIsSidebarOpen(isDesktop);
  }, []);

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
      <div className="flex min-h-screen items-center justify-center bg-[var(--admin-canvas)]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--admin-accent)] border-t-transparent"></div>
      </div>
    );
  }

  if (isAuthenticated === null && !isLoginPage) {
    return null;
  }

  return (
    <div className="min-h-screen bg-transparent font-sans text-[var(--admin-text)]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div
        className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isSidebarOpen
            ? ADMIN_SIDEBAR_LAYOUT.expandedPadding
            : ADMIN_SIDEBAR_LAYOUT.collapsedPadding
        }`}
      >
        <Header onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        <div className="h-[86px]" />

        <main className="px-4 pb-6 pt-5 sm:px-6 lg:px-8 lg:pb-8 lg:pt-6">
          <div className="mx-auto flex min-h-[calc(100vh-10.5rem)] w-full max-w-[1600px] flex-col gap-6">
            <div className="admin-page-surface min-h-[calc(100vh-11.5rem)] px-4 py-4 sm:px-5 sm:py-5 lg:px-7 lg:py-7">
              <div className="h-full animate-in fade-in duration-700">{children}</div>
            </div>
          </div>
        </main>

        <footer className="px-4 pb-5 sm:px-6 lg:px-8 lg:pb-7">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 rounded-[20px] border border-[var(--admin-border)] bg-[rgba(255,251,246,0.72)] px-4 py-3 text-[11px] font-medium text-[var(--admin-text-muted)] shadow-[var(--admin-shadow-sm)] backdrop-blur md:px-5">
            <p className="tracking-[0.18em] uppercase">Atelier Admin Workspace</p>
            <p className="text-right">
              © 2024 <span className="font-semibold text-[var(--admin-accent-strong)]">Atelier Luxury Team</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
