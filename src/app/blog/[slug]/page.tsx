import React from "react";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/features/blog/constants/blog-data";
import { BlogBreadcrumb } from "@/features/blog/components/BlogBreadcrumb";
import { BlogDetailContent } from "@/features/blog/components/BlogDetailContent";
import { BlogSidebar } from "@/features/blog/components/BlogSidebar";
import { BlogComments } from "@/features/blog/components/BlogComments";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="blog_details_page bg-white min-h-screen">
      <BlogBreadcrumb name={post.title} />

      <section className="blog_details_section pt-[20px] pb-[80px]">
        <div className="max-w-[1170px] mx-auto px-[15px]">
          <div className="flex flex-wrap -mx-[15px]">
            {/* Main Content Area */}
            <div className="w-full lg:w-8/12 px-[15px]">
              <BlogDetailContent post={post} />
              <BlogComments />
            </div>

            {/* Sidebar Area */}
            <div className="w-full lg:w-4/12 px-[15px] mt-[60px] lg:mt-0">
              <BlogSidebar recentPosts={BLOG_POSTS} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}
