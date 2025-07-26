const express = require("express");
const router = express.Router();
const { addEquipment, getAllEquipment } = require("../controllers/equipmentController");
const isAdmin = require("../middlewares/isAdmin");

// Add a new equipment (admin only)
router.post("/", isAdmin, addEquipment);

// Get all equipment (public)
router.get("/", getAllEquipment);

module.exports = router; 