export function getProductImages(product) {
  if (!product) return [];
  const images = [product.image, ...(product.images || [])].filter(Boolean);
  return [...new Set(images)];
}

export function formatImageUrl(url) {
  if (!url) return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300&auto=format&fit=crop";
  if (url.startsWith('http') || url.startsWith('/') || url.startsWith('data:')) {
    return url;
  }
  return `/${url}`;
}
