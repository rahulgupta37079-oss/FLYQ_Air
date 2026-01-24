#!/usr/bin/env node

const fs = require('fs');
const XLSX = require('xlsx');

// Read import results
const results = JSON.parse(fs.readFileSync('import-results.json', 'utf8'));
const customerData = JSON.parse(fs.readFileSync('customer-import-data.json', 'utf8'));

// Create Excel workbook
const wb = XLSX.utils.book_new();

// Prepare data for Excel
const excelData = results.results.success.map((result, index) => {
  const customer = customerData.customersWithEmail.find(c => c.email === result.email);
  
  return {
    'Sr. No.': index + 1,
    'Customer Name': result.name,
    'Email': result.email,
    'Mobile': customer.mobile,
    'WhatsApp': customer.whatsapp,
    'Product': customer.productName,
    'Price (₹)': customer.productPrice,
    'Order Number': result.orderNumber,
    'Tracking ID': result.trackingId,
    'Shipping Status': 'Pending',
    'Carrier': 'FLYQ Express',
    'Estimated Delivery': 'Monday Pickup',
    'Address': customer.address,
    'Transaction ID': customer.transactionId,
    'Password': customer.password,
    'Order Status': 'Confirmed',
    'Payment Status': 'Paid'
  };
});

// Create worksheet
const ws = XLSX.utils.json_to_sheet(excelData);

// Set column widths
ws['!cols'] = [
  { wch: 8 },  // Sr. No.
  { wch: 25 }, // Customer Name
  { wch: 35 }, // Email
  { wch: 15 }, // Mobile
  { wch: 15 }, // WhatsApp
  { wch: 15 }, // Product
  { wch: 12 }, // Price
  { wch: 30 }, // Order Number
  { wch: 20 }, // Tracking ID
  { wch: 15 }, // Shipping Status
  { wch: 15 }, // Carrier
  { wch: 20 }, // Estimated Delivery
  { wch: 50 }, // Address
  { wch: 25 }, // Transaction ID
  { wch: 15 }, // Password
  { wch: 12 }, // Order Status
  { wch: 12 }  // Payment Status
];

// Add worksheet to workbook
XLSX.utils.book_append_sheet(wb, ws, 'Customer Orders');

// Create summary sheet
const summary = [
  ['FLYQ Drones - Order Summary'],
  [''],
  ['Total Orders', results.results.ordersCreated],
  ['Total Customers', results.results.totalProcessed],
  ['Accounts Created', results.results.accountsCreated],
  ['Emails Sent', results.results.emailsSent],
  [''],
  ['Product Breakdown'],
  ['FLYQ Air Orders', excelData.filter(d => d.Product === 'FLYQ Air').length],
  ['FLYQ Air Revenue', '₹' + (excelData.filter(d => d.Product === 'FLYQ Air').length * 7999).toLocaleString('en-IN')],
  ['FLYQ Vision Orders', excelData.filter(d => d.Product === 'FLYQ Vision').length],
  ['FLYQ Vision Revenue', '₹' + (excelData.filter(d => d.Product === 'FLYQ Vision').length * 11999).toLocaleString('en-IN')],
  [''],
  ['Total Revenue', '₹' + excelData.reduce((sum, d) => sum + d['Price (₹)'], 0).toLocaleString('en-IN')],
  [''],
  ['Generated Date', new Date().toLocaleString('en-IN')]
];

const wsSummary = XLSX.utils.aoa_to_sheet(summary);
wsSummary['!cols'] = [{ wch: 25 }, { wch: 20 }];
XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

// Write file
const filename = `FLYQ_Orders_Export_${new Date().toISOString().split('T')[0]}.xlsx`;
XLSX.writeFile(wb, filename);

console.log(`✅ Excel report generated: ${filename}`);
console.log(`📊 Total Records: ${excelData.length}`);
console.log(`💰 Total Revenue: ₹${excelData.reduce((sum, d) => sum + d['Price (₹)'], 0).toLocaleString('en-IN')}`);
