#!/usr/bin/env node

const fs = require('fs');

console.log('🚀 Canceling first 63 orders and sending emails...\n');

// API endpoint
const API_URL = 'http://localhost:3000/api/admin/cancel-old-orders';

fetch(API_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    testEmail: 'rahulgupta37079@gmail.com'
  })
})
.then(res => res.json())
.then(result => {
  console.log('✅ Cancellation Complete!\n');
  console.log(`📈 Results:`);
  console.log(`   - Orders Cancelled: ${result.cancelledCount}`);
  console.log(`   - Emails Sent: ${result.emailsSent}`);
  console.log(`   - Test Email Sent: ${result.testEmailSent ? 'Yes' : 'No'}`);
  
  if (result.errors && result.errors.length > 0) {
    console.log(`\n⚠️  Errors: ${result.errors.length}`);
    result.errors.forEach(e => {
      console.log(`   - ${e}`);
    });
  }
  
  console.log(`\n📄 Saving results to cancellation-results.json...`);
  fs.writeFileSync('cancellation-results.json', JSON.stringify(result, null, 2));
  console.log('✅ Done!');
  
  process.exit(0);
})
.catch(error => {
  console.error('❌ Cancellation Failed:', error.message);
  process.exit(1);
});
