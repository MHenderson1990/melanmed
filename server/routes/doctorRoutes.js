const express = require('express');
const router = express.Router();
const {
  getAllDoctors,
  getDoctorById,
  getDoctorsBySpecialty
} = require('../controllers/doctorController');

// GET /api/doctors - get all doctors
router.get('/', getAllDoctors);

// GET /api/doctors/:id - get one doctor
router.get('/:id', getDoctorById);

// GET /api/doctors/specialty/:specialty - get by specialty
router.get('/specialty/:specialty', getDoctorsBySpecialty);

module.exports = router;