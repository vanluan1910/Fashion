/**
 * Mapping for auth object (Single)
 */
exports.authDTO = (data) => ({
  id: data.account_id,
  name: data.full_name,
  email: data.email,
  role_id: data.role_id,
  created_at: data.created_at
});

/**
 * Mapping for list of auth
 */
exports.authListDTO = (items) => items.map(item => exports.authDTO(item));
