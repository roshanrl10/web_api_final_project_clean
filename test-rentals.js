const mongoose = require("mongoose");
const EquipmentRental = require("./models/EquipmentRental");
const AgencyBooking = require("./models/AgencyBooking");
const User = require("./models/User");
const Equipment = require("./models/Equipment");
const Agency = require("./models/Agency");

async function checkRentalsAndBookings() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mydb");
    console.log("Connected to MongoDB");

    // Check equipment rentals
    const rentals = await EquipmentRental.find().populate('user').populate('equipment');
    console.log("\n=== Equipment Rentals ===");
    console.log(`Total rentals: ${rentals.length}`);
    rentals.forEach((rental, index) => {
      console.log(`\nRental ${index + 1}:`);
      console.log(`  ID: ${rental._id}`);
      console.log(`  User ID: ${rental.user}`);
      console.log(`  User: ${rental.user ? rental.user.username : 'No user'}`);
      console.log(`  Equipment: ${rental.equipment ? rental.equipment.name : 'No equipment'}`);
      console.log(`  Status: ${rental.status}`);
      console.log(`  Start Date: ${rental.startDate}`);
      console.log(`  End Date: ${rental.endDate}`);
    });

    // Check agency bookings
    const bookings = await AgencyBooking.find().populate('user').populate('agency');
    console.log("\n=== Agency Bookings ===");
    console.log(`Total bookings: ${bookings.length}`);
    bookings.forEach((booking, index) => {
      console.log(`\nBooking ${index + 1}:`);
      console.log(`  ID: ${booking._id}`);
      console.log(`  User: ${booking.user ? booking.user.username : 'No user'}`);
      console.log(`  Agency: ${booking.agency ? booking.agency.name : 'No agency'}`);
      console.log(`  Status: ${booking.status}`);
      console.log(`  Start Date: ${booking.startDate}`);
      console.log(`  End Date: ${booking.endDate}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Error checking rentals and bookings:", error);
    process.exit(1);
  }
}

checkRentalsAndBookings(); 