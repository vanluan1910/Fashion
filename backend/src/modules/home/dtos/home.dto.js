/**
 * Mapping for home object (Single)
 */
exports.homeDTO = (data) => ({
  id: data.id,
  // Thêm các trường cần thiết ở đây
  created_at: data.created_at
});

/**
 * Mapping for list of home
 */
exports.homeListDTO = (items) => items.map(item => exports.homeDTO(item));
