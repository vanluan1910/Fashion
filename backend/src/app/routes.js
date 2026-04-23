const express = require('express');
const router = express.Router();

// Import modules here
const productRoutes = require('../modules/products/products.routes');
const authRoutes = require('../modules/auth/auth.routes');
const blogRoutes = require('../modules/blogs/blogs.routes');
const ordersRoutes = require('../modules/orders/orders.routes');
const dashboardRoutes = require('../modules/dashboard/routes/dashboard.routes');

// Use modules here
router.use('/products', productRoutes);
router.use('/auth', authRoutes);
router.use('/blogs', blogRoutes);
router.use('/orders', ordersRoutes);
router.use('/dashboard', dashboardRoutes);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

module.exports = router;
