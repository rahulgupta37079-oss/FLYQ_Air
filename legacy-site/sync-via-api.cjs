console.log('🚀 SYNCING DATA TO PRODUCTION VIA API\n');

async function syncToProduction() {
  const fetch = (await import('node-fetch')).default;
  const fs = require('fs');
  const path = require('path');
  
  // Read the customer import data
  const importData = JSON.parse(fs.readFileSync(
    path.join(__dirname, 'public/static/customer-import-data.json'),
    'utf8'
  ));
  
  const customerData = importData.customersWithEmail || importData;
  
  console.log(`📊 Found ${customerData.length} customers to import\n`);
  const productionUrl = 'https://flyqdrone.in';
  
  console.log('🔗 Production URL:', productionUrl);
  console.log('📤 Starting import...\n');
  
  try {
    const response = await fetch(`${productionUrl}/api/admin/bulk-import`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ customers: customerData })
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ SYNC SUCCESSFUL!\n');
      console.log('📊 Results:');
      console.log('   - Accounts Created:', result.accountsCreated || 0);
      console.log('   - Orders Created:', result.ordersCreated || 0);
      console.log('   - Emails Sent:', result.emailsSent || 0);
      console.log('\n✨ Production database is now synced!');
      console.log('\n🔐 Customers can now login at: https://flyqdrone.in/login');
    } else {
      console.error('❌ SYNC FAILED\n');
      console.error('Status:', response.status);
      console.error('Error:', result.error || result.message || 'Unknown error');
    }
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

syncToProduction();
