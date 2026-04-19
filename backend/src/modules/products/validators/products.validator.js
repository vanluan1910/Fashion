/**
 * Validation middleware for products
 */
exports.validateCreate = (req, res, next) => {
  // TODO: Implement validation logic (e.g., using Joi or manual checks)
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, message: "Name is required" });
  }
  next();
};
