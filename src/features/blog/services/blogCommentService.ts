const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000/api";

export interface BlogComment {
  comment_id: number;
  post_id: number;
  user_name: string;
  content: string;
  created_at: string;
}

export interface CreateBlogCommentPayload {
  user_name: string;
  email?: string;
  content: string;
}

export const blogCommentService = {
  async getComments(postId: number | string): Promise<BlogComment[]> {
    const response = await fetch(`${API_BASE_URL}/blogs/${postId}/comments`, {
      cache: "no-store"
    });
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Khong the tai binh luan");
    }

    return Array.isArray(result.data) ? result.data : [];
  },

  async createComment(postId: number | string, payload: CreateBlogCommentPayload): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/blogs/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Khong the gui binh luan");
    }
  }
};
