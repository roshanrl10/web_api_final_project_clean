const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function testFlutterBooking() {
  try {
    console.log('🧪 Testing Flutter-style booking...');
    
    // Simulate the exact data format that Flutter should send
    const bookingData = {
      user: '688e79727d3531f673be3d43', // Working user ID
      hotel: '68834656c535f87c6e022ada', // Everest Base Camp Hotel ID
      checkIn: '2025-08-04T00:00:00.000Z',
      checkOut: '2025-08-05T00:00:00.000Z',
      guests: 1
    };
    
    console.log('📤 Sending booking data:', JSON.stringify(bookingData, null, 2));
    console.log('🔍 User ID type:', typeof bookingData.user);
    console.log('🔍 User ID value:', bookingData.user);
    
    const response = await axios.post(`${BASE_URL}/bookings`, bookingData);
    
    console.log('✅ Booking created successfully!');
    console.log('📥 Response:', response.data);
    
  } catch (error) {
    console.error('❌ Error creating booking:', error.response?.data || error.message);
    console.error('❌ Full error:', error);
  }
}

testFlutterBooking(); 