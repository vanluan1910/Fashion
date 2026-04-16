"use client";

import React from "react";
import { motion } from "framer-motion";

export function NewsletterSection() {
  return (
    <section className="pt-[60px] pb-[60px] newsletter bg-white overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-[15px]">
        {/* Title with fadeInUp */}
        <motion.h3
          className="text-[30px] font-normal text-[#333] text-center mb-[30px] capitalize title_h3 home_title_h3"
          style={{ fontFamily: "'Work Sans', sans-serif" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: "easeOut" }}
        >
          Sign Up Our Newsletter
        </motion.h3>

        <form className="form-inline justify-content-center flex flex-col md:flex-row justify-center items-center gap-0">
          {/* Email Input with fadeInLeft */}
          <motion.input
            type="email"
            className="form-control w-full md:w-[350px] h-auto py-[10px] px-[18px] bg-white border border-[#aaa] text-[18px] text-[#888] rounded-none outline-none focus:border-[#f74f2e] transition-colors"
            placeholder="Enter your email"
            name="email"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: "easeOut" }}
          />

          {/* Submit Button with fadeInRight */}
          <motion.button
            type="submit"
            className="btn border-btn text-uppercase rounded-none ml-0 md:ml-[10px] mt-4 md:mt-0"
            style={{
              fontSize: "18px",
              padding: "8px 18px 10px",
              borderColor: "#b80d0dff",
              color: "#ee2e2eff",
              borderWidth: "1px"
            }}
            whileHover={{ backgroundColor: "#df1010ff", color: "#faf1f1ff" }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 2, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            SIGN UP <i className="flaticon-arrows" style={{ marginLeft: "4px" }}></i>
          </motion.button>
        </form>
      </div>
    </section>
  );
}
