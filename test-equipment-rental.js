const axios = require('axios');

const BASE_URL = 'http://127.0.0.1:3000/api';

async function testEquipmentRental() {
  try {
    console.log('🧪 Testing equipment rental endpoint...');
    
    // Test data
    const rentalData = {
      user: '688e79727d3531f673be3d43', // Same user ID as hotel bookings
      equipment: '68834656c535f87c6e022ada', // Use an existing equipment ID
      startDate: '2025-08-04T00:00:00.000Z',
      endDate: '2025-08-06T00:00:00.000Z',
      quantity: 1,
      totalPrice: 240.0, // 2 days * 120 price
      status: 'confirmed',
      specialRequests: 'Test rental from Node.js script'
    };
    
    console.log('📤 Rental data:', rentalData);
    
    const response = await axios.post(`${BASE_URL}/equipment/rentals`, rentalData);
    
    console.log('✅ Response status:', response.status);
    console.log('📊 Response data:', response.data);
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testEquipmentRental(); 