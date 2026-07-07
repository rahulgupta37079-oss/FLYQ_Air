#!/usr/bin/env node

console.log('🚀 Resending confirmation emails to all 63 customers...\n');

const API_URL = 'http://localhost:3000/api/admin/resend-confirmation-emails';

fetch(API_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
})
.then(res => res.json())
.then(result => {
  console.log('✅ Email Resend Complete!\n');
  console.log(`📈 Results:`);
  console.log(`   - Emails Sent: ${result.emailsSent}`);
  console.log(`   - Customers Notified: ${result.customersNotified}`);
  
  if (result.errors && result.errors.length > 0) {
    console.log(`\n⚠️  Errors: ${result.errors.length}`);
    result.errors.forEach(e => {
      console.log(`   - ${e}`);
    });
  }
  
  console.log(`\n📧 All customers should receive emails within 5 minutes`);
  console.log(`📋 Check spam folders if emails not visible`);
  
  process.exit(0);
})
.catch(error => {
  console.error('❌ Email resend failed:', error.message);
  process.exit(1);
});
