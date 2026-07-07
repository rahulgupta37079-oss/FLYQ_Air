-- Fix order with separate GST to GST-inclusive pricing
-- Order: FLYQ-1769360779114-CPFTQP (ID: 127)
-- Old: Subtotal ₹19,798.20 + Tax ₹3,563.68 + Shipping ₹234.82 = Total ₹23,596.70
-- New: Subtotal ₹19,798.20 (incl. GST) + Shipping ₹234.82 = Total ₹20,033.02

UPDATE orders
SET 
  tax = 0,
  total = subtotal + shipping
WHERE id = 127;

-- Verify the update
SELECT id, order_number, subtotal, tax, shipping, total 
FROM orders 
WHERE id = 127;
