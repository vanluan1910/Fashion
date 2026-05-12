/**
 * API Configuration for the Admin Dashboard
 */

export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const UPLOAD_API_URL = `${BASE_API_URL}/upload`;

export const API_ENDPOINTS = {
  PRODUCTS: `${BASE_API_URL}/products`,
  AUTH: `${BASE_API_URL}/auth`,
  PROFILE: `${BASE_API_URL}/auth/profile`,
  ORDERS: `${BASE_API_URL}/orders`,
  REVIEWS: `${BASE_API_URL}/reviews`,
  NOTIFICATIONS: `${BASE_API_URL}/notifications`,
  DASHBOARD: `${BASE_API_URL}/dashboard/stats`,
};
