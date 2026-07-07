const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

console.log('📊 SYNCING LOCAL DATABASE TO PRODUCTION\n');

// Find the local SQLite database file
const wranglerDir = path.join(__dirname, '.wrangler/state/v3/d1/miniflare-D1DatabaseObject');
const files = fs.readdirSync(wranglerDir);
const dbFile = files.find(f => f.endsWith('.sqlite'));
const dbPath = path.join(wranglerDir, dbFile);

console.log('Database:', dbPath, '\n');

const db = new Database(dbPath);

// Get all users (non-admin)
const users = db.prepare(`
  SELECT id, email, password_hash, name, phone, address, city, state, pincode, created_at
  FROM users 
  WHERE is_admin = 0
  ORDER BY id
`).all();

console.log(`📧 Found ${users.length} users\n`);

// Get all orders
const orders = db.prepare(`
  SELECT id, user_id, order_number, status, total, subtotal, tax, shipping,
         payment_id, payment_status, payment_method, shipping_address, billing_address,
         notes, created_at, shipping_id, tracking_id, shipping_status, shipping_carrier,
         estimated_delivery
  FROM orders
  WHERE status = 'confirmed'
  ORDER BY id
`).all();

console.log(`📦 Found ${orders.length} orders\n`);

// Get all order items
const orderItems = db.prepare(`
  SELECT id, order_id, product_name, quantity, price, created_at
  FROM order_items
`).all();

console.log(`📋 Found ${orderItems.length} order items\n`);

// Generate SQL INSERT statements
let sql = `-- FLYQ Database Sync Script
-- Generated: ${new Date().toISOString()}
-- Purpose: Sync local database to production

-- =====================================================
-- USERS (${users.length} records)
-- =====================================================

`;

for (const user of users) {
  const email = (user.email || '').replace(/'/g, "''");
  const passwordHash = (user.password_hash || '').replace(/'/g, "''");
  const name = (user.name || '').replace(/'/g, "''");
  const phone = user.phone && user.phone !== 'null' ? user.phone : null;
  const address = user.address && user.address !== 'null' ? (user.address || '').replace(/'/g, "''") : null;
  const city = user.city && user.city !== 'null' ? (user.city || '').replace(/'/g, "''") : null;
  const state = user.state && user.state !== 'null' ? (user.state || '').replace(/'/g, "''") : null;
  const pincode = user.pincode && user.pincode !== 'null' ? user.pincode : null;
  
  sql += `INSERT OR REPLACE INTO users (id, email, password_hash, name, phone, address, city, state, pincode, is_admin, created_at, updated_at)
VALUES (${user.id}, '${email}', '${passwordHash}', '${name}', ${phone ? `'${phone}'` : 'NULL'}, ${address ? `'${address}'` : 'NULL'}, ${city ? `'${city}'` : 'NULL'}, ${state ? `'${state}'` : 'NULL'}, ${pincode ? `'${pincode}'` : 'NULL'}, 0, '${user.created_at}', '${user.created_at}');\n`;
}

sql += `\n-- =====================================================
-- ORDERS (${orders.length} records)
-- =====================================================\n\n`;

for (const order of orders) {
  const orderNumber = (order.order_number || '').replace(/'/g, "''");
  const shippingAddress = order.shipping_address ? (order.shipping_address || '').replace(/'/g, "''") : null;
  const billingAddress = order.billing_address ? (order.billing_address || '').replace(/'/g, "''") : null;
  const notes = order.notes ? (order.notes || '').replace(/'/g, "''") : null;
  const shippingId = order.shipping_id ? (order.shipping_id || '').replace(/'/g, "''") : null;
  const trackingId = order.tracking_id ? (order.tracking_id || '').replace(/'/g, "''") : null;
  const shippingStatus = order.shipping_status ? order.shipping_status : 'pending';
  const shippingCarrier = order.shipping_carrier ? order.shipping_carrier : null;
  const paymentMethod = order.payment_method ? order.payment_method : 'online';
  const estimatedDelivery = order.estimated_delivery ? order.estimated_delivery : null;
  
  sql += `INSERT OR REPLACE INTO orders (id, user_id, order_number, status, total, subtotal, tax, shipping, payment_id, payment_status, payment_method, shipping_address, billing_address, notes, created_at, updated_at, shipping_id, tracking_id, shipping_status, shipping_carrier, estimated_delivery)
VALUES (${order.id}, ${order.user_id}, '${orderNumber}', '${order.status}', ${order.total}, ${order.subtotal || order.total}, ${order.tax || 0}, ${order.shipping || 0}, ${order.payment_id ? `'${order.payment_id}'` : 'NULL'}, '${order.payment_status}', '${paymentMethod}', ${shippingAddress ? `'${shippingAddress}'` : 'NULL'}, ${billingAddress ? `'${billingAddress}'` : 'NULL'}, ${notes ? `'${notes}'` : 'NULL'}, '${order.created_at}', '${order.created_at}', ${shippingId ? `'${shippingId}'` : 'NULL'}, ${trackingId ? `'${trackingId}'` : 'NULL'}, '${shippingStatus}', ${shippingCarrier ? `'${shippingCarrier}'` : 'NULL'}, ${estimatedDelivery ? `'${estimatedDelivery}'` : 'NULL'});\n`;
}

sql += `\n-- =====================================================
-- ORDER ITEMS (${orderItems.length} records)
-- =====================================================\n\n`;

for (const item of orderItems) {
  const productName = (item.product_name || '').replace(/'/g, "''");
  
  sql += `INSERT OR REPLACE INTO order_items (id, order_id, product_name, quantity, price, created_at)
VALUES (${item.id}, ${item.order_id}, '${productName}', ${item.quantity}, ${item.price}, '${item.created_at}');\n`;
}

sql += `\n-- =====================================================
-- SUMMARY
-- =====================================================
-- Users: ${users.length}
-- Orders: ${orders.length}
-- Order Items: ${orderItems.length}
-- Total Revenue: ₹${orders.reduce((sum, o) => sum + o.total, 0).toLocaleString('en-IN')}
-- =====================================================
`;

// Save SQL file
const sqlFilePath = path.join(__dirname, 'sync-to-production.sql');
fs.writeFileSync(sqlFilePath, sql);

console.log('✅ SQL sync script generated!\n');
console.log('📄 File:', sqlFilePath);
console.log('📊 Summary:');
console.log('   - Users:', users.length);
console.log('   - Orders:', orders.length);
console.log('   - Order Items:', orderItems.length);
console.log('\n🚀 To sync to production, run:');
console.log('   npx wrangler d1 execute webapp-production --remote --file=./sync-to-production.sql\n');

db.close();
