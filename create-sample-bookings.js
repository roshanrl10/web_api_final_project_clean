const mongoose = require('mongoose');
const Booking = require('./models/Booking');
const Hotel = require('./models/Hotel');
const User = require('./models/User');

const MONGODB_URI = 'mongodb://localhost:27017/mydb';

async function createSampleBookings() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get existing user and hotels
    const user = await User.findOne({});
    const hotels = await Hotel.find({});

    if (!user) {
      console.log('❌ No user found. Please create a user first.');
      return;
    }

    if (hotels.length === 0) {
      console.log('❌ No hotels found. Please add hotels first.');
      return;
    }

    console.log(`👤 Using user: ${user.username} (${user._id})`);
    console.log(`🏨 Found ${hotels.length} hotels`);

    // Clear existing bookings
    await Booking.deleteMany({});
    console.log('🗑️ Cleared existing bookings');

    // Create sample bookings
    const sampleBookings = [
      {
        user: user._id,
        hotel: hotels[0]._id,
        checkIn: new Date('2024-01-15'),
        checkOut: new Date('2024-01-18'),
        guests: 2,
        totalPrice: 450.00,
        status: 'confirmed',
        specialRequests: 'Early check-in preferred',
      },
      {
        user: user._id,
        hotel: hotels[1] ? hotels[1]._id : hotels[0]._id,
        checkIn: new Date('2024-02-20'),
        checkOut: new Date('2024-02-25'),
        guests: 1,
        totalPrice: 600.00,
        status: 'confirmed',
        specialRequests: 'Mountain view room',
      },
      {
        user: user._id,
        hotel: hotels[2] ? hotels[2]._id : hotels[0]._id,
        checkIn: new Date('2024-03-10'),
        checkOut: new Date('2024-03-12'),
        guests: 3,
        totalPrice: 300.00,
        status: 'confirmed',
        specialRequests: 'Family room needed',
      },
    ];

    console.log('📝 Creating sample bookings...');
    const createdBookings = await Booking.insertMany(sampleBookings);
    
    console.log(`✅ Created ${createdBookings.length} sample bookings:`);
    createdBookings.forEach((booking, index) => {
      console.log(`  ${index + 1}. ${booking._id} - ${booking.status} - $${booking.totalPrice}`);
    });

    console.log('🎉 Sample bookings created successfully!');
    console.log('📱 You can now test the saved bookings page in your Flutter app.');

  } catch (error) {
    console.error('❌ Error creating sample bookings:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

createSampleBookings(); 