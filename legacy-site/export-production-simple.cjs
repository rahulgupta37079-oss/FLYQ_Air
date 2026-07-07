const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Find the local database file
const dbDir = '.wrangler/state/v3/d1/miniflare-D1DatabaseObject';
const files = fs.readdirSync(dbDir);
const sqliteFile = files.find(f => f.endsWith('.sqlite'));
const dbPath = path.join(dbDir, sqliteFile);

console.log('📂 Database:', dbPath);

const db = new Database(dbPath);

// Get all customer orders
const customers = db.prepare(`
  SELECT 
    u.id as user_id,
    u.email,
    u.password_hash,
    u.name,
    u.phone,
    u.address,
    u.city,
    u.state,
    u.pincode,
    u.created_at as user_created_at,
    u.updated_at as user_updated_at,
    o.id as order_id,
    o.order_number,
    o.status as order_status,
    o.payment_status,
    o.total,
    o.tracking_id,
    o.shipping_id,
    o.shipping_status,
    o.estimated_delivery,
    o.created_at as order_created_at,
    o.updated_at as order_updated_at,
    oi.id as order_item_id,
    oi.product_name,
    oi.quantity,
    oi.price,
    oi.created_at as item_created_at,
    oi.updated_at as item_updated_at
  FROM users u
  INNER JOIN orders o ON u.id = o.user_id
  INNER JOIN order_items oi ON o.id = oi.order_id
  WHERE u.is_admin = 0
  ORDER BY o.id
`).all();

console.log(`\n📊 Found ${customers.length} customer orders\n`);

// Generate SQL
const sqlStatements = [];
sqlStatements.push('-- Production Import Script');
sqlStatements.push('-- Generated: ' + new Date().toISOString());
sqlStatements.push('PRAGMA foreign_keys = OFF;');
sqlStatements.push('');

const processedUsers = new Set();
const processedOrders = new Set();

customers.forEach((row) => {
  // Insert user
  if (!processedUsers.has(row.user_id)) {
    const name = row.name ? row.name.replace(/'/g, "''") : '';
    const phone = row.phone && row.phone !== 'null' ? `'${row.phone}'` : 'NULL';
    const address = row.address && row.address !== 'null' ? `'${row.address.replace(/'/g, "''")}'` : 'NULL';
    const city = row.city && row.city !== 'null' ? `'${row.city}'` : 'NULL';
    const state = row.state && row.state !== 'null' ? `'${row.state}'` : 'NULL';
    const pincode = row.pincode && row.pincode !== 'null' ? `'${row.pincode}'` : 'NULL';
    
    sqlStatements.push(`-- User: ${name} (${row.email})`);
    sqlStatements.push(
      `INSERT OR REPLACE INTO users (id, email, password_hash, name, phone, address, city, state, pincode, is_admin, created_at, updated_at) ` +
      `VALUES (${row.user_id}, '${row.email}', '${row.password_hash}', '${name}', ${phone}, ${address}, ${city}, ${state}, ${pincode}, 0, '${row.user_created_at}', '${row.user_updated_at}');`
    );
    processedUsers.add(row.user_id);
  }
  
  // Insert order
  if (!processedOrders.has(row.order_id)) {
    const tracking_id = row.tracking_id && row.tracking_id !== 'null' ? `'${row.tracking_id}'` : 'NULL';
    const shipping_id = row.shipping_id && row.shipping_id !== 'null' ? `'${row.shipping_id}'` : 'NULL';
    const shipping_status = row.shipping_status || 'pending';
    const estimated_delivery = row.estimated_delivery || '2026-01-26';
    
    sqlStatements.push(
      `INSERT OR REPLACE INTO orders (id, user_id, order_number, status, payment_status, total, subtotal, tracking_id, shipping_id, shipping_status, estimated_delivery, created_at, updated_at) ` +
      `VALUES (${row.order_id}, ${row.user_id}, '${row.order_number}', '${row.order_status}', '${row.payment_status}', ${row.total}, ${row.total}, ${tracking_id}, ${shipping_id}, '${shipping_status}', '${estimated_delivery}', '${row.order_created_at}', '${row.order_updated_at}');`
    );
    processedOrders.add(row.order_id);
  }
  
  // Insert order item
  const product_name = row.product_name.replace(/'/g, "''");
  sqlStatements.push(
    `INSERT OR REPLACE INTO order_items (id, order_id, product_name, quantity, price, created_at, updated_at) ` +
    `VALUES (${row.order_item_id}, ${row.order_id}, '${product_name}', ${row.quantity}, ${row.price}, '${row.item_created_at}', '${row.item_updated_at}');`
  );
  
  sqlStatements.push('');
});

sqlStatements.push('PRAGMA foreign_keys = ON;');
sqlStatements.push('');
sqlStatements.push(`-- Import Summary:`);
sqlStatements.push(`-- Total Users: ${processedUsers.size}`);
sqlStatements.push(`-- Total Orders: ${processedOrders.size}`);
sqlStatements.push(`-- Total Order Items: ${customers.length}`);

// Write to file
const outputFile = 'production-import.sql';
fs.writeFileSync(outputFile, sqlStatements.join('\n'));

console.log(`✅ Generated SQL export:`);
console.log(`   📄 File: ${outputFile}`);
console.log(`   👥 Users: ${processedUsers.size}`);
console.log(`   📦 Orders: ${processedOrders.size}`);
console.log(`   📋 Order Items: ${customers.length}`);
console.log(`\n🚀 To import to production, run:`);
console.log(`   npx wrangler d1 execute webapp-production --remote --file=./production-import.sql`);

db.close();
