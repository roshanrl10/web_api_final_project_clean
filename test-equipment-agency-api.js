const axios = require('axios');
const BASE_URL = 'http://127.0.0.1:3000/api';
const userId = '688339f4171a690ae2d5d852';

async function testEquipmentAgencyAPI() {
  console.log('🧪 Testing Equipment and Agency API endpoints...\n');

  try {
    // Test 1: Get all equipment
    console.log('🔧 Test 1: Getting all equipment...');
    const equipmentResponse = await axios.get(`${BASE_URL}/equipment`);
    console.log('✅ Equipment status:', equipmentResponse.status);
    console.log('✅ Equipment count:', equipmentResponse.data.length);
    console.log('✅ First equipment:', equipmentResponse.data[0]?.name || 'No equipment found');

    // Test 2: Get user equipment rentals
    console.log('\n🔧 Test 2: Getting user equipment rentals...');
    const equipmentRentalsResponse = await axios.get(`${BASE_URL}/equipment/rentals`, {
      params: { userId }
    });
    console.log('✅ Equipment rentals status:', equipmentRentalsResponse.status);
    console.log('✅ Equipment rentals data:', equipmentRentalsResponse.data);

    // Test 3: Create equipment rental
    console.log('\n🔧 Test 3: Creating equipment rental...');
    const equipmentId = equipmentResponse.data[0]?._id;
    if (equipmentId) {
      const createRentalData = {
        user: userId,
        equipment: equipmentId,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        totalPrice: 100.0,
        status: 'confirmed'
      };
      
      const createRentalResponse = await axios.post(`${BASE_URL}/equipment/rentals`, createRentalData);
      console.log('✅ Create rental status:', createRentalResponse.status);
      console.log('✅ Created rental ID:', createRentalResponse.data._id);
      
      // Test 4: Get user equipment rentals after creation
      console.log('\n🔧 Test 4: Getting user equipment rentals after creation...');
      const updatedRentalsResponse = await axios.get(`${BASE_URL}/equipment/rentals`, {
        params: { userId }
      });
      console.log('✅ Updated rentals status:', updatedRentalsResponse.status);
      console.log('✅ Updated rentals data:', updatedRentalsResponse.data);
    }

    // Test 5: Get all agencies
    console.log('\n🏢 Test 5: Getting all agencies...');
    const agenciesResponse = await axios.get(`${BASE_URL}/agencies`);
    console.log('✅ Agencies status:', agenciesResponse.status);
    console.log('✅ Agencies count:', agenciesResponse.data.length);
    console.log('✅ First agency:', agenciesResponse.data[0]?.name || 'No agencies found');

    // Test 6: Get user agency bookings
    console.log('\n🏢 Test 6: Getting user agency bookings...');
    const agencyBookingsResponse = await axios.get(`${BASE_URL}/agencies/bookings`, {
      params: { userId }
    });
    console.log('✅ Agency bookings status:', agencyBookingsResponse.status);
    console.log('✅ Agency bookings data:', agencyBookingsResponse.data);

    // Test 7: Create agency booking
    console.log('\n🏢 Test 7: Creating agency booking...');
    const agencyId = agenciesResponse.data[0]?._id;
    if (agencyId) {
      const createBookingData = {
        user: userId,
        agency: agencyId,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        groupSize: 2,
        dailyPrice: 100.0,
        totalPrice: 700.0,
        status: 'confirmed',
        specialRequests: 'Test booking from API'
      };
      
      const createBookingResponse = await axios.post(`${BASE_URL}/agencies/bookings`, createBookingData);
      console.log('✅ Create booking status:', createBookingResponse.status);
      console.log('✅ Created booking ID:', createBookingResponse.data._id);
      
      // Test 8: Get user agency bookings after creation
      console.log('\n🏢 Test 8: Getting user agency bookings after creation...');
      const updatedBookingsResponse = await axios.get(`${BASE_URL}/agencies/bookings`, {
        params: { userId }
      });
      console.log('✅ Updated bookings status:', updatedBookingsResponse.status);
      console.log('✅ Updated bookings data:', updatedBookingsResponse.data);
    }

    console.log('\n🎉 All API tests completed successfully!');

  } catch (error) {
    console.error('❌ Error testing API:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testEquipmentAgencyAPI(); 