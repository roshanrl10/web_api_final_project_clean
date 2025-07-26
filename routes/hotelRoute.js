const express = require("express");
const router = express.Router();
const { addHotel, getAllHotels } = require("../controllers/hotelController");

// Add a new hotel (admin only, add auth middleware later)
router.post("/", addHotel);

// Get all hotels (public)
router.get("/", getAllHotels);

module.exports = router; 