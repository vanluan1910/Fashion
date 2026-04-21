exports.productsDTO = (data) => ({
  id: data.product_id,
  name: data.product_name,
  price: parseFloat(data.base_price),
  oldPrice: data.base_price * 1.2, // Giả lập giá cũ cho đẹp UI
  image: data.primary_image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300&auto=format&fit=crop",
  images: data.images || [],
  description: data.description,
  category: data.category_name || "Uncategorized",
  status: data.total_stock > 0 ? "Còn hàng" : "Hết hàng",
  colors: data.colors || [],
  sizes: data.sizes || [],
  sku: data.sku || `ATL-${data.product_id}`,
  isNew: true, // Mặc định là mới
  label: "new"
});

exports.productsListDTO = (items) => items.map(item => exports.productsDTO(item));
