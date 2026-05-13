const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  bio: {
    type: String,
    required: true
  },
  location: {
    city: { type: String, required: true },
    state: { type: String, default: 'TX' },
    area: { type: String }
  },
  contact: {
    phone: { type: String },
    website: { type: String },
    email: { type: String }
  },
  booking: {
    url: { type: String },
    platform: { type: String }
  },
  visitType: {
    inPerson: { type: Boolean, default: true },
    virtual: { type: Boolean, default: false }
  },
  ageGroups: {
    type: [String],
    default: ['Adults']
  },
  experience: {
    type: Number,
    default: 0
  },
  acceptingPatients: {
    type: Boolean,
    default: true
  },
  lgbtqFriendly: {
    type: Boolean,
    default: false
  },
  genderAffirming: {
    type: Boolean,
    default: false
  },
  insurance: {
    type: [String],
    default: []
  },
  languages: {
    type: [String],
    default: ['English']
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  isFictional: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);