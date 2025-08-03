const axios = require('axios');

const BASE_URL = 'http://127.0.0.1:3000/api';

async function testWebConnection() {
  try {
    console.log('🧪 Testing web browser connection...');
    console.log('🔍 Testing URL:', BASE_URL);
    
    // Test hotels endpoint
    console.log('\n📡 Testing hotels endpoint...');
    const hotelsResponse = await axios.get(`${BASE_URL}/hotels`);
    console.log('✅ Hotels endpoint working:', hotelsResponse.status);
    console.log('📊 Found hotels:', hotelsResponse.data.hotels?.length || 0);
    
    // Test booking endpoint
    console.log('\n📡 Testing booking endpoint...');
    const bookingData = {
      user: '688e79727d3531f673be3d43',
      hotel: '6883479bc535f87c6e022adc',
      checkIn: '2025-08-04T00:00:00.000Z',
      checkOut: '2025-08-05T00:00:00.000Z',
      guests: 1
    };
    
    const bookingResponse = await axios.post(`${BASE_URL}/bookings`, bookingData);
    console.log('✅ Booking endpoint working:', bookingResponse.status);
    console.log('📊 Booking created:', bookingResponse.data.success);
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    console.error('❌ Full error:', error.response?.data || error);
  }
}

testWebConnection(); 