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
  Plus,
  Star,
  MessageSquare,
  ShieldCheck,
  ShieldAlert
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

const ORDER_TABS: any[] = ["Tất cả", "Chờ xác nhận", "Đang xử lý", "Đang giao", "Hoàn thành", "Đã hủy", "Đánh giá"];

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

  // Mock data for reviews
  const [reviews, setReviews] = useState([
    { id: 1, customer: "Lê Văn Luyện", product: "Ão Sơ Mi Lụa", rating: 5, comment: "Vải rất đẹp, mặc mát.", status: "Hiển thị", date: "2024-04-20" },
    { id: 2, customer: "Nguyễn Thị Hoa", product: "Váy Dạ Hội Luxury", rating: 4, comment: "Giao hàng hơi chậm nhưng hàng chất lượng.", status: "Chờ duyệt", date: "2024-04-21" },
    { id: 3, customer: "Trần Minh Quân", product: "Quần Jeans Slimfit", rating: 2, comment: "Size hơi chật so với mô tả.", status: "Ẩn", date: "2024-04-22" },
  ]);

  const toggleReviewStatus = (id: number) => {
    setReviews(prev => prev.map(r => 
      r.id === id ? { ...r, status: r.status === "Hiển thị" ? "Ẩn" : "Hiển thị" } : r
    ));
  };

  return (
    <div className="space-y-6 pb-20 no-print">
      <section className="admin-page-surface overflow-hidden">
  <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-7">
    <div className="space-y-1.5">
      <span className="admin-section-kicker">Vận hành</span>
      <h1 className="admin-section-title">Quản lý đơn hàng</h1>
      <p className="text-sm text-[var(--admin-text-muted)]">Trọng tâm vào trạng thái, nhịp bảng rõ, thao tác nhanh.</p>
    </div>
    <div className="flex items-center gap-3">
      <button 
        onClick={handleBulkPrint}
        className="flex items-center gap-2 rounded-[calc(var(--admin-radius-md)-4px)] border border-[var(--admin-border)] bg-white px-4 py-2.5 text-[13px] font-semibold text-[var(--admin-heading)] shadow-admin-sm transition hover:bg-[var(--admin-surface-strong)] active:scale-95"
      >
        <Printer size={18} />
        In hóa đơn
      </button>
      <Link 
        href="/orders/add"
        className="flex items-center gap-2 rounded-[calc(var(--admin-radius-md)-4px)] bg-[var(--admin-accent)] px-5 py-2.5 text-[13px] font-semibold text-white shadow-admin-md transition hover:-translate-y-0.5 hover:bg-[var(--admin-accent-strong)] active:scale-95"
      >
        <Plus size={18} />
        Tạo đơn hàng
      </Link>
    </div>
  </div>
</section>

      <div className="flex items-center gap-2 overflow-x-auto rounded-[calc(var(--admin-radius-md)-2px)] border border-[var(--admin-border)] bg-[rgba(255,255,255,0.52)] px-2 no-scrollbar">
        {ORDER_TABS.map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-4 text-[13px] font-bold whitespace-nowrap transition-all border-b-2 relative ${
              activeTab === tab ? "border-[var(--admin-accent)] text-[var(--admin-accent-strong)]" : "border-transparent text-[var(--admin-text-muted)] hover:text-[var(--admin-text)]"
            }`}
          >
            <div className="flex items-center gap-2">
              {tab === "Đánh giá" && <MessageSquare size={14} />}
              {tab}
            </div>
            {activeTab === tab && <div className="absolute bottom-[-1px] left-0 h-[3px] w-full rounded-t-full bg-[var(--admin-accent)] shadow-[0_-2px_10px_rgba(139,119,102,0.22)]" />}
          </button>
        ))}
      </div>

      {activeTab !== "Đánh giá" ? (
        <div className="admin-page-surface flex flex-col justify-between gap-4 px-5 py-5 lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-4 flex-1">
            <div className="relative w-full sm:w-[320px]">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm mã đơn, tên khách hàng..." 
                className="admin-control h-12 pl-12 pr-4 text-[14px] font-medium"
              />
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)]" />
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select 
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="admin-control h-12 px-5 text-[14px] font-medium cursor-pointer"
              >
                <option value="Tất cả">Hình thức: Tất cả</option>
                <option value="COD">COD</option>
                <option value="Chuyển khoản">Chuyển khoản</option>
                <option value="Ví điện tử">Ví điện tử</option>
              </select>

              <button className="flex h-12 items-center justify-center gap-2 rounded-[calc(var(--admin-radius-md)-4px)] border border-[var(--admin-border)] px-5 text-[13px] font-semibold text-[var(--admin-heading)] transition hover:bg-[var(--admin-surface-strong)]">
                <Filter size={18} /> Lọc nâng cao
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="admin-page-surface flex items-center justify-between px-5 py-5">
           <div className="flex items-center gap-4">
              <h2 className="text-[15px] font-semibold text-[var(--admin-heading)]">Kiểm duyệt đánh giá</h2>
              <span className="rounded-full bg-[var(--admin-accent-soft)] px-3 py-1 text-[12px] font-semibold text-[var(--admin-accent-strong)]">{reviews.length} Phản hồi</span>
           </div>
           <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-[12px] font-semibold text-[var(--admin-text-muted)] hover:text-[var(--admin-accent-strong)]">Chờ duyệt</button>
              <button className="px-4 py-2 text-[12px] font-semibold text-[var(--admin-text-muted)] hover:text-[var(--admin-accent-strong)]">Đã ẩn</button>
           </div>
        </div>
      )}

      <div className="admin-page-surface overflow-hidden min-h-[400px]">
        {activeTab !== "Đánh giá" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="admin-table-head border-b border-[var(--admin-border)]">
                  <th className="p-5 w-[60px]">
                    <input 
                      type="checkbox" 
                      checked={isAllSelected}
                      onChange={toggleSelectAll}
                      className="rounded border-[#ddd] accent-[#f74f2e] cursor-pointer w-4 h-4" 
                    />
                  </th>
                  <th className="p-5 font-semibold uppercase text-[11px] tracking-widest">Mã đơn hàng</th>
                  <th className="p-5 font-semibold uppercase text-[11px] tracking-widest">Thông tin khách</th>
                  <th className="p-5 font-semibold uppercase text-[11px] tracking-widest">Thời gian</th>
                  <th className="p-5 font-semibold uppercase text-[11px] tracking-widest">Tổng giá trị</th>
                  <th className="p-5 font-semibold uppercase text-[11px] tracking-widest text-center">Trạng thái</th>
                  <th className="p-5 font-semibold uppercase text-[11px] tracking-widest text-right whitespace-nowrap">Thao tác</th>
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
                      <td className="p-5 font-semibold text-[var(--admin-accent-strong)] text-[14px]">#{order.id}</td>
                    <td className="p-5">
                      <p className="font-extrabold text-[#333] text-[14px]">{order.customerName}</p>
                      <p className="text-[11px] text-[#999] font-black uppercase mt-1 tracking-wider">{order.itemsCount || 0} sản phẩm • {order.payment || "COD"}</p>
                    </td>
                    <td className="p-5 text-[14px] font-bold text-[#666]">
                      {new Date(order.date).toLocaleDateString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </td>
                      <td className="p-5 font-semibold text-[var(--admin-heading)] text-[16px] tracking-tight">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}
                      </td>
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
                             {ORDER_TABS.filter(t => t !== "Tất cả" && t !== "Đánh giá").map(status => {
                               const isActive = order.status === status;
                               return (
                                 <button 
                                   key={status}
                                   onClick={() => handleStatusChange(order.id, status)}
                                   className={`w-full px-5 py-3 text-left text-[13px] font-bold transition-all flex items-center gap-3 group ${
                                     isActive ? "bg-[#f3f4f9] text-[#f74f2e]" : "text-[#666] hover:bg-[#f3f4f9] hover:text-[#f74f2e]"
                                   }`}
                                 >
                                    <span className={`w-2.5 h-2.5 rounded-full ring-4 ring-transparent transition-all ${
                                      isActive 
                                        ? `${getStatusStyle(status).split(' ')[1].replace('text-', 'bg-')} ring-current/20` 
                                        : "bg-gray-200 group-hover:bg-gray-400"
                                    }`}></span>
                                    {status}
                                    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#f74f2e]"></div>}
                                 </button>
                               );
                             })}
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
                    <td colSpan={7} className="p-20 text-center">
                      <div className="flex flex-col items-center gap-4 text-[#999]">
                         <div className="p-6 bg-[#f3f4f9] rounded-full text-[#f74f2e]/30"><Search size={48} strokeWidth={1} /></div>
                         <p className="font-semibold text-[18px] text-[var(--admin-heading)] tracking-tight">Không tìm thấy đơn hàng nào!</p>
                         <p className="text-[13px] font-medium max-w-[280px] mx-auto text-gray-400 leading-relaxed">Dữ liệu hiện tại không khớp với từ khóa của bạn. Vui lòng thử tìm kiếm khác.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
              <thead>
                  <tr className="admin-table-head border-b border-[var(--admin-border)]">
                    <th className="p-5 font-semibold uppercase text-[11px] tracking-widest">Khách hàng</th>
                    <th className="p-5 font-semibold uppercase text-[11px] tracking-widest">Sản phẩm</th>
                    <th className="p-5 font-semibold uppercase text-[11px] tracking-widest">Đánh giá</th>
                    <th className="p-5 font-semibold uppercase text-[11px] tracking-widest">Nội dung</th>
                    <th className="p-5 font-semibold uppercase text-[11px] tracking-widest text-center">Trạng thái</th>
                    <th className="p-5 font-semibold uppercase text-[11px] tracking-widest text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f1f1]">
                   {reviews.map((review) => (
                      <tr key={review.id} className="hover:bg-[#fcfcff]/50 transition-colors">
                         <td className="p-5 font-bold text-[#333] text-[14px]">{review.customer}</td>
                         <td className="p-5 text-[13px] font-medium text-[#666]">{review.product}</td>
                         <td className="p-5">
                            <div className="flex items-center gap-0.5 text-primary">
                               {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-200"} />
                               ))}
                            </div>
                         </td>
                         <td className="p-5">
                             <p className="text-[13px] text-[#555] italic max-w-[250px] line-clamp-2">&quot;{review.comment}&quot;</p>
                            <p className="text-[10px] text-[#aaa] mt-1 font-bold uppercase">{review.date}</p>
                         </td>
                         <td className="p-5 text-center">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                               review.status === "Hiển thị" ? "bg-green-100 text-green-600" : 
                               review.status === "Ẩn" ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"
                            }`}>
                               {review.status}
                            </span>
                         </td>
                         <td className="p-5 text-right">
                            <div className="flex items-center justify-end gap-2">
                               <button 
                                 onClick={() => toggleReviewStatus(review.id)}
                                 title={review.status === "Hiển thị" ? "Ẩn đánh giá" : "Hiện đánh giá"}
                                 className={`p-2 rounded-lg transition-all ${
                                   review.status === "Hiển thị" ? "text-orange-500 hover:bg-orange-50" : "text-green-500 hover:bg-green-50"
                                 }`}
                               >
                                  {review.status === "Hiển thị" ? <ShieldAlert size={18} /> : <ShieldCheck size={18} />}
                               </button>
                               <button title="Xóa vĩnh viễn" className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                  <Trash2 size={18} />
                               </button>
                            </div>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        )}
      </div>

      <Dialog 
        {...dialogConfig} 
        onClose={() => setDialogConfig(prev => ({ ...prev, isOpen: false }))} 
      />
    </div>
  );
}
