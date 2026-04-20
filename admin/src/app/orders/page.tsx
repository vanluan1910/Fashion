"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  Printer,
  Trash2,
  ChevronDown,
  Plus
} from "lucide-react";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { OrderStatus } from "@/features/orders/types";
import Dialog from "@/shared/components/Dialog";

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Hoàn thành": return "bg-green-100 text-green-600";
    case "Đang xử lý": return "bg-blue-100 text-blue-600";
    case "Chờ thanh toán": return "bg-orange-100 text-orange-600";
    case "Chờ xác nhận": return "bg-yellow-100 text-yellow-600";
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
    case "Chờ xác nhận": return <Clock size={14} />;
    case "Đang giao": return <Truck size={14} />;
    case "Đã hủy": return <XCircle size={14} />;
    default: return null;
  }
};

const ORDER_TABS: OrderStatus[] = ["Tất cả", "Chờ xác nhận", "Đang xử lý", "Đang giao", "Hoàn thành", "Đã hủy"];

export default function OrdersPage() {
  const { 
    orders, 
    searchQuery, 
    setSearchQuery, 
    activeTab, 
    setActiveTab, 
    setPaymentFilter, 
    selectedOrderIds,
    toggleSelectOrder,
    toggleSelectAll,
    updateStatus, 
    deleteOrder,
    stats 
  } = useOrders();

  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
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

  const handleStatusChange = (id: string, newStatus: OrderStatus) => {
    updateStatus(id, newStatus);
    setActiveMenuId(null);
  };

  const handleBulkPrint = () => {
    if (selectedOrderIds.length === 0) {
      triggerDialog({
        title: "Chưa chọn đơn hàng!",
        message: "Vui lòng tích chọn ít nhất một đơn hàng để thực hiện in hóa đơn.",
        type: "warning"
      });
      return;
    }

    triggerDialog({
      title: "Xác nhận in?",
      message: `Bạn đang chuẩn bị in ${selectedOrderIds.length} hóa đơn. Hệ thống sẽ mở trình duyệt in ngay bây giờ.`,
      type: "confirm",
      onConfirm: () => {
        window.print();
      }
    });
  };

  const isAllSelected = orders.length > 0 && selectedOrderIds.length === orders.length;

  return (
    <div className="space-y-6 pb-20 no-print">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#333] tracking-tight text-shadow-sm">Quản lý đơn hàng</h1>
          <p className="text-[#888] text-[13px] font-medium mt-1">Theo dõi, cập nhật trạng thái và quản lý vận chuyển chuyên nghiệp.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleBulkPrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#eee] rounded-xl text-[13px] font-bold text-[#666] hover:bg-[#f9f9f9] transition-all shadow-sm active:scale-95"
          >
            <Printer size={18} />
            In hóa đơn
          </button>
          <Link 
            href="/orders/add"
            className="flex items-center gap-2 px-6 py-2.5 bg-[#f74f2e] text-white rounded-xl text-[13px] font-bold hover:bg-[#d24327] shadow-lg shadow-[#f74f2e]/20 transition-all active:scale-95"
          >
            <Plus size={18} />
            Tạo đơn hàng
          </Link>
        </div>
      </div>

      {/* Order Tabs */}
      <div className="flex items-center gap-2 border-b border-[#eee] overflow-x-auto no-scrollbar">
        {ORDER_TABS.map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-4 text-[13px] font-bold whitespace-nowrap transition-all border-b-2 relative ${
              activeTab === tab ? "border-[#f74f2e] text-[#f74f2e]" : "border-transparent text-[#999] hover:text-[#555]"
            }`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#f74f2e] rounded-t-full shadow-[0_-2px_10px_rgba(247,79,46,0.3)]" />}
          </button>
        ))}
      </div>

      {/* Filters Card */}
      <div className="bg-white p-5 rounded-2xl border border-[#eee] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 flex-1">
          <div className="relative w-full sm:w-[320px]">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm mã đơn, tên khách hàng..." 
              className="w-full h-12 pl-12 pr-4 bg-[#f3f4f9] border-transparent rounded-xl text-[14px] text-[#333] font-bold placeholder:text-[#aaa] focus:ring-2 focus:ring-[#f74f2e] focus:bg-white transition-all outline-none"
            />
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]" />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select 
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="h-12 px-5 bg-[#f3f4f9] border-transparent rounded-xl text-[14px] font-bold text-[#555] focus:ring-2 focus:ring-[#f74f2e] outline-none cursor-pointer"
            >
              <option value="Tất cả">Hình thức: Tất cả</option>
              <option value="COD">COD</option>
              <option value="Chuyển khoản">Chuyển khoản</option>
              <option value="Ví điện tử">Ví điện tử</option>
            </select>

            <button className="flex items-center justify-center gap-2 h-12 px-6 border border-[#eee] rounded-xl text-[13px] font-bold text-[#666] hover:bg-[#f3f4f9] transition-all">
              <Filter size={18} /> Lọc nâng cao
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table Card */}
      <div className="bg-white rounded-2xl border border-[#eee] shadow-sm overflow-hidden min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fcfcff] border-b border-[#eee]">
                <th className="p-5 w-[60px]">
                  <input 
                    type="checkbox" 
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                    className="rounded border-[#ddd] accent-[#f74f2e] cursor-pointer w-4 h-4" 
                  />
                </th>
                <th className="p-5 font-extrabold text-[#333] uppercase text-[11px] tracking-widest">Mã đơn hàng</th>
                <th className="p-5 font-extrabold text-[#333] uppercase text-[11px] tracking-widest">Thông tin khách</th>
                <th className="p-5 font-extrabold text-[#333] uppercase text-[11px] tracking-widest">Thời gian</th>
                <th className="p-5 font-extrabold text-[#333] uppercase text-[11px] tracking-widest">Tổng giá trị</th>
                <th className="p-5 font-extrabold text-[#333] uppercase text-[11px] tracking-widest text-center">Trạng thái</th>
                <th className="p-5 font-extrabold text-[#333] uppercase text-[11px] tracking-widest text-right whitespace-nowrap">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f1f1]">
              {orders.length > 0 ? orders.map((order) => (
                <tr key={order.id} className="hover:bg-[#fcfcff]/50 transition-colors group relative">
                  <td className="p-5">
                    <input 
                      type="checkbox" 
                      checked={selectedOrderIds.includes(order.id)}
                      onChange={() => toggleSelectOrder(order.id)}
                      className="rounded border-[#ddd] accent-[#f74f2e] cursor-pointer w-4 h-4" 
                    />
                  </td>
                  <td className="p-5 font-black text-[#f74f2e] text-[14px]">{order.id}</td>
                  <td className="p-5">
                    <p className="font-extrabold text-[#333] text-[14px]">{order.customer}</p>
                    <p className="text-[11px] text-[#999] font-black uppercase mt-1 tracking-wider">{order.items} sản phẩm • {order.payment}</p>
                  </td>
                  <td className="p-5 text-[14px] font-bold text-[#666]">{order.date}</td>
                  <td className="p-5 font-black text-[#333] text-[16px] tracking-tight">{order.amount}</td>
                  <td className="p-5">
                    <div className="flex justify-center relative">
                      <button 
                        onClick={() => setActiveMenuId(activeMenuId === order.id ? null : order.id)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-black uppercase transition-all shadow-sm active:scale-95 border border-transparent hover:border-black/5 ${getStatusStyle(order.status)}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status}
                        <ChevronDown size={14} className={`transition-transform duration-300 ${activeMenuId === order.id ? 'rotate-180' : ''}`} />
                      </button>

                      {activeMenuId === order.id && (
                        <div className="absolute top-full mt-3 w-52 bg-white border border-[#eee] rounded-2xl shadow-2xl z-[100] py-3 animate-in slide-in-from-top-4 duration-300">
                           <div className="px-4 pb-2 mb-2 border-b border-gray-50">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cập nhật nhanh</p>
                           </div>
                           {ORDER_TABS.filter(t => t !== "Tất cả").map(status => (
                             <button 
                               key={status}
                               onClick={() => handleStatusChange(order.id, status)}
                               className="w-full px-5 py-3 text-left text-[13px] font-bold text-[#666] hover:bg-[#f3f4f9] hover:text-[#f74f2e] transition-all flex items-center gap-3 group"
                             >
                                <span className={`w-2.5 h-2.5 rounded-full ring-4 ring-transparent group-hover:ring-current/10 ${getStatusStyle(status).split(' ')[1].replace('text-', 'bg-')}`}></span>
                                {status}
                             </button>
                           ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button title="Xem chi tiết" className="p-3 text-[#aaa] hover:bg-[#f74f2e]/10 hover:text-[#f74f2e] rounded-xl transition-all"><Eye size={20} /></button>
                      <button onClick={() => deleteOrder(order.id)} title="Xóa đơn" className="p-3 text-[#aaa] hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"><Trash2 size={20} /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="p-24 text-center">
                    <div className="flex flex-col items-center gap-4 text-[#999]">
                       <div className="p-6 bg-[#f3f4f9] rounded-full text-[#f74f2e]/30"><Search size={48} strokeWidth={1} /></div>
                       <p className="font-black text-[18px] text-[#333] tracking-tight">Không tìm thấy đơn hàng nào!</p>
                       <p className="text-[13px] font-medium max-w-[280px] mx-auto text-gray-400 leading-relaxed">Dữ liệu hiện tại không khớp với từ khóa của bạn. Vui lòng thử tìm kiếm khác.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog 
        {...dialogConfig} 
        onClose={() => setDialogConfig(prev => ({ ...prev, isOpen: false }))} 
      />
    </div>
  );
}
