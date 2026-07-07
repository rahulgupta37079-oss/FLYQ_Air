const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const fs = require('fs');

// Calculate pricing
const unitPrice = 10999;
const quantity = 2;
const subtotal = unitPrice * quantity; // 21998
const discount = subtotal * 0.10; // 2199.8 (10% discount)
const afterDiscount = subtotal - discount; // 19798.2

// GST is 18% of the discounted amount
const gstAmount = afterDiscount * 0.18; // 3563.68
const totalWithGST = afterDiscount + gstAmount; // 23361.88

// COD charges
const codCharges = 199;
const codGST = codCharges * 0.18; // 35.82
const totalCOD = codCharges + codGST; // 234.82

const grandTotal = totalWithGST + totalCOD; // 23596.70

console.log('\n=== PRICE CALCULATION ===');
console.log(`Unit Price: ₹${unitPrice}`);
console.log(`Quantity: ${quantity}`);
console.log(`Subtotal: ₹${subtotal}`);
console.log(`Discount (10%): -₹${discount.toFixed(2)}`);
console.log(`After Discount: ₹${afterDiscount.toFixed(2)}`);
console.log(`GST (18%): ₹${gstAmount.toFixed(2)}`);
console.log(`Total with GST: ₹${totalWithGST.toFixed(2)}`);
console.log(`COD Charges: ₹${codCharges}`);
console.log(`COD GST (18%): ₹${codGST.toFixed(2)}`);
console.log(`Total COD: ₹${totalCOD.toFixed(2)}`);
console.log(`GRAND TOTAL: ₹${grandTotal.toFixed(2)}`);

// Customer details
const customer = {
  name: 'Director NITK',
  email: 'csd.ra01@nitk.edu.in',
  phone: '7899421596',
  address: 'National Institute of Technology Karnataka (NITK), NH 66, Srinivasnagar Post, Surathkal, Mangalore, Karnataka - 575 025',
  city: 'Mangalore',
  state: 'Karnataka',
  pincode: '575025'
};

// Generate password
const password = Math.random().toString(36).slice(-12);
const passwordHash = bcrypt.hashSync(password, 10);

// Generate order number and tracking
const timestamp = Date.now();
const orderNumber = `FLYQ-${timestamp}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
const trackingId = `TRK${timestamp}${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
const shippingId = `SHIP-${orderNumber}-${Date.now()}`;

console.log('\n=== ORDER DETAILS ===');
console.log(`Order Number: ${orderNumber}`);
console.log(`Tracking ID: ${trackingId}`);
console.log(`Shipping ID: ${shippingId}`);
console.log(`Customer: ${customer.name}`);
console.log(`Email: ${customer.email}`);
console.log(`Phone: ${customer.phone}`);
console.log(`Password: ${password}`);

// Connect to database
const dbPath = '.wrangler/state/v3/d1/miniflare-D1DatabaseObject/afa7148f2ef3768e9903aefc027a20bcbc26b08ab1a4fc0c79e61ff81e408a0f.sqlite';
const db = new Database(dbPath);

try {
  // Insert user
  const insertUser = db.prepare(`
    INSERT INTO users (email, password_hash, name, phone, address, city, state, pincode, is_admin, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, datetime('now'), datetime('now'))
  `);
  
  const userResult = insertUser.run(
    customer.email,
    passwordHash,
    customer.name,
    customer.phone,
    customer.address,
    customer.city,
    customer.state,
    customer.pincode
  );
  
  const userId = userResult.lastInsertRowid;
  console.log(`\n✅ User created with ID: ${userId}`);

  // Insert order
  const insertOrder = db.prepare(`
    INSERT INTO orders (
      user_id, order_number, status, total, subtotal, tax, shipping,
      payment_status, payment_method, shipping_address, billing_address,
      tracking_id, shipping_id, shipping_status, shipping_carrier,
      estimated_delivery, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
  `);
  
  const orderResult = insertOrder.run(
    userId,
    orderNumber,
    'confirmed',
    Math.round(grandTotal * 100) / 100,
    Math.round(afterDiscount * 100) / 100,
    Math.round(gstAmount * 100) / 100,
    Math.round(totalCOD * 100) / 100,
    'cod',
    'cod',
    customer.address,
    customer.address,
    trackingId,
    shippingId,
    'pending',
    'FLYQ Express',
    '2026-02-01'
  );
  
  const orderId = orderResult.lastInsertRowid;
  console.log(`✅ Order created with ID: ${orderId}`);

  // Insert order items
  const insertOrderItem = db.prepare(`
    INSERT INTO order_items (order_id, product_id, product_name, quantity, price, created_at)
    VALUES (?, ?, ?, ?, ?, datetime('now'))
  `);
  
  insertOrderItem.run(
    orderId,
    2, // FLYQ Vision product_id
    'FLYQ Vision - ESP32-S3 Camera Drone with HD Video Streaming',
    quantity,
    unitPrice
  );
  
  console.log(`✅ Order items created`);

  // Export for email
  const exportData = {
    customer: {
      ...customer,
      password: password
    },
    order: {
      id: orderId,
      orderNumber: orderNumber,
      trackingId: trackingId,
      total: grandTotal,
      subtotal: afterDiscount,
      gst: gstAmount,
      codCharges: totalCOD,
      discount: discount,
      unitPrice: unitPrice,
      quantity: quantity,
      status: 'confirmed',
      paymentStatus: 'cod',
      estimatedDelivery: '2026-02-01'
    },
    pricing: {
      unitPrice,
      quantity,
      subtotal,
      discount: Math.round(discount * 100) / 100,
      afterDiscount: Math.round(afterDiscount * 100) / 100,
      gstAmount: Math.round(gstAmount * 100) / 100,
      totalWithGST: Math.round(totalWithGST * 100) / 100,
      codCharges,
      codGST: Math.round(codGST * 100) / 100,
      totalCOD: Math.round(totalCOD * 100) / 100,
      grandTotal: Math.round(grandTotal * 100) / 100
    }
  };

  fs.writeFileSync('nitk-order-data.json', JSON.stringify(exportData, null, 2));
  console.log('\n✅ Order data exported to nitk-order-data.json');
  
  console.log('\n=== SUMMARY ===');
  console.log(`Order ID: ${orderId}`);
  console.log(`User ID: ${userId}`);
  console.log(`Order Number: ${orderNumber}`);
  console.log(`Tracking ID: ${trackingId}`);
  console.log(`Total Amount: ₹${Math.round(grandTotal * 100) / 100}`);
  console.log(`Email: ${customer.email}`);
  console.log(`Password: ${password}`);
  
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
} finally {
  db.close();
}
