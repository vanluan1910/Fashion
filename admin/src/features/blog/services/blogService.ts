import { BlogPost } from "../types";

const BLOG_STORAGE_KEY = "atelier_blog_posts";

const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: "#BLOG-001",
    title: "Sức hút của phong cách thời trang tối giản trong năm 2024",
    author: "Quản trị viên",
    category: "Thời trang",
    date: "21/04/2024",
    status: "Đã xuất bản",
    views: 1250,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600&auto=format&fit=crop",
    summary: "Phong cách tối giản không bao giờ lỗi mốt. Hãy cùng khám phá xu hướng mới nhất cho năm nay.",
    content: "Nội dung chi tiết bài viết đang được cập nhật..."
  },
  {
    id: "#BLOG-002",
    title: "5 bí quyết giữ cho quần áo luôn bền đẹp như mới",
    author: "Quản trị viên",
    category: "Lối sống",
    date: "20/04/2024",
    status: "Đã xuất bản",
    views: 850,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop",
    summary: "Làm thế quan để bảo quản trang phục denim và lụa? Đây là những bí kíp bạn cần biết.",
    content: "Nội dung chi tiết bài viết đang được cập nhật..."
  },
  {
    id: "#BLOG-003",
    title: "Cách phối đồ với denim sao cho thật phong cách",
    author: "Biên tập viên",
    category: "Thời trang",
    date: "19/04/2024",
    status: "Bản nháp",
    views: 0,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop",
    summary: "Denim on denim - Một phong cách mạo hiểm nhưng cực kỳ cuốn hút nếu biết cách phối hợp.",
    content: "Nội dung chi tiết bài viết đang được cập nhật..."
  },
];

export const blogService = {
  getPosts: (): BlogPost[] => {
    if (typeof window === "undefined") return INITIAL_BLOG_POSTS;
    const stored = localStorage.getItem(BLOG_STORAGE_KEY);
    return stored ? JSON.parse(stored) : INITIAL_BLOG_POSTS;
  },

  savePosts: (posts: BlogPost[]) => {
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
  },

  addPost: (post: Omit<BlogPost, "id" | "date" | "views">) => {
    const posts = blogService.getPosts();
    const newPost: BlogPost = {
      ...post,
      id: `#BLOG-${String(posts.length + 1).padStart(3, '0')}`,
      date: new Date().toLocaleDateString('vi-VN'),
      views: 0
    };
    const updated = [newPost, ...posts];
    blogService.savePosts(updated);
    return newPost;
  },

  updatePost: (id: string, updates: Partial<BlogPost>) => {
    const posts = blogService.getPosts();
    const updated = posts.map(p => p.id === id ? { ...p, ...updates } : p);
    blogService.savePosts(updated);
  },

  deletePost: (id: string) => {
    const posts = blogService.getPosts();
    const filtered = posts.filter(p => p.id !== id);
    blogService.savePosts(filtered);
  }
};
