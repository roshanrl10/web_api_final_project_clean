const mongoose = require('mongoose');
const EquipmentRental = require('./models/EquipmentRental');
const Equipment = require('./models/Equipment');
const User = require('./models/User');

const MONGODB_URI = 'mongodb://localhost:27017/mydb';

async function createSampleEquipmentRentals() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get existing user and equipment
    const user = await User.findOne({});
    const equipments = await Equipment.find({});

    if (!user) {
      console.log('❌ No user found. Please create a user first.');
      return;
    }

    if (equipments.length === 0) {
      console.log('❌ No equipment found. Please add equipment first.');
      return;
    }

    console.log(`👤 Using user: ${user.username} (${user._id})`);
    console.log(`🔧 Found ${equipments.length} equipment`);

    // Clear existing rentals
    await EquipmentRental.deleteMany({});
    console.log('🗑️ Cleared existing equipment rentals');

    // Create sample equipment rentals
    const sampleRentals = [
      {
        user: user._id,
        equipment: equipments[0]._id,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-01-18'),
        quantity: 1,
        totalPrice: 150.00,
        status: 'confirmed',
        specialRequests: 'High quality equipment preferred',
      },
      {
        user: user._id,
        equipment: equipments[1] ? equipments[1]._id : equipments[0]._id,
        startDate: new Date('2024-02-20'),
        endDate: new Date('2024-02-25'),
        quantity: 2,
        totalPrice: 300.00,
        status: 'confirmed',
        specialRequests: 'Waterproof equipment needed',
      },
      {
        user: user._id,
        equipment: equipments[2] ? equipments[2]._id : equipments[0]._id,
        startDate: new Date('2024-03-10'),
        endDate: new Date('2024-03-12'),
        quantity: 1,
        totalPrice: 100.00,
        status: 'confirmed',
        specialRequests: 'Lightweight equipment preferred',
      },
    ];

    console.log('📝 Creating sample equipment rentals...');
    const createdRentals = await EquipmentRental.insertMany(sampleRentals);
    
    console.log(`✅ Created ${createdRentals.length} sample equipment rentals:`);
    createdRentals.forEach((rental, index) => {
      console.log(`  ${index + 1}. ${rental._id} - ${rental.status} - $${rental.totalPrice}`);
    });

    console.log('🎉 Sample equipment rentals created successfully!');
    console.log('📱 You can now test the equipment rentals in your Flutter app.');

  } catch (error) {
    console.error('❌ Error creating sample equipment rentals:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

createSampleEquipmentRentals(); 