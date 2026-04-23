exports.productsDTO = (data) => {
  const price = parseFloat(data.base_price);
  // Nếu DB có old_price thì dùng, không thì không giả lập
  const oldPrice = data.old_price ? parseFloat(data.old_price) : null;
  const hasSale = oldPrice && oldPrice > price;

  return {
    id: data.product_id,
    name: data.product_name,
    price,
    oldPrice: oldPrice || null,
    image: data.primary_image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300&auto=format&fit=crop",
    images: data.images || [],
    description: data.description,
    category: data.category_name || "Uncategorized",
    subCategory: data.sub_category || "",
    status: data.status || (data.total_stock > 0 ? "Còn hàng" : "Hết hàng"),
    colors: data.colors || [],
    sizes: data.sizes || [],
    sku: data.sku || `ATL-${data.product_id}`,
    isNew: !hasSale,
    discount: hasSale,
    label: hasSale ? "sale" : "new"
  };
};

exports.productsListDTO = (items) => items.map(item => exports.productsDTO(item));
