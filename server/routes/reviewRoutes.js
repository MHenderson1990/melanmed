const express = require('express');
const router = express.Router();
const { createReview, getDoctorReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/reviews - create a review (protected)
router.post('/', protect, createReview);

// GET /api/reviews/:doctorId - get reviews for a doctor (public)
router.get('/:doctorId', getDoctorReviews);

module.exports = router;