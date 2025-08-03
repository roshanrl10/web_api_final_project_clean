const express = require("express");
const router = express.Router();
const equipmentController = require("../controllers/equipmentController");
const authorizedUsers = require("../middlewares/authorizedUsers");

// Equipment routes
router.get("/", equipmentController.getAllEquipment);
router.post("/", authorizedUsers, equipmentController.createEquipment);

// Equipment rental routes
router.get("/rentals/all", equipmentController.getEquipmentRentals);
router.get("/rentals", equipmentController.getUserEquipmentRentals);
router.post("/rentals", equipmentController.createEquipmentRental);
router.put("/rentals/:id", equipmentController.updateEquipmentRental);
router.delete("/rentals/:id", equipmentController.deleteEquipmentRental);

// Equipment by ID routes (must come after /rentals routes)
router.get("/:id", equipmentController.getEquipmentById);
router.put("/:id", authorizedUsers, equipmentController.updateEquipment);
router.delete("/:id", authorizedUsers, equipmentController.deleteEquipment);

module.exports = router; 