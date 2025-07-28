const Equipment = require("../models/Equipment");

// Add a new equipment (admin only)
exports.addEquipment = async (req, res) => {
  try {
    console.log("Adding equipment:", req.body);
    
    // Validate required fields
    const { name, category, price, brand } = req.body;
    if (!name || !category || !price || !brand) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields: name, category, price, brand" 
      });
    }

    const equipment = new Equipment(req.body);
    await equipment.save();
    
    console.log("Equipment saved successfully:", equipment);
    res.status(201).json({ success: true, equipment });
  } catch (err) {
    console.error("Error adding equipment:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all equipment (public)
exports.getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find();
    console.log(`Found ${equipment.length} equipment items`);
    res.status(200).json({ success: true, equipment });
  } catch (err) {
    console.error("Error getting equipment:", err);
    res.status(500).json({ success: false, message: err.message });
  }
}; 