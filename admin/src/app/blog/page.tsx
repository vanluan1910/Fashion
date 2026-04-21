"use client";

import React, { useState } from "react";
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
  ExternalLink,
  ChevronDown,
  Save,
  Image as ImageIcon,
  Type,
  AlignLeft,
  X,
  BookOpen
} from "lucide-react";
import { useBlogPosts } from "@/features/blog/hooks/useBlogPosts";
import { BlogPost } from "@/features/blog/types";
import Dialog from "@/shared/components/Dialog";
import Modal from "@/shared/components/Modal";

export default function BlogManagementPage() {
  const { 
    posts, 
    searchQuery, setSearchQuery, 
    categoryFilter, setCategoryFilter,
    categories,
    toggleStatus,
    deletePost,
    addPost,
    updatePost,
    stats
  } = useBlogPosts();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const [formData, setFormData] = useState<Omit<BlogPost, "id" | "date" | "views">>({
    title: "",
    author: "Quản trị viên",
    category: "Thời trang",
    status: "Đã xuất bản",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600",
    summary: "",
    content: ""
  });

  const [dialogConfig, setDialogConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "warning" | "info" | "confirm";
    onConfirm?: () => void;
  }>({
    isOpen: false,
    title: "", message: "", type: "info"
  });

  const triggerDialog = (config: Omit<typeof dialogConfig, "isOpen">) => {
    setDialogConfig({ ...config, isOpen: true });
  };

  const handleOpenAdd = () => {
    setSelectedPost(null);
    setFormData({ title: "", author: "Quản trị viên", category: "Thời trang", status: "Đã xuất bản", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600", summary: "", content: "" });
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      author: post.author,
      category: post.category,
      status: post.status,
      image: post.image,
      summary: post.summary,
      content: post.content
    });
    setIsFormModalOpen(true);
  };

  const handleOpenPreview = (post: BlogPost) => {
    setSelectedPost(post);
    setIsPreviewModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      triggerDialog({ title: "Thiếu nội dung!", message: "Vui lòng nhập tiêu đề và nội dung bài viết.", type: "warning" });
      return;
    }

    if (selectedPost) {
      updatePost(selectedPost.id, formData);
      triggerDialog({ title: "Đã cập nhật!", message: "Nội dung bài viết đã được thay đổi thành công.", type: "success" });
    } else {
      addPost(formData);
      triggerDialog({ title: "Đã đăng!", message: "Bài viết mới đã được lưu vào danh sách.", type: "success" });
    }
    
    setIsFormModalOpen(false);
  };

  const handleDeleteRequest = (id: string, title: string) => {
    triggerDialog({
      title: "Xác nhận xóa bài?",
      message: `Bài viết "${title}" sẽ bị gỡ bỏ vĩnh viễn khỏi hệ thống.`,
      type: "confirm",
      onConfirm: () => {
        deletePost(id);
        triggerDialog({ title: "Đã xóa!", message: "Bài viết đã được gỡ bỏ thành công.", type: "success" });
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#333] tracking-tight">Quản lý bài viết</h1>
          <div className="flex items-center gap-4 mt-1.5">
             <span className="text-[12px] font-bold text-[#888] flex items-center gap-1.5 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 italic">Tổng: {stats.total} bài</span>
             <span className="text-[12px] font-bold text-green-600 flex items-center gap-1.5 bg-green-50 px-2 py-0.5 rounded border border-green-100 italic">Công khai: {stats.published}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#f74f2e] text-white rounded-xl text-[13px] font-bold hover:bg-[#d24327] hover:shadow-lg transition-all active:scale-95"
          >
            <Plus size={18} /> Viết bài mới
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl border border-[#eee] shadow-sm overflow-hidden min-h-[500px]">
        {/* List Toolbar */}
        <div className="p-4 border-b border-[#eee] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#fcfcff]">
          <div className="relative w-full md:w-[450px]">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm tiêu đề bài viết..." 
              className="w-full h-12 pl-12 pr-4 bg-[#f3f4f9] border-transparent rounded-xl text-[14px] text-[#333] font-bold placeholder:text-[#aaa] focus:ring-2 focus:ring-[#f74f2e] focus:bg-white transition-all outline-none"
            />
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]" />
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-12 pl-6 pr-10 bg-[#f3f4f9] border-transparent rounded-xl text-[13px] font-bold text-[#555] focus:ring-2 focus:ring-[#f74f2e] outline-none appearance-none cursor-pointer"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Posts List */}
        <div className="divide-y divide-[#f1f1f1]">
          {posts.length > 0 ? posts.map((post) => (
            <div key={post.id} className="p-4 hover:bg-[#fcfcff]/80 transition-all flex flex-col sm:flex-row sm:items-center gap-5 group relative">
              <div className="w-full sm:w-[150px] h-[100px] rounded-2xl overflow-hidden border border-[#eee] shrink-0 shadow-sm relative group-hover:shadow-md transition-all">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>

              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${
                    post.status === "Đã xuất bản" ? "bg-green-50 text-green-600 border-green-100" : "bg-gray-50 text-gray-500 border-gray-100"
                  }`}>
                    {post.status}
                  </span>
                  <span className="text-[11px] text-[#f74f2e] font-bold flex items-center gap-1.5"><Tag size={12} /> {post.category}</span>
                </div>
                <h4 onClick={() => handleOpenPreview(post)} className="text-[17px] font-extrabold text-[#333] mb-2 leading-snug group-hover:text-[#f74f2e] transition-all cursor-pointer">
                  {post.title}
                </h4>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[12px] text-[#999] font-medium">
                  <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><Eye size={14} /> {(post.views || 0).toLocaleString()} xem</span>
                </div>
              </div>

              <div className="flex items-center gap-1 sm:border-l sm:pl-5 border-gray-100 py-2">
                <button 
                  onClick={() => handleOpenEdit(post)}
                  title="Chỉnh sửa nội dung" className="p-3 text-[#666] hover:bg-[#f74f2e]/10 hover:text-[#f74f2e] rounded-xl transition-all">
                  <FileEdit size={20} />
                </button>
                <button 
                  onClick={() => handleOpenPreview(post)}
                  title="Xem trước bài viết" className="p-3 text-[#666] hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all">
                  <ExternalLink size={20} />
                </button>
                <button 
                  onClick={() => toggleStatus(post.id)}
                  className={`p-3 rounded-xl transition-all ${post.status === "Đã xuất bản" ? "text-orange-500 hover:bg-orange-50" : "text-green-500 hover:bg-green-50"}`}
                >
                  {post.status === "Đã xuất bản" ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                <button 
                  onClick={() => handleDeleteRequest(post.id, post.title)}
                  className="p-3 text-[#666] hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"><Trash2 size={20} /></button>
              </div>
            </div>
          )) : (
            <div className="p-20 text-center flex flex-col items-center gap-4 text-[#aaa]">
               <AlignLeft size={48} />
               <p className="font-extrabold text-[#333]">Không tìm thấy bài viết</p>
            </div>
          )}
        </div>
      </div>

      {/* Form Modal (Add & Edit) */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={selectedPost ? "Chỉnh sửa bài viết" : "Viết bài mới"}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto px-1">
           <div className="space-y-4">
              <div className="space-y-2">
                 <label className="text-[13px] font-bold text-[#333] flex items-center gap-2 underline decoration-[#f74f2e]/30 decoration-2">Tiêu đề bài viết</label>
                 <input 
                   type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                   placeholder="Nhập tiêu đề hấp dẫn..." className="w-full h-12 px-4 bg-[#f3f4f9] border-transparent rounded-xl text-[15px] text-[#333] font-bold placeholder:text-[#aaa] focus:ring-2 focus:ring-[#f74f2e] focus:bg-white outline-none transition-all"
                 />
              </div>
              <div className="grid grid-cols-2 gap-5">
                 <div className="space-y-2">
                    <label className="text-[13px] font-bold text-[#333]">Danh mục</label>
                    <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full h-11 px-4 bg-[#f3f4f9] rounded-xl text-[14px] text-[#333] font-bold outline-none cursor-pointer focus:ring-2 focus:ring-[#f74f2e]">
                      <option value="Thời trang">Thời trang</option>
                      <option value="Lối sống">Lối sống</option>
                      <option value="Xu hướng">Xu hướng</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[13px] font-bold text-[#333]">Trạng thái</label>
                    <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value as any})} className="w-full h-11 px-4 bg-[#f3f4f9] rounded-xl text-[14px] text-[#333] font-bold outline-none cursor-pointer focus:ring-2 focus:ring-[#f74f2e]">
                      <option value="Đã xuất bản">Công khai</option>
                      <option value="Bản nháp">Bản nháp</option>
                    </select>
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-[13px] font-bold text-[#333]">Link hình ảnh</label>
                 <input type="text" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full h-11 px-4 bg-[#f3f4f9] rounded-xl text-[14px] text-[#333] font-bold outline-none" />
              </div>
              <div className="space-y-2">
                 <label className="text-[13px] font-bold text-[#333]">Nội dung chi tiết</label>
                 <textarea value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} rows={10} className="w-full p-4 bg-[#f3f4f9] rounded-xl text-[14px] text-[#333] font-bold outline-none focus:bg-white" />
              </div>
           </div>
           <div className="flex justify-end gap-3 pt-5 border-t border-[#eee]">
              <button type="button" onClick={() => setIsFormModalOpen(false)} className="px-6 py-2.5 bg-white border rounded-xl text-[#666] font-bold text-[13px] mb-4">Hủy</button>
              <button type="submit" className="px-10 py-2.5 bg-[#f74f2e] text-white font-bold text-[13px] rounded-xl hover:bg-[#d24327] flex items-center gap-2 mb-4"><Save size={18} /> {selectedPost ? "Cập nhật bài viết" : "Đăng bài viết"}</button>
           </div>
        </form>
      </Modal>

      {/* Preview Modal */}
      <Modal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        title="Xem trước bài viết"
        size="xl"
      >
        {selectedPost && (
          <div className="space-y-6 max-h-[80vh] overflow-y-auto px-4 pb-10">
             <div className="w-full h-[350px] rounded-3xl overflow-hidden border border-[#eee] shadow-lg">
                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
             </div>
             
             <div className="flex flex-col items-center">
                <span className="text-[12px] font-black uppercase text-[#f74f2e] bg-purple-50 px-4 py-1.5 rounded-full mb-4">{selectedPost.category}</span>
                <h2 className="text-3xl font-black text-[#333] text-center leading-tight mb-4">{selectedPost.title}</h2>
                <div className="flex items-center gap-6 text-[13px] text-[#999] font-medium border-y border-gray-100 w-full justify-center py-3 mb-6">
                   <span className="flex items-center gap-2"><User size={16} /> {selectedPost.author}</span>
                   <span className="flex items-center gap-2"><Calendar size={16} /> {selectedPost.date}</span>
                   <span className="flex items-center gap-2"><Eye size={16} /> {selectedPost.views} lượt xem</span>
                </div>
             </div>

             <div className="prose prose-purple max-w-none">
                <p className="text-[16px] text-[#555] leading-relaxed whitespace-pre-wrap font-medium decoration-slice">
                  {selectedPost.content || "Nội dung bài viết chưa được soạn thảo..."}
                </p>
             </div>

             <div className="mt-10 p-6 bg-[#fcfcff] border border-dashed border-[#f74f2e]/30 rounded-3xl text-center">
                <BookOpen size={24} className="mx-auto text-[#f74f2e] mb-2 opacity-50" />
                <p className="text-[13px] text-[#f74f2e] font-bold">Đây là bản xem trước của quản trị viên. Bài viết sẽ hiển thị tương tự trên trang web chính thức.</p>
             </div>
          </div>
        )}
      </Modal>

      <Dialog 
        {...dialogConfig} 
        onClose={() => setDialogConfig(prev => ({ ...prev, isOpen: false }))} 
      />
    </div>
  );
}
