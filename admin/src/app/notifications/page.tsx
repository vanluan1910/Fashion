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
  const [notifications, setNotifications] = React.useState<any[]>([]);
  const [filter, setFilter] = React.useState<"all" | "unread">("all");
  const [isLoading, setIsLoading] = React.useState(true);
  
  // Custom Modal State
  const [modal, setModal] = React.useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "info" | "confirm";
    onConfirm?: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

  React.useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/recent-signups");
        const result = await response.json();
        if (result.success) {
          // Giả lập trạng thái unread dựa trên thời gian (trong vòng 24h)
          const now = new Date();
          const mapped = result.data.map((n: any) => {
            const createdDate = new Date(n.created_at);
            const diffHours = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60);
            return {
              ...n,
              unread: diffHours < 24
            };
          });
          setNotifications(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;
  const filteredList = filter === "all" ? notifications : notifications.filter(n => n.unread);

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => 
      n.account_id === id ? { ...n, unread: false } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    setModal({
      isOpen: true,
      title: "Thành công",
      message: "Đã đánh dấu tất cả thông báo là đã đọc!",
      type: "info"
    });
  };

  const handleClearHistory = () => {
    setModal({
      isOpen: true,
      title: "Xác nhận xóa",
      message: "Bạn có chắc chắn muốn xóa toàn bộ lịch sử thông báo không? Hành động này không thể hoàn tác.",
      type: "confirm",
      onConfirm: () => {
        setNotifications([]);
        setModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 60000);
    if (diff < 1) return "Vừa xong";
    if (diff < 60) return `${diff} phút trước`;
    if (diff < 1440) return `${Math.floor(diff / 60)} giờ trước`;
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#222]">Trung tâm báo cáo & Thông báo</h1>
          <p className="text-[#444] text-[13px] font-medium">Xem toàn bộ các hoạt động gần đây của hệ thống.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleMarkAllAsRead}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#ddd] rounded-lg text-[13px] font-semibold text-[#333] hover:bg-[#f9f9f9] transition-all shadow-sm"
          >
            <Check size={16} className="text-green-600" />
            Đánh dấu đã đọc tất cả
          </button>
          <button 
            onClick={handleClearHistory}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#ddd] rounded-lg text-[13px] font-semibold text-red-600 hover:bg-red-50 transition-all shadow-sm"
          >
            <Trash2 size={16} />
            Xóa lịch sử
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl border border-[#f1f1f1] shadow-sm overflow-hidden text-[14px]">
        {/* Toolbar */}
        <div className="p-4 border-b border-[#f1f1f1] flex items-center justify-between">
           <div className="flex items-center gap-4">
              <button 
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all ${filter === "all" ? "bg-[#f74f2e] text-white" : "text-[#999] hover:text-[#333]"}`}
              >
                Tất cả
              </button>
              <button 
                onClick={() => setFilter("unread")}
                className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all flex items-center gap-2 ${filter === "unread" ? "bg-[#f74f2e] text-white" : "text-[#999] hover:text-[#333]"}`}
              >
                Chưa đọc
                {unreadCount > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${filter === "unread" ? "bg-white text-[#f74f2e]" : "bg-red-100 text-red-600"}`}>
                    {unreadCount}
                  </span>
                )}
              </button>
           </div>
           <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button 
                  onClick={handleMarkAllAsRead}
                  className="text-[12px] font-bold text-[#f74f2e] hover:underline px-3"
                >
                  Đánh dấu tất cả là đã đọc
                </button>
              )}
              <button className="text-[#999] p-2 hover:bg-[#f3f4f9] rounded-lg"><Filter size={18} /></button>
           </div>
        </div>

        {/* List */}
        <div className="divide-y divide-[#f9f9f9]">
          {isLoading ? (
            <div className="p-20 text-center text-[#999] italic flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-4 border-[#f74f2e] border-t-transparent rounded-full animate-spin"></div>
              Đang tải dữ liệu...
            </div>
          ) : filteredList.length > 0 ? (
            filteredList.map((notif) => (
              <div 
                key={notif.account_id} 
                onClick={() => handleMarkAsRead(notif.account_id)}
                className={`p-5 flex items-start gap-4 transition-all hover:bg-[#fcfcff] cursor-pointer ${notif.unread ? "bg-[#fff9f8]" : ""}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.unread ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                  <UserPlus size={18} />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-1">
                    <p className={`text-[14px] ${notif.unread ? "font-bold text-[#333]" : "text-[#777]"}`}>
                      Khách hàng mới: <span className={notif.unread ? "text-[#f74f2e]" : "text-[#999]"}>{notif.full_name}</span> đã đăng ký tài khoản.
                    </p>
                    <span className="text-[12px] text-[#999]">{formatTime(notif.created_at)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <p className="text-[12px] text-[#999]">Thông báo tự động từ hệ thống tài khoản.</p>
                     {notif.unread && <span className="w-2.5 h-2.5 bg-[#f74f2e] rounded-full shadow-[0_0_8px_rgba(247,79,46,0.5)]"></span>}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-20 text-center text-[#999] italic">Không có thông báo nào.</div>
          )}
        </div>

        {/* More */}
        <div className="p-6 bg-[#fcfcff] text-center border-t border-[#f1f1f1]">
           <button className="text-[13px] font-bold text-[#f74f2e] hover:underline">Tải thêm thông báo cũ hơn</button>
        </div>
      </div>

      {/* Custom Modal / Dialog */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all animate-in fade-in duration-200">
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-8">
                 <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${modal.type === 'confirm' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {modal.type === 'confirm' ? <AlertTriangle size={24} /> : <Check size={24} />}
                 </div>
                 <h3 className="text-[20px] font-black text-[#222] mb-3 tracking-tight">{modal.title}</h3>
                 <p className="text-[#555] text-[14px] font-semibold leading-relaxed mb-8">{modal.message}</p>
                 
                 <div className="flex items-center gap-3">
                    {modal.type === 'confirm' ? (
                       <>
                          <button 
                            onClick={() => setModal(prev => ({ ...prev, isOpen: false }))}
                            className="flex-1 py-3 px-4 bg-[#f3f4f9] text-[#666] font-black text-[13px] rounded-xl hover:bg-[#eee] transition-all uppercase tracking-widest"
                          >
                             Hủy bỏ
                          </button>
                          <button 
                            onClick={modal.onConfirm}
                            className="flex-1 py-3 px-4 bg-red-600 text-white font-black text-[13px] rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 uppercase tracking-widest"
                          >
                             Xác nhận xóa
                          </button>
                       </>
                    ) : (
                       <button 
                        onClick={() => setModal(prev => ({ ...prev, isOpen: false }))}
                        className="w-full py-3 px-4 bg-[#222] text-white font-black text-[13px] rounded-xl hover:bg-[#333] transition-all shadow-lg shadow-black/10 uppercase tracking-widest"
                       >
                         Đóng lại
                       </button>
                    )}
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
