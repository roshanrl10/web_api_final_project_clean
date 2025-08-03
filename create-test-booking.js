const mongoose = require("mongoose");
const AgencyBooking = require("./models/AgencyBooking");
const Agency = require("./models/Agency");
const User = require("./models/User");

async function createTestAgencyBooking() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mydb");
    console.log("Connected to MongoDB");

    // Get the user (roshan)
    const user = await User.findOne({ username: "roshan" });
    if (!user) {
      console.log("User 'roshan' not found");
      process.exit(1);
    }

    // Get an agency
    const agency = await Agency.findOne();
    if (!agency) {
      console.log("No agencies found in database");
      process.exit(1);
    }

    // Create a test agency booking
    const testBooking = new AgencyBooking({
      user: user._id,
      agency: agency._id,
      startDate: new Date("2025-08-10"),
      endDate: new Date("2025-08-12"),
      groupSize: 4,
      dailyPrice: 50,
      totalPrice: 200,
      status: "confirmed"
    });

    await testBooking.save();
    console.log("Test agency booking created successfully!");
    console.log("Booking details:", {
      id: testBooking._id,
      user: user.username,
      agency: agency.name,
      status: testBooking.status,
      startDate: testBooking.startDate,
      endDate: testBooking.endDate
    });

    process.exit(0);
  } catch (error) {
    console.error("Error creating test booking:", error);
    process.exit(1);
  }
}

createTestAgencyBooking(); 