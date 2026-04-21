import { BlogPost } from "../types";

const API_URL = "http://localhost:5000/api/blogs";

export const blogService = {
  getPosts: async (): Promise<BlogPost[]> => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      if (result.success) {
        return result.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching admin blogs:", error);
      return [];
    }
  },

  addPost: async (post: Omit<BlogPost, "id" | "date" | "views">) => {
    try {
      // Map Omit images field 'image' to backend 'image_url' if needed
      const backendData = {
        title: post.title,
        excerpt: post.summary,
        content: post.content,
        author: post.author,
        category: post.category,
        image_url: post.image
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(backendData)
      });
      return await response.json();
    } catch (error) {
      console.error("Error adding admin blog:", error);
      throw error;
    }
  },

  updatePost: async (id: string | number, updates: Partial<BlogPost>) => {
    // Note: Backend might need a PUT/PATCH route for update (not implemented yet in Clean API)
    // For now we focused on FETCH and ADD.
    console.log("Update not yet implemented on backend", id, updates);
  },

  deletePost: async (id: string | number) => {
     // Note: Backend might need a DELETE route (not implemented yet)
     console.log("Delete not yet implemented on backend", id);
  }
};
