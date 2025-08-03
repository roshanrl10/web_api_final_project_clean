const express = require("express");
const router = express.Router();
const { createBooking, getUserBookings, getAllBookings, deleteBooking } = require("../controllers/bookingController");

// Create a new booking
router.post("/", createBooking);

// Get bookings for a user
router.get("/", getUserBookings);

// Get all bookings (admin endpoint)
router.get("/admin/all", getAllBookings);

// Delete a booking
router.delete("/:id", deleteBooking);

module.exports = router; 