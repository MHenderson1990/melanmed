const express = require('express');
const router = express.Router();
const {
  getAllDoctors,
  getDoctorById,
  getDoctorsBySpecialty
} = require('../controllers/doctorController');
const { protect } = require('../middleware/authMiddleware');

// GET /api/doctors - get all doctors - PUBLIC
router.get('/', getAllDoctors);

// GET /api/doctors/:id - get one doctor - PUBLIC
router.get('/:id', getDoctorById);

// GET /api/doctors/specialty/:specialty - get by specialty - PUBLIC
router.get('/specialty/:specialty', getDoctorsBySpecialty);

module.exports = router;