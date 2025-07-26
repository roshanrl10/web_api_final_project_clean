const mongoose = require("mongoose");

const EquipmentBookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  equipment: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, default: "confirmed" }
}, { timestamps: true });

module.exports = mongoose.model("EquipmentBooking", EquipmentBookingSchema); 