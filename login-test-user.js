const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function loginTestUser() {
  try {
    console.log('🔐 Logging in test user...');
    
    const loginData = {
      email: 'user@test.com',
      password: 'user123'
    };
    
    console.log('📤 Sending login data:', loginData);
    
    const response = await axios.post(`${BASE_URL}/auth/login`, loginData);
    
    console.log('✅ Login successful!');
    console.log('📥 Response:', response.data);
    
    if (response.data.user && response.data.user._id) {
      console.log('🆔 User ID:', response.data.user._id);
      console.log('💡 Use this ID for booking tests');
    }
    
  } catch (error) {
    console.error('❌ Error logging in:', error.response?.data || error.message);
  }
}

loginTestUser(); 