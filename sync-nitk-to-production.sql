-- Insert NITK user with password hash
INSERT INTO users (id, email, password_hash, name, phone, address, city, state, pincode, is_admin, created_at, updated_at)
VALUES (69, 'csd.ra01@nitk.edu.in', '$2b$10$5HyZLc6gTEmwKJSKpIFuiuxRv2Df18ymzkKN3vS/JDeCFfmDwFVWi', 
        'Director NITK', '7899421596', 
        'National Institute of Technology Karnataka (NITK), NH 66, Srinivasnagar Post, Surathkal, Mangalore, Karnataka - 575 025',
        'Mangalore', 'Karnataka', '575025', 0, datetime('now'), datetime('now'))
ON CONFLICT(id) DO UPDATE SET 
  email = excluded.email,
  password_hash = excluded.password_hash,
  name = excluded.name,
  phone = excluded.phone,
  address = excluded.address,
  city = excluded.city,
  state = excluded.state,
  pincode = excluded.pincode;

-- Insert NITK order
INSERT INTO orders (id, user_id, order_number, status, total, subtotal, tax, shipping, payment_status, payment_method, 
                    shipping_address, billing_address, tracking_id, shipping_id, shipping_status, shipping_carrier, 
                    estimated_delivery, created_at, updated_at)
VALUES (127, 69, 'FLYQ-1769360779114-CPFTQP', 'confirmed', 23596.70, 19798.20, 3563.68, 234.82, 'cod', 'cod',
        'National Institute of Technology Karnataka (NITK), NH 66, Srinivasnagar Post, Surathkal, Mangalore, Karnataka - 575 025',
        'National Institute of Technology Karnataka (NITK), NH 66, Srinivasnagar Post, Surathkal, Mangalore, Karnataka - 575 025',
        'TRK1769360779114MZIP0UZ4', 'SHIP-FLYQ-1769360779114-CPFTQP-1769360779114', 'pending', 'FLYQ Express',
        '2026-02-01', datetime('now'), datetime('now'))
ON CONFLICT(id) DO UPDATE SET
  order_number = excluded.order_number,
  status = excluded.status,
  total = excluded.total,
  subtotal = excluded.subtotal,
  tax = excluded.tax,
  shipping = excluded.shipping,
  tracking_id = excluded.tracking_id;

-- Insert NITK order items
INSERT INTO order_items (order_id, product_id, product_name, quantity, price, created_at)
VALUES (127, 2, 'FLYQ Vision - ESP32-S3 Camera Drone with HD Video Streaming', 2, 10999, datetime('now'));
