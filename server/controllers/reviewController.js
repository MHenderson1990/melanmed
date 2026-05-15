const Review = require('../models/Review');
const Doctor = require('../models/Doctor');

// CREATE review - POST /api/reviews
const createReview = async (req, res) => {
  try {
    const { doctorId, rating, comment } = req.body;

    // check if user already reviewed this doctor
    const alreadyReviewed = await Review.findOne({
      user: req.user._id,
      doctor: doctorId
    });

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You have already reviewed this doctor' });
    }

    // create the review
    const review = await Review.create({
      user: req.user._id,
      doctor: doctorId,
      rating,
      comment
    });

    // update doctor's average rating
    const reviews = await Review.find({ doctor: doctorId });
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    await Doctor.findByIdAndUpdate(doctorId, { rating: avgRating.toFixed(1) });

    res.status(201).json(review);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET reviews for a doctor - GET /api/reviews/:doctorId
const getDoctorReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ doctor: req.params.doctorId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json(reviews);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createReview, getDoctorReviews };