const express = require('express');
const router = express.Router();
const ordersController = require('./controllers/orders.controller');

router.get('/', ordersController.getAll);
router.post('/', ordersController.create);
router.get('/account/:accountId', ordersController.getByAccount);
router.get('/:id', ordersController.getById);
router.patch('/:id/status', ordersController.updateStatus);

module.exports = router;
