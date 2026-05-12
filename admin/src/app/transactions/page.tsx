"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  CreditCard,
  CheckCircle,
  AlertCircle,
  RotateCw,
  RotateCcw,
  X,
  Download,
  Eye
} from "lucide-react";
import { useTransactions } from "@/features/transactions/hooks/useTransactions";
import Dialog from "@/shared/components/Dialog";

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Thành công":
      return "bg-green-100 text-green-700";
    case "Đang xử lý":
      return "bg-blue-100 text-blue-700";
    case "Thất bại":
      return "bg-red-100 text-red-700";
    case "Hoàn tiền":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Thành công":
      return <CheckCircle size={16} />;
    case "Đang xử lý":
      return <RotateCw size={16} />;
    case "Thất bại":
      return <AlertCircle size={16} />;
    case "Hoàn tiền":
      return <RotateCcw size={16} />;
    default:
      return null;
  }
};

export default function TransactionsPage() {
  const {
    transactions,
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
  } = useTransactions();

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

  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const triggerDialog = (config: Omit<typeof dialogConfig, "isOpen">) => {
    setDialogConfig({ ...config, isOpen: true });
  };

  const handleRefund = (id: string) => {
    triggerDialog({
      title: "Hoàn tiền?",
      message: "Xác nhận hoàn tiền cho giao dịch này?",
      type: "confirm",
      onConfirm: async () => {
        await refundTransaction(id);
        triggerDialog({
          title: "Thành công",
          message: "Giao dịch đã được hoàn tiền.",
          type: "success"
        });
      }
    });
  };

  const handleRetry = (id: string) => {
    triggerDialog({
      title: "Thử lại?",
      message: "Xác nhận thử lại xử lý giao dịch này?",
      type: "confirm",
      onConfirm: async () => {
        await retryTransaction(id);
        triggerDialog({
          title: "Thành công",
          message: "Giao dịch đang được xử lý lại.",
          type: "success"
        });
      }
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="admin-page-surface overflow-hidden">
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-7">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--admin-heading)]">Giao dịch thanh toán</h1>
        </div>
        <button className="flex items-center gap-2 rounded-[calc(var(--admin-radius-md)-4px)] bg-[var(--admin-accent)] px-4 py-2.5 text-sm font-semibold text-white shadow-admin-md transition hover:-translate-y-0.5 hover:bg-[var(--admin-accent-strong)]">
          <Download size={18} /> Xuất báo cáo
        </button>
      </div>

      </section>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="admin-page-surface p-4 shadow-admin-sm">
          <p className="text-xs text-[var(--admin-text-muted)] font-medium uppercase tracking-wide">Tổng giao dịch</p>
          <p className="text-xl font-semibold text-[var(--admin-heading)] mt-2">{stats.total}</p>
        </div>
        <div className="admin-page-surface p-4 shadow-admin-sm">
          <p className="text-xs text-[var(--admin-text-muted)] font-medium uppercase tracking-wide">Thành công</p>
          <p className="text-xl font-semibold text-green-600 mt-2">{stats.successful}</p>
        </div>
        <div className="admin-page-surface p-4 shadow-admin-sm">
          <p className="text-xs text-[var(--admin-text-muted)] font-medium uppercase tracking-wide">Đang xử lý</p>
          <p className="text-xl font-semibold text-blue-600 mt-2">{stats.processing}</p>
        </div>
        <div className="admin-page-surface p-4 shadow-admin-sm">
          <p className="text-xs text-[var(--admin-text-muted)] font-medium uppercase tracking-wide">Thất bại</p>
          <p className="text-xl font-semibold text-red-600 mt-2">{stats.failed}</p>
        </div>
        <div className="admin-page-surface p-4 shadow-admin-sm">
          <p className="text-xs text-[var(--admin-text-muted)] font-medium uppercase tracking-wide">Tỷ lệ thành công</p>
          <p className="text-xl font-semibold text-[var(--admin-heading)] mt-2">{stats.successRate}%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-page-surface p-5 shadow-admin-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Search size={18} className="text-[var(--admin-text-muted)]" />
            <input
              type="text"
              placeholder="Tìm kiếm theo mã giao dịch, mã đơn hàng, tên khách hàng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-[var(--admin-text)]"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className="text-xs font-medium text-[#666] uppercase tracking-wide block mb-2">
                Trạng thái
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full px-3 py-2 border border-[var(--admin-border)] rounded-lg text-sm font-medium focus:outline-none focus:border-[var(--admin-border-strong)]"
              >
                <option value="all">Tất cả</option>
                <option value="Thành công">Thành công</option>
                <option value="Đang xử lý">Đang xử lý</option>
                <option value="Thất bại">Thất bại</option>
                <option value="Hoàn tiền">Hoàn tiền</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[#666] uppercase tracking-wide block mb-2">
                Phương thức thanh toán
              </label>
              <select
                value={paymentMethodFilter}
                onChange={(e) => setPaymentMethodFilter(e.target.value as any)}
                className="w-full px-3 py-2 border border-[var(--admin-border)] rounded-lg text-sm font-medium focus:outline-none focus:border-[var(--admin-border-strong)]"
              >
                <option value="all">Tất cả</option>
                <option value="Thẻ tín dụng">Thẻ tín dụng</option>
                <option value="Chuyển khoản">Chuyển khoản</option>
                <option value="Ví điện tử">Ví điện tử</option>
                <option value="Trả sau">Trả sau</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[#666] uppercase tracking-wide block mb-2">
                Từ ngày
              </label>
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                className="w-full px-3 py-2 border border-[var(--admin-border)] rounded-lg text-sm focus:outline-none focus:border-[var(--admin-border-strong)]"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#666] uppercase tracking-wide block mb-2">
                Đến ngày
              </label>
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                className="w-full px-3 py-2 border border-[var(--admin-border)] rounded-lg text-sm focus:outline-none focus:border-[var(--admin-border-strong)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="admin-page-surface overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--admin-accent)]"></div>
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-12">
            <CreditCard size={48} className="mx-auto text-[#ddd] mb-3" />
            <p className="text-[var(--admin-text-muted)]">Không có giao dịch nào</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#eee] bg-[#f9f9f9]">
                  <th className="px-5 py-3 text-left text-xs font-bold text-[var(--admin-text-muted)] uppercase tracking-wider">
                    Mã giao dịch
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-[var(--admin-text-muted)] uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-[var(--admin-text-muted)] uppercase tracking-wider">
                    Phương thức
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-bold text-[var(--admin-text-muted)] uppercase tracking-wider">
                    Số tiền
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-bold text-[var(--admin-text-muted)] uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-[var(--admin-text-muted)] uppercase tracking-wider">
                    Ngày
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-bold text-[var(--admin-text-muted)] uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-[#eee] hover:bg-[#f9f9f9] transition-colors">
                    <td className="px-5 py-4 text-sm font-medium text-[#1a1a1a]">
                      {transaction.id}
                    </td>
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-medium text-[#1a1a1a]">{transaction.customerName}</p>
                        <p className="text-xs text-[var(--admin-text-muted)]">{transaction.orderId}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-[#666]">
                      {transaction.paymentMethod}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <p className="text-sm font-bold text-[#1a1a1a]">
                        {formatCurrency(transaction.amount)}
                      </p>
                      <p className="text-xs text-[var(--admin-text-muted)]">
                        Phí: {formatCurrency(transaction.fee)}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                          transaction.status
                        )}`}
                      >
                        {getStatusIcon(transaction.status)}
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-[var(--admin-text-muted)]">
                      {transaction.date}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedTransaction(transaction)}
                          className="p-1.5 hover:bg-[#f0f0f0] rounded-lg transition-colors"
                          title="Xem chi tiết"
                        >
                          <Eye size={16} className="text-[#666]" />
                        </button>
                        {transaction.status === "Thất bại" && (
                          <button
                            onClick={() => handleRetry(transaction.id)}
                            className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Thử lại"
                          >
                            <RotateCw size={16} className="text-blue-600" />
                          </button>
                        )}
                        {transaction.status === "Thành công" && (
                          <button
                            onClick={() => handleRefund(transaction.id)}
                            className="p-1.5 hover:bg-purple-100 rounded-lg transition-colors"
                            title="Hoàn tiền"
                          >
                            <RotateCcw size={16} className="text-purple-600" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Dialog {...dialogConfig} onClose={() => setDialogConfig({ ...dialogConfig, isOpen: false })} />
    </div>
  );
}
