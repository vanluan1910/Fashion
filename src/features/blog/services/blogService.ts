import { buildStorefrontApiUrl } from "@/shared/config/storefrontApi";

export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image: string;
  date: string;
  slug: string;
}

import { BLOG_POSTS as STATIC_POSTS } from "../constants/blog-data";

const BLOGS_URL = buildStorefrontApiUrl("/blogs");

export const getBlogsData = async (): Promise<Blog[]> => {
  try {
    const response = await fetch(BLOGS_URL);
    const result = await response.json();
    if (result.success && result.data.length > 0) {
      return result.data;
    }
    return STATIC_POSTS;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return STATIC_POSTS;
  }
};

export const getBlogById = async (id: string | number): Promise<Blog | null> => {
  try {
    const response = await fetch(`${BLOGS_URL}/${id}`);
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    // Fallback to static if ID matches
    return STATIC_POSTS.find(b => b.id === Number(id)) || null;
  } catch (error) {
    console.error('Error fetching blog detail:', error);
    return STATIC_POSTS.find(b => b.id === Number(id)) || null;
  }
};

export const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
  try {
    const blogs = await getBlogsData();
    const post = blogs.find(b => b.slug === slug);
    if (post) return post;
    
    // Final fallback to static constants directly
    return STATIC_POSTS.find(b => b.slug === slug) || null;
  } catch (error) {
    console.error('Error finding blog by slug:', error);
    return STATIC_POSTS.find(b => b.slug === slug) || null;
  }
};
