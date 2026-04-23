"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export function AccountBreadcrumb({ title }: { title: string }) {
  return (
    <section className="bg-[#f9f9f9] border-t border-[#eee] overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-[15px] pt-[10px] pb-0">
        {/* Replicating wow fadeIn behavior */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: "linear" }}
        >
          <nav aria-label="breadcrumb" className="mb-[4px]">
            <ol className="flex items-center list-none p-0 m-0 text-[14px] font-medium capitalize">
              <li className="flex items-center">
                <Link href="/" className="text-[#333] hover:text-primary transition-colors">
                  Trang chủ
                </Link>
                <i className="flaticon-arrows-4 mx-[10px] text-[10px] text-[#333]"></i>
              </li>
              <li className="text-[#888] active" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>
          <h1 className="text-[32px] font-normal text-[#333] capitalize m-0" style={{ fontFamily: "'Playfair Display', serif" }}>
            {title}
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
