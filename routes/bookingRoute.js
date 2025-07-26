const express = require("express");
const router = express.Router();
const { createBooking, getUserBookings } = require("../controllers/bookingController");

// Create a new booking
router.post("/", createBooking);

// Get bookings for a user
router.get("/", getUserBookings);

module.exports = router; 