"use client";

import React from "react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer 
      className="wow fadeIn animated footer_section bg-white pt-[39px]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.0 }}
    >
      <div className="container max-w-[1170px] mx-auto px-[15px]">
        {/* Start Footer Top */}
        <div className="footer_top pb-[35px] text-center sm:text-left">
          <div className="row flex flex-wrap -mx-[15px] justify-center sm:justify-start">
            {/* Logo Column */}
            <motion.div 
              className="w-full sm:w-1/2 lg:w-1/4 px-[15px] mb-8 lg:mb-0 wow fadeInUp flex flex-col items-center sm:items-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="column text-center sm:text-left" style={{ borderLeft: "0px" }}>
                <a href="#" className="inline-block"><img src="/images/logo.png" alt="logo" className="img-fluid footer_logo mb-[14px] h-[35px] w-auto mx-auto sm:mx-0" /></a>
                <p className="text-[#777] text-[14px] leading-relaxed mb-0">
                  There are many variations of passages of Lorem Ipsum has been the industry stand ard dummy text ever since...
                </p>
              </div>
            </motion.div>

            {/* Need Help? */}
            <motion.div 
              className="w-full sm:w-1/2 lg:w-1/4 px-[15px] mb-8 lg:mb-0 wow fadeInUp flex flex-col items-center sm:items-start text-center sm:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="border-left border-[#eee] pl-0 sm:pl-5 h-full column" style={{ borderLeft: "1px solid #eee" }}>
                <h5 className="title_h5 text-capitalize text-[16px] font-bold text-[#333] mt-[-4px] mb-3 uppercase">Need Help?</h5>
                <ul className="list-none p-0 flex flex-col gap-1 items-center sm:items-start">
                  <li><a href="javascript:void(0);" className="text-[#777] text-[14px] hover:text-[#f74f2e] transition-colors leading-[1.2]">Customer Service</a></li>
                  <li><a href="#" className="text-[#777] text-[14px] hover:text-[#f74f2e] transition-colors leading-[1.2]">My Account</a></li>
                  <li><a href="#" className="text-[#777] text-[14px] hover:text-[#f74f2e] transition-colors leading-[1.2]">Contact Us</a></li>
                  <li><a href="#" className="text-[#777] text-[14px] hover:text-[#f74f2e] transition-colors leading-[1.2]">FAQs</a></li>
                </ul>
              </div>
            </motion.div>

            {/* Shopping With Us */}
            <motion.div 
              className="w-full sm:w-1/2 lg:w-1/4 px-[15px] mb-8 lg:mb-0 wow fadeInUp flex flex-col items-center sm:items-start text-center sm:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="border-left border-[#eee] pl-0 sm:pl-5 h-full column" style={{ borderLeft: "1px solid #eee" }}>
                <h5 className="title_h5 text-capitalize text-[16px] font-bold text-[#333] mt-[-4px] mb-3 uppercase">Shopping With Us</h5>
                <ul className="list-none p-0 flex flex-col gap-1 items-center sm:items-start">
                  <li><a href="#" className="text-[#777] text-[14px] hover:text-[#f74f2e] transition-colors leading-[1.2]">Shipping Information</a></li>
                  <li><a href="#" className="text-[#777] text-[14px] hover:text-[#f74f2e] transition-colors leading-[1.2]">Returns & Exchanges</a></li>
                  <li><a href="#" className="text-[#777] text-[14px] hover:text-[#f74f2e] transition-colors leading-[1.2]">Size Charts</a></li>
                </ul>
              </div>
            </motion.div>

            {/* About Us */}
            <motion.div 
              className="w-full sm:w-1/2 lg:w-1/4 px-[15px] wow fadeInUp flex flex-col items-center sm:items-start text-center sm:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="border-left border-[#eee] pl-0 sm:pl-5 h-full column" style={{ borderLeft: "1px solid #eee" }}>
                <h5 className="title_h5 text-capitalize text-[16px] font-bold text-[#333] mt-[-4px] mb-3 uppercase">About Us</h5>
                <ul className="list-none p-0 flex flex-col gap-1 items-center sm:items-start">
                  <li><a href="#" className="text-[#777] text-[14px] hover:text-[#f74f2e] transition-colors leading-[1.2]">We Are Earthyellow</a></li>
                  <li><a href="#" className="text-[#777] text-[14px] hover:text-[#f74f2e] transition-colors leading-[1.2]">Careers</a></li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
        {/* End Footer Top */}

        {/* Start Footer Middle */}
        <div className="footer_middle border-t border-[#eee] py-[35px]">
          <div className="row flex flex-wrap -mx-[15px] justify-center">
            <motion.div 
              className="w-full md:w-1/3 px-[15px] mb-10 md:mb-0 wow fadeInUp flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h5 className="title_h5 text-[16px] font-bold text-[#333] mb-3 uppercase">Shop With Confidence</h5>
              <p className="text-[#777] text-[14px] mb-0">Lorem ipsum dolor si amet consecter.</p>
              <ul className="payment_content mt-6 flex justify-center list-none p-0">
                <li><img src="/images/payments.png" alt="payments" className="img-fluid max-w-full h-auto mx-auto" /></li>
              </ul>
            </motion.div>

            <motion.div 
              className="w-full md:w-1/3 px-[15px] mb-10 md:mb-0 wow fadeInUp flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h5 className="title_h5 text-capitalize text-[16px] font-bold text-[#333] mb-3 uppercase">Secure Shopping</h5>
              <p className="text-[#777] text-[14px] mb-0">Lorem ipsum dolor si amet consecter.</p>
              <ul className="shopping_content mt-6 flex justify-center gap-6 list-none p-0">
                <li><img src="/images/certi.png" alt="certi" className="h-[40px] w-auto" /></li>
                <li><img src="/images/comodo.png" alt="comodo" className="h-[40px] w-auto" /></li>
              </ul>
            </motion.div>

            <motion.div 
              className="w-full md:w-1/3 px-[15px] wow fadeInUp flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h5 className="title_h5 text-capitalize text-[16px] font-bold text-[#333] mb-3 uppercase">Stay Connected</h5>
              <p className="text-[#777] text-[14px] mb-0">Lorem ipsum dolor si amet consecter.</p>
              <ul className="footer_social_icons mt-6 flex justify-center gap-6 list-none p-0 px-[15px]">
                <li><a href="javascript:void(0);" className="text-[#333] hover:text-[#f74f2e] transition-colors"><i className="flaticon-facebook vertical_middle text-[20px]"></i></a></li>
                <li><a href="javascript:void(0);" className="text-[#333] hover:text-[#f74f2e] transition-colors"><i className="flaticon-pinterest vertical_middle text-[20px]"></i></a></li>
                <li><a href="javascript:void(0);" className="text-[#333] hover:text-[#f74f2e] transition-colors"><i className="flaticon-instagram-logo vertical_middle text-[20px]"></i></a></li>
              </ul>
            </motion.div>
          </div>
        </div>
        {/* End Footer Middle */}
      </div>

      {/* Start Footer Bottom --> */}
      <motion.div 
        className="footer_bottom text-center container-fluid border-t border-[#eee] py-6 bg-[#f9f9f9] wow fadeInUp"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0 }}
      >
        <div className="container max-w-[1170px] mx-auto px-[15px] text-center"> 
          2018 © Earthyellow All rights reserved.
        </div>
      </motion.div>
      {/* End Footer Bottom --> */}
    </motion.footer>
  );
}
