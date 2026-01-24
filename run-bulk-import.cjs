#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read customer data
const dataPath = path.join(__dirname, 'customer-import-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

console.log('🚀 Starting Bulk Import...\n');
console.log(`📊 Total Customers: ${data.customersWithEmail.length}`);
console.log(`💰 Total Revenue: ₹${data.customersWithEmail.reduce((sum, c) => sum + c.productPrice, 0).toLocaleString('en-IN')}\n`);

// Import via API
const API_URL = 'http://localhost:3000/api/admin/bulk-import-customers';

fetch(API_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    customers: data.customersWithEmail,
    useOldPricing: false  // Use current pricing
  })
})
.then(res => res.json())
.then(result => {
  console.log('✅ Import Complete!\n');
  console.log(`📈 Results:`);
  console.log(`   - Total Processed: ${result.results.totalProcessed}`);
  console.log(`   - Accounts Created: ${result.results.accountsCreated}`);
  console.log(`   - Orders Created: ${result.results.ordersCreated}`);
  console.log(`   - Emails Sent: ${result.results.emailsSent}`);
  
  if (result.results.failed.length > 0) {
    console.log(`\n⚠️  Failed: ${result.results.failed.length}`);
    result.results.failed.forEach(f => {
      console.log(`   - ${f.email}: ${f.error}`);
    });
  }
  
  console.log(`\n📄 Saving results to import-results.json...`);
  fs.writeFileSync('import-results.json', JSON.stringify(result, null, 2));
  console.log('✅ Done!');
  
  process.exit(0);
})
.catch(error => {
  console.error('❌ Import Failed:', error.message);
  process.exit(1);
});
