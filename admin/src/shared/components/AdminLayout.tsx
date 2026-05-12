"use client";

import React, { useEffect, useState } from "react";
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

  if (isLoginPage) {
    return <>{children}</>;
  }

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

        <div className="h-[72px]" />

        <main className="px-4 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4 lg:px-6 lg:pb-6 lg:pt-4">
          <div className="mx-auto flex min-h-[calc(100vh-8.75rem)] w-full max-w-[1600px] flex-col gap-4">
            <div className="admin-page-surface min-h-[calc(100vh-10rem)] px-4 py-3.5 sm:px-5 sm:py-4 lg:px-6 lg:py-5">
              <div className="h-full animate-in fade-in duration-700">{children}</div>
            </div>
          </div>
        </main>

        <footer className="px-4 pb-4 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 rounded-[18px] border border-[var(--admin-border)] bg-[rgba(255,255,255,0.7)] px-4 py-2.5 text-[10px] font-medium text-[var(--admin-text-muted)] shadow-[var(--admin-shadow-sm)] backdrop-blur md:px-5">
            <p className="tracking-[0.18em] uppercase">Atelier Admin Workspace</p>
            <p className="text-right">
              Â© 2024 <span className="font-semibold text-[var(--admin-accent-strong)]">Atelier Luxury Team</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
