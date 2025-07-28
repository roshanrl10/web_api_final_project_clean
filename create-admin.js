const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");

async function createAdminUser() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mydb");
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@test.com" });
    if (existingAdmin) {
      console.log("Admin user already exists:", existingAdmin.email);
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create admin user
    const adminUser = new User({
      username: "admin",
      email: "admin@test.com",
      firstName: "Admin",
      lastName: "User",
      password: hashedPassword,
      role: "admin"
    });

    await adminUser.save();
    console.log("Admin user created successfully!");
    console.log("Email: admin@test.com");
    console.log("Password: admin123");
    console.log("Role: admin");

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
}

createAdminUser(); 