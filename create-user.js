const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");

async function createRegularUser() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mydb");
    console.log("Connected to MongoDB");

    // Check if user already exists
    const existingUser = await User.findOne({ email: "user@test.com" });
    if (existingUser) {
      console.log("Regular user already exists:", existingUser.email);
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("user123", 10);

    // Create regular user
    const regularUser = new User({
      username: "user",
      email: "user@test.com",
      firstName: "Regular",
      lastName: "User",
      password: hashedPassword,
      role: "normal"
    });

    await regularUser.save();
    console.log("Regular user created successfully!");
    console.log("Email: user@test.com");
    console.log("Password: user123");
    console.log("Role: normal");

    process.exit(0);
  } catch (error) {
    console.error("Error creating regular user:", error);
    process.exit(1);
  }
}

createRegularUser(); 