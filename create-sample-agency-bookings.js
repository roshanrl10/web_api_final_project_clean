const mongoose = require('mongoose');
const AgencyBooking = require('./models/AgencyBooking');
const Agency = require('./models/Agency');
const User = require('./models/User');

const MONGODB_URI = 'mongodb://localhost:27017/mydb';

async function createSampleAgencyBookings() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get existing user and agencies
    const user = await User.findOne({});
    const agencies = await Agency.find({});

    if (!user) {
      console.log('❌ No user found. Please create a user first.');
      return;
    }

    if (agencies.length === 0) {
      console.log('❌ No agencies found. Please add agencies first.');
      return;
    }

    console.log(`👤 Using user: ${user.username} (${user._id})`);
    console.log(`🏢 Found ${agencies.length} agencies`);

    // Clear existing agency bookings
    await AgencyBooking.deleteMany({});
    console.log('🗑️ Cleared existing agency bookings');

    // Create sample agency bookings
    const sampleBookings = [
      {
        user: user._id,
        agency: agencies[0]._id,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-01-18'),
        groupSize: 4,
        dailyPrice: 200.00,
        totalPrice: 800.00,
        status: 'confirmed',
        specialRequests: 'Experienced guide preferred',
      },
      {
        user: user._id,
        agency: agencies[1] ? agencies[1]._id : agencies[0]._id,
        startDate: new Date('2024-02-20'),
        endDate: new Date('2024-02-25'),
        groupSize: 2,
        dailyPrice: 120.00,
        totalPrice: 600.00,
        status: 'confirmed',
        specialRequests: 'Mountain trekking experience needed',
      },
      {
        user: user._id,
        agency: agencies[2] ? agencies[2]._id : agencies[0]._id,
        startDate: new Date('2024-03-10'),
        endDate: new Date('2024-03-12'),
        groupSize: 6,
        dailyPrice: 200.00,
        totalPrice: 1200.00,
        status: 'confirmed',
        specialRequests: 'Family-friendly guide required',
      },
    ];

    console.log('📝 Creating sample agency bookings...');
    const createdBookings = await AgencyBooking.insertMany(sampleBookings);
    
    console.log(`✅ Created ${createdBookings.length} sample agency bookings:`);
    createdBookings.forEach((booking, index) => {
      console.log(`  ${index + 1}. ${booking._id} - ${booking.status} - $${booking.totalPrice}`);
    });

    console.log('🎉 Sample agency bookings created successfully!');
    console.log('📱 You can now test the agency bookings in your Flutter app.');

  } catch (error) {
    console.error('❌ Error creating sample agency bookings:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

createSampleAgencyBookings(); 