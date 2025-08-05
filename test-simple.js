const axios = require('axios');

async function testServer() {
  try {
    console.log('🧪 Testing server connection...');
    
    // Test 1: Basic server response
    const response1 = await axios.get('http://localhost:3000/');
    console.log('✅ Server is running:', response1.data);
    
    // Test 2: Check if notification routes exist
    try {
      const response2 = await axios.get('http://localhost:3000/api/notifications/user/507f1f77bcf86cd799439011');
      console.log('✅ Notification route works:', response2.data);
    } catch (error) {
      console.log('❌ Notification route error:', error.response?.status, error.response?.data);
    }
    
  } catch (error) {
    console.error('❌ Server connection error:', error.message);
  }
}

testServer(); 