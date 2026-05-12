const reviewsService = require('../services/reviews.service');

class ReviewsController {
  async getAll(req, res) {
    try {
      const result = await reviewsService.getReviews();
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async create(req, res) {
    try {
      const result = await reviewsService.createReview(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async approve(req, res) {
    try {
      const result = await reviewsService.approveReview(req.params.id);
      if (result.success) {
        res.json({ success: true, message: 'Review approved' });
      } else {
        res.status(404).json({ success: false, message: 'Review not found' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async hide(req, res) {
    try {
      const result = await reviewsService.hideReview(req.params.id);
      if (result.success) {
        res.json({ success: true, message: 'Review hidden' });
      } else {
        res.status(404).json({ success: false, message: 'Review not found' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async remove(req, res) {
    try {
      const result = await reviewsService.deleteReview(req.params.id);
      if (result.success) {
        res.json({ success: true, message: 'Review deleted' });
      } else {
        res.status(404).json({ success: false, message: 'Review not found' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new ReviewsController();
