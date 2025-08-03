const mongoose = require("mongoose");

const AgencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  pricePerDay: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  image: {
    type: String
  },
  languages: [{
    type: String
  }],
  specialties: [{
    type: String
  }],
  description: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  experience: {
    type: Number,
    required: true
  },
  groupSize: {
    type: String,
    required: true
  },
  contactInfo: {
    phone: String,
    email: String,
    website: String
  },
  certifications: [{
    type: String
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Agency', AgencySchema); 