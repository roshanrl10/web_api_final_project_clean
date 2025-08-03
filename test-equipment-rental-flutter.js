const axios = require('axios');

const BASE_URL = 'http://127.0.0.1:3000/api';

async function testFlutterEquipmentRental() {
  try {
    console.log('🧪 Testing Flutter equipment rental data...');
    
    // Simulate the exact data that Flutter would send
    const rentalData = {
      user: '688e79727d3531f673be3d43',
      equipment: '68834656c535f87c6e022ada', // backpack equipment
      equipmentName: 'bagpack',
      startDate: '2025-08-04T00:00:00.000Z',
      endDate: '2025-08-08T00:00:00.000Z',
      quantity: 1,
      totalPrice: 200.0, // 4 days * 50 price
      status: 'confirmed',
      specialRequests: 'Rental from Flutter app'
    };
    
    console.log('📤 Flutter rental data:', rentalData);
    
    const response = await axios.post(`${BASE_URL}/equipment/rentals`, rentalData);
    
    console.log('✅ Response status:', response.status);
    console.log('📊 Response data:', response.data);
    
    console.log('✅ Equipment rental test successful!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testFlutterEquipmentRental(); 