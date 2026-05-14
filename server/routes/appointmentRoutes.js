const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getMyAppointments,
  cancelAppointment
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

// all appointment routes are protected
// user must be logged in to access them

// POST /api/appointments - book an appointment
router.post('/', protect, createAppointment);

// GET /api/appointments/mine - get my appointments
router.get('/mine', protect, getMyAppointments);

// PUT /api/appointments/:id/cancel - cancel an appointment
router.put('/:id/cancel', protect, cancelAppointment);

module.exports = router;