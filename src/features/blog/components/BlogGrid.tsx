"use client";

import React from "react";
import { motion } from "framer-motion";
import { BlogCard } from "./BlogCard";
import { BLOG_POSTS } from "../constants/blog-data";

export function BlogGrid() {
  return (
    <section className="pb-[100px] overflow-hidden">
      {/* Replicating the "wow fadeIn" for the entire section: blogs.html:L363 */}
      <motion.div 
        className="max-w-[1170px] mx-auto px-[15px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: "linear" }}
      >
        <div className="flex flex-wrap -mx-[15px]">
          {BLOG_POSTS.map((post, idx) => {
            // Replicating blogs.html stagger: timeLeft for left col, fadeInRight for right col
            // data-wow-duration="1300ms" as seen in blogs.html:L366-L379
            const isLeft = idx % 2 === 0;
            
            return (
              <motion.div 
                key={post.id} 
                className="w-full md:w-1/2 px-[15px]"
                initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.3, ease: "easeOut" }}
              >
                <BlogCard post={post} />
              </motion.div>
            );
          })}
        </div>
        
      </motion.div>

      {/* Blog Pagination - Independent scroll trigger */}
      <motion.div 
        className="max-w-[1170px] mx-auto px-[15px] mt-[40px]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.3, ease: "easeOut" }}
      >
        <div className="pt-[40px] border-t border-[#ececec] flex items-center justify-center">
          <ul className="flex items-center space-x-[15px] list-none p-0 m-0">
            <li className="page-item">
              <a href="#" className="page-link w-[45px] h-[45px] border border-[#ececec] flex items-center justify-center text-[#333] hover:border-[#f74f2e] transition-all">
                <i className="flaticon-arrows-1 text-[14px]"></i>
              </a>
            </li>
            {[1, 2, 3].map((num) => (
              <li key={num} className="page-item">
                <button 
                  className={`page-link w-[45px] h-[45px] border flex items-center justify-center text-[14px] font-bold transition-all duration-300 ${
                    num === 1 
                      ? "bg-[#f74f2e] text-white border-[#f74f2e]" 
                      : "border-[#ececec] text-[#333] hover:border-[#f74f2e] hover:text-[#f74f2e]"
                  }`}
                >
                  {num}
                </button>
              </li>
            ))}
            <li className="page-item">
              <a href="#" className="page-link w-[45px] h-[45px] border border-[#ececec] flex items-center justify-center text-[#333] hover:border-[#f74f2e] transition-all">
                <i className="flaticon-arrows text-[14px]"></i>
              </a>
            </li>
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
