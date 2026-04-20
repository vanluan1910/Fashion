"use client";

import React from "react";
import { 
  Settings as SettingsIcon, 
  Globe, 
  ShieldCheck, 
  Bell, 
  Image as ImageIcon,
  Save,
  RotateCcw
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#333]">Cài đặt hệ thống</h1>
          <p className="text-[#888] text-[13px]">Quản lý cấu hình chung, thương hiệu và quyền riêng tư.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Tabs */}
        <div className="lg:col-span-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#845adf] text-white rounded-lg font-bold text-[14px]">
            <Globe size={18} />
            Cấu hình chung
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-white text-[#666] hover:bg-[#f3f4f9] rounded-lg font-medium text-[14px] transition-all border border-[#f1f1f1]">
            <ImageIcon size={18} />
            Thương hiệu
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-white text-[#666] hover:bg-[#f3f4f9] rounded-lg font-medium text-[14px] transition-all border border-[#f1f1f1]">
            <ShieldCheck size={18} />
            Bảo mật
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-white text-[#666] hover:bg-[#f3f4f9] rounded-lg font-medium text-[14px] transition-all border border-[#f1f1f1]">
            <Bell size={18} />
            Thông báo
          </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* General Config Card */}
          <div className="bg-white rounded-xl border border-[#f1f1f1] shadow-sm overflow-hidden">
             <div className="p-6 border-b border-[#f1f1f1]">
                <h4 className="text-[16px] font-bold text-[#333]">Thông tin trang web</h4>
                <p className="text-[#999] text-[12px]">Các thông tin này sẽ hiển thị lên công cụ tìm kiếm và trình duyệt.</p>
             </div>
             <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[13px] font-bold text-[#333] uppercase tracking-wider">Tên trang web</label>
                      <input type="text" defaultValue="Atelier Fashion & Lifestyle" className="w-full h-11 px-4 bg-[#f3f4f9] border-none rounded-lg text-[14px] focus:ring-1 focus:ring-[#845adf]" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[13px] font-bold text-[#333] uppercase tracking-wider">Khẩu hiệu (Tagline)</label>
                      <input type="text" defaultValue="Đẳng cấp thời trang tối giản" className="w-full h-11 px-4 bg-[#f3f4f9] border-none rounded-lg text-[14px] focus:ring-1 focus:ring-[#845adf]" />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[13px] font-bold text-[#333] uppercase tracking-wider">Mô tả (Meta Description)</label>
                   <textarea rows={4} className="w-full p-4 bg-[#f3f4f9] border-none rounded-lg text-[14px] focus:ring-1 focus:ring-[#845adf] resize-none" defaultValue="Atelier là nền tảng thời trang cao cấp chuyên cung cấp các sản phẩm thiết kế tối giản, tinh tế cho người hiện đại." />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[13px] font-bold text-[#333] uppercase tracking-wider">Email liên hệ</label>
                      <input type="email" defaultValue="contact@atelier.vn" className="w-full h-11 px-4 bg-[#f3f4f9] border-none rounded-lg text-[14px] focus:ring-1 focus:ring-[#845adf]" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[13px] font-bold text-[#333] uppercase tracking-wider">Hotline</label>
                      <input type="text" defaultValue="1900 8198" className="w-full h-11 px-4 bg-[#f3f4f9] border-none rounded-lg text-[14px] focus:ring-1 focus:ring-[#845adf]" />
                   </div>
                </div>

                <div className="pt-4 border-t border-[#f1f1f1] flex items-center justify-end gap-3">
                   <button className="flex items-center gap-2 px-6 py-2 bg-[#f3f4f9] text-[#666] font-bold text-[13px] rounded-lg hover:bg-[#e9eaf2] transition-all">
                      <RotateCcw size={16} />
                      Hủy bỏ
                   </button>
                   <button className="flex items-center gap-2 px-6 py-2 bg-[#845adf] text-white font-bold text-[13px] rounded-lg hover:bg-[#7248c8] transition-all shadow-md">
                      <Save size={16} />
                      Lưu thay đổi
                   </button>
                </div>
             </div>
          </div>

          {/* Social Links Card */}
          <div className="bg-white rounded-xl border border-[#f1f1f1] shadow-sm overflow-hidden">
             <div className="p-6 border-b border-[#f1f1f1]">
                <h4 className="text-[16px] font-bold text-[#333]">Mạng xã hội</h4>
                <p className="text-[#999] text-[12px]">Kết nối trang web với các tài khoản mạng xã hội của bạn.</p>
             </div>
             <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center shrink-0">f</div>
                   <input type="text" placeholder="Link Facebook..." className="flex-grow h-11 px-4 bg-[#f3f4f9] border-none rounded-lg text-[14px]" />
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-pink-600 text-white rounded-lg flex items-center justify-center shrink-0">ig</div>
                   <input type="text" placeholder="Link Instagram..." className="flex-grow h-11 px-4 bg-[#f3f4f9] border-none rounded-lg text-[14px]" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
