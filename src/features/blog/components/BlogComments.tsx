"use client";

import React from "react";
import { blogCommentService, type BlogComment } from "../services/blogCommentService";

interface BlogCommentsProps {
  postId: number;
}

export function BlogComments({ postId }: BlogCommentsProps) {
  const [comments, setComments] = React.useState<BlogComment[]>([]);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [content, setContent] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  const loadComments = React.useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await blogCommentService.getComments(postId);
      setComments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể tải bình luận");
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  React.useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !content.trim()) {
      setError("Vui lòng nhập tên và nội dung bình luận.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await blogCommentService.createComment(postId, {
        user_name: name.trim(),
        email: email.trim() || undefined,
        content: content.trim()
      });
      setContent("");
      setName("");
      setEmail("");
      await loadComments();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể gửi bình luận");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="blog_comments_area mt-[80px]">
      <h3 className="mb-[45px] font-serif text-[28px] font-normal uppercase tracking-wider text-[#333]">
        {comments.length.toString().padStart(2, "0")} Bình luận
      </h3>

      <div className="comment_list space-y-12">
        {isLoading ? (
          <p className="font-sans text-[14px] text-[#888]">Đang tải bình luận...</p>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.comment_id} className="comment_item border-b border-[#f0f0f0] pb-10 last:border-0">
              <div className="flex flex-col gap-8 md:flex-row">
                <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#eee] bg-[#f7f7f7]">
                  <span className="font-sans text-[24px] font-bold text-[#777]">
                    {comment.user_name?.charAt(0).toUpperCase() || "?"}
                  </span>
                </div>
                <div className="comment_content flex-1">
                  <div className="mb-2 flex items-center justify-between">
                    <h5 className="font-serif text-[18px] font-normal uppercase tracking-wide text-[#333]">
                      {comment.user_name}
                    </h5>
                  </div>
                  <p className="mb-4 font-sans text-[13px] uppercase tracking-[2px] text-[#999]">
                    {new Date(comment.created_at).toLocaleDateString("vi-VN")}
                  </p>
                  <p className="font-sans text-[16px] leading-relaxed text-[#666]">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="font-sans text-[14px] text-[#888]">Chưa có bình luận nào.</p>
        )}
      </div>

      <div className="comment_form_area mt-[100px] border-t-4 border-[#333] pt-[60px]">
        <h3 className="mb-[15px] font-serif text-[32px] font-normal uppercase tracking-widest text-[#333]">
          Để lại bình luận
        </h3>
        <p className="mb-[45px] font-sans text-[15px] text-[#888]">
          Email của bạn sẽ không được hiển thị công khai. Các trường bắt buộc được đánh dấu *
        </p>

        <form className="grid grid-cols-1 gap-8 md:grid-cols-2" onSubmit={handleSubmit}>
          <div className="col-span-2">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Lời nhắn của bạn *"
              rows={6}
              className="w-full resize-none border border-[#eee] px-5 py-4 font-sans transition-all placeholder:text-[12px] placeholder:uppercase placeholder:tracking-widest focus:border-[#f74f2e] focus:outline-none"
            />
          </div>
          <div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Họ và tên *"
              className="h-[55px] w-full border border-[#eee] px-5 font-sans transition-all placeholder:text-[12px] placeholder:uppercase placeholder:tracking-widest focus:border-[#f74f2e] focus:outline-none"
            />
          </div>
          <div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email *"
              className="h-[55px] w-full border border-[#eee] px-5 font-sans transition-all placeholder:text-[12px] placeholder:uppercase placeholder:tracking-widest focus:border-[#f74f2e] focus:outline-none"
            />
          </div>
          <div className="col-span-2">
            {error && <p className="mb-4 font-sans text-[13px] text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-[55px] bg-[#333] px-12 font-sans text-[12px] font-bold uppercase tracking-[4px] text-white transition-all hover:bg-[#f74f2e] disabled:opacity-50"
            >
              {isSubmitting ? "Đang gửi..." : "Gửi bình luận"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
