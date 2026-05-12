import { buildStorefrontApiUrl } from "../../../shared/config/storefrontApi.ts";
import type { Product } from "../types/product";

const API_URL = buildStorefrontApiUrl("/products");

export async function getproductsData(): Promise<Product[]> {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Failed to fetch products for storefront:", error);
    return [];
  }
}

export async function getProductById(id: number | string): Promise<Product | null> {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error("Failed to fetch product details:", error);
    return null;
  }
}
