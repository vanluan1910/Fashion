"use client";

import React from "react";
import { 
  Search, 
  Filter, 
  Calendar,
  MoreVertical, 
  Eye, 
  Truck, 
  CheckCircle,
  XCircle,
  Clock,
  Printer
} from "lucide-react";

const ORDERS = [
  {
    id: "#ORD-9821",
    customer: "Nguyễn Văn A",
    date: "20 Tháng 4, 2024",
    amount: "1.200.000đ",
    payment: "Chuyển khoản",
    status: "Hoàn thành",
    items: 2,
  },
  {
    id: "#ORD-9822",
    customer: "Trần Thị B",
    date: "19 Tháng 4, 2024",
    amount: "3.500.000đ",
    payment: "COD",
    status: "Đang xử lý",
    items: 1,
  },
  {
    id: "#ORD-9823",
    customer: "Lê Văn C",
    date: "19 Tháng 4, 2024",
    amount: "850.000đ",
    payment: "Ví điện tử",
    status: "Chờ thanh toán",
    items: 3,
  },
  {
    id: "#ORD-9824",
    customer: "Phạm Minh D",
    date: "18 Tháng 4, 2024",
    amount: "2.100.000đ",
    payment: "Chuyển khoản",
    status: "Đang giao",
    items: 1,
  },
  {
    id: "#ORD-9825",
    customer: "Hoàng Thị E",
    date: "18 Tháng 4, 2024",
    amount: "4.800.000đ",
    payment: "COD",
    status: "Đã hủy",
    items: 2,
  },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Hoàn thành": return "bg-green-100 text-green-600";
    case "Đang xử lý": return "bg-blue-100 text-blue-600";
    case "Chờ thanh toán": return "bg-orange-100 text-orange-600";
    case "Đang giao": return "bg-purple-100 text-purple-600";
    case "Đã hủy": return "bg-red-100 text-red-600";
    default: return "bg-gray-100 text-gray-600";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Hoàn thành": return <CheckCircle size={14} />;
    case "Đang xử lý": return <Clock size={14} />;
    case "Chờ thanh toán": return <Clock size={14} />;
    case "Đang giao": return <Truck size={14} />;
    case "Đã hủy": return <XCircle size={14} />;
    default: return null;
  }
};

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#333]">Quản lý đơn hàng</h1>
          <p className="text-[#888] text-[13px]">Theo dõi và cập nhật trạng thái đơn hàng từ khách hàng.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#eee] rounded-lg text-[13px] font-medium hover:bg-[#f9f9f9] transition-all">
            <Printer size={16} />
            In hóa đơn hàng loạt
          </button>
        </div>
      </div>

      {/* Order Tabs/Quick Filter */}
      <div className="flex items-center gap-4 border-b border-[#eee] pb-2 overflow-x-auto no-scrollbar">
        {["Tất cả", "Chờ xác nhận", "Đang xử lý", "Đang giao", "Hoàn thành", "Đã hủy"].map((tab, idx) => (
          <button 
            key={idx} 
            className={`px-4 py-2 text-[13px] font-bold whitespace-nowrap transition-all border-b-2 ${
              idx === 0 ? "border-[#845adf] text-[#845adf]" : "border-transparent text-[#999] hover:text-[#333]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters Card */}
      <div className="bg-white p-4 rounded-xl border border-[#f1f1f1] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-[250px]">
            <input 
              type="text" 
              placeholder="Mã đơn, tên khách..." 
              className="w-full h-10 pl-10 pr-4 bg-[#f3f4f9] border-none rounded-lg text-[13px]"
            />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
          </div>
          <div className="relative w-full sm:w-[200px]">
            <input 
              type="text" 
              placeholder="Chọn ngày..." 
              className="w-full h-10 pl-10 pr-4 bg-[#f3f4f9] border-none rounded-lg text-[13px]"
            />
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
          </div>
          <select className="h-10 px-4 bg-[#f3f4f9] border-none rounded-lg text-[13px] text-[#555]">
            <option>Thanh toán: Tất cả</option>
            <option>COD</option>
            <option>Chuyển khoản</option>
          </select>
        </div>
        <button className="flex items-center justify-center gap-2 h-10 px-4 border border-[#eee] rounded-lg text-[13px] font-medium hover:bg-[#f3f4f9]">
          <Filter size={16} />
          Lọc đơn hàng
        </button>
      </div>

      {/* Orders Table Card */}
      <div className="bg-white rounded-xl border border-[#f1f1f1] shadow-sm overflow-hidden text-[14px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f9f9f9] border-b border-[#f1f1f1]">
                <th className="p-4 w-[50px]"><input type="checkbox" className="rounded" /></th>
                <th className="p-4 font-bold text-[#333] uppercase text-[11px] tracking-wider">Mã đơn</th>
                <th className="p-4 font-bold text-[#333] uppercase text-[11px] tracking-wider">Khách hàng</th>
                <th className="p-4 font-bold text-[#333] uppercase text-[11px] tracking-wider">Ngày đặt</th>
                <th className="p-4 font-bold text-[#333] uppercase text-[11px] tracking-wider">Tổng tiền</th>
                <th className="p-4 font-bold text-[#333] uppercase text-[11px] tracking-wider text-center">Thanh toán</th>
                <th className="p-4 font-bold text-[#333] uppercase text-[11px] tracking-wider text-center">Trạng thái</th>
                <th className="p-4 font-bold text-[#333] uppercase text-[11px] tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f1f1]">
              {ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-[#fcfcff] transition-colors group">
                  <td className="p-4"><input type="checkbox" className="rounded" /></td>
                  <td className="p-4 font-bold text-[#845adf]">{order.id}</td>
                  <td className="p-4">
                    <p className="font-bold text-[#333] mb-0.5">{order.customer}</p>
                    <p className="text-[11px] text-[#999] uppercase">{order.items} sản phẩm</p>
                  </td>
                  <td className="p-4 text-[#666]">{order.date}</td>
                  <td className="p-4 font-bold text-[#333]">{order.amount}</td>
                  <td className="p-4 text-center">
                    <span className="text-[12px] bg-[#f3f4f9] px-3 py-1 rounded-lg font-medium text-[#555]">
                      {order.payment}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase transition-all ${getStatusStyle(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-[#999]">
                      <button title="Xem chi tiết" className="p-1.5 hover:bg-[#845adf]/10 hover:text-[#845adf] rounded-lg transition-all">
                        <Eye size={18} />
                      </button>
                      <button title="Thao tác khác" className="p-1.5 hover:bg-[#f3f4f9] hover:text-[#333] rounded-lg transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Meta */}
        <div className="p-4 bg-[#fcfcff] border-t border-[#f1f1f1] flex items-center justify-center gap-4 text-[12px] text-[#999]">
          <div className="flex items-center gap-1"><CheckCircle size={14} className="text-green-500" /> 120 Hoàn thành</div>
          <div className="flex items-center gap-1"><Clock size={14} className="text-orange-500" /> 15 Đang xử lý</div>
          <div className="flex items-center gap-1"><Truck size={14} className="text-purple-500" /> 8 Đang giao</div>
        </div>
      </div>
    </div>
  );
}
