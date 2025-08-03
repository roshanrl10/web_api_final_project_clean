const express = require("express");
const router = express.Router();
const agencyController = require("../controllers/agencyController");
const authorizedUsers = require("../middlewares/authorizedUsers");

// Agency routes
router.get("/", agencyController.getAllAgencies);
router.post("/", authorizedUsers, agencyController.createAgency);

// Agency booking routes
router.get("/bookings/all", agencyController.getAgencyBookings);
router.get("/bookings", agencyController.getUserAgencyBookings);
router.post("/bookings", agencyController.createAgencyBooking);
router.put("/bookings/:id", agencyController.updateAgencyBooking);
router.delete("/bookings/:id", agencyController.deleteAgencyBooking);

// Agency by ID routes (must come after /bookings routes)
router.get("/:id", agencyController.getAgencyById);
router.put("/:id", authorizedUsers, agencyController.updateAgency);
router.delete("/:id", authorizedUsers, agencyController.deleteAgency);

module.exports = router; 