const axios = require('axios');

const BASE_URL = 'http://127.0.0.1:3000/api';

async function testCancelAgencyBooking() {
  try {
    console.log('🧪 Testing cancel agency booking API...');
    
    // First, get the list of agency bookings to find an ID to cancel
    const userId = '688339f4171a690ae2d5d852';
    
    console.log(`👤 Getting agency bookings for user: ${userId}`);
    
    const bookingsResponse = await axios.get(`${BASE_URL}/agencies/bookings`, {
      params: { userId: userId }
    });
    
    console.log('✅ Bookings response status:', bookingsResponse.status);
    
    if (bookingsResponse.data && bookingsResponse.data.bookings && bookingsResponse.data.bookings.length > 0) {
      const bookingToCancel = bookingsResponse.data.bookings[0];
      const bookingId = bookingToCancel._id;
      
      console.log(`📋 Found booking to cancel: ${bookingToCancel.agency?.name || 'Unknown'} (ID: ${bookingId})`);
      
      // Test the cancel agency booking endpoint
      console.log(`🗑️ Cancelling agency booking with ID: ${bookingId}`);
      
      const cancelResponse = await axios.delete(`${BASE_URL}/agencies/bookings/${bookingId}`);
      
      console.log('✅ Cancel response status:', cancelResponse.status);
      console.log('📊 Cancel response data:', cancelResponse.data);
      
      // Verify the booking was actually deleted by trying to fetch it again
      console.log('🔍 Verifying booking was deleted...');
      
      try {
        const verifyResponse = await axios.get(`${BASE_URL}/agencies/bookings`, {
          params: { userId: userId }
        });
        
        const remainingBookings = verifyResponse.data.bookings.filter(b => b._id === bookingId);
        
        if (remainingBookings.length === 0) {
          console.log('✅ Agency booking successfully cancelled and removed from database!');
        } else {
          console.log('⚠️ Agency booking still exists in database after cancellation');
        }
        
      } catch (verifyError) {
        console.log('❌ Error verifying booking deletion:', verifyError.message);
      }
      
    } else {
      console.log('⚠️ No agency bookings found to cancel');
    }
    
    console.log('✅ Cancel agency booking test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testCancelAgencyBooking(); 