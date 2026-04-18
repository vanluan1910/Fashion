"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const BLOGS = [
  {
    id: 1,
    title: "Xu hướng thời trang mùa hè 2026",
    date: "21 Tháng 3, 2026",
    author: "Quản trị viên",
    image: "/images/blog1.png",
    excerpt: "Khám phá những xu hướng thời trang mới nhất sẽ làm mưa làm gió trong mùa hè năm nay...",
    link: "/blog/1"
  },
  {
    id: 2,
    title: "Cách phối đồ sang trọng cho quý cô",
    date: "21 Tháng 3, 2026",
    author: "Quản trị viên",
    image: "/images/blog2.png",
    excerpt: "Nâng tầm phong cách cá nhân với những bí quyết phối đồ tinh tế và đẳng cấp từ chuyên gia...",
    link: "/blog/2"
  }
];

export function LatestBlog() {
  return (
    <section className="pt-[60px] bg-white overflow-hidden pb-[40px]">
      <div className="max-w-[1170px] mx-auto px-[15px]">
        <h3 className="text-[30px] font-normal text-[#333] text-center mb-[40px] capitalize" style={{ fontFamily: "'Work Sans', sans-serif" }}>
          Tin tức mới nhất
        </h3>
        
        <div className="flex flex-wrap -mx-[15px]">
          {BLOGS.map((blog, index) => {
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
                  <Link href={blog.link} className="relative block overflow-hidden mb-5">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      width={570}
                      height={350}
                      className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  
                  <div className="blog_content">
                    <span className="flex items-center text-[12px] text-[#888] mb-3 uppercase tracking-wider">
                      {blog.date} | Đăng bởi {blog.author}
                      <span className="relative ml-4 w-2 h-2 bg-[#f74f2e] rotate-45 transform"></span>
                    </span>
                    
                    <Link href={blog.link} className="block mb-4">
                      <h5 className="text-[20px] font-bold text-[#333] hover:text-[#f74f2e] transition-colors leading-tight" style={{ fontFamily: "'Work Sans', sans-serif" }}>
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
