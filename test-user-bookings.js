const axios = require('axios');

const BASE_URL = 'http://127.0.0.1:3000/api';

async function testUserBookings() {
  try {
    console.log('🧪 Testing user bookings endpoint...');
    
    const userId = '688e79727d3531f673be3d43';
    console.log('🔍 Testing with userId:', userId);
    
    const response = await axios.get(`${BASE_URL}/bookings`, {
      params: { userId: userId }
    });
    
    console.log('✅ User bookings endpoint working:', response.status);
    console.log('📊 Response:', response.data);
    console.log('📊 Found bookings:', response.data.bookings?.length || 0);
    
  } catch (error) {
    console.error('❌ User bookings test failed:', error.response?.data || error.message);
  }
}

testUserBookings(); 