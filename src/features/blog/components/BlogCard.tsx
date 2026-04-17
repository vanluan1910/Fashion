import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "../types/blog-types";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="blog_content mb-[50px] group">
      <div className="relative overflow-hidden mb-[25px]">
        <Link href={`/blog/${post.slug}`} className="block">
          <Image
            src={post.image}
            alt={post.title}
            width={570}
            height={360}
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
      </div>
      
      <div className="blog_details">
        <span className="text-[14px] text-[#999] mb-[15px] block font-sans">
          {post.date} | Posted By {post.author}
          <span className="inline-block w-2 h-2 bg-[#f74f2e] rotate-45 ml-2 relative top-[-1px]"></span>
        </span>
        
        <Link href={`/blog/${post.slug}`}>
          <h5 className="text-[20px] font-bold text-[#333] mb-[15px] hover:text-[#f74f2e] transition-colors leading-tight font-sans">
            {post.title}
          </h5>
        </Link>
        
        <p className="text-[15px] text-[#666] leading-[1.8] font-sans">
          {post.excerpt}
        </p>
      </div>
    </div>
  );
}
