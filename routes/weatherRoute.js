const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weatherController");

// Weather routes
router.get("/current", weatherController.getWeatherData);
router.get("/forecast", weatherController.getWeatherForecast);
router.get("/mock", weatherController.getMockWeatherData);

module.exports = router; 