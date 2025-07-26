const Equipment = require("../models/Equipment");

// Add a new equipment (admin only)
exports.addEquipment = async (req, res) => {
  try {
    const equipment = new Equipment(req.body);
    await equipment.save();
    res.status(201).json({ success: true, equipment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all equipment (public)
exports.getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find();
    res.status(200).json({ success: true, equipment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}; 