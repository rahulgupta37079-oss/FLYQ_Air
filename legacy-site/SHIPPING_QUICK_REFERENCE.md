# 🚀 Shipping System - Quick Reference

## For Paid Orders: 3-Step Process

### Step 1: Generate Shipping ✨
```bash
POST /api/admin/orders/{id}/generate-shipping
```
**Result:** Creates shipping ID, tracking ID, sets Monday pickup

### Step 2: Send Email 📧
```bash
POST /api/admin/orders/{id}/send-tracking-email
```
**Result:** Customer receives tracking email

### Step 3: Update Status 📦
```bash
POST /api/admin/orders/{id}/update-shipping
Body: {"status": "picked_up", "location": "Warehouse", "message": "Picked up"}
```
**Result:** Updates shipping status and timeline

---

## Shipping Statuses

| Status | Icon | Description |
|--------|------|-------------|
| `pending` | 📦 | Order prepared, awaiting pickup |
| `picked_up` | 🚚 | Picked up by carrier |
| `in_transit` | ✈️ | On the way |
| `out_for_delivery` | 🚗 | Out for final delivery |
| `delivered` | ✅ | Successfully delivered |

---

## Customer Tracking

**URL:** `https://your-domain.pages.dev/track-order?tracking=TRK123ABC`

Customers can:
- ✅ Search by tracking ID
- ✅ View current status
- ✅ See complete timeline
- ✅ Check delivery estimate
- ✅ Contact support

---

## Important Notes

⚠️ **Only generate shipping for PAID orders**  
📅 **Pickup automatically set to Monday**  
🔐 **Tracking IDs are public** (anyone can view)  
📧 **Configure RESEND_API_KEY** for emails  
💾 **Apply database migration first**

---

## Testing Locally

```bash
# 1. Build
npm run build

# 2. Start server
pm2 start ecosystem.config.cjs

# 3. Test tracking page
curl http://localhost:3000/track-order

# 4. Generate test shipping
curl -X POST http://localhost:3000/api/admin/orders/1/generate-shipping
```

---

## Tracking ID Format

- **Shipping ID:** `SHIP-FLYQ-20260124-1234567890`
- **Tracking ID:** `TRK1706102400ABC` (customer-facing)

---

## Quick Commands

```bash
# Apply migration
npx wrangler d1 migrations apply webapp-production --local

# Find orders without shipping
SELECT * FROM orders WHERE payment_status='paid' AND shipping_id IS NULL;

# Get shipping updates
SELECT * FROM shipping_updates WHERE order_id=? ORDER BY created_at DESC;
```

---

**Full Documentation:** See [SHIPPING_TRACKING_GUIDE.md](SHIPPING_TRACKING_GUIDE.md)
