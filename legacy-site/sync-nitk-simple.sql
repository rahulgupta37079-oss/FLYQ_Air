-- Insert NITK user
INSERT INTO users (email, password_hash, name, phone, address, city, state, pincode, is_admin, created_at, updated_at)
VALUES ('csd.ra01@nitk.edu.in', '$2b$10$5HyZLc6gTEmwKJSKpIFuiuxRv2Df18ymzkKN3vS/JDeCFfmDwFVWi', 
        'Director NITK', '7899421596', 
        'National Institute of Technology Karnataka (NITK), NH 66, Srinivasnagar Post, Surathkal, Mangalore, Karnataka - 575 025',
        'Mangalore', 'Karnataka', '575025', 0, datetime('now'), datetime('now'));

-- Insert NITK order (using only common columns)
INSERT INTO orders (user_id, order_number, status, total, subtotal, tax, shipping, payment_status, payment_method, 
                    shipping_address, billing_address, tracking_id, shipping_id, shipping_status, 
                    estimated_delivery, created_at, updated_at)
SELECT 
  (SELECT id FROM users WHERE email = 'csd.ra01@nitk.edu.in'), 
  'FLYQ-1769360779114-CPFTQP', 'confirmed', 23596.70, 19798.20, 3563.68, 234.82, 'cod', 'cod',
  'National Institute of Technology Karnataka (NITK), NH 66, Srinivasnagar Post, Surathkal, Mangalore, Karnataka - 575 025',
  'National Institute of Technology Karnataka (NITK), NH 66, Srinivasnagar Post, Surathkal, Mangalore, Karnataka - 575 025',
  'TRK1769360779114MZIP0UZ4', 'SHIP-FLYQ-1769360779114-CPFTQP-1769360779114', 'pending',
  '2026-02-01', datetime('now'), datetime('now');

-- Insert NITK order items
INSERT INTO order_items (order_id, product_id, product_name, quantity, price, created_at)
SELECT 
  (SELECT id FROM orders WHERE order_number = 'FLYQ-1769360779114-CPFTQP'), 
  2, 'FLYQ Vision - ESP32-S3 Camera Drone with HD Video Streaming', 2, 10999, datetime('now');
