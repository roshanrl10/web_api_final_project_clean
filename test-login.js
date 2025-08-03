const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function testLogin() {
  try {
    console.log('🔐 Testing login...');
    
    // First, let's check what users exist
    console.log('📋 Available users in database:');
    console.log('- Email: admin@test.com (if exists)');
    console.log('- Email: user@test.com (if exists)');
    
    // Try to login with existing user credentials
    const loginData = {
      email: 'testuser@example.com',
      password: 'password123'
    };
    
    console.log('📤 Trying login with:', loginData);
    
    const response = await axios.post(`${BASE_URL}/auth/login`, loginData);
    
    console.log('✅ Login successful!');
    console.log('📥 Response:', response.data);
    
    if (response.data.user && response.data.user._id) {
      console.log('🆔 User ID:', response.data.user._id);
      console.log('👤 Username:', response.data.user.username);
      console.log('📧 Email:', response.data.user.email);
      console.log('🔑 Token:', response.data.token ? 'Present' : 'Missing');
    }
    
  } catch (error) {
    console.error('❌ Error logging in:', error.response?.data || error.message);
    
    // Try alternative credentials
    console.log('\n🔄 Trying alternative credentials...');
    try {
      const altLoginData = {
        email: 'flutter@test.com',
        password: 'password123'
      };
      
      console.log('📤 Trying login with:', altLoginData);
      
      const altResponse = await axios.post(`${BASE_URL}/auth/login`, altLoginData);
      
      console.log('✅ Alternative login successful!');
      console.log('📥 Response:', altResponse.data);
      
    } catch (altError) {
      console.error('❌ Alternative login also failed:', altError.response?.data || altError.message);
    }
  }
}

testLogin(); 