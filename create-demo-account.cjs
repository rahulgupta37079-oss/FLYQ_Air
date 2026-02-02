// Create demo account for testing
const crypto = require('crypto');

// Demo account credentials
const demoEmail = 'demo@flyqdrones.com';
const demoPassword = 'Demo@123456';
const demoName = 'Demo User';

// Hash password (same method as your app)
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

const hashedPassword = hashPassword(demoPassword);

console.log('=== DEMO ACCOUNT CREDENTIALS ===');
console.log('Email:', demoEmail);
console.log('Password:', demoPassword);
console.log('Name:', demoName);
console.log('Hashed Password:', hashedPassword);
console.log('\n=== SQL TO CREATE ACCOUNT ===');

const sql = `
-- Create demo user account
INSERT OR REPLACE INTO users (email, password, name, created_at) 
VALUES ('${demoEmail}', '${hashedPassword}', '${demoName}', datetime('now'));

-- Get the user ID (will be used for orders)
-- Run this to get the ID: SELECT id FROM users WHERE email = '${demoEmail}';

-- Create demo order 1 (FLYQ Air - Delivered)
INSERT OR REPLACE INTO orders (
  user_id, 
  order_number, 
  tracking_id,
  total, 
  status, 
  shipping_status,
  shipping_address,
  created_at
) VALUES (
  (SELECT id FROM users WHERE email = '${demoEmail}'),
  'FLYQ-DEMO-001-AIR',
  'TRK1234567890DEMO1',
  7999.00,
  'paid',
  'delivered',
  'Demo House, 123 MG Road, Koramangala, Bangalore, Karnataka, 560034, India',
  datetime('now', '-15 days')
);

-- Create order item for demo order 1
INSERT OR REPLACE INTO order_items (
  order_id,
  product_id,
  quantity,
  price
) VALUES (
  (SELECT id FROM orders WHERE order_number = 'FLYQ-DEMO-001-AIR'),
  1,
  1,
  7999.00
);

-- Create demo order 2 (FLYQ Vision - In Transit)
INSERT OR REPLACE INTO orders (
  user_id,
  order_number,
  tracking_id,
  total,
  status,
  shipping_status,
  shipping_address,
  created_at
) VALUES (
  (SELECT id FROM users WHERE email = '${demoEmail}'),
  'FLYQ-DEMO-002-VISION',
  'TRK9876543210DEMO2',
  11999.00,
  'paid',
  'shipped',
  'Demo Apartment, 456 HSR Layout, Sector 1, Bangalore, Karnataka, 560102, India',
  datetime('now', '-3 days')
);

-- Create order item for demo order 2
INSERT OR REPLACE INTO order_items (
  order_id,
  product_id,
  quantity,
  price
) VALUES (
  (SELECT id FROM orders WHERE order_number = 'FLYQ-DEMO-002-VISION'),
  2,
  1,
  11999.00
);

-- Create demo order 3 (FLYQ Air x2 - Processing)
INSERT OR REPLACE INTO orders (
  user_id,
  order_number,
  tracking_id,
  total,
  status,
  shipping_status,
  shipping_address,
  created_at
) VALUES (
  (SELECT id FROM users WHERE email = '${demoEmail}'),
  'FLYQ-DEMO-003-AIR2',
  'TRK5555666677DEMO3',
  15998.00,
  'paid',
  'pending',
  'Demo Office, 789 Whitefield, ITPL Main Road, Bangalore, Karnataka, 560066, India',
  datetime('now', '-1 days')
);

-- Create order item for demo order 3
INSERT OR REPLACE INTO order_items (
  order_id,
  product_id,
  quantity,
  price
) VALUES (
  (SELECT id FROM orders WHERE order_number = 'FLYQ-DEMO-003-AIR2'),
  1,
  2,
  7999.00
);
`;

console.log(sql);

console.log('\n=== USAGE INSTRUCTIONS ===');
console.log('1. Run the SQL commands above in your D1 database');
console.log('2. Login at: https://flyqdrone.in/login');
console.log('3. Email:', demoEmail);
console.log('4. Password:', demoPassword);
console.log('\n=== TEST TRACKING LINKS ===');
console.log('Order 1 (Delivered):', 'https://flyqdrone.in/track/TRK1234567890DEMO1');
console.log('Order 2 (In Transit):', 'https://flyqdrone.in/track/TRK9876543210DEMO2');
console.log('Order 3 (Processing):', 'https://flyqdrone.in/track/TRK5555666677DEMO3');

