import { useState, useEffect, useMemo } from "react";
import { Order, OrderStatus } from "../types";
import { orderService } from "../services/orderService";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<OrderStatus>("Tất cả");
  const [paymentFilter, setPaymentFilter] = useState("Tất cả");
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await orderService.getOrders();
      setOrders(Array.isArray(data) ? data : []);
    };
    fetchOrders();
  }, []);

  const refreshOrders = async () => {
    const data = await orderService.getOrders();
    setOrders(Array.isArray(data) ? data : []);
  };

  const updateStatus = (id: string, status: OrderStatus) => {
    orderService.updateOrderStatus(id, status);
    refreshOrders();
  };

  const deleteOrder = (id: string) => {
    orderService.deleteOrder(id);
    refreshOrders();
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        String(order.id).toLowerCase().includes(searchQuery.toLowerCase()) ||
        (order.customerName && order.customerName.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTab = activeTab === "Tất cả" || order.status === activeTab;
      const matchesPayment = true; // Payment filter disabled until column is added to DB

      return matchesSearch && matchesTab && matchesPayment;
    });
  }, [orders, searchQuery, activeTab, paymentFilter]);

  const toggleSelectOrder = (id: string) => {
    setSelectedOrderIds(prev => 
      prev.includes(id) ? prev.filter(orderId => orderId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedOrderIds.length === filteredOrders.length && filteredOrders.length > 0) {
      setSelectedOrderIds([]);
    } else {
      setSelectedOrderIds(filteredOrders.map(o => o.id));
    }
  };

  const stats = useMemo(() => {
    return {
      completed: orders.filter(o => o.status === "Hoàn thành").length,
      processing: orders.filter(o => o.status === "Đang xử lý").length,
      shipping: orders.filter(o => o.status === "Đang giao").length,
      cancelled: orders.filter(o => o.status === "Đã hủy").length,
      pending: orders.filter(o => o.status === "Chờ xác nhận" || o.status === "Chờ thanh toán").length,
    };
  }, [orders]);

  const addOrder = (orderData: Omit<Order, "id" | "date">) => {
    orderService.createOrder(orderData);
    refreshOrders();
  };

  return {
    orders: filteredOrders,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    paymentFilter,
    setPaymentFilter,
    selectedOrderIds,
    toggleSelectOrder,
    toggleSelectAll,
    updateStatus,
    deleteOrder,
    addOrder,
    stats,
    totalCount: orders.length
  };
};
