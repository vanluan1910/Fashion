import { useState, useEffect, useMemo } from "react";
import { BlogPost } from "../types";
import { blogService } from "../services/blogService";

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Tất cả danh mục");

  const fetchPosts = async () => {
    const data = await blogService.getPosts();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = async (post: Omit<BlogPost, "id" | "date" | "views">) => {
    await blogService.addPost(post);
    await fetchPosts();
  };

  const updatePost = async (id: string, updates: Partial<BlogPost>) => {
    await blogService.updatePost(id, updates);
    await fetchPosts();
  };

  const toggleStatus = async (id: string) => {
    const post = posts.find(p => p.id === id);
    if (post) {
      const newStatus = post.status === "Đã xuất bản" ? "Bản nháp" : "Đã xuất bản";
      await updatePost(id, { status: newStatus });
    }
  };

  const deletePost = async (id: string) => {
    await blogService.deletePost(id);
    await fetchPosts();
  };

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "Tất cả danh mục" || post.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, categoryFilter]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(posts.map(p => p.category)));
    return ["Tất cả danh mục", ...unique];
  }, [posts]);

  return {
    posts: filteredPosts,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    categories,
    addPost,
    updatePost,
    toggleStatus,
    deletePost,
    stats: {
      total: posts.length,
      published: posts.filter(p => p.status === "Đã xuất bản").length,
      drafts: posts.filter(p => p.status === "Bản nháp").length
    }
  };
};
