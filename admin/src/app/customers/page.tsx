"use client";

import React, { useState } from "react";
import { 
  Search, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar,
  MoreVertical, 
  UserPlus,
  MailWarning,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Users,
  ShieldCheck,
  Filter,
  X,
  ShoppingBag,
  TrendingUp,
  CreditCard,
  Save,
  User,
  ChevronDown,
  Send,
  MessageSquare,
  RefreshCcw,
  DollarSign
} from "lucide-react";
import { useCustomers } from "@/features/customers/hooks/useCustomers";
import Dialog from "@/shared/components/Dialog";
import Modal from "@/shared/components/Modal";
import { Customer } from "@/features/customers/types";

const VIETNAM_PROVINCES = [
  "An Giang", "Bà Rịa – Vũng Tàu", "Bạc Liêu", "Bắc Giang", "Bắc Kạn", "Bắc Ninh", "Bến Tre", "Bình Dương", "Bình Định", "Bình Phước", "Bình Thuận", "Cà Mau", "Cao Bằng", "Cần Thơ", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lạng Sơn", "Lào Cai", "Lâm Đồng", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "TP. Hồ Chí Minh", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
];

export default function CustomersPage() {
  const { 
    customers, 
    searchQuery, setSearchQuery, 
    membershipFilter, setMembershipFilter, 
    cityFilter, setCityFilter,
    minSpent, setMinSpent,
    minOrders, setMinOrders,
    addCustomer,
    deleteCustomer,
    stats,
    resetFilters
  } = useCustomers();

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [messageContent, setMessageContent] = useState("");

  // New Customer Form State
  const [newCustomer, setNewCustomer] = useState<Omit<Customer, "id" | "joined">>({
    full_name: "", email: "", phone: "", city: "TP. Hồ Chí Minh", orders: 0, spent: "0đ", status: "Hoạt động", isVIP: false,
  } as any);

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

  const triggerDialog = (config: Omit<typeof dialogConfig, "isOpen">) => {
    setDialogConfig({ ...config, isOpen: true });
  };

  const handleDeleteRequest = (id: string, name: string) => {
    triggerDialog({
      title: "Xác nhận xóa?",
      message: `Tài khoản của khách hàng "${name}" sẽ bị gỡ bỏ khỏi hệ thống. Hành động này không thể hoàn tác.`,
      type: "confirm",
      onConfirm: () => {
        deleteCustomer(id);
        triggerDialog({ title: "Đã xóa!", message: "Dữ liệu khách hàng đã được gỡ bỏ thành công.", type: "success" });
      }
    });
  };

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.full_name || !newCustomer.email) {
      triggerDialog({ title: "Thiếu thông tin!", message: "Vui lòng nhập ít nhất Tên và Email để đăng ký khách hàng.", type: "warning" });
      return;
    }
    addCustomer(newCustomer);
    setIsAddModalOpen(false);
    setNewCustomer({ full_name: "", email: "", phone: "", city: "TP. Hồ Chí Minh", orders: 0, spent: "0đ", status: "Hoạt động", isVIP: false } as any);
    triggerDialog({ title: "Thành công!", message: "Khách hàng mới đã được thêm vào hệ thống.", type: "success" });
  };

  const handleSendMessage = () => {
    if (!messageContent) {
      triggerDialog({ title: "Chưa nhập nội dung!", message: "Vui lòng nhập thông điệp bạn muốn gửi đến khách hàng.", type: "warning" });
      return;
    }
    setIsMessageModalOpen(false);
    setMessageContent("");
    setIsDetailOpen(false);
    triggerDialog({ title: "Đã gửi thông điệp!", message: `Hệ thống đã gửi nội dung của bạn đến khách hàng ${selectedCustomer?.name} thành công.`, type: "success" });
  };

  const handleViewDetail = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailOpen(true);
  };

  const activeFilterCount = [
    cityFilter !== "Tất cả",
    minSpent !== "",
    minOrders !== ""
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#333] tracking-tight">Quản lý khách hàng</h1>
          <p className="text-[#888] text-[13px] font-medium mt-1">Quản lý hồ sơ, hành vi mua sắm và chăm sóc thành viên Atelier.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#f74f2e] text-white rounded-xl text-[13px] font-bold hover:bg-[#d24327] transition-all shadow-lg shadow-[#f74f2e]/20 active:scale-95"
          >
            <UserPlus size={18} />
            Thêm khách hàng
          </button>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#eee] shadow-sm flex items-center gap-5 group hover:border-[#f74f2e]/30 transition-all">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
            <Users size={28} />
          </div>
          <div>
            <p className="text-[11px] text-[#999] font-black uppercase tracking-widest">Tổng khách hàng</p>
            <h4 className="text-2xl font-black text-[#333] mt-1">{stats.total.toLocaleString()}</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#eee] shadow-sm flex items-center gap-5 group hover:border-[#f74f2e]/30 transition-all">
           <div className="w-14 h-14 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
            <ShieldCheck size={28} />
          </div>
          <div>
            <p className="text-[11px] text-[#999] font-black uppercase tracking-widest">Thành viên VIP</p>
            <h4 className="text-2xl font-black text-[#333] mt-1">{stats.vip} khách</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#eee] shadow-sm flex items-center gap-5 group hover:border-[#f74f2e]/30 transition-all">
          <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
            <Calendar size={28} />
          </div>
          <div>
            <p className="text-[11px] text-[#999] font-black uppercase tracking-widest">Hoạt động trong tháng</p>
            <h4 className="text-2xl font-black text-[#333] mt-1">+{stats.active} mới</h4>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl border border-[#eee] shadow-sm overflow-hidden min-h-[500px]">
        {/* Toolbar */}
        <div className="p-5 border-b border-[#eee] flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#fcfcff]">
          <div className="relative w-full lg:w-[450px]">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên, email, số điện thoại..." 
              className="w-full h-12 pl-12 pr-4 bg-[#f3f4f9] border-transparent rounded-xl text-[14px] text-[#333] font-bold placeholder:text-[#aaa] focus:ring-2 focus:ring-[#f74f2e] focus:bg-white transition-all outline-none"
            />
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]" />
          </div>
          <div className="flex items-center gap-3 w-full lg:w-auto">
             <select 
               value={membershipFilter}
               onChange={(e) => setMembershipFilter(e.target.value)}
               className="h-12 px-6 bg-[#f3f4f9] border-transparent rounded-xl text-[13px] font-bold text-[#555] focus:ring-2 focus:ring-[#f74f2e] outline-none cursor-pointer flex-1 lg:flex-none"
             >
               <option value="Tất cả">Hạng: Tất cả</option>
               <option value="VIP">Thành viên VIP</option>
               <option value="Phổ thông">Phổ thông</option>
             </select>
             <button 
               onClick={() => setIsFilterModalOpen(true)}
               className={`h-12 px-6 border rounded-xl text-[13px] font-bold transition-all flex items-center gap-2 relative ${
                 activeFilterCount > 0 ? "bg-[#f74f2e]/5 border-[#f74f2e] text-[#f74f2e]" : "bg-white border-[#eee] text-[#666] hover:bg-[#f3f4f9]"
               }`}
             >
               <Filter size={18} /> 
               Lọc nâng cao
               {activeFilterCount > 0 && (
                 <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#f74f2e] text-white flex items-center justify-center rounded-full text-[10px]">
                   {activeFilterCount}
                 </span>
               )}
             </button>
             {activeFilterCount > 0 && (
               <button 
                onClick={resetFilters}
                className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                title="Xóa tất cả bộ lọc"
               >
                 <RefreshCcw size={18} />
               </button>
             )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fcfcff] border-b border-[#eee]">
                <th className="p-5 font-bold text-[#333] uppercase text-[11px] tracking-widest">Hồ sơ khách hàng</th>
                <th className="p-5 font-bold text-[#333] uppercase text-[11px] tracking-widest text-center">Đơn hàng</th>
                <th className="p-5 font-bold text-[#333] uppercase text-[11px] tracking-widest text-right">Tổng chi tiêu</th>
                <th className="p-5 font-bold text-[#333] uppercase text-[11px] tracking-widest text-center">Trạng thái</th>
                <th className="p-5 font-bold text-[#333] uppercase text-[11px] tracking-widest text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f1f1]">
              {customers.length > 0 ? customers.map((customer, index) => (
                <tr key={customer.account_id || customer.id || index} className="hover:bg-[#fcfcff]/50 transition-colors group">
                  <td className="p-5">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-[#f74f2e]/10 text-[#f74f2e] rounded-2xl flex items-center justify-center font-black text-xl relative shadow-sm group-hover:rotate-3 transition-transform">
                        {(customer.full_name || customer.name || "?").charAt(0)}
                        {customer.isVIP && (
                          <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-yellow-400 text-white flex items-center justify-center rounded-full text-[10px] shadow-md border-2 border-white animate-bounce-slow" title="Thành viên VIP">★</div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-extrabold text-[#333] text-[15px]">{customer.full_name || customer.name}</p>
                          {customer.isVIP && <span className="text-[9px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-lg font-black uppercase tracking-wider border border-yellow-200">VIP Member</span>}
                        </div>
                        <div className="flex items-center gap-4 mt-1.5">
                          <span className="text-[12px] text-[#999] font-medium flex items-center gap-1.5"><Mail size={14} className="opacity-60" /> {customer.email}</span>
                          <span className="text-[12px] text-[#999] font-medium flex items-center gap-1.5"><Phone size={14} className="opacity-60" /> {customer.phone}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-center">
                     <p className="font-bold text-[#333] text-[15px]">{customer.orders}</p>
                     <p className="text-[10px] text-[#999] uppercase font-bold tracking-tight">{customer.city}</p>
                  </td>
                  <td className="p-5 text-right font-black text-[#f74f2e] text-[15px]">{customer.spent}</td>
                  <td className="p-5 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border transition-all ${
                      customer.status === "Hoạt động" ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-600 border-red-100"
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => handleViewDetail(customer)}
                        title="Xem hồ sơ" className="p-2.5 text-[#777] hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"><ExternalLink size={20} /></button>
                      <button 
                        onClick={() => handleDeleteRequest(String(customer.account_id || customer.id), customer.full_name || customer.name)}
                        title="Xóa khách hàng" className="p-2.5 text-[#777] hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"><Trash2 size={20} /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                   <td colSpan={5} className="p-20 text-center">
                      <div className="flex flex-col items-center gap-3 text-[#999]">
                         <div className="p-6 bg-[#f3f4f9] rounded-full shadow-inner"><Users size={40} /></div>
                         <p className="font-bold text-[16px]">Không tìm thấy khách hàng phù hợp</p>
                         <p className="text-[13px]">Vui lòng kiểm tra lại từ khóa hoặc các bộ lọc đang áp dụng.</p>
                         {activeFilterCount > 0 && (
                           <button onClick={resetFilters} className="text-[#f74f2e] font-bold text-sm mt-2 hover:underline">Xóa tất cả bộ lọc</button>
                         )}
                      </div>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Filter Modal */}
      <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Bộ lọc nâng cao"
        size="md"
      >
        <div className="space-y-5">
           <div className="space-y-2">
              <label className="text-[13px] font-bold text-[#333] ml-1 flex items-center gap-2"><MapPin size={16} /> Khu vực tỉnh thành</label>
              <div className="relative">
                 <select 
                   value={cityFilter}
                   onChange={(e) => setCityFilter(e.target.value)}
                   className="w-full h-11 pl-4 pr-10 bg-[#f3f4f9] border-transparent rounded-xl text-[14px] text-[#333] font-bold outline-none cursor-pointer focus:ring-2 focus:ring-[#f74f2e]"
                 >
                   <option value="Tất cả">Tất cả khu vực</option>
                   {VIETNAM_PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                 </select>
                 <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                 <label className="text-[13px] font-bold text-[#333] ml-1 flex items-center gap-2"><DollarSign size={16} /> Chi tối thiểu (VND)</label>
                 <input 
                   type="number"
                   value={minSpent}
                   onChange={(e) => setMinSpent(e.target.value ? Number(e.target.value) : "")}
                   placeholder="VD: 1000000"
                   className="w-full h-11 px-4 bg-[#f3f4f9] border-transparent rounded-xl text-[14px] text-[#333] font-bold outline-none focus:ring-2 focus:ring-[#f74f2e]"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[13px] font-bold text-[#333] ml-1 flex items-center gap-2"><ShoppingBag size={16} /> Đơn tối thiểu</label>
                 <input 
                   type="number"
                   value={minOrders}
                   onChange={(e) => setMinOrders(e.target.value ? Number(e.target.value) : "")}
                   placeholder="VD: 5"
                   className="w-full h-11 px-4 bg-[#f3f4f9] border-transparent rounded-xl text-[14px] text-[#333] font-bold outline-none focus:ring-2 focus:ring-[#f74f2e]"
                 />
              </div>
           </div>

           <div className="flex items-center justify-between pt-5 border-t border-[#eee]">
              <button 
                onClick={resetFilters}
                className="text-red-500 font-bold text-[13px] hover:underline"
              >
                Đặt lại bộ lọc
              </button>
              <button 
                onClick={() => setIsFilterModalOpen(false)}
                className="px-8 py-2.5 bg-[#333] text-white font-bold text-[13px] rounded-xl hover:bg-black transition-all"
              >
                Áp dụng
              </button>
           </div>
        </div>
      </Modal>

      {/* Message Modal */}
      <Modal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        title={`Gửi thông điệp đến ${selectedCustomer?.name}`}
        size="md"
      >
        <div className="space-y-4">
           <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 flex items-center gap-3 text-[#f74f2e]">
              <MessageSquare size={20} />
              <p className="text-[12px] font-bold italic leading-tight">Mẹo: Gửi mã giảm giá hoặc lời chúc cá nhân để tăng tỉ lệ mua quay lại.</p>
           </div>
           <textarea 
             value={messageContent}
             onChange={(e) => setMessageContent(e.target.value)}
             rows={5}
             placeholder="Nhập nội dung tin nhắn..."
             className="w-full p-4 bg-[#f3f4f9] border-transparent rounded-2xl text-[14px] text-[#333] font-bold placeholder:text-[#aaa] focus:ring-2 focus:ring-[#f74f2e] outline-none resize-none"
           />
           <div className="flex flex-wrap gap-2">
              {["Chào mừng thành viên!", "Chúc mừng sinh nhật!", "Tặng mã 10%"].map(template => (
                <button key={template} onClick={() => setMessageContent(template)} className="px-3 py-1.5 bg-white border border-[#eee] rounded-full text-[11px] font-bold text-[#666] hover:border-[#f74f2e] hover:text-[#f74f2e] transition-all">{template}</button>
              ))}
           </div>
           <div className="flex justify-end gap-3 pt-4 border-t border-[#eee]">
              <button onClick={() => setIsMessageModalOpen(false)} className="px-6 py-2 bg-[#f3f4f9] text-[#666] font-bold text-[13px] rounded-xl">Hủy</button>
              <button onClick={handleSendMessage} className="px-8 py-2 bg-[#f74f2e] text-white font-bold text-[13px] rounded-xl flex items-center gap-2 transition-all"><Send size={16} /> Gửi ngay</button>
           </div>
        </div>
      </Modal>

      {/* Add Customer Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Đăng ký khách hàng mới" size="lg">
        <form onSubmit={handleCreateCustomer} className="space-y-5">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2 select-none">
                 <label className="text-[13px] font-bold text-[#333] ml-1">Họ và tên khách hàng</label>
                 <div className="relative">
                    <input type="text" value={newCustomer.full_name} onChange={(e) => setNewCustomer({...newCustomer, full_name: e.target.value})} placeholder="VD: Nguyễn Văn A" className="w-full h-11 pl-11 pr-4 bg-[#f3f4f9] border-transparent rounded-xl text-[14px] text-[#333] font-bold placeholder:text-[#aaa] focus:ring-2 focus:ring-[#f74f2e] outline-none" />
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]" />
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-[13px] font-bold text-[#333] ml-1">Địa chỉ Email</label>
                 <div className="relative">
                    <input type="email" value={newCustomer.email} onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})} placeholder="VD: example@mail.com" className="w-full h-11 pl-11 pr-4 bg-[#f3f4f9] border-transparent rounded-xl text-[14px] text-[#333] font-bold placeholder:text-[#aaa] focus:ring-2 focus:ring-[#f74f2e] outline-none" />
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]" />
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-[13px] font-bold text-[#333] ml-1">Số điện thoại</label>
                 <div className="relative">
                    <input type="text" value={newCustomer.phone} onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})} placeholder="VD: 09xx xxx xxx" className="w-full h-11 pl-11 pr-4 bg-[#f3f4f9] border-transparent rounded-xl text-[14px] text-[#333] font-bold placeholder:text-[#aaa] focus:ring-2 focus:ring-[#f74f2e] outline-none" />
                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]" />
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-[13px] font-bold text-[#333] ml-1">Thành phố/Khu vực</label>
                 <div className="relative group">
                    <select value={newCustomer.city} onChange={(e) => setNewCustomer({...newCustomer, city: e.target.value})} className="w-full h-11 pl-11 pr-10 bg-[#f3f4f9] border-transparent rounded-xl text-[14px] text-[#333] font-bold outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-[#f74f2e]">
                      {VIETNAM_PROVINCES.map(province => <option key={province} value={province}>{province}</option>)}
                    </select>
                    <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]" />
                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
                 </div>
              </div>
           </div>
           <div className="p-4 bg-[#fcfcff] border border-[#eee] rounded-2xl flex items-center justify-between">
              <div><p className="text-[14px] font-bold text-[#333]">Hạng thành viên VIP</p><p className="text-[12px] text-[#999]">Kích hoạt chế độ VIP cho khách hàng này.</p></div>
              <label className="relative inline-flex items-center cursor-pointer">
                 <input type="checkbox" checked={newCustomer.isVIP} onChange={(e) => setNewCustomer({...newCustomer, isVIP: e.target.checked})} className="sr-only peer" />
                 <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f74f2e]"></div>
              </label>
           </div>
           <div className="flex justify-end gap-3 pt-5 border-t border-[#eee]">
              <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-6 py-2.5 bg-white border border-[#eee] text-[#666] font-bold text-[13px] rounded-xl hover:bg-[#f9f9f9]">Hủy bỏ</button>
              <button type="submit" className="px-8 py-2.5 bg-[#f74f2e] text-white font-bold text-[13px] rounded-xl hover:bg-[#d24327] flex items-center gap-2"><Save size={18} /> Lưu khách hàng</button>
           </div>
        </form>
      </Modal>

      {/* Detail Modal */}
      <Modal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} title="Hồ sơ thành viên chi tiết" size="xl">
        {selectedCustomer && (
          <div className="space-y-6 pt-2">
            <div className="flex items-start gap-6 pb-6 border-b border-[#eee]">
               <div className="w-24 h-24 bg-[#f74f2e]/10 text-[#f74f2e] rounded-3xl flex items-center justify-center text-4xl font-black">{(selectedCustomer.full_name || selectedCustomer.name || "?").charAt(0)}</div>
               <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-black text-[#333] tracking-tight">{selectedCustomer.full_name || selectedCustomer.name}</h3>
                    {selectedCustomer.isVIP && <span className="px-3 py-1 bg-yellow-400 text-white text-[10px] font-black rounded-full uppercase">VIP Member</span>}
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                     <div className="flex items-center gap-2 text-[13px] font-medium text-[#666]"><Mail size={16} className="text-[#f74f2e]" /> {selectedCustomer.email}</div>
                     <div className="flex items-center gap-2 text-[13px] font-medium text-[#666]"><Phone size={16} className="text-[#f74f2e]" /> {selectedCustomer.phone}</div>
                     <div className="flex items-center gap-2 text-[13px] font-medium text-[#666]"><MapPin size={16} className="text-[#f74f2e]" /> {selectedCustomer.city}</div>
                     <div className="flex items-center gap-2 text-[13px] font-medium text-[#666]"><Calendar size={16} className="text-[#f74f2e]" /> Tham gia: {selectedCustomer.joined}</div>
                  </div>
               </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
               <div className="p-4 bg-[#fcfcff] border border-[#eee] rounded-2xl"><div className="flex items-center gap-2 text-[#999] mb-1"><ShoppingBag size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Đơn hàng</span></div><p className="text-xl font-black text-[#333]">{selectedCustomer.orders} giao dịch</p></div>
               <div className="p-4 bg-[#fcfcff] border border-[#eee] rounded-2xl"><div className="flex items-center gap-2 text-[#999] mb-1"><TrendingUp size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Chi tiêu</span></div><p className="text-xl font-black text-[#f74f2e]">{selectedCustomer.spent}</p></div>
               <div className="p-4 bg-[#fcfcff] border border-[#eee] rounded-2xl"><div className="flex items-center gap-2 text-[#999] mb-1"><CreditCard size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Trạng thái</span></div><p className="text-[15px] font-black text-green-600 uppercase">{selectedCustomer.status}</p></div>
            </div>
            <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl"><p className="text-[13px] text-blue-700 leading-relaxed italic">Khách hàng ưa chuộng các sản phẩm thời trang cao cấp. Tỉ lệ quay lại đạt 85%.</p></div>
            <div className="flex justify-end gap-3 pt-4 border-t border-[#eee]">
               <button onClick={() => setIsDetailOpen(false)} className="px-6 py-2.5 bg-[#f3f4f9] text-[#666] font-bold text-[13px] rounded-xl hover:bg-[#e9eaf2]">Đóng lại</button>
               <button onClick={() => { setIsDetailOpen(false); setIsMessageModalOpen(true); }} className="px-8 py-2.5 bg-[#333] text-white font-bold text-[13px] rounded-xl hover:bg-black shadow-lg shadow-black/10 flex items-center gap-2"><Send size={16} /> Gửi thông điệp</button>
            </div>
          </div>
        )}
      </Modal>

      <Dialog 
        {...dialogConfig} 
        onClose={() => setDialogConfig(prev => ({ ...prev, isOpen: false }))} 
      />
    </div>
  );
}
