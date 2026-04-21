"use client";

import React from "react";
import { useAuth } from "@/core/providers/AuthProvider";
import { AccountBreadcrumb } from "@/features/account/components/AccountBreadcrumb";
import { motion } from "framer-motion";
import { FaUser, FaShoppingBag, FaMapMarkerAlt, FaSignOutAlt, FaHeart } from "react-icons/fa";
import Link from "next/link";
import { orderService } from "@/features/checkout/services/orderService";

export default function AccountPage() {
  const { user, logout, updateProfile, isAuthenticated, isLoading } = useAuth();
  const [activeTab, setActiveTab] = React.useState("profile");
  const [isEditing, setIsEditing] = React.useState(false);
  const [editForm, setEditForm] = React.useState({ 
    name: "", 
    email: "", 
    currentPassword: "", 
    newPassword: "", 
    confirmPassword: "" 
  });
  const [isSaving, setIsSaving] = React.useState(false);
  const [orders, setOrders] = React.useState<any[]>([]);

  // Redirect to login if not authenticated (only after loading is finished)
  React.useEffect(() => {
    if (!isLoading && isAuthenticated === false) {
      window.location.href = "/login";
    }
    if (user) {
      setEditForm({ 
        name: user.name, 
        email: user.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    }

    // Load orders from API instead of localStorage
    if (user && user.id) {
      const fetchOrders = async () => {
        const data = await orderService.getAccountOrders(user.id);
        setOrders(data);
      };
      fetchOrders();
    }
  }, [isAuthenticated, user]);

  const handleSave = async () => {
    // Basic validation for password
    if (editForm.newPassword && editForm.newPassword !== editForm.confirmPassword) {
      alert("Mật khẩu mới không khớp!");
      return;
    }

    if (editForm.newPassword && editForm.newPassword.length < 6) {
      alert("Mật khẩu mới phải từ 6 ký tự trở lên!");
      return;
    }

    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateProfile(editForm.name, editForm.email);
    setIsSaving(false);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f7]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) return null;

  const menuItems = [
    { id: "profile", icon: FaUser, label: "Thông tin cá nhân" },
    { id: "orders", icon: FaShoppingBag, label: "Đơn hàng của tôi" },
    { id: "wishlist", icon: FaHeart, label: "Sản phẩm yêu thích", href: "/wishlist" },
    { id: "address", icon: FaMapMarkerAlt, label: "Sổ địa chỉ" },
  ];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <AccountBreadcrumb title="tài khoản của tôi" />
      
      <section className="py-[80px]">
        <div className="max-w-[1170px] mx-auto px-[15px]">
          <div className="flex flex-wrap -mx-[15px]">
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-1/4 px-[15px] mb-[40px] lg:mb-0">
              <div className="bg-white border border-[#eee] p-8 shadow-sm rounded-sm">
                <div className="text-center mb-8 pb-8 border-b border-[#eee]">
                  <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-serif italic font-bold shadow-lg shadow-primary/20">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <h4 className="text-[20px] font-normal text-[#333] font-serif italic">{user.name}</h4>
                  <p className="text-[12px] text-[#999] uppercase tracking-widest mt-1 font-sans font-medium">{user.email}</p>
                </div>
                
                <nav className="space-y-4">
                  {menuItems.map((item, idx) => (
                    item.href ? (
                      <Link 
                        key={idx} 
                        href={item.href}
                        className="flex items-center gap-3 text-[12px] uppercase tracking-[2px] transition-all duration-300 font-sans text-[#777] hover:text-primary"
                      >
                        <item.icon size={14} className="text-[#aaa]" /> {item.label}
                      </Link>
                    ) : (
                      <button 
                        key={idx} 
                        onClick={() => { setActiveTab(item.id); setIsEditing(false); }}
                        className={`flex items-center gap-3 text-[12px] uppercase tracking-[2px] transition-all duration-300 font-sans ${activeTab === item.id ? "text-primary font-bold" : "text-[#777] hover:text-primary"}`}
                      >
                        <item.icon size={14} className={activeTab === item.id ? "text-primary" : "text-[#aaa]"} /> {item.label}
                      </button>
                    )
                  ))}
                  <button 
                    onClick={logout}
                    className="flex items-center gap-3 text-[12px] uppercase tracking-[2px] text-red-500 font-bold pt-4 border-t border-[#eee] w-full hover:text-red-700 transition-colors font-sans"
                  >
                    <FaSignOutAlt size={14} /> Đăng xuất
                  </button>
                </nav>
              </div>
            </div>

            {/* Content Area */}
            <div className="w-full lg:w-3/4 px-[15px]">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {activeTab === "profile" ? (
                  <div className="p-10 border border-[#eee] bg-white shadow-sm rounded-sm">
                    <div className="flex justify-between items-center mb-8 border-b border-[#eee] pb-4">
                      <h3 className="text-[32px] font-normal text-[#333] font-serif italic">
                        Thông tin hồ sơ
                      </h3>
                      {!isEditing ? (
                        <button 
                          onClick={() => setIsEditing(true)}
                          className="text-[12px] font-bold uppercase tracking-[2px] text-primary border-b border-primary pb-0.5 hover:text-[#333] hover:border-[#333] transition-all font-sans"
                        >
                          Chỉnh sửa
                        </button>
                      ) : (
                        <div className="flex gap-6">
                          <button 
                            onClick={() => setIsEditing(false)}
                            className="text-[12px] font-bold uppercase tracking-[2px] text-[#999] hover:text-[#333] transition-all font-sans"
                          >
                            Hủy
                          </button>
                          <button 
                            onClick={handleSave}
                            disabled={isSaving}
                            className="text-[12px] font-bold uppercase tracking-[2px] text-primary border-b border-primary pb-0.5 hover:text-[#333] hover:border-[#333] transition-all disabled:opacity-50 font-sans"
                          >
                            {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-6">
                        <div className="group">
                          <label className="block text-[11px] font-bold text-[#333] mb-2 uppercase tracking-[2px] font-sans">Tên đầy đủ</label>
                          {isEditing ? (
                            <input 
                              type="text" 
                              value={editForm.name}
                              onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                              className="w-full h-[45px] px-0 bg-transparent border-b border-primary focus:border-[#333] outline-none font-sans text-[16px] font-bold text-[#1a1a1a] transition-colors" 
                            />
                          ) : (
                            <p className="text-[15px] text-[#555] border-b border-[#f9f9f9] pb-2 font-sans">{user.name}</p>
                          )}
                        </div>
                        <div className="group">
                          <label className="block text-[11px] font-bold text-[#333] mb-2 uppercase tracking-[2px] font-sans">Địa chỉ Email</label>
                          {isEditing ? (
                            <input 
                              type="email" 
                              value={editForm.email}
                              onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                              className="w-full h-[45px] px-0 bg-transparent border-b border-primary focus:border-[#333] outline-none font-sans text-[16px] font-bold text-[#1a1a1a] transition-colors" 
                            />
                          ) : (
                            <p className="text-[15px] text-[#555] border-b border-[#f9f9f9] pb-2 font-sans">{user.email}</p>
                          )}
                        </div>

                        {isEditing && (
                          <div className="pt-8 space-y-6 border-t border-[#eee] mt-10">
                            <span className="text-[11px] font-bold text-primary uppercase tracking-[4px] block font-sans">Bảo mật</span>
                            <h4 className="text-[18px] font-normal text-[#333] font-serif italic">Thay đổi mật khẩu</h4>
                            <div className="group">
                              <label className="block text-[11px] font-bold text-[#333] mb-2 uppercase tracking-[2px] font-sans">Mật khẩu hiện tại</label>
                              <input 
                                type="password" 
                                value={editForm.currentPassword}
                                onChange={(e) => setEditForm({...editForm, currentPassword: e.target.value})}
                                placeholder="Nhập mật khẩu cũ"
                                className="w-full h-[45px] px-0 bg-transparent border-b border-[#eee] focus:border-primary outline-none font-sans text-[16px] font-bold text-[#1a1a1a] placeholder:text-gray-400 transition-colors" 
                              />
                            </div>
                            <div className="group">
                              <label className="block text-[11px] font-bold text-[#333] mb-2 uppercase tracking-[2px] font-sans">Mật khẩu mới</label>
                              <input 
                                type="password" 
                                value={editForm.newPassword}
                                onChange={(e) => setEditForm({...editForm, newPassword: e.target.value})}
                                placeholder="Ít nhất 6 ký tự"
                                className="w-full h-[45px] px-0 bg-transparent border-b border-[#eee] focus:border-primary outline-none font-sans text-[15px] placeholder:tracking-normal placeholder:text-gray-300 transition-colors" 
                              />
                            </div>
                            <div className="group">
                              <label className="block text-[11px] font-bold text-[#333] mb-2 uppercase tracking-[2px] font-sans">Xác nhận mật khẩu</label>
                              <input 
                                type="password" 
                                value={editForm.confirmPassword}
                                onChange={(e) => setEditForm({...editForm, confirmPassword: e.target.value})}
                                placeholder="Xác nhận lại"
                                className="w-full h-[45px] px-0 bg-transparent border-b border-[#eee] focus:border-primary outline-none font-sans text-[15px] placeholder:tracking-normal placeholder:text-gray-300 transition-colors" 
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="bg-[#fcfcff] p-10 border border-[#eee] rounded-sm flex flex-col items-center justify-center text-center shadow-inner">
                         <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                          <FaShoppingBag className="text-primary text-2xl" />
                         </div>
                         <p className="text-[14px] text-[#888] font-sans italic leading-relaxed">Bạn có {orders.length} đơn hàng đã thực hiện.</p>
                         <button 
                            onClick={() => setActiveTab("orders")}
                            className="mt-6 inline-flex h-[45px] px-8 bg-primary text-white text-[11px] font-bold uppercase tracking-[2px] items-center justify-center hover:bg-[#333] transition-all font-sans"
                         >
                            Xem lịch sử mua hàng
                         </button>
                      </div>
                    </div>
                  </div>
                ) : activeTab === "orders" ? (
                  <div className="p-10 border border-[#eee] bg-white shadow-sm rounded-sm">
                    <h3 className="text-[32px] font-normal text-[#333] mb-8 font-serif italic border-b border-[#eee] pb-4">
                      Lịch sử đơn hàng
                    </h3>
                    
                    {orders.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-[#eee]">
                              <th className="py-4 text-[11px] font-bold uppercase tracking-[2px] text-[#333]">Mã đơn</th>
                              <th className="py-4 text-[11px] font-bold uppercase tracking-[2px] text-[#333]">Ngày đặt</th>
                              <th className="py-4 text-[11px] font-bold uppercase tracking-[2px] text-[#333]">Trạng thái</th>
                              <th className="py-4 text-[11px] font-bold uppercase tracking-[2px] text-[#333]">Tổng tiền</th>
                              <th className="py-4 text-[11px] font-bold uppercase tracking-[2px] text-[#333] text-right">Thao tác</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.map((order, idx) => (
                              <tr key={idx} className="border-b border-[#f9f9f9] hover:bg-[#fafafa] transition-colors">
                                <td className="py-5 font-sans font-bold text-[14px] text-primary">{order.id}</td>
                                <td className="py-5 font-sans text-[14px] text-[#666]">{formatDate(order.date)}</td>
                                <td className="py-5">
                                  <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-[1px] rounded-full">
                                    {order.status}
                                  </span>
                                </td>
                                <td className="py-5 font-sans font-bold text-[14px] text-[#333]">
                                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}
                                </td>
                                <td className="py-5 text-right">
                                  <button className="text-[11px] font-bold uppercase tracking-[1px] text-[#777] hover:text-primary transition-colors">Chi tiết</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="py-20 text-center flex flex-col items-center">
                        <FaShoppingBag size={48} className="text-[#eee] mb-6" />
                        <p className="text-[15px] text-[#999] font-sans italic mb-8">Bạn chưa có đơn hàng nào.</p>
                        <Link href="/shop" className="h-[55px] px-12 bg-[#333] text-white text-[12px] font-bold uppercase tracking-[3px] flex items-center justify-center hover:bg-primary transition-all">
                          Bắt đầu mua sắm
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-10 border border-[#eee] bg-white shadow-sm rounded-sm text-center py-20">
                    <h3 className="text-[24px] font-normal text-[#999] font-serif italic">Tính năng đang được phát triển...</h3>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
