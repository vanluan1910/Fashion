/**
 * Mapping for products object (Single)
 */
exports.productsDTO = (data) => ({
  id: data.id,
  // Thêm các trường cần thiết ở đây
  created_at: data.created_at
});

/**
 * Mapping for list of products
 */
exports.productsListDTO = (items) => items.map(item => exports.productsDTO(item));
