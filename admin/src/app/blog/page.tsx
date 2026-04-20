"use client";

import React from "react";
import { 
  Plus, 
  Search, 
  FileEdit, 
  Trash2, 
  Eye, 
  EyeOff,
  User,
  Calendar,
  Tag,
  ExternalLink
} from "lucide-react";

const BLOG_POSTS = [
  {
    id: 1,
    title: "Sức hút của phong cách thời trang tối giản trong năm 2024",
    author: "Quản trị viên",
    category: "Thời trang",
    date: "21/04/2024",
    status: "Đã xuất bản",
    views: "1.2k",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "5 bí quyết giữ cho quần áo luôn bền đẹp như mới",
    author: "Quản trị viên",
    category: "Lối sống",
    date: "20/04/2024",
    status: "Đã xuất bản",
    views: "850",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Cách phối đồ với denim sao cho thật phong cách",
    author: "Biên tập viên",
    category: "Thời trang",
    date: "19/04/2024",
    status: "Bản nháp",
    views: "0",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=200&auto=format&fit=crop",
  },
];

export default function BlogManagementPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#333]">Quản lý bài viết</h1>
          <p className="text-[#888] text-[13px]">Soạn thảo và quản lý các bài nội dung trên trang Blog.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#845adf] text-white rounded-lg text-[13px] font-bold hover:bg-[#7248c8] transition-all">
            <Plus size={18} />
            Viết bài mới
          </button>
        </div>
      </div>

      {/* Blog Cards/List */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-xl border border-[#f1f1f1] shadow-sm overflow-hidden">
          {/* List Toolbar */}
          <div className="p-4 border-b border-[#f1f1f1] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-[350px]">
              <input 
                type="text" 
                placeholder="Tìm tiêu đề bài viết..." 
                className="w-full h-10 pl-10 pr-4 bg-[#f3f4f9] border-none rounded-lg text-[13px]"
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
            </div>
            <div className="flex items-center gap-3">
              <select className="h-10 px-4 bg-[#f3f4f9] border-none rounded-lg text-[13px] text-[#555]">
                <option>Tất cả danh mục</option>
                <option>Thời trang</option>
                <option>Lối sống</option>
              </select>
            </div>
          </div>

          {/* Posts List */}
          <div className="divide-y divide-[#f1f1f1]">
            {BLOG_POSTS.map((post) => (
              <div key={post.id} className="p-4 hover:bg-[#fcfcff] transition-all flex flex-col sm:flex-row sm:items-center gap-4 group">
                {/* Thumbnail */}
                <div className="w-full sm:w-[120px] h-[80px] rounded-lg overflow-hidden border border-[#eee] shrink-0">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      post.status === "Đã xuất bản" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                    }`}>
                      {post.status}
                    </span>
                    <span className="text-[11px] text-[#845adf] font-bold flex items-center gap-1">
                      <Tag size={12} /> {post.category}
                    </span>
                  </div>
                  <h4 className="text-[15px] font-bold text-[#333] mb-2 group-hover:text-[#845adf] transition-all cursor-pointer">
                    {post.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-[#999]">
                    <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                    <span className="flex items-center gap-1.5"><Eye size={14} /> {post.views} lượt xem</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:border-l sm:pl-4 border-[#eee]">
                  <button title="Chỉnh sửa" className="p-2.5 bg-white border border-[#eee] text-[#666] hover:text-[#845adf] hover:border-[#845adf] rounded-lg transition-all shadow-sm">
                    <FileEdit size={18} />
                  </button>
                  <button title="Xem bài viết" className="p-2.5 bg-white border border-[#eee] text-[#666] hover:text-[#333] rounded-lg transition-all shadow-sm">
                    <ExternalLink size={18} />
                  </button>
                  {post.status === "Đã xuất bản" ? (
                    <button title="Ẩn bài viết" className="p-2.5 bg-white border border-[#eee] text-[#666] hover:text-orange-600 rounded-lg transition-all shadow-sm">
                      <EyeOff size={18} />
                    </button>
                  ) : null}
                  <button title="Xóa bài" className="p-2.5 bg-white border border-[#eee] text-[#666] hover:text-red-600 rounded-lg transition-all shadow-sm">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State / More */}
          <div className="p-6 bg-[#fcfcff] text-center">
            <button className="text-[13px] font-bold text-[#845adf] hover:underline">Tải thêm bài viết</button>
          </div>
        </div>
      </div>
    </div>
  );
}
