"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem("hasSeenNewsletter");
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("hasSeenNewsletter", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleClose();
    if (email) {
      router.push(`/register?email=${encodeURIComponent(email)}`);
    } else {
      router.push('/register');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[10000] bg-[#333]/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Popup Content */}
          <motion.div
            className="fixed top-1/2 left-1/2 z-[10001] w-full max-w-[730px] min-h-[450px] bg-cover bg-no-repeat bg-center newsletter_popup shadow-2xl overflow-visible"
            style={{ backgroundImage: "url('/images/newsletter_popup.jpg')" }}
            initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-55%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.8, x: "-50%", y: "-55%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute -top-2 -right-1 lg:right-5 lg:top-0 text-white text-[35px] cursor-pointer hover:rotate-90 transition-transform duration-300 z-20 new_close"
            >
              <i className="flaticon-close"></i>
            </button>

            {/* Form Wrap */}
            <div className="news_form bg-white/90 w-full max-w-[540px] m-auto p-10 lg:p-[40px] mt-[40px] lg:mt-[40px] text-center shadow-lg">


              <h3 className="title_h3 text-[24px] lg:text-[30px] font-semibold text-[#333] mb-1.5 uppercase leading-tight">
                Đăng ký & <span className="text-[#f74f2e]">Nhận 20% </span>giảm giá
              </h3>
              <h4 className="title_h4 text-[18px] lg:text-[22px] text-[#333] mb-1.5 font-medium uppercase">
                Cho đơn hàng đầu tiên
              </h4>
              <p className="text-[#666] text-[14px] lg:text-[15px] mb-6 lg:mb-[24px] leading-relaxed">
                Đăng ký nhận bản tin của chúng tôi để nhận thông tin về các bộ sưu tập mới nhất và ưu đãi độc quyền.
              </p>

              <form className="mb-1 text-left" onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <label htmlFor="modal-email" className="block text-left text-[14px] font-bold text-[#333] uppercase mb-2 title_h5">
                    Nhập Email của bạn
                  </label>
                  <input
                    type="email"
                    id="modal-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control w-full h-[45px] border border-[#eee] px-4 text-[14px] outline-none focus:border-[#f74f2e] transition-colors rounded-none"
                    placeholder="emailcuaban@example.com"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn background-btn w-auto bg-[#f74f2e] text-white py-2.5 px-8 text-[14px] font-bold uppercase hover:bg-[#333] transition-all"
                >
                  ĐĂNG KÝ NGAY
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
