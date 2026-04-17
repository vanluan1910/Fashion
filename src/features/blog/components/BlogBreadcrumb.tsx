"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export function BlogBreadcrumb() {
  return (
    <section className="bg-[#f7f7f7] py-[60px] mb-[60px] overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-[15px]">
        {/* Replicating the "wow fadeIn" effect from blogs.html:L363 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "linear" }}
        >
          <nav aria-label="breadcrumb" className="mb-[15px]">
            <ol className="flex items-center list-none p-0 m-0 text-[14px] uppercase font-medium">
              <li className="flex items-center">
                <Link href="/" className="text-[#333] hover:text-primary transition-colors">
                  Home
                </Link>
                <i className="flaticon-arrows-4 mx-[10px] text-[10px] text-[#333]"></i>
              </li>
              <li className="text-[#999] active" aria-current="page">
                Blog
              </li>
            </ol>
          </nav>
          <h1 className="text-[40px] font-normal text-[#333] capitalize m-0" style={{ fontFamily: "'Playfair Display', serif" }}>
            Blog
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
