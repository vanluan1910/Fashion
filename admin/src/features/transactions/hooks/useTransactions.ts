import { useState, useEffect, useMemo } from "react";
import { Transaction } from "../types";
import { transactionService } from "../services/transactionService";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "Thành công" | "Đang xử lý" | "Thất bại" | "Hoàn tiền">("all");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<"all" | "Thẻ tín dụng" | "Chuyển khoản" | "Ví điện tử" | "Trả sau">("all");
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({
    from: "",
    to: ""
  });
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    setLoading(true);
    const data = await transactionService.getTransactions();
    setTransactions(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const refundTransaction = async (id: string) => {
    await transactionService.refundTransaction(id);
    await fetchTransactions();
  };

  const retryTransaction = async (id: string) => {
    await transactionService.retryTransaction(id);
    await fetchTransactions();
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const matchesSearch = 
        transaction.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
      const matchesPayment = paymentMethodFilter === "all" || transaction.paymentMethod === paymentMethodFilter;
      const matchesDateRange = 
        (!dateRange.from || transaction.date >= dateRange.from) &&
        (!dateRange.to || transaction.date <= dateRange.to);
      
      return matchesSearch && matchesStatus && matchesPayment && matchesDateRange;
    });
  }, [transactions, searchQuery, statusFilter, paymentMethodFilter, dateRange]);

  const stats = useMemo(() => {
    const successful = transactions.filter(t => t.status === "Thành công");
    const failed = transactions.filter(t => t.status === "Thất bại");
    
    return {
      total: transactions.length,
      successful: successful.length,
      failed: failed.length,
      processing: transactions.filter(t => t.status === "Đang xử lý").length,
      refunded: transactions.filter(t => t.status === "Hoàn tiền").length,
      totalAmount: transactions.reduce((sum, t) => sum + t.amount, 0),
      successRate: transactions.length ? ((successful.length / transactions.length) * 100).toFixed(1) : "0"
    };
  }, [transactions]);

  return {
    transactions: filteredTransactions,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    paymentMethodFilter,
    setPaymentMethodFilter,
    dateRange,
    setDateRange,
    loading,
    refundTransaction,
    retryTransaction,
    stats
  };
};
