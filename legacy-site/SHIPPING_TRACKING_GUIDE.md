# 📦 Shipping and Tracking System - Complete Guide

## Overview
The FLYQ Air shipping and tracking system provides comprehensive order fulfillment management with automated tracking IDs, customer notifications, and real-time status updates.

## 🎯 Features

### For Admins
- **Automatic Shipping ID Generation**: Unique shipping IDs for each paid order
- **Tracking Number Creation**: Generate tracking numbers automatically
- **Pickup Scheduling**: Auto-calculate Monday pickup with delivery estimates
- **Status Management**: Track orders through multiple shipping stages
- **Email Notifications**: Send tracking emails to customers with one click
- **Shipping Updates History**: Maintain detailed timeline of shipping events

### For Customers
- **Public Tracking Page**: Beautiful tracking interface at `/track-order`
- **Real-time Status**: View current shipping status and location
- **Timeline View**: See complete history of shipping updates
- **Email Notifications**: Receive tracking emails with delivery estimates
- **Estimated Delivery**: Know when to expect delivery

## 🚀 Getting Started

### 1. Apply Database Migration

First, apply the shipping migration to add necessary columns:

```bash
# Local development
npx wrangler d1 migrations apply webapp-production --local

# Production
npx wrangler d1 migrations apply webapp-production
```

### 2. Database Schema Changes

The migration adds these columns to the `orders` table:
- `shipping_id` (TEXT) - Unique shipping identifier
- `tracking_id` (TEXT UNIQUE) - Customer-facing tracking number
- `shipping_status` (TEXT) - Current status (pending/picked_up/in_transit/delivered)
- `shipping_carrier` (TEXT) - Carrier name (default: FLYQ Express)
- `estimated_delivery` (TEXT) - Estimated delivery date
- `shipped_at` (DATETIME) - When order was shipped
- `delivered_at` (DATETIME) - When order was delivered

And creates a new `shipping_updates` table for tracking history.

## 📋 Admin Workflow

### Step 1: Generate Shipping ID for Paid Order

When an order is paid, generate shipping and tracking information:

**API Endpoint:**
```
POST /api/admin/orders/:id/generate-shipping
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/admin/orders/123/generate-shipping
```

**Response:**
```json
{
  "success": true,
  "shipping_id": "SHIP-FLYQ-20260124-1234567890",
  "tracking_id": "TRK1234567ABC",
  "estimated_delivery": "2026-01-27",
  "message": "Shipping ID and Tracking ID generated. Estimated delivery: Monday, January 27, 2026"
}
```

**What Happens:**
- ✅ Generates unique shipping ID (format: `SHIP-{ORDER_NUMBER}-{TIMESTAMP}`)
- ✅ Creates tracking number (format: `TRK{TIMESTAMP}{RANDOM}`)
- ✅ Calculates next Monday as pickup date
- ✅ Sets shipping status to `pending`
- ✅ Sets carrier to `FLYQ Express`
- ✅ Adds first tracking update: "Order is being prepared for shipment"

### Step 2: Send Tracking Email to Customer

Send email notification with tracking information:

**API Endpoint:**
```
POST /api/admin/orders/:id/send-tracking-email
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/admin/orders/123/send-tracking-email
```

**Email Content Includes:**
- 📧 Beautiful HTML email with FLYQ branding
- 📦 Tracking number prominently displayed
- 📅 Estimated delivery date (Monday pickup message)
- 🔗 Direct link to tracking page
- 📊 Order details summary
- ⚠️ Pickup scheduled alert

### Step 3: Update Shipping Status

Update the shipping status as the order progresses:

**API Endpoint:**
```
POST /api/admin/orders/:id/update-shipping
```

**Request Body:**
```json
{
  "status": "picked_up",
  "location": "FLYQ Warehouse",
  "message": "Package picked up by delivery partner",
  "carrier": "FLYQ Express"
}
```

**Available Statuses:**
- `pending` - Order prepared, awaiting pickup
- `picked_up` - Picked up by carrier
- `in_transit` - On the way to destination
- `out_for_delivery` - Out for final delivery
- `delivered` - Successfully delivered

**Automatic Fields:**
- `picked_up` status → Sets `shipped_at` timestamp
- `delivered` status → Sets `delivered_at` timestamp

## 🎨 Customer Tracking Page

### Access Tracking Page

Customers can track their orders at:
```
https://your-domain.pages.dev/track-order?tracking=TRK1234567ABC
```

### Features

**Search Interface:**
- Clean search box to enter tracking ID
- Validates tracking number format
- Shows helpful instructions

**Order Information Display:**
- Order number and tracking ID
- Current shipping status with icon
- Carrier information
- Estimated delivery date

**Tracking Timeline:**
- Chronological list of updates
- Status icons (📦 pending, 🚚 picked up, ✈️ in transit, ✅ delivered)
- Location and message for each update
- Timestamp for each event

**Special Alerts:**
- Yellow alert for "Pickup Scheduled on Monday"
- Status-specific messaging
- Help section with contact information

## 🔧 Integration Examples

### Example 1: Process Paid Order

```typescript
// After payment is confirmed
const orderId = 123

// 1. Generate shipping
const shipResponse = await fetch(`/api/admin/orders/${orderId}/generate-shipping`, {
  method: 'POST'
})
const shipData = await shipResponse.json()
console.log('Tracking ID:', shipData.tracking_id)

// 2. Send email to customer
await fetch(`/api/admin/orders/${orderId}/send-tracking-email`, {
  method: 'POST'
})
```

### Example 2: Update Order Status

```typescript
// When carrier picks up order
await fetch(`/api/admin/orders/${orderId}/update-shipping`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    status: 'picked_up',
    location: 'FLYQ Warehouse - Mumbai',
    message: 'Package picked up by FLYQ Express delivery partner'
  })
})

// When out for delivery
await fetch(`/api/admin/orders/${orderId}/update-shipping`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    status: 'out_for_delivery',
    location: 'Local Distribution Center',
    message: 'Out for delivery - Expected today'
  })
})

// When delivered
await fetch(`/api/admin/orders/${orderId}/update-shipping`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    status: 'delivered',
    location: 'Customer Address',
    message: 'Package successfully delivered'
  })
})
```

### Example 3: Check Tracking from Frontend

```html
<!-- Customer tracking form -->
<form action="/track-order" method="GET">
  <input 
    type="text" 
    name="tracking" 
    placeholder="Enter tracking ID"
    required
  />
  <button type="submit">Track Order</button>
</form>
```

## 📧 Email Template

The tracking email includes:

**Header:**
- FLYQ gradient banner
- "Your Order is Ready for Pickup!" headline

**Tracking Box:**
- Highlighted tracking number
- Carrier information
- Professional styling

**Order Details:**
- Order number
- Estimated delivery date
- Current status

**Pickup Alert:**
- Yellow alert box
- "Pickup Scheduled" message
- Delivery date information

**Call to Action:**
- "Track Your Order" button
- Links to tracking page

**Footer:**
- Support contact information
- Company branding

## 🎯 Business Logic

### Monday Pickup Calculation

The system automatically calculates the next Monday for pickup:

```typescript
const today = new Date()
const daysUntilMonday = (8 - today.getDay()) % 7 || 7
const estimatedDelivery = new Date(today)
estimatedDelivery.setDate(today.getDate() + daysUntilMonday)
```

**Examples:**
- Order on Friday → Pickup on Monday (3 days)
- Order on Monday → Pickup next Monday (7 days)
- Order on Sunday → Pickup tomorrow (1 day)

### Tracking ID Format

**Shipping ID:** `SHIP-{ORDER_NUMBER}-{TIMESTAMP}`
- Example: `SHIP-FLYQ-20260124-1706102400000`

**Tracking ID:** `TRK{TIMESTAMP}{RANDOM}`
- Example: `TRK1706102400ABC123`
- Always uppercase
- Unique and short enough for customers to type

## 🔐 Security Notes

1. **Tracking IDs are public** - Anyone with the tracking ID can view order status
2. **No authentication required** for tracking page (by design)
3. **Admin endpoints** should be protected with authentication
4. **Shipping updates** should only be accessible to admins

## 📊 Database Queries

### Find Orders Without Shipping

```sql
SELECT * FROM orders 
WHERE payment_status = 'paid' 
AND shipping_id IS NULL
ORDER BY created_at DESC
```

### Get All Tracking Updates for Order

```sql
SELECT * FROM shipping_updates 
WHERE order_id = ? 
ORDER BY created_at DESC
```

### Find Orders by Status

```sql
SELECT * FROM orders 
WHERE shipping_status = 'in_transit'
ORDER BY created_at DESC
```

## 🚨 Troubleshooting

### Issue: Tracking ID not found
**Solution:** Ensure tracking ID is exactly as provided (case-sensitive)

### Issue: Email not sending
**Solution:** Check RESEND_API_KEY is configured in .dev.vars / Cloudflare secrets

### Issue: Migration failed
**Solution:** Apply migrations in order, check for conflicts with existing schema

### Issue: Monday calculation wrong
**Solution:** Check server timezone settings

## 📱 Mobile Responsive

The tracking page is fully mobile-responsive:
- ✅ Flexible layouts
- ✅ Touch-friendly buttons
- ✅ Readable on small screens
- ✅ Optimized timeline view

## 🎉 Success Metrics

Track these metrics for shipping performance:
- Average time from order to shipping
- Delivery success rate
- Customer tracking page views
- Email open rates
- Customer satisfaction with delivery

## 📚 Related Documentation

- [README.md](README.md) - Main project documentation
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - Complete API reference
- [RESEND_INTEGRATION.md](RESEND_INTEGRATION.md) - Email system details
- [PAYU_INTEGRATION.md](PAYU_INTEGRATION.md) - Payment processing

## 🔄 Future Enhancements

Potential improvements:
- [ ] SMS notifications for tracking updates
- [ ] Integration with third-party carriers (FedEx, UPS, etc.)
- [ ] Automatic status updates from carrier APIs
- [ ] Delivery signature capture
- [ ] Package photo on delivery
- [ ] Real-time GPS tracking
- [ ] Delivery time slot selection
- [ ] Multi-package orders support

---

**Last Updated:** 2026-01-24  
**Version:** 1.0.0  
**Author:** FLYQ Air Development Team
