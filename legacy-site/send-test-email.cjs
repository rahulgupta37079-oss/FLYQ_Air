#!/usr/bin/env node

console.log('🚀 Sending test email to rahulgupta37079@gmail.com...\n');

const API_URL = 'http://localhost:3000/api/admin/send-test-email';

fetch(API_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    to: 'rahulgupta37079@gmail.com',
    subject: 'FLYQ Test Email - Order Confirmation',
    orderNumber: 'TEST-001',
    customerName: 'Rahul Gupta',
    productName: 'FLYQ Air',
    price: 7999,
    trackingId: 'TRK-TEST-123456',
    password: 'test123'
  })
})
.then(res => res.json())
.then(result => {
  if (result.success) {
    console.log('✅ Test Email Sent Successfully!\n');
    console.log(`📧 Details:`);
    console.log(`   - To: rahulgupta37079@gmail.com`);
    console.log(`   - Subject: ${result.subject}`);
    console.log(`   - Message ID: ${result.messageId || 'N/A'}`);
    console.log(`\n📋 Check your email inbox (and spam folder)`);
  } else {
    console.log('❌ Test Email Failed!\n');
    console.log(`Error: ${result.error}`);
  }
  
  process.exit(result.success ? 0 : 1);
})
.catch(error => {
  console.error('❌ Request Failed:', error.message);
  process.exit(1);
});
