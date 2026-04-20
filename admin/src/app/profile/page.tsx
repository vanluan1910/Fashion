"use client";

import React, { useState, useRef } from "react";
import { User, Mail, Shield, Smartphone, MapPin, Camera, Save, X, Loader2, Lock, KeyRound } from "lucide-react";
import Dialog from "@/shared/components/Dialog";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  
  const [profile, setProfile] = useState({
    name: "Quản Trị Viên",
    email: "admin@atelier.vn",
    phone: "090 123 4567",
    location: "Thủ Đức, TP.HCM",
    avatar: "" 
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [dialogConfig, setDialogConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "warning" | "info" | "confirm";
    onConfirm?: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

  const triggerDialog = (config: Omit<typeof dialogConfig, "isOpen">) => {
    setDialogConfig({ ...config, isOpen: true });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result as string }));
        triggerDialog({
          title: "Cập nhật ảnh đại diện!",
          message: "Ảnh đại diện mới đã được tải lên và cập nhật thành công.",
          type: "success"
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      triggerDialog({
        title: "Đã lưu thay đổi!",
        message: "Thông tin hồ sơ của bạn đã được cập nhật thành công.",
        type: "success"
      });
    }, 1200);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      triggerDialog({
        title: "Thông tin thiếu!",
        message: "Vui lòng nhập đầy đủ các trường mật khẩu.",
        type: "warning"
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      triggerDialog({
        title: "Mật khẩu không khớp!",
        message: "Mật khẩu mới và xác nhận mật khẩu không trùng khớp nhau.",
        type: "warning"
      });
      return;
    }

    setIsUpdatingPassword(true);
    setTimeout(() => {
      setIsUpdatingPassword(false);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      triggerDialog({
        title: "Đổi mật khẩu thành công!",
        message: "Mật khẩu tài khoản quản trị của bạn đã được cập nhật.",
        type: "success"
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#333] tracking-tight">Hồ sơ cá nhân</h1>
          <p className="text-[13px] text-[#666] font-medium mt-1">Quản lý và cập nhật thông tin định danh của bạn trên hệ thống.</p>
        </div>
        {isEditing && (
          <div className="flex items-center gap-3">
             <button 
               onClick={() => setIsEditing(false)}
               className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#eee] rounded-xl text-[13px] font-bold text-[#666] hover:bg-[#f9f9f9] transition-all"
             >
               <X size={18} /> Hủy
             </button>
             <button 
               onClick={handleSave}
               disabled={isSaving}
               className="flex items-center gap-2 px-6 py-2.5 bg-[#845adf] text-white font-bold text-[13px] rounded-xl hover:bg-[#7248c8] disabled:opacity-70 transition-all shadow-lg shadow-[#845adf]/20"
             >
               {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} 
               Lưu thay đổi
             </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-[#eee] shadow-sm text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#845adf]"></div>
            <input type="file" ref={avatarInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />

            <div className="relative inline-block mb-6 mt-2">
              <div className="w-32 h-32 bg-[#845adf]/10 rounded-full flex items-center justify-center text-[#845adf] text-5xl font-black overflow-hidden border-4 border-white shadow-xl">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  profile.name.charAt(0)
                )}
              </div>
              <button 
                onClick={() => avatarInputRef.current?.click()}
                className="absolute bottom-1 right-1 p-2.5 bg-white border border-[#eee] rounded-full text-[#845adf] shadow-lg hover:bg-[#845adf] hover:text-white transition-all transform hover:scale-110"
              >
                <Camera size={18} />
              </button>
            </div>
            <h4 className="text-xl font-extrabold text-[#333] tracking-tight">{profile.name}</h4>
            <p className="text-[13px] text-[#845adf] font-bold uppercase tracking-wider mt-1">Quản trị viên hệ thống</p>
            
            <div className="mt-6 pt-6 border-t border-[#f1f1f1] flex flex-col gap-3">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-[#999] font-bold uppercase text-[10px]">Mã định danh</span>
                <span className="text-[#333] font-bold">#ADMIN-001</span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-[#999] font-bold uppercase text-[10px]">Trạng thái</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-green-50 text-green-600 text-[11px] font-bold rounded-full border border-green-100">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Hoạt động
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Information & Password */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-[#eee] shadow-sm">
             <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#eee]">
               <h5 className="font-extrabold text-[18px] text-[#333] tracking-tight">Cài đặt thông tin chi tiết</h5>
               {!isEditing && (
                  <button onClick={() => setIsEditing(true)} className="text-[13px] font-bold text-[#845adf] hover:underline">
                    Chỉnh sửa
                  </button>
               )}
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2">
                   <label className="text-[11px] font-bold text-[#999] uppercase tracking-widest">Họ và tên đầy đủ</label>
                   {isEditing ? (
                     <input 
                       type="text" 
                       value={profile.name}
                       onChange={(e) => setProfile({...profile, name: e.target.value})}
                       className="w-full p-4 bg-[#f3f4f9] border-none rounded-xl text-[14px] text-[#333] font-bold focus:ring-2 focus:ring-[#845adf] transition-all"
                     />
                   ) : (
                     <div className="flex items-center gap-3 p-4 bg-[#fcfcff] border border-[#f1f1f1] rounded-xl text-[14px] text-[#333] font-bold group hover:border-[#845adf]/30 transition-all">
                        <User size={18} className="text-[#845adf] opacity-40 group-hover:opacity-100 transition-opacity" /> {profile.name}
                     </div>
                   )}
                </div>
                <div className="space-y-2">
                   <label className="text-[11px] font-bold text-[#999] uppercase tracking-widest">Địa chỉ Email</label>
                   {isEditing ? (
                     <input 
                       type="email" 
                       value={profile.email}
                       onChange={(e) => setProfile({...profile, email: e.target.value})}
                       className="w-full p-4 bg-[#f3f4f9] border-none rounded-xl text-[14px] text-[#333] font-bold focus:ring-2 focus:ring-[#845adf] transition-all"
                     />
                   ) : (
                     <div className="flex items-center gap-3 p-4 bg-[#fcfcff] border border-[#f1f1f1] rounded-xl text-[14px] text-[#333] font-bold group hover:border-[#845adf]/30 transition-all">
                        <Mail size={18} className="text-[#845adf] opacity-40 group-hover:opacity-100 transition-opacity" /> {profile.email}
                     </div>
                   )}
                </div>
                <div className="space-y-2">
                   <label className="text-[11px] font-bold text-[#999] uppercase tracking-widest">Số điện thoại liên lạc</label>
                   {isEditing ? (
                     <input 
                       type="text" 
                       value={profile.phone}
                       onChange={(e) => setProfile({...profile, phone: e.target.value})}
                       className="w-full p-4 bg-[#f3f4f9] border-none rounded-xl text-[14px] text-[#333] font-bold focus:ring-2 focus:ring-[#845adf] transition-all"
                     />
                   ) : (
                     <div className="flex items-center gap-3 p-4 bg-[#fcfcff] border border-[#f1f1f1] rounded-xl text-[14px] text-[#333] font-bold group hover:border-[#845adf]/30 transition-all">
                        <Smartphone size={18} className="text-[#845adf] opacity-40 group-hover:opacity-100 transition-opacity" /> {profile.phone}
                     </div>
                   )}
                </div>
                <div className="space-y-2">
                   <label className="text-[11px] font-bold text-[#999] uppercase tracking-widest">Địa điểm/Khu vực</label>
                   {isEditing ? (
                     <input 
                       type="text" 
                       value={profile.location}
                       onChange={(e) => setProfile({...profile, location: e.target.value})}
                       className="w-full p-4 bg-[#f3f4f9] border-none rounded-xl text-[14px] text-[#333] font-bold focus:ring-2 focus:ring-[#845adf] transition-all"
                     />
                   ) : (
                     <div className="flex items-center gap-3 p-4 bg-[#fcfcff] border border-[#f1f1f1] rounded-xl text-[14px] text-[#333] font-bold group hover:border-[#845adf]/30 transition-all">
                        <MapPin size={18} className="text-[#845adf] opacity-40 group-hover:opacity-100 transition-opacity" /> {profile.location}
                     </div>
                   )}
                </div>
             </div>
          </div>

          <form onSubmit={handleUpdatePassword} className="bg-white p-8 rounded-2xl border border-[#eee] shadow-sm">
             <h5 className="font-extrabold text-[18px] mb-8 text-[#333] tracking-tight flex items-center gap-2 pb-4 border-b border-[#eee]">
               <Lock size={20} className="text-[#845adf]" /> Bảo mật & Thay đổi mật khẩu
             </h5>
             
             <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[11px] font-bold text-[#999] uppercase tracking-widest">Mật khẩu hiện tại</label>
                   <input 
                      type="password" 
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      placeholder="••••••••"
                      className="w-full p-4 bg-[#fcfcff] border border-[#eee] rounded-xl text-[14px] text-[#333] font-bold focus:ring-2 focus:ring-[#845adf] transition-all"
                   />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[11px] font-bold text-[#999] uppercase tracking-widest">Mật khẩu mới</label>
                     <input 
                        type="password" 
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        placeholder="••••••••"
                        className="w-full p-4 bg-[#fcfcff] border border-[#eee] rounded-xl text-[14px] text-[#333] font-bold focus:ring-2 focus:ring-[#845adf] transition-all"
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[11px] font-bold text-[#999] uppercase tracking-widest">Xác nhận mật khẩu</label>
                     <input 
                        type="password" 
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        placeholder="••••••••"
                        className="w-full p-4 bg-[#fcfcff] border border-[#eee] rounded-xl text-[14px] text-[#333] font-bold focus:ring-2 focus:ring-[#845adf] transition-all"
                     />
                  </div>
                </div>

                <div className="pt-4">
                   <button 
                    type="submit"
                    disabled={isUpdatingPassword}
                    className="w-full sm:w-auto px-10 py-3.5 bg-[#333] text-white font-bold text-[13px] rounded-xl hover:bg-black transition-all shadow-lg active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
                   >
                     {isUpdatingPassword ? <Loader2 size={18} className="animate-spin" /> : <KeyRound size={18} />}
                     Cập nhật mật khẩu mới
                   </button>
                </div>
             </div>
          </form>
        </div>
      </div>

      <Dialog 
        {...dialogConfig} 
        onClose={() => setDialogConfig(prev => ({ ...prev, isOpen: false }))} 
      />
    </div>
  );
}
