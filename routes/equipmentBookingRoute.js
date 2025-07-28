const express = require("express");
const router = express.Router();
const { createEquipmentBooking, getUserEquipmentBookings } = require("../controllers/equipmentBookingController");
const authorizedUsers = require("../middlewares/authorizedUsers");

// Create a new equipment booking (requires authentication)
router.post("/", authorizedUsers, createEquipmentBooking);

// Get bookings for a user (requires authentication)
router.get("/", authorizedUsers, getUserEquipmentBookings);

module.exports = router; 