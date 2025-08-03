const axios = require('axios');

const BASE_URL = 'http://127.0.0.1:3000/api';

async function testBookingParsing() {
  try {
    console.log('🧪 Testing booking data structure for Flutter parsing...');
    
    const userId = '688e79727d3531f673be3d43';
    
    const response = await axios.get(`${BASE_URL}/bookings`, {
      params: { userId: userId }
    });
    
    console.log('✅ Response status:', response.status);
    console.log('📊 Total bookings:', response.data.bookings?.length || 0);
    
    // Test first booking structure
    if (response.data.bookings && response.data.bookings.length > 0) {
      const firstBooking = response.data.bookings[0];
      console.log('🏨 First booking structure:');
      console.log('  - _id:', firstBooking._id);
      console.log('  - user:', firstBooking.user);
      console.log('  - hotel:', firstBooking.hotel);
      console.log('  - checkIn:', firstBooking.checkIn);
      console.log('  - checkOut:', firstBooking.checkOut);
      console.log('  - guests:', firstBooking.guests);
      console.log('  - status:', firstBooking.status);
      
      // Check hotel object structure
      if (firstBooking.hotel) {
        console.log('🏨 Hotel object structure:');
        console.log('  - _id:', firstBooking.hotel._id);
        console.log('  - name:', firstBooking.hotel.name);
        console.log('  - price:', firstBooking.hotel.price);
        console.log('  - location:', firstBooking.hotel.location);
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testBookingParsing(); 