const mongoose = require("mongoose");

const EquipmentRentalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Equipment",
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
  quantity: {
    type: Number,
    required: true,
    default: 1
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

module.exports = mongoose.model("EquipmentRental", EquipmentRentalSchema); 