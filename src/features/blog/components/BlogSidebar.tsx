import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "../types/blog-types";
import { FaSearch } from "react-icons/fa";

interface BlogSidebarProps {
  recentPosts: BlogPost[];
}

export function BlogSidebar({ recentPosts }: BlogSidebarProps) {
  const categories = [
    { name: "Thời trang", count: 12 },
    { name: "Lối sống", count: 8 },
    { name: "Xu hướng", count: 15 },
    { name: "Du lịch", count: 5 },
    { name: "Thiết kế", count: 9 },
  ];

  const instagramImages = [
    "https://i.ibb.co/3Y8f8M2/insta1.jpg",
    "https://i.ibb.co/gR1J0Z6/insta2.jpg",
    "https://i.ibb.co/SrtpCjD/insta3.jpg",
    "https://i.ibb.co/vX9Yh6h/insta4.jpg",
    "https://i.ibb.co/6yZpL1f/insta5.jpg",
    "https://i.ibb.co/6P7q9B7/insta6.jpg",
  ];

  return (
    <aside className="blog_sidebar space-y-12">
      {/* Search Widget */}
      <div className="widget search_widget">
        <h3 
          className="text-[18px] font-normal text-[#333] mb-[25px] uppercase tracking-[3px] border-b-2 border-[#f74f2e] inline-block pb-2"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Tìm kiếm
        </h3>
        <div className="relative">
          <input
            suppressHydrationWarning
            type="text"
            placeholder="Nhập từ khóa..."
            className="w-full h-[50px] pl-5 pr-[55px] border border-[#eee] focus:outline-none focus:border-[#f74f2e] transition-all font-sans placeholder:uppercase placeholder:text-[11px] placeholder:tracking-widest"
          />
          <button type="button" suppressHydrationWarning className="absolute right-0 top-0 w-[50px] h-[50px] bg-[#333] text-white flex items-center justify-center hover:bg-[#f74f2e] transition-all">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Categories Widget */}
      <div className="widget categories_widget">
        <h3 
          className="text-[18px] font-normal text-[#333] mb-[25px] uppercase tracking-[3px] border-b-2 border-[#f74f2e] inline-block pb-2"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Danh mục
        </h3>
        <ul className="space-y-4">
          {categories.map((cat) => (
            <li key={cat.name}>
              <Link href="#" className="flex justify-between items-center text-[#666] hover:text-[#f74f2e] transition-colors font-sans group uppercase text-[12px] tracking-widest font-medium">
                <span>{cat.name}</span>
                <span className="text-[#999] group-hover:text-[#f74f2e]">
                  ({cat.count})
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts Widget */}
      <div className="widget recent_posts_widget">
        <h3 
          className="text-[18px] font-normal text-[#333] mb-[25px] uppercase tracking-[3px] border-b-2 border-[#f74f2e] inline-block pb-2"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Bài viết mới
        </h3>
        <div className="space-y-6">
          {recentPosts.slice(0, 3).map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="flex gap-4 group items-center">
              <div className="w-[80px] h-[70px] shrink-0 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={80}
                  height={70}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="post_info">
                <h4 
                  className="text-[15px] font-normal text-[#333] mb-1 group-hover:text-[#f74f2e] transition-colors line-clamp-2 leading-snug"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {post.title}
                </h4>
                <span className="text-[11px] text-[#999] uppercase tracking-widest font-sans">{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Instagram Widget */}
      <div className="widget instagram_widget">
        <h3 
          className="text-[18px] font-normal text-[#333] mb-[25px] uppercase tracking-[3px] border-b-2 border-[#f74f2e] inline-block pb-2"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Instagram
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {instagramImages.map((img, idx) => (
            <div key={idx} className="aspect-square overflow-hidden relative group cursor-pointer">
              <Image
                src={img}
                alt="Instagram"
                width={100}
                height={100}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                unoptimized
              />
              <div className="absolute inset-0 bg-[#333]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-[14px]">✨</span>
              </div>
            </div>
          ))}
        </div>
      </div>


    </aside>
  );
}
