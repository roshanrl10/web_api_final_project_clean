const mongoose = require("mongoose");
const Equipment = require("./models/Equipment");

// Sample equipment data
const sampleEquipment = [
  {
    name: "Professional Hiking Boots",
    category: "Footwear",
    brand: "TrekPro",
    price: 25,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1549298916-b41d114d2c36?w=400&h=300&fit=crop",
    description: "Waterproof hiking boots with excellent grip and ankle support for challenging terrains.",
    available: true,
    specifications: ["Waterproof", "Ankle support", "Vibram sole", "Size: 7-12"]
  },
  {
    name: "Trekking Poles",
    category: "Safety",
    brand: "MountainGear",
    price: 15,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Adjustable aluminum trekking poles for stability and balance on rough terrain.",
    available: true,
    specifications: ["Adjustable length", "Aluminum construction", "Rubber tips", "Weight: 250g each"]
  },
  {
    name: "Waterproof Backpack",
    category: "Storage",
    brand: "OutdoorMax",
    price: 20,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    description: "30L waterproof backpack with multiple compartments and comfortable straps.",
    available: true,
    specifications: ["30L capacity", "Waterproof", "Multiple compartments", "Padded straps"]
  },
  {
    name: "Sleeping Bag",
    category: "Camping",
    brand: "ComfortSleep",
    price: 18,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop",
    description: "Lightweight sleeping bag rated for temperatures down to 0°C.",
    available: true,
    specifications: ["0°C rating", "Lightweight", "Compact", "Water-resistant"]
  },
  {
    name: "Headlamp",
    category: "Safety",
    brand: "LightPro",
    price: 12,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    description: "Bright LED headlamp with adjustable beam and long battery life.",
    available: true,
    specifications: ["200 lumens", "Adjustable beam", "3 AAA batteries", "Water-resistant"]
  },
  {
    name: "Climbing Harness",
    category: "Climbing",
    brand: "SafeClimb",
    price: 35,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Professional climbing harness with safety certifications for rock climbing.",
    available: true,
    specifications: ["CE certified", "Adjustable", "Multiple gear loops", "Weight: 450g"]
  }
];

// Connect to database and add sample data
async function addSampleData() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mydb");
    console.log("Connected to MongoDB");

    // Clear existing equipment
    await Equipment.deleteMany({});
    console.log("Cleared existing equipment");

    // Add sample equipment
    const result = await Equipment.insertMany(sampleEquipment);
    console.log(`Added ${result.length} equipment items`);

    console.log("Sample data added successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error adding sample data:", error);
    process.exit(1);
  }
}

// Run the script
addSampleData(); 