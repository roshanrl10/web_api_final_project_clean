const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function createTestUser() {
  try {
    console.log('👤 Creating test user...');
    
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User'
    };
    
    console.log('📤 Sending user data:', userData);
    
    const response = await axios.post(`${BASE_URL}/auth/register`, userData);
    
    console.log('✅ User created successfully!');
    console.log('📥 Response:', response.data);
    
    if (response.data.user && response.data.user._id) {
      console.log('🆔 User ID:', response.data.user._id);
      console.log('💡 Use this ID for booking tests');
    }
    
  } catch (error) {
    console.error('❌ Error creating user:', error.response?.data || error.message);
  }
}

createTestUser(); 