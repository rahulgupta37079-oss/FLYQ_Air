async function testLoginAndTracking() {
  const fetch = (await import('node-fetch')).default;
  const testUser = {
    email: 'chiragnr72@gmail.com',
    password: '4b2dcddec60c'
  };
  
  console.log('🧪 Testing Login & Tracking\n');
  console.log(`📧 Email: ${testUser.email}`);
  console.log(`🔑 Password: ${testUser.password}\n`);
  
  try {
    // Test login
    console.log('1️⃣ Testing Login...');
    const loginResponse = await fetch('https://flyqdrone.in/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testUser)
    });
    
    const loginData = await loginResponse.json();
    console.log(`   Status: ${loginResponse.status}`);
    console.log(`   Response:`, JSON.stringify(loginData, null, 2));
    
    if (loginResponse.ok && loginData.token) {
      console.log('   ✅ Login Successful!\n');
      
      // Test tracking
      console.log('2️⃣ Testing Tracking...');
      const trackingResponse = await fetch('https://flyqdrone.in/api/track/TRK176927506422962EM7G');
      const trackingData = await trackingResponse.json();
      console.log(`   Status: ${trackingResponse.status}`);
      console.log(`   Response:`, JSON.stringify(trackingData, null, 2));
      
      if (trackingResponse.ok) {
        console.log('   ✅ Tracking Working!\n');
      } else {
        console.log('   ❌ Tracking Failed\n');
      }
      
      // Test orders API
      console.log('3️⃣ Testing Orders API...');
      const ordersResponse = await fetch('https://flyqdrone.in/api/orders', {
        headers: {
          'Authorization': `Bearer ${loginData.token}`
        }
      });
      const ordersData = await ordersResponse.json();
      console.log(`   Status: ${ordersResponse.status}`);
      console.log(`   Orders:`, ordersData.length || 0, 'orders\n');
      
      if (ordersResponse.ok) {
        console.log('   ✅ Orders API Working!\n');
      } else {
        console.log('   ❌ Orders API Failed\n');
      }
      
    } else {
      console.log('   ❌ Login Failed!\n');
    }
    
    console.log('═══════════════════════════════════════════════════');
    console.log('📊 TEST RESULTS');
    console.log('═══════════════════════════════════════════════════');
    console.log(`Login: ${loginResponse.ok ? '✅ WORKING' : '❌ FAILED'}`);
    console.log(`URLs: https://flyqdrone.in/login`);
    console.log(`      https://flyqdrone.in/track-order?tracking=[ID]`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testLoginAndTracking();
