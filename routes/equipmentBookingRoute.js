const express = require("express");
const router = express.Router();
const { createEquipmentBooking, getUserEquipmentBookings } = require("../controllers/equipmentBookingController");

// Create a new equipment booking
router.post("/", createEquipmentBooking);

// Get bookings for a user
router.get("/", getUserEquipmentBookings);

module.exports = router; 