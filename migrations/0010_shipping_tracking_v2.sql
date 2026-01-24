-- Shipping and Tracking System
-- Adds shipping information and tracking to orders

-- Add shipping columns to orders table (without UNIQUE constraint)
ALTER TABLE orders ADD COLUMN shipping_id TEXT;
ALTER TABLE orders ADD COLUMN tracking_id TEXT;
ALTER TABLE orders ADD COLUMN shipping_status TEXT DEFAULT 'pending';
ALTER TABLE orders ADD COLUMN shipping_carrier TEXT;
ALTER TABLE orders ADD COLUMN estimated_delivery TEXT;
ALTER TABLE orders ADD COLUMN shipped_at DATETIME;
ALTER TABLE orders ADD COLUMN delivered_at DATETIME;

-- Create shipping_updates table for tracking history
CREATE TABLE IF NOT EXISTS shipping_updates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  tracking_id TEXT NOT NULL,
  status TEXT NOT NULL,
  location TEXT,
  message TEXT,
  updated_by TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- Create indexes for shipping
CREATE INDEX IF NOT EXISTS idx_orders_tracking_id ON orders(tracking_id);
CREATE INDEX IF NOT EXISTS idx_orders_shipping_status ON orders(shipping_status);
CREATE INDEX IF NOT EXISTS idx_shipping_updates_order ON shipping_updates(order_id);
CREATE INDEX IF NOT EXISTS idx_shipping_updates_tracking ON shipping_updates(tracking_id);
