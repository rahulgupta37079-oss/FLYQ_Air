const XLSX = require('xlsx');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Find the SQLite database file
const wranglerDir = path.join(__dirname, '.wrangler/state/v3/d1/miniflare-D1DatabaseObject');
const files = fs.readdirSync(wranglerDir);
const dbFile = files.find(f => f.endsWith('.sqlite'));
const dbPath = path.join(wranglerDir, dbFile);

console.log('📊 Generating Customer Excel Report...\n');
console.log('Database:', dbPath);

const db = new Database(dbPath);

// Helper function to generate password
function generatePassword(email, userId) {
  const hash = require('crypto').createHash('md5').update(email + userId).digest('hex');
  return hash.substring(0, 12);
}

// Get all orders with customer details
const orders = db.prepare(`
  SELECT 
    o.id,
    o.order_number,
    o.total,
    o.status,
    o.payment_status,
    o.shipping_id,
    o.tracking_id,
    o.shipping_status,
    o.estimated_delivery,
    o.created_at,
    o.shipping_address,
    u.id as user_id,
    u.name as customer_name,
    u.email,
    u.phone,
    u.address,
    u.city,
    u.state,
    u.pincode,
    oi.product_name,
    oi.price
  FROM orders o
  JOIN users u ON o.user_id = u.id
  LEFT JOIN order_items oi ON o.id = oi.order_id
  WHERE o.status = 'confirmed'
  ORDER BY o.id
`).all();

console.log(`Found ${orders.length} orders\n`);

// Prepare data for Excel
const excelData = orders.map((order, index) => {
  const password = generatePassword(order.email, order.user_id);
  
  return {
    'Sr. No.': index + 1,
    'Customer Name': order.customer_name,
    'Email': order.email,
    'Password': password,
    'Phone': order.phone || 'N/A',
    'Order Number': order.order_number,
    'Product': order.product_name,
    'Price (₹)': order.total,
    'Order Status': order.status.toUpperCase(),
    'Payment Status': order.payment_status.toUpperCase(),
    'Tracking ID': order.tracking_id,
    'Shipping ID': order.shipping_id,
    'Shipping Status': order.shipping_status || 'pending',
    'Pickup Date': 'Monday, January 26, 2026',
    'Address': order.address || 'N/A',
    'City': order.city || 'N/A',
    'State': order.state || 'N/A',
    'Pincode': order.pincode || 'N/A',
    'Login URL': 'https://flyqdrone.in/login',
    'Track URL': `https://flyqdrone.in/track-order?tracking=${order.tracking_id}`,
    'Order Date': new Date(order.created_at).toLocaleDateString('en-IN'),
    'Support Email': 'info@passion3dworld.com',
    'Support WhatsApp': '+91 9137361474',
    'WhatsApp Link': 'https://wa.me/919137361474'
  };
});

// Calculate totals
const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
const flyqAirCount = orders.filter(o => o.product_name === 'FLYQ Air').length;
const flyqVisionCount = orders.filter(o => o.product_name === 'FLYQ Vision').length;

// Add summary rows
excelData.push({});
excelData.push({
  'Sr. No.': '',
  'Customer Name': 'SUMMARY',
  'Email': '',
  'Password': '',
  'Phone': '',
  'Order Number': '',
  'Product': '',
  'Price (₹)': '',
  'Order Status': '',
  'Payment Status': '',
  'Tracking ID': '',
  'Shipping ID': '',
  'Shipping Status': '',
  'Pickup Date': '',
  'Address': '',
  'City': '',
  'State': '',
  'Pincode': '',
  'Login URL': '',
  'Track URL': '',
  'Order Date': ''
});
excelData.push({
  'Sr. No.': '',
  'Customer Name': 'Total Orders',
  'Email': orders.length,
  'Password': '',
  'Phone': '',
  'Order Number': '',
  'Product': '',
  'Price (₹)': '',
  'Order Status': '',
  'Payment Status': '',
  'Tracking ID': '',
  'Shipping ID': '',
  'Shipping Status': '',
  'Pickup Date': '',
  'Address': '',
  'City': '',
  'State': '',
  'Pincode': '',
  'Login URL': '',
  'Track URL': '',
  'Order Date': ''
});
excelData.push({
  'Sr. No.': '',
  'Customer Name': 'FLYQ Air Orders',
  'Email': flyqAirCount,
  'Password': '',
  'Phone': '',
  'Order Number': '',
  'Product': '',
  'Price (₹)': flyqAirCount * 7999,
  'Order Status': '',
  'Payment Status': '',
  'Tracking ID': '',
  'Shipping ID': '',
  'Shipping Status': '',
  'Pickup Date': '',
  'Address': '',
  'City': '',
  'State': '',
  'Pincode': '',
  'Login URL': '',
  'Track URL': '',
  'Order Date': ''
});
excelData.push({
  'Sr. No.': '',
  'Customer Name': 'FLYQ Vision Orders',
  'Email': flyqVisionCount,
  'Password': '',
  'Phone': '',
  'Order Number': '',
  'Product': '',
  'Price (₹)': flyqVisionCount * 11999,
  'Order Status': '',
  'Payment Status': '',
  'Tracking ID': '',
  'Shipping ID': '',
  'Shipping Status': '',
  'Pickup Date': '',
  'Address': '',
  'City': '',
  'State': '',
  'Pincode': '',
  'Login URL': '',
  'Track URL': '',
  'Order Date': ''
});
excelData.push({
  'Sr. No.': '',
  'Customer Name': 'Total Revenue (₹)',
  'Email': '',
  'Password': '',
  'Phone': '',
  'Order Number': '',
  'Product': '',
  'Price (₹)': totalRevenue,
  'Order Status': '',
  'Payment Status': '',
  'Tracking ID': '',
  'Shipping ID': '',
  'Shipping Status': '',
  'Pickup Date': '',
  'Address': '',
  'City': '',
  'State': '',
  'Pincode': '',
  'Login URL': '',
  'Track URL': '',
  'Order Date': ''
});

// Create workbook
const wb = XLSX.utils.book_new();
const ws = XLSX.utils.json_to_sheet(excelData);

// Set column widths
ws['!cols'] = [
  { wch: 8 },  // Sr. No.
  { wch: 25 }, // Customer Name
  { wch: 35 }, // Email
  { wch: 15 }, // Password
  { wch: 15 }, // Phone
  { wch: 30 }, // Order Number
  { wch: 15 }, // Product
  { wch: 12 }, // Price
  { wch: 15 }, // Order Status
  { wch: 15 }, // Payment Status
  { wch: 25 }, // Tracking ID
  { wch: 45 }, // Shipping ID
  { wch: 15 }, // Shipping Status
  { wch: 25 }, // Pickup Date
  { wch: 40 }, // Address
  { wch: 15 }, // City
  { wch: 15 }, // State
  { wch: 10 }, // Pincode
  { wch: 50 }, // Login URL
  { wch: 70 }, // Track URL
  { wch: 15 }, // Order Date
  { wch: 30 }, // Support Email
  { wch: 18 }, // Support WhatsApp
  { wch: 35 }  // WhatsApp Link
];

XLSX.utils.book_append_sheet(wb, ws, 'Customer Orders');

// Save file
const filename = `FLYQ_Customer_Orders_${new Date().toISOString().split('T')[0]}.xlsx`;
XLSX.writeFile(wb, filename);

console.log('✅ Excel file generated successfully!\n');
console.log('📄 Filename:', filename);
console.log('📊 Total Orders:', orders.length);
console.log('💰 Total Revenue: ₹' + totalRevenue.toLocaleString('en-IN'));
console.log('📦 FLYQ Air:', flyqAirCount, 'orders');
console.log('📦 FLYQ Vision:', flyqVisionCount, 'orders');
console.log('\n🎯 File saved to:', path.join(__dirname, filename));

db.close();
