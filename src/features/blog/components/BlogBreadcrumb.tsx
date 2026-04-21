"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface BlogBreadcrumbProps {
  name?: string;
}

export function BlogBreadcrumb({ name }: BlogBreadcrumbProps) {
  return (
    <section className="bg-[#f9f9f9] border-t border-[#eee] py-[12px] mb-[10px] overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-[15px]">
        {/* Replicating the "wow fadeIn" effect from blogs.html:L363 */}
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: "linear" }}
        >
          <nav aria-label="breadcrumb" className="mb-[4px]">
            <ol className="flex items-center list-none p-0 m-0 text-[14px] uppercase font-medium tracking-wider">
              <li className="flex items-center">
                <Link href="/" className="text-[#f74f2e] hover:text-[#333] transition-colors">
                  Trang chủ
                </Link>
                <span className="mx-2 text-[#d5d5d5] font-light">/</span>
              </li>
              <li className="flex items-center">
                <Link href="/blog" className={`${name ? "text-[#f74f2e] hover:text-[#333]" : "text-[#888888]"} transition-colors`}>
                  Tin tức
                </Link>
                {name && <span className="mx-2 text-[#d5d5d5] font-light">/</span>}
              </li>
              {name && (
                <li className="text-[#888888] truncate max-w-[200px] md:max-w-none" aria-current="page">
                  {name}
                </li>
              )}
            </ol>
          </nav>
          <h1 className="text-[32px] font-normal text-[#333] m-0 font-sans capitalize leading-tight">
            {name || "Tin tức"}
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
