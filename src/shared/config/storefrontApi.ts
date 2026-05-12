const DEFAULT_STOREFRONT_API_BASE_URL = "http://127.0.0.1:5000/api";

const normalizeBaseUrl = (value: string) => value.replace(/\/+$/, "");
const normalizePath = (value: string) => (value.startsWith("/") ? value : `/${value}`);

export const STOREFRONT_API_BASE_URL = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_API_URL || DEFAULT_STOREFRONT_API_BASE_URL
);

export const buildStorefrontApiUrl = (path: string) =>
  `${STOREFRONT_API_BASE_URL}${normalizePath(path)}`;
