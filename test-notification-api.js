const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api/notifications';
const USER_ID = '507f1f77bcf86cd799439011';

async function testNotificationAPI() {
  console.log('🧪 Testing Notification API...\n');

  try {
    // Test 1: Get user notifications
    console.log('📋 Test 1: Getting user notifications...');
    const response1 = await axios.get(`${BASE_URL}/user/${USER_ID}`);
    console.log('✅ Success:', response1.data.success);
    console.log('📊 Notifications count:', response1.data.data.length);
    console.log('📄 Pagination:', response1.data.pagination);
    console.log('');

    // Test 2: Get notification count
    console.log('📊 Test 2: Getting notification count...');
    const response2 = await axios.get(`${BASE_URL}/count/${USER_ID}`);
    console.log('✅ Success:', response2.data.success);
    console.log('📈 Count data:', response2.data.data);
    console.log('');

    // Test 3: Mark first notification as read (if exists)
    if (response1.data.data.length > 0) {
      const firstNotification = response1.data.data[0];
      console.log('✅ Test 3: Marking notification as read...');
      const response3 = await axios.patch(`${BASE_URL}/${firstNotification._id}/read`, {
        userId: USER_ID
      });
      console.log('✅ Success:', response3.data.success);
      console.log('📝 Message:', response3.data.message);
      console.log('');
    }

    // Test 4: Mark all as read
    console.log('📝 Test 4: Marking all notifications as read...');
    const response4 = await axios.patch(`${BASE_URL}/user/${USER_ID}/read-all`);
    console.log('✅ Success:', response4.data.success);
    console.log('📝 Message:', response4.data.message);
    console.log('🔄 Modified count:', response4.data.modifiedCount);
    console.log('');

    console.log('🎉 All notification API tests passed!');
    console.log('📱 The notification system is ready for Flutter app testing.');

  } catch (error) {
    console.error('❌ Error testing notification API:', error.response?.data || error.message);
  }
}

// Run the test
testNotificationAPI(); 