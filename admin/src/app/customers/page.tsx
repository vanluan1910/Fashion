"use client";

import React from "react";
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
  ExternalLink
} from "lucide-react";

const CUSTOMERS = [
  {
    id: "#CUS-001",
    name: "Lê Thị Hồng Nhung",
    email: "nhung.le@gmail.com",
    phone: "0901 234 567",
    city: "TP. Hồ Chí Minh",
    joined: "12/01/2024",
    orders: 12,
    spent: "24.500.000đ",
    status: "Hoạt động",
    isVIP: true,
  },
  {
    id: "#CUS-002",
    name: "Trần Minh Quang",
    email: "quang.tm@yahoo.com",
    phone: "0912 345 678",
    city: "Hà Nội",
    joined: "05/02/2024",
    orders: 5,
    spent: "8.200.000đ",
    status: "Hoạt động",
    isVIP: false,
  },
  {
    id: "#CUS-003",
    name: "Nguyễn Thảo Nguyên",
    email: "nguyen.thaonguyen@gmail.com",
    phone: "0345 678 910",
    city: "Đà Nẵng",
    joined: "15/03/2024",
    orders: 2,
    spent: "1.500.000đ",
    status: "Bị khóa",
    isVIP: false,
  },
  {
    id: "#CUS-004",
    name: "Vũ Hải Đăng",
    email: "dang.vh@outlook.com",
    phone: "0888 999 000",
    city: "Hải Phòng",
    joined: "20/03/2024",
    orders: 8,
    spent: "15.000.000đ",
    status: "Hoạt động",
    isVIP: true,
  },
];

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#333]">Quản lý khách hàng</h1>
          <p className="text-[#888] text-[13px]">Danh sách khách hàng đã đăng ký và mua hàng trên Atelier.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#845adf] text-white rounded-lg text-[13px] font-bold hover:bg-[#7248c8] transition-all">
            <UserPlus size={18} />
            Thêm khách hàng
          </button>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-[#f1f1f1] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-[12px] text-[#999] font-bold uppercase tracking-wider">Tổng khách hàng</p>
            <h4 className="text-xl font-bold text-[#333]">1,284</h4>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#f1f1f1] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
            <MapPin size={24} />
          </div>
          <div>
            <p className="text-[12px] text-[#999] font-bold uppercase tracking-wider">Thành phố sôi động</p>
            <h4 className="text-xl font-bold text-[#333]">TP. Hồ Chí Minh</h4>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#f1f1f1] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-[12px] text-[#999] font-bold uppercase tracking-wider">Đăng ký mới tháng này</p>
            <h4 className="text-xl font-bold text-[#333]">+156</h4>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl border border-[#f1f1f1] shadow-sm overflow-hidden text-[14px]">
        {/* Toolbar */}
        <div className="p-4 border-b border-[#f1f1f1] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative w-full lg:w-[400px]">
            <input 
              type="text" 
              placeholder="Tìm theo tên, email, số điện thoại..." 
              className="w-full h-11 pl-11 pr-4 bg-[#f3f4f9] border-none rounded-lg text-[13px] focus:ring-1 focus:ring-[#845adf]"
            />
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]" />
          </div>
          <div className="flex items-center gap-3">
             <select className="h-11 px-4 bg-[#f3f4f9] border-none rounded-lg text-[13px] text-[#555]">
               <option>Loại thành viên: Tất cả</option>
               <option>VIP</option>
               <option>Phổ thông</option>
             </select>
             <button className="px-4 py-2 bg-white border border-[#eee] rounded-lg text-[13px] font-bold hover:bg-[#f9f9f9]">Lọc</button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f9f9f9] border-b border-[#f1f1f1]">
                <th className="p-4 font-bold text-[#333] uppercase text-[11px] tracking-wider">Khách hàng</th>
                <th className="p-4 font-bold text-[#333] uppercase text-[11px] tracking-wider text-center">Đơn hàng</th>
                <th className="p-4 font-bold text-[#333] uppercase text-[11px] tracking-wider text-right">Tổng chi tiêu</th>
                <th className="p-4 font-bold text-[#333] uppercase text-[11px] tracking-wider text-center">Trạng thái</th>
                <th className="p-4 font-bold text-[#333] uppercase text-[11px] tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f1f1]">
              {CUSTOMERS.map((customer) => (
                <tr key={customer.id} className="hover:bg-[#fcfcff] transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-[#f3f4f9] text-[#845adf] rounded-full flex items-center justify-center font-bold text-lg relative">
                        {customer.name.charAt(0)}
                        {customer.isVIP && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 text-white flex items-center justify-center rounded-full text-[8px]" title="Thành viên VIP">★</span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-[#333]">{customer.name}</p>
                          {customer.isVIP && <span className="text-[9px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-tight">VIP</span>}
                        </div>
                        <div className="flex items-center gap-3 mt-1 underline-offset-4">
                          <span className="text-[11px] text-[#999] flex items-center gap-1"><Mail size={12} /> {customer.email}</span>
                          <span className="text-[11px] text-[#999] flex items-center gap-1"><Phone size={12} /> {customer.phone}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center font-bold text-[#333]">{customer.orders}</td>
                  <td className="p-4 text-right font-bold text-[#845adf]">{customer.spent}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                      customer.status === "Hoạt động" ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-600 border-red-100"
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-[#999]">
                      <button title="Gửi email" className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all">
                        <MailWarning size={18} />
                      </button>
                      <button title="Xem chi tiết" className="p-2 hover:bg-[#845adf]/10 hover:text-[#845adf] rounded-lg transition-all">
                        <ExternalLink size={18} />
                      </button>
                      <button title="Xóa khách hàng" className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all">
                        <Trash2 size={18} />
                      </button>
                      <button className="p-2 hover:bg-[#f3f4f9] hover:text-[#333] rounded-lg transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#fcfcff] border-t border-[#f1f1f1] flex items-center justify-between">
           <p className="text-[11px] text-[#999]">Lần cập nhật cuối: 2 phút trước</p>
           <div className="flex items-center gap-2">
             <button className="px-3 py-1 bg-white border border-[#eee] rounded text-[12px] hover:bg-[#f9f9f9]">Trước</button>
             <button className="px-3 py-1 bg-white border border-[#eee] rounded text-[12px] hover:bg-[#f9f9f9]">Sau</button>
           </div>
        </div>
      </div>
    </div>
  );
}
