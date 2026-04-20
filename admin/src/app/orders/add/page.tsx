"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Save, 
  User, 
  CreditCard, 
  Package, 
  Truck, 
  Clock,
  ChevronRight,
  PlusCircle,
  X
} from "lucide-react";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { Order } from "@/features/orders/types";
import Dialog from "@/shared/components/Dialog";

export default function AddOrderPage() {
  const router = useRouter();
  const { addOrder } = useOrders();
  
  const [newOrder, setNewOrder] = useState<Omit<Order, "id" | "date">>({
    customer: "",
    amount: "",
    payment: "COD",
    status: "Chờ xác nhận",
    items: 1
  });

  const [dialogConfig, setDialogConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "warning";
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "success"
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrder.customer || !newOrder.amount) {
       setDialogConfig({
         isOpen: true,
         title: "Thiếu thông tin!",
         message: "Vui lòng nhập đầy đủ tên khách hàng và giá trị đơn hàng.",
         type: "warning"
       });
       return;
    }

    addOrder(newOrder);
    setDialogConfig({
      isOpen: true,
      title: "Thành công!",
      message: "Đơn hàng đã được khởi tạo. Bạn sẽ được chuyển về trang danh sách ngay bây giờ.",
      type: "success"
    });

    setTimeout(() => {
      router.push("/orders");
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 px-4">
      {/* Breadcrumb & Title */}
      <div className="flex flex-col gap-6">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[13px] font-black text-[#999] hover:text-[#f74f2e] transition-all w-fit bg-gray-50 px-4 py-2 rounded-full border border-gray-100 shadow-sm"
        >
          <ArrowLeft size={16} /> Quay lại danh sách
        </button>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-[#1a1a1a] tracking-tighter flex items-center gap-3">
              <PlusCircle className="text-[#f74f2e]" size={32} /> Tạo đơn hàng mới
            </h1>
            <p className="text-[#666] text-[14px] font-bold mt-1">Khởi tạo giao dịch thủ công với dữ liệu chính xác và rõ nét.</p>
          </div>
          <div className="flex items-center gap-3">
             <button 
               onClick={() => router.push("/orders")}
               className="px-6 py-3 bg-white border border-gray-200 rounded-2xl text-[13px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all shadow-sm"
             >
               Hủy bỏ
             </button>
             <button 
               onClick={handleSave}
               className="flex items-center gap-3 px-10 py-3 bg-[#f74f2e] text-white rounded-2xl text-[13px] font-black uppercase tracking-widest hover:bg-[#d24327] shadow-xl shadow-[#f74f2e]/30 transition-all active:scale-95 group font-sans"
             >
               <Save size={20} className="group-hover:scale-110 transition-transform" /> Lưu đơn hàng
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Left */}
        <div className="lg:col-span-2 space-y-8">
          {/* Customer Section */}
          <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-500/5 space-y-10">
             <div className="flex items-center justify-between border-b border-gray-50 pb-6">
                <h3 className="text-[16px] font-black text-[#1a1a1a] uppercase tracking-wider flex items-center gap-3">
                   <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#f74f2e]"><User size={20} /></div>
                   Thông tin khách hàng
                </h3>
                <span className="px-3 py-1 bg-gray-100 text-gray-400 text-[10px] font-black rounded-lg uppercase tracking-widest">Bắt buộc</span>
             </div>
             
             <div className="space-y-4">
                <div className="space-y-3">
                   <label className="text-[12px] font-black text-[#1a1a1a] uppercase tracking-widest pl-1">Họ và tên khách hàng</label>
                   <div className="relative group">
                      <input 
                         type="text" 
                         value={newOrder.customer}
                         onChange={(e) => setNewOrder({...newOrder, customer: e.target.value})}
                         placeholder="Nhập tên khách hàng..."
                         className="w-full h-16 px-6 bg-gray-50 border-2 border-transparent rounded-[24px] text-[16px] font-black text-[#1a1a1a] placeholder:text-gray-400 focus:bg-white focus:border-[#f74f2e] focus:ring-4 focus:ring-[#f74f2e]/10 outline-none transition-all shadow-inner"
                      />
                      {newOrder.customer && (
                        <button onClick={() => setNewOrder({...newOrder, customer: ""})} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full text-gray-400"><X size={18} /></button>
                      )}
                   </div>
                </div>
             </div>
          </div>

          {/* Pricing & Items Section */}
          <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-500/5 space-y-10">
             <div className="flex items-center justify-between border-b border-gray-50 pb-6">
                <h3 className="text-[16px] font-black text-[#1a1a1a] uppercase tracking-wider flex items-center gap-3">
                   <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500"><Package size={20} /></div>
                   Chi tiết sản phẩm & Giá trị
                </h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                   <label className="text-[12px] font-black text-[#1a1a1a] uppercase tracking-widest pl-1">Tổng giá trị (VNĐ)</label>
                   <div className="relative group text-[#1a1a1a]">
                      <input 
                         type="text" 
                         value={newOrder.amount}
                         onChange={(e) => setNewOrder({...newOrder, amount: e.target.value})}
                         placeholder="Ví dụ: 1.250.000đ"
                         className="w-full h-16 px-6 bg-gray-50 border-2 border-transparent rounded-[24px] text-[18px] font-black placeholder:text-gray-400 focus:bg-white focus:border-[#f74f2e] focus:ring-4 focus:ring-[#f74f2e]/10 outline-none transition-all shadow-inner"
                      />
                      <CreditCard size={22} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f74f2e] transition-colors" />
                   </div>
                </div>
                <div className="space-y-3">
                   <label className="text-[12px] font-black text-[#1a1a1a] uppercase tracking-widest pl-1">Số lượng sản phẩm</label>
                   <input 
                      type="number" 
                      min={1}
                      value={newOrder.items}
                      onChange={(e) => setNewOrder({...newOrder, items: parseInt(e.target.value) || 1})}
                      className="w-full h-16 px-6 bg-gray-50 border-2 border-transparent rounded-[24px] text-[18px] font-black text-[#1a1a1a] focus:bg-white focus:border-[#f74f2e] focus:ring-4 focus:ring-[#f74f2e]/10 outline-none transition-all shadow-inner"
                   />
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar Right */}
        <div className="space-y-8">
           <div className="bg-[#111c43] p-10 rounded-[32px] text-white space-y-10 shadow-2xl relative overflow-hidden group">
              {/* Decorative Glow */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#f74f2e] rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity" />

              <h3 className="text-[14px] font-black uppercase tracking-widest flex items-center gap-3 text-white/50 relative z-10">
                 <Truck size={20} className="text-[#f74f2e]" /> Giao hàng & Thanh toán
              </h3>

              <div className="space-y-8 relative z-10">
                 <div className="space-y-4">
                    <label className="text-[11px] font-black text-white/40 uppercase tracking-widest pl-1">Phương thức thanh toán</label>
                    <div className="relative">
                       <select 
                          value={newOrder.payment}
                          onChange={(e) => setNewOrder({...newOrder, payment: e.target.value as any})}
                          className="w-full h-16 px-6 bg-white/5 border-2 border-white/10 rounded-[24px] text-[15px] font-black outline-none cursor-pointer focus:bg-white/10 focus:border-[#f74f2e] transition-all text-white hover:border-white/20"
                       >
                          <option value="COD" className="bg-[#111c43]">Thanh toán (COD)</option>
                          <option value="Chuyển khoản" className="bg-[#111c43]">Chuyển khoản Online</option>
                          <option value="Ví điện tử" className="bg-[#111c43]">Momo / ZaloPay</option>
                       </select>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-[11px] font-black text-white/40 uppercase tracking-widest pl-1">Trạng thái ban đầu</label>
                    <select 
                       value={newOrder.status}
                       onChange={(e) => setNewOrder({...newOrder, status: e.target.value as any})}
                       className="w-full h-16 px-6 bg-white/5 border-2 border-white/10 rounded-[24px] text-[15px] font-black outline-none cursor-pointer focus:bg-white/10 focus:border-[#f74f2e] transition-all text-white hover:border-white/20"
                    >
                       <option value="Chờ xác nhận" className="bg-[#111c43]">Chờ xác nhận</option>
                       <option value="Đang xử lý" className="bg-[#111c43]">Đang xử lý</option>
                       <option value="Đang giao" className="bg-[#111c43]">Đang vận chuyển</option>
                       <option value="Hoàn thành" className="bg-[#111c43]">Đã hoàn thành</option>
                    </select>
                 </div>
              </div>

              <div className="pt-8 border-t border-white/10 flex items-center justify-between relative z-10">
                 <div className="flex flex-col">
                    <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Mã số tự động</span>
                    <span className="text-[#f74f2e] font-black text-[16px]">#ORD-AUTO</span>
                 </div>
                 <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/20"><Package size={24} /></div>
              </div>
           </div>

           {/* Admin Alert Card */}
           <div className="bg-orange-50/50 p-8 rounded-[32px] border border-orange-100/50 space-y-4">
              <div className="flex items-center gap-3 text-orange-600">
                 <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center"><Clock size={16} /></div>
                 <span className="text-[13px] font-black uppercase tracking-wider">Nhắc nhở quan trọng</span>
              </div>
              <p className="text-[13px] text-orange-800/80 font-bold leading-relaxed">
                 Dữ liệu bạn nhập sẽ được lưu ngay vào bộ nhớ hệ thống. Hãy đảm bảo chữ viết đã rõ nét và chính xác trước khi nhấn Lưu.
              </p>
           </div>
        </div>
      </div>

      <Dialog 
        isOpen={dialogConfig.isOpen}
        onClose={() => setDialogConfig({...dialogConfig, isOpen: false})}
        title={dialogConfig.title}
        message={dialogConfig.message}
        type={dialogConfig.type}
      />
    </div>
  );
}
