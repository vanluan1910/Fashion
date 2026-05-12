const express = require('express');
const router = express.Router();
const reviewsController = require('./controllers/reviews.controller');

router.get('/', reviewsController.getAll);
router.post('/', reviewsController.create);
router.patch('/:id/approve', reviewsController.approve);
router.patch('/:id/hide', reviewsController.hide);
router.delete('/:id', reviewsController.remove);

module.exports = router;
