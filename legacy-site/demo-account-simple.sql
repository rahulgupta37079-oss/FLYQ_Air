-- Create demo user (without password - handled by authentication system)
INSERT OR REPLACE INTO users (email, name, created_at) 
VALUES ('demo@flyqdrones.com', 'Demo User', datetime('now'));

-- Create demo order 1 (FLYQ Air - Delivered)
INSERT OR REPLACE INTO orders (
  user_id, order_number, tracking_id, total, 
  status, shipping_status, shipping_address, created_at
) VALUES (
  (SELECT id FROM users WHERE email = 'demo@flyqdrones.com'),
  'FLYQ-DEMO-001-AIR', 'TRK1234567890DEMO1', 7999.00,
  'paid', 'delivered',
  'Demo House, 123 MG Road, Koramangala, Bangalore, Karnataka, 560034, India',
  datetime('now', '-15 days')
);

INSERT OR REPLACE INTO order_items (order_id, product_id, quantity, price)
VALUES (
  (SELECT id FROM orders WHERE order_number = 'FLYQ-DEMO-001-AIR'),
  1, 1, 7999.00
);

-- Create demo order 2 (FLYQ Vision - In Transit)
INSERT OR REPLACE INTO orders (
  user_id, order_number, tracking_id, total,
  status, shipping_status, shipping_address, created_at
) VALUES (
  (SELECT id FROM users WHERE email = 'demo@flyqdrones.com'),
  'FLYQ-DEMO-002-VISION', 'TRK9876543210DEMO2', 11999.00,
  'paid', 'shipped',
  'Demo Apartment, 456 HSR Layout, Sector 1, Bangalore, Karnataka, 560102, India',
  datetime('now', '-3 days')
);

INSERT OR REPLACE INTO order_items (order_id, product_id, quantity, price)
VALUES (
  (SELECT id FROM orders WHERE order_number = 'FLYQ-DEMO-002-VISION'),
  2, 1, 11999.00
);

-- Create demo order 3 (FLYQ Air x2 - Processing)
INSERT OR REPLACE INTO orders (
  user_id, order_number, tracking_id, total,
  status, shipping_status, shipping_address, created_at
) VALUES (
  (SELECT id FROM users WHERE email = 'demo@flyqdrones.com'),
  'FLYQ-DEMO-003-AIR2', 'TRK5555666677DEMO3', 15998.00,
  'paid', 'pending',
  'Demo Office, 789 Whitefield, ITPL Main Road, Bangalore, Karnataka, 560066, India',
  datetime('now', '-1 days')
);

INSERT OR REPLACE INTO order_items (order_id, product_id, quantity, price)
VALUES (
  (SELECT id FROM orders WHERE order_number = 'FLYQ-DEMO-003-AIR2'),
  1, 2, 7999.00
);
