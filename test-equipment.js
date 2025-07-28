const axios = require('axios');

const API_BASE = 'http://localhost:3000';

async function testEquipmentAPI() {
  try {
    console.log('Testing Equipment API...\n');

    // Test 1: Get all equipment
    console.log('1. Testing GET /api/equipment...');
    const getResponse = await axios.get(`${API_BASE}/api/equipment`);
    console.log('✅ GET equipment successful');
    console.log(`Found ${getResponse.data.equipment?.length || 0} equipment items\n`);

    // Test 2: Add new equipment (without auth - should fail)
    console.log('2. Testing POST /api/equipment without auth...');
    try {
      await axios.post(`${API_BASE}/api/equipment`, {
        name: 'Test Equipment',
        category: 'Test',
        price: 25,
        brand: 'TestBrand'
      });
      console.log('❌ Should have failed without auth');
    } catch (error) {
      console.log('✅ Correctly rejected without authentication');
    }

    // Test 3: Login as admin and test equipment addition
    console.log('\n3. Testing admin login and equipment addition...');
    try {
      const loginResponse = await axios.post(`${API_BASE}/api/auth/login`, {
        email: 'admin@test.com',
        password: 'admin123'
      });

      if (loginResponse.data.success) {
        const token = loginResponse.data.token;
        console.log('✅ Admin login successful');

        // Test equipment addition with auth
        const equipmentResponse = await axios.post(`${API_BASE}/api/equipment`, {
          name: 'Test Admin Equipment',
          category: 'Test',
          price: 30,
          brand: 'TestBrand',
          description: 'Test equipment added by admin',
          available: true
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (equipmentResponse.data.success) {
          console.log('✅ Equipment addition with admin auth successful');
        } else {
          console.log('❌ Equipment addition failed');
        }
      } else {
        console.log('❌ Admin login failed');
      }
    } catch (error) {
      console.log('❌ Admin authentication test failed:', error.response?.data?.message || error.message);
    }

    console.log('\n✅ Equipment API tests completed!');
    console.log('\nTest Credentials:');
    console.log('Admin - Email: admin@test.com, Password: admin123');
    console.log('User - Email: user@test.com, Password: user123');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the test
testEquipmentAPI(); 