require("dotenv").config();
const connectDB = require("./config/db");
const Agency = require("./models/Agency");

const sampleAgencies = [
  {
    name: "Himalayan Adventure Guides",
    location: "Everest Base Camp",
    pricePerDay: 150,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1464822759844-d150ad6d1a0e?auto=format&fit=crop&w=400&h=300",
    languages: ["English", "Nepali", "Hindi"],
    specialties: ["High Altitude Trekking", "Mountaineering", "Cultural Tours"],
    description: "Expert guides with over 15 years of experience in Himalayan expeditions. Certified by Nepal Mountaineering Association.",
    available: true,
    experience: 15,
    groupSize: "1-12 people",
    contactInfo: {
      phone: "+977-1-4444444",
      email: "info@himalayanadventure.com",
      website: "www.himalayanadventure.com"
    },
    certifications: ["Nepal Mountaineering Association", "UIAA Guide", "First Aid Certified"]
  },
  {
    name: "Sherpa Expedition Services",
    location: "Annapurna",
    pricePerDay: 120,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&h=300",
    languages: ["English", "Nepali"],
    specialties: ["Trekking", "Photography Tours", "Wildlife Viewing"],
    description: "Local Sherpa guides offering authentic mountain experiences with focus on safety and cultural immersion.",
    available: true,
    experience: 12,
    groupSize: "1-8 people",
    contactInfo: {
      phone: "+977-1-5555555",
      email: "info@sherpaexpedition.com",
      website: "www.sherpaexpedition.com"
    },
    certifications: ["Sherpa Guide License", "Wildlife Guide", "Cultural Guide"]
  },
  {
    name: "Peak Adventure Company",
    location: "Langtang Valley",
    pricePerDay: 100,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=400&h=300",
    languages: ["English", "Nepali", "German"],
    specialties: ["Eco-Tourism", "Family Trekking", "Photography"],
    description: "Eco-friendly trekking agency specializing in sustainable tourism and family-friendly adventures.",
    available: true,
    experience: 8,
    groupSize: "1-15 people",
    contactInfo: {
      phone: "+977-1-6666666",
      email: "info@peakadventure.com",
      website: "www.peakadventure.com"
    },
    certifications: ["Eco-Tourism Certified", "Family Guide", "Photography Guide"]
  },
  {
    name: "Alpine Masters Guides",
    location: "Everest Base Camp",
    pricePerDay: 200,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&w=400&h=300",
    languages: ["English", "French", "German", "Nepali"],
    specialties: ["Technical Climbing", "High Altitude Training", "Rescue Operations"],
    description: "Elite mountain guides certified in technical climbing and high-altitude rescue operations.",
    available: true,
    experience: 20,
    groupSize: "1-6 people",
    contactInfo: {
      phone: "+977-1-7777777",
      email: "info@alpinemasters.com",
      website: "www.alpinemasters.com"
    },
    certifications: ["UIAA Guide", "Rescue Certified", "Technical Climbing Guide"]
  }
];

const addSampleAgencies = async () => {
  try {
    await connectDB();
    
    // Clear existing agencies
    await Agency.deleteMany({});
    
    // Add sample agencies
    const agencies = await Agency.insertMany(sampleAgencies);
    
    console.log("Sample agencies added successfully:", agencies.length, "items");
    process.exit(0);
  } catch (error) {
    console.error("Error adding sample agencies:", error);
    process.exit(1);
  }
};

addSampleAgencies(); 