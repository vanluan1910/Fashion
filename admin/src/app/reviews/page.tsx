"use client";

import React, { useState } from "react";
import {
  Star,
  Search,
  Filter,
  Eye,
  EyeOff,
  Trash2,
  ThumbsUp,
  MessageSquare,
  X,
  CheckCircle,
  ChevronDown
} from "lucide-react";
import { useReviews } from "@/features/reviews/hooks/useReviews";
import Dialog from "@/shared/components/Dialog";

const getStarColor = (rating: number) => {
  if (rating >= 4) return "text-yellow-400";
  if (rating >= 3) return "text-yellow-300";
  return "text-yellow-200";
};

export default function ReviewsPage() {
  const {
    reviews,
    searchQuery,
    setSearchQuery,
    ratingFilter,
    setRatingFilter,
    statusFilter,
    setStatusFilter,
    loading,
    approveReview,
    hideReview,
    deleteReview,
    stats
  } = useReviews();

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

  const handleApprove = (id: string) => {
    triggerDialog({
      title: "Duyệt bình luận?",
      message: "Bình luận này sẽ được hiển thị công khai.",
      type: "confirm",
      onConfirm: async () => {
        await approveReview(id);
        triggerDialog({
          title: "Thành công",
          message: "Bình luận đã được duyệt.",
          type: "success"
        });
      }
    });
  };

  const handleHide = (id: string) => {
    triggerDialog({
      title: "Ẩn bình luận?",
      message: "Bình luận này sẽ không được hiển thị công khai.",
      type: "confirm",
      onConfirm: async () => {
        await hideReview(id);
        triggerDialog({
          title: "Thành công",
          message: "Bình luận đã được ẩn.",
          type: "success"
        });
      }
    });
  };

  const handleDelete = (id: string) => {
    triggerDialog({
      title: "Xóa bình luận?",
      message: "Hành động này không thể hoàn tác. Bạn chắc chắn muốn xóa?",
      type: "confirm",
      onConfirm: async () => {
        await deleteReview(id);
        triggerDialog({
          title: "Thành công",
          message: "Bình luận đã được xóa.",
          type: "success"
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="admin-page-surface overflow-hidden">
        <div className="flex flex-col gap-4 p-6 sm:p-7">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--admin-heading)]">Bình luận & Đánh giá</h1>
        </div>
      </div>

      </section>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="admin-page-surface p-4 shadow-admin-sm">
          <p className="text-xs text-[var(--admin-text-muted)] font-medium uppercase tracking-wide">Tổng cộng</p>
          <p className="text-xl font-semibold text-[var(--admin-heading)] mt-2">{stats.total}</p>
        </div>
        <div className="admin-page-surface p-4 shadow-admin-sm">
          <p className="text-xs text-[var(--admin-text-muted)] font-medium uppercase tracking-wide">Đã duyệt</p>
          <p className="text-xl font-semibold text-green-600 mt-2">{stats.approved}</p>
        </div>
        <div className="admin-page-surface p-4 shadow-admin-sm">
          <p className="text-xs text-[var(--admin-text-muted)] font-medium uppercase tracking-wide">Chưa duyệt</p>
          <p className="text-xl font-semibold text-orange-600 mt-2">{stats.pending}</p>
        </div>
        <div className="admin-page-surface p-4 shadow-admin-sm">
          <p className="text-xs text-[var(--admin-text-muted)] font-medium uppercase tracking-wide">Đã ẩn</p>
          <p className="text-xl font-semibold text-red-600 mt-2">{stats.hidden}</p>
        </div>
        <div className="admin-page-surface p-4 shadow-admin-sm">
          <p className="text-xs text-[var(--admin-text-muted)] font-medium uppercase tracking-wide">Đánh giá TB</p>
          <p className="text-xl font-semibold text-[var(--admin-heading)] mt-2">{stats.average} ⭐</p>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-page-surface p-5 shadow-admin-sm">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Search size={18} className="text-[var(--admin-text-muted)]" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên sản phẩm, khách hàng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-[var(--admin-text)]"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-[#666] uppercase tracking-wide block mb-2">
                Đánh giá
              </label>
              <select
                value={ratingFilter === "all" ? "all" : ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value === "all" ? "all" : Number(e.target.value) as any)}
                className="w-full px-3 py-2 border border-[var(--admin-border)] rounded-lg text-sm font-medium focus:outline-none focus:border-[var(--admin-border-strong)]"
              >
                <option value="all">Tất cả sao</option>
                <option value="5">5 sao</option>
                <option value="4">4 sao</option>
                <option value="3">3 sao</option>
                <option value="2">2 sao</option>
                <option value="1">1 sao</option>
              </select>
            </div>
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
                <option value="Đã duyệt">Đã duyệt</option>
                <option value="Chưa duyệt">Chưa duyệt</option>
                <option value="Đã ẩn">Đã ẩn</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--admin-accent)]"></div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 admin-page-surface">
            <MessageSquare size={48} className="mx-auto text-[#ddd] mb-3" />
            <p className="text-[var(--admin-text-muted)]">Không có bình luận nào</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="admin-page-surface p-5 shadow-admin-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-[#1a1a1a]">{review.productName}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      review.status === "Đã duyệt" ? "bg-green-100 text-green-700" :
                      review.status === "Chưa duyệt" ? "bg-orange-100 text-orange-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {review.status}
                    </span>
                  </div>
                  <p className="text-sm text-[#666]">Bởi {review.customerName} • {review.date}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < review.rating ? getStarColor(review.rating) : "text-[#ddd]"}
                      fill={i < review.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
              </div>

              <h4 className="font-semibold text-[#1a1a1a] mb-2">{review.title}</h4>
              <p className="text-sm text-[#666] mb-4">{review.content}</p>

              <div className="flex items-center justify-between border-t border-[#eee] pt-3">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-[var(--admin-text-muted)]">👍 {review.helpful}</span>
                  <span className="text-[var(--admin-text-muted)]">👎 {review.unhelpful}</span>
                </div>
                <div className="flex gap-2">
                  {review.status === "Chưa duyệt" && (
                    <button
                      onClick={() => handleApprove(review.id)}
                      className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors"
                    >
                      <CheckCircle size={14} className="inline mr-1" /> Duyệt
                    </button>
                  )}
                  {review.status !== "Đã ẩn" && (
                    <button
                      onClick={() => handleHide(review.id)}
                      className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-xs font-medium hover:bg-orange-200 transition-colors"
                    >
                      <EyeOff size={14} className="inline mr-1" /> Ẩn
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-medium hover:bg-red-200 transition-colors"
                  >
                    <Trash2 size={14} className="inline mr-1" /> Xóa
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog {...dialogConfig} onClose={() => setDialogConfig({ ...dialogConfig, isOpen: false })} />
    </div>
  );
}
