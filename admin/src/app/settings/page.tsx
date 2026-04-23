"use client";

import React, { useState, useEffect } from "react";
import { 
  Globe, 
  ShieldCheck, 
  Bell, 
  Image as ImageIcon,
  Save,
  Users,
  Camera,
  Play,
  Music2, // For TikTok
  CheckCircle2
} from "lucide-react";
import { settingsService, SiteSettings } from "@/features/settings/services/settingsService";
import Dialog from "@/shared/components/Dialog";

type TabType = "general" | "brand" | "security" | "notifications";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [dialogConfig, setDialogConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "warning" | "info" | "confirm";
    onConfirm?: () => void;
  }>({
    isOpen: false,
    title: "", message: "", type: "info"
  });

  useEffect(() => {
    setSettings(settingsService.getSettings());
  }, []);

  const triggerDialog = (config: Omit<typeof dialogConfig, "isOpen">) => {
    setDialogConfig({ ...config, isOpen: true });
  };

  const handleSave = () => {
    if (!settings) return;
    setIsSaving(true);
    
    // Simulate API delay
    setTimeout(() => {
      settingsService.saveSettings(settings);
      setIsSaving(false);
      triggerDialog({
        title: "Đã lưu cài đặt!",
        message: "Các cấu hình hệ thống đã được cập nhật thành công và áp dụng ngay lập tức.",
        type: "success"
      });
    }, 800);
  };



  if (!settings) return null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#333] tracking-tight">Cài đặt hệ thống</h1>
          <p className="text-[#888] text-[13px] font-medium mt-1">Quản lý cấu hình chung, thương hiệu và quyền riêng tư.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-8 py-2.5 bg-[#f74f2e] text-white rounded-xl text-[13px] font-bold hover:bg-[#d24327] transition-all shadow-lg shadow-[#f74f2e]/20 active:scale-95 disabled:opacity-50"
          >
            {isSaving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : <Save size={18} />}
            Lưu thay đổi
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Tabs */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { id: "general", label: "Cấu hình chung", icon: Globe },
            { id: "brand", label: "Thương hiệu", icon: ImageIcon },
            { id: "security", label: "Bảo mật", icon: ShieldCheck },
            { id: "notifications", label: "Thông báo", icon: Bell },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl text-[14px] font-bold transition-all border ${
                activeTab === tab.id 
                  ? "bg-[#f74f2e] text-white border-[#f74f2e] shadow-md shadow-[#f74f2e]/20" 
                  : "bg-white text-[#666] hover:bg-[#f3f4f9] border-[#eee]"
              }`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === "general" && (
            <>
              {/* General Config Card */}
              <div className="bg-white rounded-2xl border border-[#eee] shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-6 border-b border-[#eee] bg-[#fcfcff]">
                   <h4 className="text-[16px] font-black text-[#333]">Thông tin trang web</h4>
                   <p className="text-[#999] text-[12px] font-medium">Các thông tin này sẽ hiển thị lên công cụ tìm kiếm và trình duyệt.</p>
                </div>
                <div className="p-6 space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[12px] font-black text-[#333] uppercase tracking-widest ml-1">Tên trang web</label>
                         <input 
                           type="text" 
                           value={settings.general.siteName}
                           onChange={(e) => setSettings({...settings, general: {...settings.general, siteName: e.target.value}})}
                           className="w-full h-12 px-4 bg-[#f3f4f9] border-transparent rounded-xl text-[14px] text-[#333] font-bold focus:ring-2 focus:ring-[#f74f2e] focus:bg-white outline-none transition-all" 
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[12px] font-black text-[#333] uppercase tracking-widest ml-1">Khẩu hiệu (Tagline)</label>
                         <input 
                           type="text" 
                           value={settings.general.tagline}
                           onChange={(e) => setSettings({...settings, general: {...settings.general, tagline: e.target.value}})}
                           className="w-full h-12 px-4 bg-[#f3f4f9] border-transparent rounded-xl text-[14px] text-[#333] font-bold focus:ring-2 focus:ring-[#f74f2e] focus:bg-white outline-none transition-all" 
                         />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[12px] font-black text-[#333] uppercase tracking-widest ml-1">Mô tả (Meta Description)</label>
                      <textarea 
                        rows={4} 
                        value={settings.general.metaDescription}
                        onChange={(e) => setSettings({...settings, general: {...settings.general, metaDescription: e.target.value}})}
                        className="w-full p-4 bg-[#f3f4f9] border-transparent rounded-xl text-[14px] text-[#333] font-bold focus:ring-2 focus:ring-[#f74f2e] focus:bg-white outline-none transition-all resize-none" 
                      />
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[12px] font-black text-[#333] uppercase tracking-widest ml-1">Email liên hệ</label>
                         <input 
                           type="email" 
                           value={settings.general.contactEmail}
                           onChange={(e) => setSettings({...settings, general: {...settings.general, contactEmail: e.target.value}})}
                           className="w-full h-12 px-4 bg-[#f3f4f9] border-transparent rounded-xl text-[14px] text-[#333] font-bold focus:ring-2 focus:ring-[#f74f2e] focus:bg-white outline-none transition-all" 
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[12px] font-black text-[#333] uppercase tracking-widest ml-1">Hotline</label>
                         <input 
                           type="text" 
                           value={settings.general.hotline}
                           onChange={(e) => setSettings({...settings, general: {...settings.general, hotline: e.target.value}})}
                           className="w-full h-12 px-4 bg-[#f3f4f9] border-transparent rounded-xl text-[14px] text-[#333] font-bold focus:ring-2 focus:ring-[#f74f2e] focus:bg-white outline-none transition-all" 
                         />
                      </div>
                   </div>
                </div>
              </div>

              {/* Social Links Card */}
              <div className="bg-white rounded-2xl border border-[#eee] shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
                <div className="p-6 border-b border-[#eee] bg-[#fcfcff]">
                   <h4 className="text-[16px] font-black text-[#333]">Mạng xã hội</h4>
                   <p className="text-[#999] text-[12px] font-medium">Kết nối trang web với các tài khoản mạng xã hội của bạn.</p>
                </div>
                <div className="p-6 space-y-4">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-blue-600/20"><Users size={22} /></div>
                      <input 
                        type="text" 
                        value={settings.social.facebook}
                        onChange={(e) => setSettings({...settings, social: {...settings.social, facebook: e.target.value}})}
                        placeholder="Link Facebook..." 
                        className="flex-grow h-12 px-4 bg-[#f3f4f9] border-transparent rounded-xl text-[14px] text-[#333] font-bold focus:ring-2 focus:ring-[#f74f2e] focus:bg-white outline-none transition-all" 
                      />
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-red-500/20"><Camera size={22} /></div>
                      <input 
                        type="text" 
                        value={settings.social.instagram}
                        onChange={(e) => setSettings({...settings, social: {...settings.social, instagram: e.target.value}})}
                        placeholder="Link Instagram..." 
                        className="flex-grow h-12 px-4 bg-[#f3f4f9] border-transparent rounded-xl text-[14px] text-[#333] font-bold focus:ring-2 focus:ring-[#f74f2e] focus:bg-white outline-none transition-all" 
                      />
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-black/20"><Music2 size={22} /></div>
                      <input 
                        type="text" 
                        value={settings.social.tiktok}
                        onChange={(e) => setSettings({...settings, social: {...settings.social, tiktok: e.target.value}})}
                        placeholder="Link TikTok..." 
                        className="flex-grow h-12 px-4 bg-[#f3f4f9] border-transparent rounded-xl text-[14px] text-[#333] font-bold focus:ring-2 focus:ring-[#f74f2e] focus:bg-white outline-none transition-all" 
                      />
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-red-600/20"><Play size={22} /></div>
                      <input 
                        type="text" 
                        value={settings.social.youtube}
                        onChange={(e) => setSettings({...settings, social: {...settings.social, youtube: e.target.value}})}
                        placeholder="Link Youtube..." 
                        className="flex-grow h-12 px-4 bg-[#f3f4f9] border-transparent rounded-xl text-[14px] text-[#333] font-bold focus:ring-2 focus:ring-[#f74f2e] focus:bg-white outline-none transition-all" 
                      />
                   </div>
                </div>
              </div>
            </>
          )}

          {activeTab !== "general" && (
            <div className="p-20 bg-white rounded-2xl border border-dashed border-[#eee] flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-[#ccc] mb-4">
                 <ShieldCheck size={32} />
               </div>
               <h4 className="text-[16px] font-bold text-[#333]">Chức năng đang phát triển</h4>
               <p className="text-[13px] text-[#999] mt-1 max-w-[300px]">Mục <b>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</b> sẽ sớm khả dụng trong bản cập nhật tới.</p>
            </div>
          )}


        </div>
      </div>

      <Dialog 
        {...dialogConfig} 
        onClose={() => setDialogConfig(prev => ({ ...prev, isOpen: false }))} 
      />
    </div>
  );
}
