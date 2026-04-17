import React from "react";
import { BlogBreadcrumb } from "@/features/blog/components/BlogBreadcrumb";
import { BlogGrid } from "@/features/blog/components/BlogGrid";

export const metadata = {
  title: "Blog | Earthyellow",
  description: "Stay updated with the latest fashion trends and lifestyle tips from Earthyellow.",
};

export default function BlogPage() {
  return (
    <main className="bg-white">
      <BlogBreadcrumb />
      <BlogGrid />
    </main>
  );
}
