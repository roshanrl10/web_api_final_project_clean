require("dotenv").config();
const connectDB = require("./config/db");
const Equipment = require("./models/Equipment");

const sampleEquipment = [
  {
    name: "Professional Hiking Boots",
    category: "Footwear",
    brand: "TrekPro",
    price: 25,
    rating: 4.5,
    quantity: 5,
    image: "https://images.unsplash.com/photo-1549298916-b41d114d2c36?w=400&h=300&fit=crop",
    description: "Waterproof hiking boots with excellent grip and ankle support for challenging terrains.",
    available: true,
    condition: "excellent",
    location: "Everest Base Camp"
  },
  {
    name: "Trekking Poles",
    category: "Safety",
    brand: "MountainGear",
    price: 15,
    rating: 4.2,
    quantity: 8,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Adjustable aluminum trekking poles for stability and balance on rough terrain.",
    available: true,
    condition: "good",
    location: "Annapurna Circuit"
  },
  {
    name: "Waterproof Backpack",
    category: "Storage",
    brand: "OutdoorMax",
    price: 20,
    rating: 4.7,
    quantity: 3,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    description: "30L waterproof backpack with multiple compartments and comfortable straps.",
    available: true,
    condition: "excellent",
    location: "Langtang Valley"
  },
  {
    name: "4-Season Tent",
    category: "Shelter",
    brand: "MountainHaven",
    price: 45,
    rating: 4.8,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    description: "Spacious 4-season tent with excellent weather protection and ventilation.",
    available: true,
    condition: "good",
    location: "Everest Base Camp"
  },
  {
    name: "Sleeping Bag",
    category: "Sleeping",
    brand: "ComfortZone",
    price: 20,
    rating: 4.3,
    quantity: 6,
    image: "https://images.unsplash.com/photo-1464822759844-d150ad6d1a0e?w=400&h=300&fit=crop",
    description: "Warm and comfortable sleeping bag suitable for cold mountain nights.",
    available: true,
    condition: "good",
    location: "Annapurna Circuit"
  }
];

const addSampleEquipment = async () => {
  try {
    await connectDB();
    
    // Clear existing equipment
    await Equipment.deleteMany({});
    
    // Add sample equipment
    const equipment = await Equipment.insertMany(sampleEquipment);
    
    console.log("Sample equipment added successfully:", equipment.length, "items");
    process.exit(0);
  } catch (error) {
    console.error("Error adding sample equipment:", error);
    process.exit(1);
  }
};

addSampleEquipment(); 