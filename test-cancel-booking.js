const axios = require('axios');

const BASE_URL = 'http://127.0.0.1:3000/api';

async function testCancelBooking() {
  try {
    console.log('🧪 Testing cancel booking API...');
    
    // First, get the list of bookings to find an ID to cancel
    const userId = '688339f4171a690ae2d5d852';
    
    console.log(`👤 Getting bookings for user: ${userId}`);
    
    const bookingsResponse = await axios.get(`${BASE_URL}/bookings`, {
      params: { userId: userId }
    });
    
    console.log('✅ Bookings response status:', bookingsResponse.status);
    
    if (bookingsResponse.data && bookingsResponse.data.bookings && bookingsResponse.data.bookings.length > 0) {
      const bookingToCancel = bookingsResponse.data.bookings[0];
      const bookingId = bookingToCancel._id;
      
      console.log(`📋 Found booking to cancel: ${bookingToCancel.hotel?.name || 'Unknown'} (ID: ${bookingId})`);
      
      // Test the cancel booking endpoint
      console.log(`🗑️ Cancelling booking with ID: ${bookingId}`);
      
      const cancelResponse = await axios.delete(`${BASE_URL}/bookings/${bookingId}`);
      
      console.log('✅ Cancel response status:', cancelResponse.status);
      console.log('📊 Cancel response data:', cancelResponse.data);
      
      // Verify the booking was actually deleted by trying to fetch it again
      console.log('🔍 Verifying booking was deleted...');
      
      try {
        const verifyResponse = await axios.get(`${BASE_URL}/bookings`, {
          params: { userId: userId }
        });
        
        const remainingBookings = verifyResponse.data.bookings.filter(b => b._id === bookingId);
        
        if (remainingBookings.length === 0) {
          console.log('✅ Booking successfully cancelled and removed from database!');
        } else {
          console.log('⚠️ Booking still exists in database after cancellation');
        }
        
      } catch (verifyError) {
        console.log('❌ Error verifying booking deletion:', verifyError.message);
      }
      
    } else {
      console.log('⚠️ No bookings found to cancel');
    }
    
    console.log('✅ Cancel booking test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testCancelBooking(); 