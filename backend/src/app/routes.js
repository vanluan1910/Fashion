const express = require('express');
const router = express.Router();

// Import modules here
const productRoutes = require('../modules/products/products.routes');

// Use modules here
router.use('/products', productRoutes);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

module.exports = router;
