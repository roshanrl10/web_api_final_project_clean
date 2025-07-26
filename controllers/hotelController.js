const Hotel = require("../models/Hotel");

// Add a new hotel (admin only)
exports.addHotel = async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).json({ success: true, hotel });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all hotels (public)
exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json({ success: true, hotels });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}; 