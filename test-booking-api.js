const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function testBookingAPI() {
  try {
    console.log('🧪 Testing Booking API...');
    
    // Test data with correct field names
    const bookingData = {
      user: '688339f4171a690ae2d5d852', // Real user ID from database
      hotel: '6883479bc535f87c6e022adc', // bamboo hotel ID
      checkIn: '2025-08-04T00:00:00.000Z',
      checkOut: '2025-08-06T00:00:00.000Z',
      guests: 1
    };
    
    console.log('📤 Sending booking data:', bookingData);
    
    const response = await axios.post(`${BASE_URL}/bookings`, bookingData);
    
    console.log('✅ Booking created successfully!');
    console.log('📥 Response:', response.data);
    
  } catch (error) {
    console.error('❌ Error creating booking:', error.response?.data || error.message);
  }
}

testBookingAPI(); 