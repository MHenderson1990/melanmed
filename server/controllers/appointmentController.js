const Appointment = require('../models/Appointment');

// CREATE appointment - POST /api/appointments
const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, reason } = req.body;

    const appointment = await Appointment.create({
      user: req.user._id,
      doctor: doctorId,
      date,
      time,
      reason
    });

    res.status(201).json(appointment);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET user appointments - GET /api/appointments/mine
const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id })
      .populate('doctor', 'name specialty location photo')
      .sort({ createdAt: -1 });

    res.json(appointments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CANCEL appointment - PUT /api/appointments/:id/cancel
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // make sure the appointment belongs to the logged in user
    if (appointment.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.json(appointment);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAppointment, getMyAppointments, cancelAppointment };