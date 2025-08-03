const Agency = require("../models/Agency");
const AgencyBooking = require("../models/AgencyBooking");

// Get all agencies
const getAllAgencies = async (req, res) => {
  try {
    const agencies = await Agency.find().populate('createdBy', 'username email');
    res.status(200).json(agencies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching agencies", error: error.message });
  }
};

// Get single agency
const getAgencyById = async (req, res) => {
  try {
    const agency = await Agency.findById(req.params.id).populate('createdBy', 'username email');
    if (!agency) {
      return res.status(404).json({ message: "Agency not found" });
    }
    res.status(200).json(agency);
  } catch (error) {
    res.status(500).json({ message: "Error fetching agency", error: error.message });
  }
};

// Create agency
const createAgency = async (req, res) => {
  try {
    const agencyData = {
      ...req.body,
      createdBy: req.user.id
    };
    const agency = new Agency(agencyData);
    await agency.save();
    res.status(201).json(agency);
  } catch (error) {
    res.status(500).json({ message: "Error creating agency", error: error.message });
  }
};

// Update agency
const updateAgency = async (req, res) => {
  try {
    const agency = await Agency.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!agency) {
      return res.status(404).json({ message: "Agency not found" });
    }
    res.status(200).json(agency);
  } catch (error) {
    res.status(500).json({ message: "Error updating agency", error: error.message });
  }
};

// Delete agency
const deleteAgency = async (req, res) => {
  try {
    const agency = await Agency.findByIdAndDelete(req.params.id);
    if (!agency) {
      return res.status(404).json({ message: "Agency not found" });
    }
    res.status(200).json({ message: "Agency deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting agency", error: error.message });
  }
};

// Get agency bookings
const getAgencyBookings = async (req, res) => {
  try {
    const bookings = await AgencyBooking.find()
      .populate('user', 'username email')
      .populate('agency', 'name location pricePerDay');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
};

// Get user-specific agency bookings
const getUserAgencyBookings = async (req, res) => {
  try {
    const { userId } = req.query;
    const bookings = await AgencyBooking.find({ user: userId })
      .populate('user', 'username email')
      .populate('agency', 'name location pricePerDay');
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user bookings", error: error.message });
  }
};

// Create agency booking
const createAgencyBooking = async (req, res) => {
  try {
    const bookingData = {
      ...req.body,
      user: req.body.user || req.user?.id
    };
    
    if (!bookingData.user) {
      return res.status(400).json({ message: "User ID is required" });
    }
    
    const booking = new AgencyBooking(bookingData);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error: error.message });
  }
};

// Update agency booking status
const updateAgencyBooking = async (req, res) => {
  try {
    const booking = await AgencyBooking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error updating booking", error: error.message });
  }
};

// Delete agency booking
const deleteAgencyBooking = async (req, res) => {
  try {
    const booking = await AgencyBooking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling booking", error: error.message });
  }
};

module.exports = {
  getAllAgencies,
  getAgencyById,
  createAgency,
  updateAgency,
  deleteAgency,
  getAgencyBookings,
  getUserAgencyBookings,
  createAgencyBooking,
  updateAgencyBooking,
  deleteAgencyBooking
}; 