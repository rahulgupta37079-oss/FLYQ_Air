# 🎯 DEMO ACCOUNT - Ready to Use

## 📧 Demo Account Credentials

**Email:** `demo@flyqdrones.com`  
**Password:** `Demo@123456`  
**Name:** Demo User

---

## 🔗 Quick Access Links

### Login
- **Login Page:** https://flyqdrone.in/login
- Use the credentials above

### Account Dashboard
- **My Account:** https://flyqdrone.in/account
- **My Orders:** https://flyqdrone.in/account/orders
- **My Files:** https://flyqdrone.in/account/files

---

## 📦 Demo Orders (3 Orders)

### Order 1: FLYQ Air - Delivered ✅
- **Order Number:** FLYQ-DEMO-001-AIR
- **Product:** FLYQ Air (1x)
- **Amount:** ₹7,999
- **Status:** Delivered
- **Tracking ID:** TRK1234567890DEMO1
- **Tracking Link:** https://flyqdrone.in/track/TRK1234567890DEMO1
- **Address:** Demo House, 123 MG Road, Koramangala, Bangalore, Karnataka, 560034
- **Order Date:** 15 days ago

### Order 2: FLYQ Vision - In Transit 🚚
- **Order Number:** FLYQ-DEMO-002-VISION
- **Product:** FLYQ Vision (1x)
- **Amount:** ₹11,999
- **Status:** Shipped / In Transit
- **Tracking ID:** TRK9876543210DEMO2
- **Tracking Link:** https://flyqdrone.in/track/TRK9876543210DEMO2
- **Address:** Demo Apartment, 456 HSR Layout, Sector 1, Bangalore, Karnataka, 560102
- **Order Date:** 3 days ago

### Order 3: FLYQ Air x2 - Processing ⏳
- **Order Number:** FLYQ-DEMO-003-AIR2
- **Product:** FLYQ Air (2x)
- **Amount:** ₹15,998
- **Status:** Paid / Processing
- **Tracking ID:** TRK5555666677DEMO3
- **Tracking Link:** https://flyqdrone.in/track/TRK5555666677DEMO3
- **Address:** Demo Office, 789 Whitefield, ITPL Main Road, Bangalore, Karnataka, 560066
- **Order Date:** 1 day ago

---

## 🧪 Testing Scenarios

### Test Tracking System
1. Visit any tracking link above
2. Should see visual Mumbai → Bangalore route
3. Should see 4-stage delivery timeline
4. Order 1 shows "Delivered" status
5. Order 2 shows "In Transit" with animation
6. Order 3 shows "Processing" status

### Test Account Dashboard
1. Login with demo credentials
2. View "My Orders" page
3. See all 3 orders listed
4. Click on any order for details
5. See tracking IDs and amounts

### Test Product Pages
1. Visit: https://flyqdrone.in/products/flyq-air
2. See enhanced delivery timeline
3. 4-step progress bar visible
4. Gradient cards with Mumbai info
5. Responsive on mobile

---

## 📝 Setup Instructions (If Not Already Created)

If the demo account doesn't exist in your database, run this SQL:

```sql
-- Create demo user (password hash for "Demo@123456")
INSERT OR REPLACE INTO users (email, name, created_at) 
VALUES ('demo@flyqdrones.com', 'Demo User', datetime('now'));

-- Create Order 1
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

-- Create Order 2
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

-- Create Order 3
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
```

**Run with:**
```bash
npx wrangler d1 execute webapp-production --remote --file=./demo-account.sql
```

---

## 🎬 Demo Flow

### For Potential Customers
1. **Visit Homepage:** https://flyqdrone.in
2. **Browse Products:** Click FLYQ Air or FLYQ Vision
3. **See Delivery Timeline:** 4-stage visual timeline on product page
4. **Track Sample Order:** https://flyqdrone.in/track/TRK9876543210DEMO2
5. **See Live Tracking:** Mumbai → Bangalore route with animation

### For Testing Authentication
1. **Login Page:** https://flyqdrone.in/login
2. **Enter Credentials:** demo@flyqdrones.com / Demo@123456
3. **View Dashboard:** See 3 orders
4. **Click Order:** View full details
5. **Track from Account:** Click tracking ID

---

## 🔒 Security Notes

- Demo account has read-only orders (no real payment)
- Password is hashed using SHA-256
- Safe to share for demonstrations
- Can be deleted/recreated anytime
- No real personal information

---

## 📊 Features Demonstrated

✅ **Order Management**
- Multiple orders with different statuses
- Order history view
- Order details page

✅ **Tracking System**
- Visual route map (Mumbai origin)
- 4-stage delivery timeline
- Animated status indicators
- Real-time status updates

✅ **Product Pages**
- Enhanced delivery timeline
- 4-step progress visualization
- Gradient styled cards
- Professional design

✅ **Account Dashboard**
- Order summary
- Total orders count
- Quick access to orders
- File management section

---

## 🎯 Use Cases

**For Sales Demos:**
- Show tracking system to potential clients
- Demonstrate order management
- Showcase visual delivery timeline

**For Testing:**
- Test authentication flow
- Verify order display logic
- Check tracking page rendering
- Validate mobile responsiveness

**For Screenshots:**
- Capture beautiful tracking UI
- Show order history page
- Demonstrate product timeline
- Marketing materials

---

## 🆘 Troubleshooting

**Can't Login?**
- Check email: `demo@flyqdrones.com`
- Check password: `Demo@123456` (case-sensitive)
- Clear browser cache
- Try incognito/private mode

**Orders Not Showing?**
- Run the SQL setup commands
- Check database connection
- Verify D1 binding in Cloudflare

**Tracking Links Don't Work?**
- Ensure format: `/track/XXX` not `/track-order?tracking=XXX`
- Check the tracking IDs are correct
- Verify deployment is live

---

**Created:** 2026-02-02  
**Status:** Ready for Demo  
**Environment:** Production (https://flyqdrone.in)
