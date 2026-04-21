"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BLOG_POSTS } from "../constants/blog-data";

export function LatestBlog() {
  // Lấy 2 bài viết mới nhất để hiển thị
  const latestPosts = BLOG_POSTS.slice(0, 2);

  return (
    <section className="pt-[60px] bg-white overflow-hidden pb-[40px]">
      <div className="max-w-[1170px] mx-auto px-[15px]">
        <h3 className="text-[30px] font-normal text-[#333] text-center mb-[40px] capitalize" style={{ fontFamily: "'Work Sans', sans-serif" }}>
          Tin tức mới nhất
        </h3>
        
        <div className="flex flex-wrap -mx-[15px]">
          {latestPosts.map((blog, index) => {
            const isSlideFromLeft = index % 2 === 0;
            
            return (
              <motion.div 
                key={blog.id} 
                className="w-full md:w-1/2 px-[15px] mb-[30px] md:mb-0"
                initial={{ opacity: 0, x: isSlideFromLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.3, ease: "easeOut" }}
              >
                <div className="flex flex-col group">
                  <Link href={`/blog/${blog.slug}`} className="relative block overflow-hidden mb-5">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      width={570}
                      height={350}
                      className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  
                  <div className="blog_content">
                    <span className="flex items-center text-[12px] text-[#888] mb-3 uppercase tracking-wider">
                      {blog.date} | Đăng bởi {blog.author}
                      <span className="relative ml-4 w-2 h-2 bg-[#f74f2e] rotate-45 transform"></span>
                    </span>
                    
                    <Link href={`/blog/${blog.slug}`} className="block mb-4">
                      <h5 className="text-[20px] font-bold text-[#333] hover:text-[#f74f2e] transition-colors leading-tight line-clamp-1" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                        {blog.title}
                      </h5>
                    </Link>
                    
                    <p className="text-[14px] text-[#777] leading-relaxed line-clamp-2">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
