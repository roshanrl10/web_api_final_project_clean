const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { user, hotel, checkIn, checkOut, guests } = req.body;
    // Optionally, check if hotel exists
    const hotelExists = await Hotel.findById(hotel);
    if (!hotelExists) {
      return res.status(404).json({ success: false, message: "Hotel not found" });
    }
    const booking = new Booking({ user, hotel, checkIn, checkOut, guests });
    await booking.save();
    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get bookings for a user
exports.getUserBookings = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }
    const bookings = await Booking.find({ user: userId }).populate("hotel");
    res.status(200).json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}; 