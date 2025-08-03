const mongoose = require("mongoose");
const User = require("./models/User");

async function getUserId() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mydb");
    console.log("Connected to MongoDB");

    // Find any existing user
    const user = await User.findOne({});
    
    if (user) {
      console.log("✅ Found user:");
      console.log("ID:", user._id);
      console.log("Email:", user.email);
      console.log("Username:", user.username);
      console.log("Role:", user.role);
    } else {
      console.log("❌ No users found in database");
    }

    process.exit(0);
  } catch (error) {
    console.error("Error getting user:", error);
    process.exit(1);
  }
}

getUserId(); 