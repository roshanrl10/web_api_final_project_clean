const axios = require('axios');

const BASE_URL = 'http://127.0.0.1:3000/api';

async function testSavedBookings() {
  try {
    console.log('🧪 Testing saved bookings API...');
    
    // Test user ID (same as used in Flutter app)
    const userId = '688339f4171a690ae2d5d852';
    
    console.log(`👤 Testing bookings for user: ${userId}`);
    
    // Test fetching user bookings
    const response = await axios.get(`${BASE_URL}/bookings`, {
      params: { userId: userId }
    });
    
    console.log('✅ Response status:', response.status);
    console.log('📊 Response data:', JSON.stringify(response.data, null, 2));
    
    if (response.data && Array.isArray(response.data)) {
      console.log(`📋 Found ${response.data.length} bookings:`);
      response.data.forEach((booking, index) => {
        console.log(`  ${index + 1}. Hotel: ${booking.hotel?.name || 'Unknown'}`);
        console.log(`     Status: ${booking.status}`);
        console.log(`     Check-in: ${booking.checkIn}`);
        console.log(`     Check-out: ${booking.checkOut}`);
        console.log(`     Total Price: $${booking.totalPrice}`);
        console.log(`     Guests: ${booking.guests || 1}`);
        console.log('');
      });
    } else {
      console.log('⚠️ No bookings found or invalid response format');
    }
    
    console.log('✅ Saved bookings test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testSavedBookings(); 