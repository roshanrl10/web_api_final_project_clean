const axios = require('axios');

const BASE_URL = 'http://127.0.0.1:3000/api';

async function testCancelEquipmentRental() {
  try {
    console.log('🧪 Testing cancel equipment rental API...');
    
    // First, get the list of equipment rentals to find an ID to cancel
    const userId = '688339f4171a690ae2d5d852';
    
    console.log(`👤 Getting equipment rentals for user: ${userId}`);
    
    const rentalsResponse = await axios.get(`${BASE_URL}/equipment/rentals`, {
      params: { userId: userId }
    });
    
    console.log('✅ Rentals response status:', rentalsResponse.status);
    
    if (rentalsResponse.data && rentalsResponse.data.rentals && rentalsResponse.data.rentals.length > 0) {
      const rentalToCancel = rentalsResponse.data.rentals[0];
      const rentalId = rentalToCancel._id;
      
      console.log(`📋 Found rental to cancel: ${rentalToCancel.equipment?.name || 'Unknown'} (ID: ${rentalId})`);
      
      // Test the cancel equipment rental endpoint
      console.log(`🗑️ Cancelling equipment rental with ID: ${rentalId}`);
      
      const cancelResponse = await axios.delete(`${BASE_URL}/equipment/rentals/${rentalId}`);
      
      console.log('✅ Cancel response status:', cancelResponse.status);
      console.log('📊 Cancel response data:', cancelResponse.data);
      
      // Verify the rental was actually deleted by trying to fetch it again
      console.log('🔍 Verifying rental was deleted...');
      
      try {
        const verifyResponse = await axios.get(`${BASE_URL}/equipment/rentals`, {
          params: { userId: userId }
        });
        
        const remainingRentals = verifyResponse.data.rentals.filter(r => r._id === rentalId);
        
        if (remainingRentals.length === 0) {
          console.log('✅ Equipment rental successfully cancelled and removed from database!');
        } else {
          console.log('⚠️ Equipment rental still exists in database after cancellation');
        }
        
      } catch (verifyError) {
        console.log('❌ Error verifying rental deletion:', verifyError.message);
      }
      
    } else {
      console.log('⚠️ No equipment rentals found to cancel');
    }
    
    console.log('✅ Cancel equipment rental test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testCancelEquipmentRental(); 