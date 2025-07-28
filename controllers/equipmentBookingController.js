const EquipmentBooking = require("../models/EquipmentBooking");
const Equipment = require("../models/Equipment");

// Create a new equipment booking
exports.createEquipmentBooking = async (req, res) => {
  try {
    const { equipment, startDate, endDate, quantity } = req.body;
    const userId = req.user._id; // Get user ID from authenticated token
    
    // Check if equipment exists
    const equipmentExists = await Equipment.findById(equipment);
    if (!equipmentExists) {
      return res.status(404).json({ success: false, message: "Equipment not found" });
    }
    
    // Check if equipment is available
    if (!equipmentExists.available) {
      return res.status(400).json({ success: false, message: "Equipment is not available" });
    }
    
    const booking = new EquipmentBooking({ 
      user: userId, 
      equipment, 
      startDate, 
      endDate, 
      quantity 
    });
    await booking.save();
    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get bookings for a user
exports.getUserEquipmentBookings = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from authenticated token
    const bookings = await EquipmentBooking.find({ user: userId }).populate("equipment");
    res.status(200).json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}; 