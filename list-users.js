const mongoose = require("mongoose");
const User = require("./models/User");

async function listUsers() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mydb");
    console.log("Connected to MongoDB");

    // Find all users
    const users = await User.find({});
    
    console.log(`📋 Found ${users.length} users:`);
    
    users.forEach((user, index) => {
      console.log(`\n👤 User ${index + 1}:`);
      console.log("ID:", user._id);
      console.log("Username:", user.username);
      console.log("Email:", user.email);
      console.log("Role:", user.role);
      console.log("Created:", user.createdAt);
    });

    if (users.length === 0) {
      console.log("❌ No users found in database");
    }

    process.exit(0);
  } catch (error) {
    console.error("Error listing users:", error);
    process.exit(1);
  }
}

listUsers(); 