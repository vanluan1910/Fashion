import { useState, useEffect, useMemo } from "react";
import { Review } from "../types";
import { reviewService } from "../services/reviewService";

export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | "all">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "Đã duyệt" | "Chưa duyệt" | "Đã ẩn">("all");
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    const data = await reviewService.getReviews();
    setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const approveReview = async (id: string) => {
    await reviewService.approveReview(id);
    await fetchReviews();
  };

  const hideReview = async (id: string) => {
    await reviewService.hideReview(id);
    await fetchReviews();
  };

  const deleteReview = async (id: string) => {
    await reviewService.deleteReview(id);
    await fetchReviews();
  };

  const markHelpful = async (id: string) => {
    await reviewService.markHelpful(id);
    await fetchReviews();
  };

  const filteredReviews = useMemo(() => {
    return reviews.filter(review => {
      const matchesSearch = 
        review.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRating = ratingFilter === "all" || review.rating === ratingFilter;
      const matchesStatus = statusFilter === "all" || review.status === statusFilter;
      return matchesSearch && matchesRating && matchesStatus;
    });
  }, [reviews, searchQuery, ratingFilter, statusFilter]);

  return {
    reviews: filteredReviews,
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
    markHelpful,
    stats: {
      total: reviews.length,
      approved: reviews.filter(r => r.status === "Đã duyệt").length,
      pending: reviews.filter(r => r.status === "Chưa duyệt").length,
      hidden: reviews.filter(r => r.status === "Đã ẩn").length,
      average: reviews.length ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : "0"
    }
  };
};
