const EquipmentBooking = require("../models/EquipmentBooking");
const Equipment = require("../models/Equipment");

// Create a new equipment booking
exports.createEquipmentBooking = async (req, res) => {
  try {
    const { user, equipment, startDate, endDate, quantity } = req.body;
    // Optionally, check if equipment exists
    const equipmentExists = await Equipment.findById(equipment);
    if (!equipmentExists) {
      return res.status(404).json({ success: false, message: "Equipment not found" });
    }
    const booking = new EquipmentBooking({ user, equipment, startDate, endDate, quantity });
    await booking.save();
    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get bookings for a user
exports.getUserEquipmentBookings = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }
    const bookings = await EquipmentBooking.find({ user: userId }).populate("equipment");
    res.status(200).json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}; 