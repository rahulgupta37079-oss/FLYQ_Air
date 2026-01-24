const XLSX = require('xlsx');
const crypto = require('crypto');

// Read the Excel file
const workbook = XLSX.readFile('/home/user/uploaded_files/Drone_Nov-Dec_Pluto_1.2_and_Pluto_X_Data-Genspark_AI_Sheets-20260124_1344.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);

// Filter out header rows and invalid entries
const customers = data.filter(row => {
  const name = (row['Name'] || '').trim().toLowerCase();
  // Skip month headers and rows without required data
  return name && 
         name !== 'november' && 
         name !== 'december' && 
         name !== 'january' &&
         row['Mobile number'] && 
         row['Drone type'];
});

console.log(`Total customers found: ${customers.length}`);

// Separate customers by email availability and address
const customersWithEmail = [];
const customersWithoutEmail = [];
const customersWithEmailNoAddress = [];

customers.forEach((customer, index) => {
  const email = (customer['E-mail '] || '').trim();
  const address = (customer['Address'] || '').trim();
  const name = (customer['Name'] || '').trim();
  const mobile = String(customer['Mobile number'] || '').trim();
  const whatsapp = String(customer['Whatsapp Number'] || customer['Mobile number'] || '').trim();
  const droneType = (customer['Drone type'] || '').trim();
  const pricingInfo = (customer['Pricing Info'] || '').trim();
  
  // Determine product and price
  let productName = '';
  let productPrice = 0;
  
  if (droneType.includes('1.2') || pricingInfo.includes('AIR')) {
    productName = 'FLYQ Air';
    productPrice = 7999;
  } else if (droneType.includes('X') || pricingInfo.includes('VISION')) {
    productName = 'FLYQ Vision';
    productPrice = 11999;
  }
  
  const customerData = {
    index: index + 1,
    name,
    email,
    mobile,
    whatsapp,
    address,
    droneType,
    pricingInfo,
    productName,
    productPrice
  };
  
  if (email && email.includes('@')) {
    if (address && address.length > 10) {
      customersWithEmail.push(customerData);
    } else {
      customersWithEmailNoAddress.push(customerData);
    }
  } else {
    customersWithoutEmail.push(customerData);
  }
});

console.log(`\n=== CUSTOMER SUMMARY ===`);
console.log(`With Email & Address (will create account + order): ${customersWithEmail.length}`);
console.log(`With Email but NO Address (will create account only): ${customersWithEmailNoAddress.length}`);
console.log(`Without Email (cannot create account): ${customersWithoutEmail.length}`);

// Generate API calls for accounts and orders
console.log(`\n\n=== API CALLS TO CREATE ACCOUNTS & ORDERS ===\n`);

customersWithEmail.forEach((customer, idx) => {
  // Generate random password
  const password = crypto.randomBytes(8).toString('hex').substring(0, 12);
  
  console.log(`\n--- Customer ${idx + 1}/${customersWithEmail.length}: ${customer.name} ---`);
  console.log(`Email: ${customer.email}`);
  console.log(`Mobile: ${customer.mobile}`);
  console.log(`Product: ${customer.productName} (₹${customer.productPrice})`);
  console.log(`Address: ${customer.address}`);
  
  // 1. Create account
  console.log(`\n1. CREATE ACCOUNT:`);
  console.log(`POST /api/auth/register`);
  console.log(JSON.stringify({
    email: customer.email,
    password: password,
    name: customer.name,
    phone: customer.mobile
  }, null, 2));
  
  // 2. Create paid order
  const txnId = `MANUAL${Date.now()}${idx}`;
  console.log(`\n2. CREATE PAID ORDER:`);
  console.log(`Manual Transaction ID: ${txnId}`);
  console.log(`Direct DB Insert Required (backend API endpoint needed)`);
  console.log(JSON.stringify({
    user_email: customer.email,
    transaction_id: txnId,
    amount: customer.productPrice,
    product_name: customer.productName,
    quantity: 1,
    status: 'paid',
    payment_method: 'manual',
    customer_name: customer.name,
    customer_email: customer.email,
    customer_phone: customer.mobile,
    shipping_address: customer.address
  }, null, 2));
  
  // 3. Email content
  console.log(`\n3. SEND EMAIL:`);
  console.log(`To: ${customer.email}`);
  console.log(`Subject: Welcome to FLYQ Drones - Your Account & Order Confirmation`);
  console.log(`Login URL: https://6602f9ce.flyq-air.pages.dev/login`);
  console.log(`Login Email: ${customer.email}`);
  console.log(`Login Password: ${password}`);
  console.log(`Order Details: ${customer.productName} - ₹${customer.productPrice}`);
  console.log(`Transaction ID: ${txnId}`);
  console.log(`Shipping Address: ${customer.address}`);
  
  console.log(`\n${'='.repeat(80)}`);
});

// Export data to JSON for backend processing
const fs = require('fs');

const exportData = {
  customersWithEmail: customersWithEmail.map((c, idx) => ({
    ...c,
    password: crypto.randomBytes(8).toString('hex').substring(0, 12),
    transactionId: `MANUAL${Date.now()}${idx}`
  })),
  customersWithEmailNoAddress,
  customersWithoutEmail
};

fs.writeFileSync(
  '/home/user/webapp/customer-import-data.json',
  JSON.stringify(exportData, null, 2)
);

console.log(`\n\n=== DATA EXPORTED ===`);
console.log(`File: /home/user/webapp/customer-import-data.json`);
console.log(`\nCustomers with Email & Address: ${customersWithEmail.length}`);
console.log(`Customers with Email but NO Address: ${customersWithEmailNoAddress.length}`);
console.log(`Customers without Email: ${customersWithoutEmail.length}`);

// Print summary of customers without email
console.log(`\n\n=== CUSTOMERS WITHOUT EMAIL (Cannot Create Account) ===\n`);
customersWithoutEmail.forEach((customer, idx) => {
  console.log(`${idx + 1}. ${customer.name}`);
  console.log(`   Mobile: ${customer.mobile}`);
  console.log(`   WhatsApp: ${customer.whatsapp}`);
  console.log(`   Product: ${customer.productName}`);
  console.log(`   Address: ${customer.address || 'NO ADDRESS'}`);
  console.log('');
});

console.log(`\n\n=== CUSTOMERS WITH EMAIL BUT NO ADDRESS ===\n`);
customersWithEmailNoAddress.forEach((customer, idx) => {
  console.log(`${idx + 1}. ${customer.name}`);
  console.log(`   Email: ${customer.email}`);
  console.log(`   Mobile: ${customer.mobile}`);
  console.log(`   Product: ${customer.productName}`);
  console.log(`   Status: Will create account only, NO ORDER (no address)`);
  console.log('');
});

console.log(`\n\n=== NEXT STEPS ===`);
console.log(`1. Create backend API endpoint: POST /api/admin/bulk-import-customers`);
console.log(`2. Endpoint should:`);
console.log(`   - Create user accounts (hashed passwords)`);
console.log(`   - Generate paid orders with manual transaction IDs`);
console.log(`   - Send confirmation emails with login details + invoice`);
console.log(`3. Input data available in: /home/user/webapp/customer-import-data.json`);
console.log(`4. Total accounts to create: ${customersWithEmail.length + customersWithEmailNoAddress.length}`);
console.log(`5. Total orders to create: ${customersWithEmail.length}`);
