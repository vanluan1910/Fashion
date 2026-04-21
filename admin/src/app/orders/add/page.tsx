"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, 
  Minus, 
  Trash2,
  CheckCircle2,
  Search,
  ArrowRight,
  Printer,
  FileText,
  CreditCard,
  Truck,
  User as UserIcon,
  Package as PackageIcon,
  ShoppingBag,
  History,
  X,
  Star,
  Users
} from "lucide-react";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { productService } from "@/features/products/services/productService";
import { customerService } from "@/features/customers/services/customerService";
import Dialog from "@/shared/components/Dialog";

interface SelectedItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface SelectedCustomer {
  account_id: number;
  full_name: string;
  email: string;
  phone?: string;
}

export default function AddOrderPage() {
  const router = useRouter();
  const { addOrder } = useOrders();
  
  const [customer, setCustomer] = useState<SelectedCustomer | null>(null);
  const [payment, setPayment] = useState("COD");
  const [status, setStatus] = useState("Chờ xác nhận");
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [allCustomers, setAllCustomers] = useState<any[]>([]);
  const [productSearch, setProductSearch] = useState("");
  const [customerInput, setCustomerInput] = useState("");
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  const [dialogConfig, setDialogConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "warning" | "info";
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "success"
  });

  useEffect(() => {
    const fetchData = async () => {
      const [productsData, customersData] = await Promise.all([
        productService.getProducts(),
        customerService.getCustomers()
      ]);
      setAllProducts(productsData);
      setAllCustomers(customersData);
    };
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!productSearch) return allProducts.slice(0, 4);
    return allProducts.filter(p => 
      p.name?.toLowerCase().includes(productSearch.toLowerCase())
    );
  }, [allProducts, productSearch]);

  const filteredCustomers = useMemo(() => {
    if (!customerInput) return allCustomers.slice(0, 5);
    return allCustomers.filter(c => 
      c.full_name?.toLowerCase().includes(customerInput.toLowerCase()) ||
      c.email?.toLowerCase().includes(customerInput.toLowerCase())
    );
  }, [allCustomers, customerInput]);

  const totalAmount = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [selectedItems]);

  const addItem = (product: any) => {
    setSelectedItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setSelectedItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setSelectedItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSave = () => {
    if (!customer) {
       setDialogConfig({ isOpen: true, title: "Thiếu thông tin!", message: "Vui lòng chọn khách hàng trước khi lưu.", type: "warning" });
       return;
    }
    if (selectedItems.length === 0) {
       setDialogConfig({ isOpen: true, title: "Giỏ hàng trống!", message: "Vui lòng chọn ít nhất một sản phẩm.", type: "warning" });
       return;
    }

    addOrder({
      account_id: customer.account_id,
      total_amount: totalAmount,
      payment,
      status,
      items: selectedItems
    });
    
    setDialogConfig({ isOpen: true, title: "Thành công!", message: "Đơn hàng đã được tạo thành công.", type: "success" });
    setTimeout(() => router.push("/orders"), 1500);
  };

  const handlePrintDraft = () => {
    if (selectedItems.length === 0) return;
    window.print();
  };

  const handleSaveDraft = () => {
    setDialogConfig({ isOpen: true, title: "Đã lưu nháp", message: "Thông tin đơn hàng đã được lưu tạm thời.", type: "success" });
  };

  const selectCustomer = (c: SelectedCustomer) => {
    setCustomer(c);
    setCustomerInput("");
    setShowCustomerDropdown(false);
  };

  return (
    <div className="max-w-7xl mx-auto pb-20 font-sans">
      {/* Page Header */}
      <header className="mb-10 px-4 flex flex-col md:flex-row justify-between items-end gap-6 no-print">
          <div className="flex-1">
            <button 
                onClick={() => router.back()}
                className="mb-4 text-[13px] font-bold text-gray-400 hover:text-[#f74f2e] flex items-center gap-1 transition-all"
            >
                ← Quay lại danh sách
            </button>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 mb-1">Tạo đơn hàng mới</h1>
            <p className="text-slate-500 font-medium text-[14px]">Xây dựng đơn hàng thủ công với dữ liệu thời gian thực từ kho.</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2.5 px-4 rounded-xl shadow-sm border border-slate-100">
             <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center text-[#f74f2e]"><History size={18} /></div>
             <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Thời gian tạo</p>
                <p className="text-[13px] font-bold text-slate-700">{new Date().toLocaleDateString('vi-VN')}</p>
             </div>
          </div>
      </header>

      <div className="grid grid-cols-12 gap-8 px-4">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          
          {/* Customer Selection Section */}
          <section className="bg-white rounded-xl p-7 shadow-sm border border-slate-100 no-print">
              <div className="flex items-center gap-3 mb-8">
                  <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-[#f74f2e]">
                      <UserIcon size={18} strokeWidth={2.5} />
                  </div>
                  <h2 className="text-[15px] font-bold text-slate-800">Thông tin khách hàng</h2>
              </div>

              <div className="space-y-6">
                  {/* Dynamic Search & Dropdown */}
                  {!customer && (
                    <div className="relative animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="relative">
                           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                           <input 
                             type="text" 
                             placeholder="Nhập tên hoặc email khách hàng..." 
                             value={customerInput}
                             onFocus={() => setShowCustomerDropdown(true)}
                             onChange={(e) => setCustomerInput(e.target.value)}
                             className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-[16px] font-black text-slate-900 focus:bg-white focus:ring-4 focus:ring-[#f74f2e]/10 focus:border-[#f74f2e] transition-all placeholder:font-bold"
                           />
                        </div>

                        {showCustomerDropdown && (
                           <div className="absolute top-full left-0 w-full mt-3 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in zoom-in-95 duration-200">
                              <div className="p-4 bg-slate-50 flex items-center justify-between border-b border-slate-100">
                                 <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <Star size={12} fill="currentColor" className="text-orange-400" />
                                    Gợi ý khách hàng
                                 </h3>
                                 <button onClick={() => setShowCustomerDropdown(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
                              </div>
                              <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                                 {filteredCustomers.map(c => (
                                    <div 
                                      key={c.account_id}
                                      onClick={() => selectCustomer(c)}
                                      className="flex items-center gap-4 p-5 hover:bg-orange-50 cursor-pointer transition-all group"
                                    >
                                       <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#f74f2e] font-bold border border-slate-100 shadow-sm text-lg group-hover:scale-110 transition-transform">{c.full_name.charAt(0)}</div>
                                       <div className="flex-1">
                                          <p className="text-[15px] font-bold text-slate-800">{c.full_name}</p>
                                          <p className="text-[12px] font-medium text-slate-400">{c.email}</p>
                                       </div>
                                       <button className="px-4 py-2 bg-white border border-slate-100 text-[#f74f2e] text-[10px] font-bold rounded-lg uppercase group-hover:bg-[#f74f2e] group-hover:text-white group-hover:border-[#f74f2e] transition-all">Chọn</button>
                                    </div>
                                 ))}
                                 {filteredCustomers.length === 0 && (
                                    <div className="py-10 text-center text-slate-400 font-bold">Không tìm thấy khách hàng nào</div>
                                 )}
                              </div>
                              <div className="p-4 bg-slate-50/50 text-center border-t border-slate-100">
                                 <button 
                                    onClick={() => setIsCustomerModalOpen(true)}
                                    className="text-[11px] font-bold text-[#f74f2e] hover:underline flex items-center justify-center gap-2 mx-auto"
                                 >
                                    <Users size={14} /> Xem tất cả khách hàng
                                 </button>
                              </div>
                           </div>
                        )}
                    </div>
                  )}

                  {customer && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in slide-in-from-top-2 duration-300">
                          <div className="bg-[#fef2f2] rounded-xl p-5 border border-[#f74f2e]/20 flex items-center justify-between group">
                              <div>
                                 <p className="text-[10px] font-bold text-[#f74f2e] uppercase mb-0.5 tracking-wider">Khách hàng được chọn</p>
                                 <p className="text-[16px] font-extrabold text-slate-800">{customer.full_name}</p>
                              </div>
                              <CheckCircle2 size={24} className="text-[#f74f2e]" />
                          </div>
                          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 flex items-center justify-between">
                              <div>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5 tracking-wider">Email liên hệ</p>
                                 <p className="text-[14px] font-bold text-slate-500">{customer.email}</p>
                              </div>
                              <button 
                                onClick={() => { setCustomer(null); setCustomerInput(""); }}
                                className="text-[11px] font-bold text-slate-400 hover:text-red-500 hover:underline"
                              >
                                Đổi khách hàng
                              </button>
                          </div>
                      </div>
                  )}
              </div>
          </section>

          {/* Product Selection List */}
          <section className="space-y-6 no-print">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-[#f74f2e]">
                          <PackageIcon size={18} strokeWidth={2.5} />
                      </div>
                      <h2 className="text-[15px] font-bold text-slate-800">Lựa chọn sản phẩm</h2>
                  </div>
                  <div className="relative w-full sm:w-72">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        type="text" 
                        placeholder="Tìm sản phẩm..." 
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        className="w-full bg-[#f0f4f7] border-none rounded-full pl-10 pr-5 py-2.5 text-[14px] font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#f74f2e]/20 transition-all placeholder:text-slate-400"
                      />
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredProducts.map((p) => (
                      <article 
                        key={p.id} 
                        onClick={() => addItem(p)}
                        className="bg-white p-4 rounded-xl flex gap-4 border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                      >
                          <div className="w-20 h-20 rounded-lg bg-slate-50 overflow-hidden shrink-0 border border-slate-100 flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
                              <img src={p.image} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col justify-between py-0.5 flex-1">
                              <div>
                                  <h3 className="font-bold text-[14px] text-slate-800 line-clamp-1 group-hover:text-[#f74f2e] transition-colors">{p.name}</h3>
                                  <p className="text-[13px] font-bold text-[#f74f2e]">{new Intl.NumberFormat('vi-VN').format(p.price)}đ</p>
                              </div>
                              <div className="flex items-center justify-between">
                                 <span className="text-[10px] font-bold text-slate-400 uppercase">{p.category}</span>
                                 <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-[#f74f2e] group-hover:bg-[#f74f2e] group-hover:text-white transition-all shadow-sm">
                                    <Plus size={16} strokeWidth={3} />
                                 </div>
                              </div>
                          </div>
                      </article>
                  ))}
              </div>
          </section>

          {/* Selected Cart Table (FOR PRINTING) */}
          <section className="print:block hidden bg-white p-10">
             <h2 className="text-2xl font-bold mb-6">CHI TIẾT ĐƠN HÀNG</h2>
             <table className="w-full text-left border-collapse">
                <thead>
                   <tr className="border-b-2 border-slate-800 uppercase text-[11px] font-bold">
                      <th className="py-3">Sản phẩm</th>
                      <th className="py-3 text-center">SL</th>
                      <th className="py-3 text-right">Đơn giá</th>
                   </tr>
                </thead>
                <tbody>
                   {selectedItems.map(item => (
                      <tr key={item.id} className="border-b border-slate-100 font-bold text-[14px]">
                         <td className="py-3">{item.name}</td>
                         <td className="py-3 text-center">{item.quantity}</td>
                         <td className="py-3 text-right">{new Intl.NumberFormat('vi-VN').format(item.price)}đ</td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </section>
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-4 space-y-6 no-print">
            <div className="sticky top-24 space-y-6">
                {/* Billing Summary Card */}
                <section className="bg-white rounded-xl p-7 shadow-sm border border-slate-100 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#f74f2e]"></div>
                    <div className="flex items-center gap-2.5 mb-8">
                       <FileText size={17} className="text-[#f74f2e]" />
                       <h2 className="text-[14px] font-bold text-slate-700 uppercase">Hóa đơn dự kiến</h2>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-[13px]">
                            <span className="text-slate-400 font-bold">Tạm tính</span>
                            <span className="font-bold text-slate-800">{new Intl.NumberFormat('vi-VN').format(totalAmount)}đ</span>
                        </div>
                        <div className="flex justify-between text-[13px]">
                            <span className="text-slate-400 font-bold">Giao hàng</span>
                            <span className="font-bold text-green-600">Miễn phí</span>
                        </div>
                        <div className="h-px bg-slate-50 my-4"></div>
                        <div className="flex flex-col">
                           <span className="text-slate-400 text-[11px] font-bold uppercase mb-0.5 opacity-70">Tổng cộng</span>
                           <span className="text-3xl font-extrabold text-[#f74f2e] tracking-tight">
                            {new Intl.NumberFormat('vi-VN').format(totalAmount)}đ
                           </span>
                        </div>
                    </div>

                    <button 
                      onClick={handleSave}
                      className="w-full bg-[#f74f2e] hover:bg-[#d24327] text-white py-3.5 rounded-xl font-bold text-[14px] shadow-lg shadow-[#f74f2e]/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        Tạo đơn hàng
                        <ArrowRight size={18} />
                    </button>
                </section>

                {/* Print & Draft Actions */}
                <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={handlePrintDraft}
                      className="bg-white border border-slate-100 py-3.5 rounded-xl text-slate-500 font-bold text-[12px] flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                    >
                       <Printer size={16} /> In nháp
                    </button>
                    <button 
                      onClick={handleSaveDraft}
                      className="bg-white border border-slate-100 py-3.5 rounded-xl text-slate-500 font-bold text-[12px] flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                    >
                       <FileText size={16} /> Lưu nháp
                    </button>
                </div>

                {/* Payment Selector */}
                <section className="bg-white rounded-xl p-7 shadow-sm border border-slate-100">
                    <h3 className="text-[13px] font-bold text-slate-400 uppercase mb-5">Thanh toán</h3>
                    <div className="space-y-3">
                        <div 
                          onClick={() => setPayment("COD")}
                          className={`flex items-center p-4 rounded-xl cursor-pointer border-2 transition-all ${payment === "COD" ? "bg-[#fef2f2] border-[#f74f2e]/30" : "bg-white border-transparent hover:bg-slate-50"}`}
                        >
                            <Truck size={18} className={payment === "COD" ? "text-[#f74f2e]" : "text-slate-300"} />
                            <div className="ml-3">
                                <p className={`font-bold text-[14px] ${payment === "COD" ? "text-slate-800" : "text-slate-500"}`}>COD</p>
                                <p className="text-[11px] font-medium text-slate-400">Thanh toán khi nhận</p>
                            </div>
                            {payment === "COD" && <CheckCircle2 size={18} className="ml-auto text-[#f74f2e]" />}
                        </div>
                        <div 
                          onClick={() => setPayment("Transfer")}
                          className={`flex items-center p-4 rounded-xl cursor-pointer border-2 transition-all ${payment === "Transfer" ? "bg-[#fef2f2] border-[#f74f2e]/30" : "bg-white border-transparent hover:bg-slate-50"}`}
                        >
                            <CreditCard size={18} className={payment === "Transfer" ? "text-[#f74f2e]" : "text-slate-300"} />
                            <div className="ml-3">
                                <p className={`font-bold text-[14px] ${payment === "Transfer" ? "text-slate-800" : "text-slate-500"}`}>Chuyển khoản</p>
                                <p className="text-[11px] font-medium text-slate-400">Qua ngân hàng</p>
                            </div>
                            {payment === "Transfer" && <CheckCircle2 size={18} className="ml-auto text-[#f74f2e]" />}
                        </div>
                    </div>
                </section>
            </div>
        </div>
      </div>

      {/* CUSTOMER SEARCH MODAL (Full List backup) */}
      {isCustomerModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[250] flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/10">
                 <div className="flex items-center gap-3">
                    <Users size={20} className="text-[#f74f2e]" />
                    <h2 className="text-[17px] font-bold text-slate-800">Tất cả khách hàng</h2>
                 </div>
                 <button onClick={() => setIsCustomerModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-all p-2"><X size={20} /></button>
              </div>
              <div className="p-8">
                 <div className="max-h-[450px] overflow-y-auto no-scrollbar space-y-2 pb-2">
                    {allCustomers.map(c => (
                       <div key={c.account_id} onClick={() => selectCustomer(c)} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-100 cursor-pointer transition-all group">
                          <div className="w-11 h-11 bg-white rounded-lg flex items-center justify-center text-[#f74f2e] font-bold border border-slate-100 shadow-sm">{c.full_name.charAt(0)}</div>
                          <div className="flex-1 text-left">
                             <h4 className="text-[15px] font-bold text-slate-800 transition-colors group-hover:text-[#f74f2e]">{c.full_name}</h4>
                             <p className="text-[12px] font-medium text-slate-400">{c.email}</p>
                          </div>
                          <div className="px-3 py-1 bg-orange-50 text-[#f74f2e] text-[10px] font-bold rounded-lg uppercase">Tài khoản ID: {c.account_id}</div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}

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
