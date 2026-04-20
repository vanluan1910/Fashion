"use client";

import React from "react";
import { 
  Bell, 
  ShoppingCart, 
  UserPlus, 
  MessageSquare, 
  AlertTriangle,
  Check,
  Trash2,
  Filter
} from "lucide-react";

const ALL_NOTIFICATIONS = [
  { id: 1, title: "Đơn hàng mới #9821 từ Nguyễn Văn A", time: "2 phút trước", type: "order", unread: true, icon: <ShoppingCart size={18} />, color: "bg-blue-100 text-blue-600" },
  { id: 2, title: "Khách hàng mới đăng ký tài khoản", time: "15 phút trước", type: "user", unread: true, icon: <UserPlus size={18} />, color: "bg-green-100 text-green-600" },
  { id: 3, title: "Bạn có 5 bình luận mới cần duyệt trên Blog", time: "1 giờ trước", type: "comment", unread: false, icon: <MessageSquare size={18} />, color: "bg-purple-100 text-purple-600" },
  { id: 4, title: "Cảnh báo: Kho hàng chỉ còn 2 túi xách da Ý", time: "3 giờ trước", type: "alert", unread: false, icon: <AlertTriangle size={18} />, color: "bg-orange-100 text-orange-600" },
  { id: 5, title: "Hệ thống đã tự động sao lưu dữ liệu thành công", time: "Hôm qua", type: "system", unread: false, icon: <Check size={18} />, color: "bg-gray-100 text-gray-600" },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#333]">Trung tâm báo cáo & Thông báo</h1>
          <p className="text-[#888] text-[13px]">Xem toàn bộ các hoạt động gần đây của hệ thống.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#eee] rounded-lg text-[13px] font-medium hover:bg-[#f9f9f9]">
            <Check size={16} />
            Đánh dấu đã đọc tất cả
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg text-[13px] font-bold hover:bg-red-100 transition-all">
            <Trash2 size={16} />
            Xóa lịch sử
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl border border-[#f1f1f1] shadow-sm overflow-hidden text-[14px]">
        {/* Toolbar */}
        <div className="p-4 border-b border-[#f1f1f1] flex items-center justify-between">
           <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-[#f74f2e] text-white rounded-lg text-[13px] font-bold">Tất cả</button>
              <button className="px-4 py-2 text-[#999] hover:text-[#333] font-medium">Chưa đọc</button>
           </div>
           <button className="text-[#999] p-2 hover:bg-[#f3f4f9] rounded-lg"><Filter size={18} /></button>
        </div>

        {/* List */}
        <div className="divide-y divide-[#f9f9f9]">
          {ALL_NOTIFICATIONS.map((notif) => (
            <div key={notif.id} className={`p-5 flex items-start gap-4 transition-all hover:bg-[#fcfcff] cursor-pointer ${notif.unread ? "bg-white" : "bg-white"}`}>
              <div className={`w-10 h-10 ${notif.color} rounded-full flex items-center justify-center shrink-0`}>
                {notif.icon}
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-1">
                  <p className={`text-[14px] ${notif.unread ? "font-bold text-[#333]" : "text-[#555]"}`}>{notif.title}</p>
                  <span className="text-[12px] text-[#999]">{notif.time}</span>
                </div>
                <div className="flex items-center justify-between">
                   <p className="text-[12px] text-[#999]">Thông báo tự động từ phân hệ {notif.type}.</p>
                   {notif.unread && <span className="w-2 h-2 bg-red-500 rounded-full"></span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More */}
        <div className="p-6 bg-[#fcfcff] text-center">
           <button className="text-[13px] font-bold text-[#f74f2e] hover:underline">Tải thêm thông báo cũ hơn</button>
        </div>
      </div>
    </div>
  );
}
