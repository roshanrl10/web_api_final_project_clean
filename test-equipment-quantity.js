const axios = require('axios');

const BASE_URL = 'http://127.0.0.1:3000/api';

async function testEquipmentQuantity() {
  try {
    console.log('🧪 Testing equipment data structure and quantity field...');
    
    const response = await axios.get(`${BASE_URL}/equipment`);
    
    console.log('✅ Response status:', response.status);
    console.log('📊 Total equipment:', response.data?.length || 0);
    
    // Test first equipment structure
    if (response.data && response.data.length > 0) {
      const firstEquipment = response.data[0];
      console.log('🔧 First equipment structure:');
      console.log('  - _id:', firstEquipment._id);
      console.log('  - name:', firstEquipment.name);
      console.log('  - quantity:', firstEquipment.quantity);
      console.log('  - quantity type:', typeof firstEquipment.quantity);
      console.log('  - available:', firstEquipment.available);
      console.log('  - price:', firstEquipment.price);
      
      // Test all equipment quantities
      console.log('\n🔧 All equipment quantities:');
      response.data.forEach((equipment, index) => {
        console.log(`  ${index + 1}. ${equipment.name}: quantity=${equipment.quantity} (${typeof equipment.quantity})`);
      });
    } else {
      console.log('⚠️ No equipment found to test structure.');
    }
    
    console.log('✅ Equipment quantity test successful!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testEquipmentQuantity(); 