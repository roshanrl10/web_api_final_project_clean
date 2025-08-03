const mongoose = require("mongoose");

const AgencyBookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  agency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agency",
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  groupSize: {
    type: Number,
    required: true
  },
  dailyPrice: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "active", "completed", "cancelled"],
    default: "pending"
  },
  specialRequests: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model("AgencyBooking", AgencyBookingSchema); 