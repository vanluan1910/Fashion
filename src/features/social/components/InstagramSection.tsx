"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";


export function InstagramSection() {
  return (
    <section className="pt-[60px] instagram_section bg-white overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-[15px]">
        <div className="flex flex-wrap -mx-[15px] items-center">
          {/* Instagram Title - Col-md-4 with legacy styled box */}
          <motion.div
            className="w-full md:w-1/3 px-[15px] mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: "easeOut" }}
          >
            <div className="instagram_title">
              <i className="flaticon-instagram-logo"></i>
              <h3 className="title_h3 text-capitalize text-[30px] !leading-[43px]">Follow Us <br />On Instagram</h3>
              <p className="text-[15px] mt-2">#Lorem Ipsum is simply dummy text of the typesetting industry</p>
            </div>
          </motion.div>

          {/* Instagram Slider Container - Col-md-8 */}
          <motion.div 
            className="w-full md:w-2/3 px-[15px]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, delay: 0.2, ease: "easeOut" }}
          >
            <div className="owl-carousel owl-theme instagram_slider" id="instafeed">
              {/* This container is empty in index.html, to be populated dynamically later */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
