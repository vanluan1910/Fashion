import { Product } from "../types";

const API_URL = "http://localhost:5000/api/products";

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return [];
    }
  },

  getProductById: async (id: number | string): Promise<Product | null> => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      const result = await response.json();
      return result.data || null;
    } catch (error) {
      console.error("Failed to fetch product:", error);
      return null;
    }
  },

  addProduct: async (product: Omit<Product, "id">): Promise<any> => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const result = await response.json();
      return result.success ? result.data : null;
    } catch (error) {
      console.error("Failed to add product:", error);
      return null;
    }
  },

  updateProduct: async (id: number | string, product: Partial<Product>): Promise<any> => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const result = await response.json();
      return result.success ? result.data : null;
    } catch (error) {
      console.error("Failed to update product:", error);
      return null;
    }
  },

  deleteProduct: async (id: number | string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error("Failed to delete product:", error);
      return false;
    }
  },
};
