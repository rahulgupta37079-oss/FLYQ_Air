# 📦 Bulk Customer Import System

## Overview

Comprehensive bulk import system for importing Nov-Dec 2025 customer orders with automatic account creation, order generation, and email notifications.

## Features

✅ **Automated Account Creation** - 63 user accounts with secure passwords  
✅ **Order Generation** - Paid orders with manual transaction IDs  
✅ **Old Pricing** - ₹4,999 for FLYQ Air, ₹8,999 for FLYQ Vision  
✅ **Shipping IDs** - Auto-generated shipping and tracking numbers  
✅ **Monday Pickup** - Scheduled pickup dates with delivery estimates  
✅ **Email Notifications** - Beautiful HTML emails with order confirmation  
✅ **Progress Tracking** - Real-time import progress UI  
✅ **Error Handling** - Success/failure reporting for each customer  

## Access

### Admin Interface
**URL:** https://3000-i9dkuxqg07opw1sw23plt-d0b9e1e2.sandbox.novita.ai/admin/bulk-import

**Production:** https://abf76357.flyq-air.pages.dev/admin/bulk-import

### Login Credentials
- **Email:** admin@flyq.com
- **Password:** Admin@123

## Import Summary

### Customer Data (Nov-Dec 2025)
- **Total Customers:** 63
- **FLYQ Air Orders:** 45 × ₹4,999 = ₹2,24,955
- **FLYQ Vision Orders:** 18 × ₹8,999 = ₹1,61,982
- **Total Revenue:** ₹3,86,937

### What Happens During Import

1. **Create User Accounts**
   - 63 user accounts with secure hashed passwords
   - Email, name, phone, address stored
   
2. **Generate Paid Orders**
   - Orders marked as "confirmed" and "paid"
   - Manual transaction IDs (MANUAL17692...)
   - Status set to "confirmed"

3. **Generate Shipping Information**
   - Shipping ID: `SHIP-ORDER-TIMESTAMP`
   - Tracking ID: `TRKXXXXXXXXXXXXX`
   - Carrier: FLYQ Express
   - Status: "pending"

4. **Schedule Monday Pickup**
   - Calculates next Monday
   - Sets estimated delivery date
   - Creates initial shipping update

5. **Send Confirmation Emails**
   - Order confirmation
   - Login credentials
   - Tracking information
   - Order details
   - Tracking URL

## API Endpoint

### POST `/api/admin/bulk-import-customers`

**Request Body:**
```json
{
  "customers": [
    {
      "name": "Customer Name",
      "email": "customer@example.com",
      "mobile": "1234567890",
      "address": "Full Address",
      "productName": "FLYQ Air",
      "productPrice": 4999,
      "password": "generated-password",
      "transactionId": "MANUAL17692..."
    }
  ],
  "useOldPricing": true
}
```

**Response:**
```json
{
  "success": true,
  "results": {
    "totalProcessed": 63,
    "accountsCreated": 63,
    "ordersCreated": 63,
    "emailsSent": 63,
    "success": [...],
    "failed": [...]
  },
  "message": "Processed 63 customers..."
}
```

## Email Template

### Subject
`Welcome to FLYQ! Order Confirmed - ORDER-NUMBER`

### Contents
- **Header:** Welcome to FLYQ Drones
- **Order Number:** In highlighted box
- **Tracking ID:** With carrier information
- **Order Details:** Product, price, quantity, delivery date
- **Pickup Alert:** Monday pickup notification
- **Track Button:** Link to tracking page
- **Account Details:** Login URL, email, password
- **What's Next:** Step-by-step guide

### Email Features
- Beautiful gradient design
- Responsive layout
- Color-coded sections
- Clear call-to-action buttons
- Account login information
- Tracking URL

## Customer Data File

**Location:** `/home/user/webapp/customer-import-data.json`

**Structure:**
```json
{
  "customersWithEmail": [
    {
      "index": 1,
      "name": "Customer Name",
      "email": "email@example.com",
      "mobile": "9876543210",
      "address": "Full Address",
      "productName": "FLYQ Air",
      "productPrice": 4999,
      "password": "generated-password",
      "transactionId": "MANUAL17692..."
    }
  ]
}
```

## How to Use

### Step 1: Access Admin Panel
1. Login at: https://abf76357.flyq-air.pages.dev/login
2. Email: `admin@flyq.com`
3. Password: `Admin@123`

### Step 2: Open Bulk Import
Navigate to: https://abf76357.flyq-air.pages.dev/admin/bulk-import

### Step 3: Review Summary
- Check customer count (63)
- Verify product breakdown
- Review total revenue

### Step 4: Start Import
1. Click "Start Bulk Import" button
2. Monitor progress bar
3. Wait 2-3 minutes for completion

### Step 5: Review Results
- Check accounts created
- Verify orders generated
- Confirm emails sent
- Review any failures

### Step 6: Manage Orders
After import:
- View orders: `/admin/orders`
- Manage shipping: `/admin/shipping/bulk`
- Check analytics: `/admin/shipping/analytics`

## Database Changes

### Migration: `0010_shipping_tracking_v2.sql`

**Added Columns to `orders` table:**
- `shipping_id` TEXT
- `tracking_id` TEXT
- `shipping_status` TEXT DEFAULT 'pending'
- `shipping_carrier` TEXT
- `estimated_delivery` TEXT
- `shipped_at` DATETIME
- `delivered_at` DATETIME

**New Table: `shipping_updates`**
```sql
CREATE TABLE shipping_updates (
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
```

## Configuration

### Environment Variables Required

**For Email Sending:**
```bash
RESEND_API_KEY=re_xxx...
```

**For Database:**
- Database binding: `DB` (Cloudflare D1)
- Local database: `webapp-production`

### Production Deployment

Apply migration:
```bash
npx wrangler d1 execute webapp-production --file=./migrations/0010_shipping_tracking_v2.sql
```

Deploy:
```bash
npm run build
npx wrangler pages deploy dist --project-name flyq-air
```

## Troubleshooting

### Import Fails
- **Check:** RESEND_API_KEY is configured
- **Check:** Database is accessible
- **Check:** Customer data file exists

### Emails Not Sent
- **Check:** RESEND_API_KEY is valid
- **Check:** Email domain is verified in Resend
- **Check:** Check error logs in results

### Database Errors
- **Check:** Migration has been applied
- **Check:** D1 database is connected
- **Check:** Check wrangler logs

## Next Steps After Import

1. **Verify Accounts**
   ```sql
   SELECT COUNT(*) FROM users WHERE created_at > datetime('now', '-1 hour');
   ```

2. **Verify Orders**
   ```sql
   SELECT COUNT(*) FROM orders WHERE created_at > datetime('now', '-1 hour');
   ```

3. **Check Shipping**
   ```sql
   SELECT COUNT(*) FROM orders WHERE shipping_id IS NOT NULL;
   ```

4. **Test Customer Login**
   - Use any customer email and password from the import
   - Login at: https://abf76357.flyq-air.pages.dev/login
   - Verify order appears in account

5. **Test Tracking**
   - Get any tracking ID from results
   - Visit: https://abf76357.flyq-air.pages.dev/track-order?tracking=TRKXXX
   - Verify tracking information displays

## Support

For issues or questions:
- **Email:** support@flyqdrones.com
- **Admin Panel:** https://abf76357.flyq-air.pages.dev/admin
- **Documentation:** `/home/user/webapp/README.md`

---

**Last Updated:** January 24, 2026  
**Version:** 1.0  
**Status:** ✅ Ready to Use
