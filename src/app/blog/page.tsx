import React from "react";
import { BlogBreadcrumb } from "@/features/blog/components/BlogBreadcrumb";
import { BlogGrid } from "@/features/blog/components/BlogGrid";

export const metadata = {
  title: "Tin tức & Sự kiện | Atelier Fashion",
  description: "Cập nhật những xu hướng thời trang mới nhất và bí quyết phong cách sống cùng Atelier Fashion.",
};

export default function BlogPage() {
  return (
    <main className="bg-white">
      <BlogBreadcrumb />
      <BlogGrid />
    </main>
  );
}
