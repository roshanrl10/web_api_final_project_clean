const Equipment = require("../models/Equipment");
const EquipmentRental = require("../models/EquipmentRental");

// Get all equipment
const getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find().populate('createdBy', 'username email');
    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching equipment", error: error.message });
  }
};

// Get single equipment
const getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id).populate('createdBy', 'username email');
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }
    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching equipment", error: error.message });
  }
};

// Create equipment
const createEquipment = async (req, res) => {
  try {
    const equipmentData = {
      ...req.body,
      createdBy: req.user.id
    };
    const equipment = new Equipment(equipmentData);
    await equipment.save();
    res.status(201).json(equipment);
  } catch (error) {
    res.status(500).json({ message: "Error creating equipment", error: error.message });
  }
};

// Update equipment
const updateEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }
    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({ message: "Error updating equipment", error: error.message });
  }
};

// Delete equipment
const deleteEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndDelete(req.params.id);
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }
    res.status(200).json({ message: "Equipment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting equipment", error: error.message });
  }
};

// Get equipment rentals
const getEquipmentRentals = async (req, res) => {
  try {
    const rentals = await EquipmentRental.find()
      .populate('user', 'username email')
      .populate('equipment', 'name category brand price');
    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rentals", error: error.message });
  }
};

// Get user-specific equipment rentals
const getUserEquipmentRentals = async (req, res) => {
  try {
    const { userId } = req.query;
    const rentals = await EquipmentRental.find({ user: userId })
      .populate('user', 'username email')
      .populate('equipment', 'name category brand price');
    res.status(200).json({ rentals });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user rentals", error: error.message });
  }
};

// Create equipment rental
const createEquipmentRental = async (req, res) => {
  try {
    const rentalData = {
      ...req.body,
      user: req.body.user || req.user?.id
    };
    
    if (!rentalData.user) {
      return res.status(400).json({ message: "User ID is required" });
    }
    
    const rental = new EquipmentRental(rentalData);
    await rental.save();
    res.status(201).json(rental);
  } catch (error) {
    res.status(500).json({ message: "Error creating rental", error: error.message });
  }
};

// Update equipment rental status
const updateEquipmentRental = async (req, res) => {
  try {
    const rental = await EquipmentRental.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }
    res.status(200).json(rental);
  } catch (error) {
    res.status(500).json({ message: "Error updating rental", error: error.message });
  }
};

// Delete equipment rental
const deleteEquipmentRental = async (req, res) => {
  try {
    const rental = await EquipmentRental.findByIdAndDelete(req.params.id);
    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }
    res.status(200).json({ message: "Rental cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling rental", error: error.message });
  }
};

module.exports = {
  getAllEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  getEquipmentRentals,
  getUserEquipmentRentals,
  createEquipmentRental,
  updateEquipmentRental,
  deleteEquipmentRental
}; 