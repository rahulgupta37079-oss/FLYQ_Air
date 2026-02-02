# 📧 Send Delay Notification Emails to 64 Customers

## Overview
This guide explains how to send transit delay notification emails to all 64 customers whose orders have tracking IDs. Each email will include:
- Delay notification (Feb 7-8, 2026 random delivery dates)
- Tracking link: `https://flyqdrone.in/track/{TRACKING_ID}`
- Full order details
- Support contact information

---

## Prerequisites

### 1. ✅ Resend API Key Required
You need a **Resend API key** to send emails. Get it from:
- Website: https://resend.com/
- Sign up and create an API key
- Verify your sending domain (flyqdrones.com)

### 2. ✅ Install Dependencies
```bash
cd /home/user/webapp
npm install resend @libsql/client
```

---

## Step 1: Test with Dry Run (No Emails Sent)

First, let's test the script to see how many orders will receive emails:

```bash
cd /home/user/webapp
DRY_RUN=true node send-delay-emails.js
```

**Expected Output:**
```
🚀 Transit Delay Email Sender
================================

📊 Fetching orders with tracking IDs...

✅ Found 64 orders with tracking IDs

🧪 DRY RUN MODE - No emails will be sent

Preview of first 3 emails:
============================================================

1. Order FLYQ-1234567890123-ABCDEF
   To: customer@example.com
   Tracking: TRK1234567890123ABCD1234
   Customer: John Doe

2. Order FLYQ-2345678901234-BCDEFG
   To: customer2@example.com
   Tracking: TRK2345678901234BCDE2345
   Customer: Jane Smith

3. Order FLYQ-3456789012345-CDEFGH
   To: customer3@example.com
   Tracking: TRK3456789012345CDEF3456
   Customer: Bob Johnson

============================================================

📝 Would send 64 emails total

To actually send emails, run:
  RESEND_API_KEY=your_key node send-delay-emails.js
```

---

## Step 2: Send Real Emails

Once you've verified the dry run, send the actual emails:

### Option A: One-Time Command
```bash
cd /home/user/webapp
RESEND_API_KEY=your_actual_api_key node send-delay-emails.js
```

### Option B: Using Environment File (Recommended)
```bash
# 1. Add your API key to .dev.vars
cd /home/user/webapp
echo "RESEND_API_KEY=your_actual_api_key" >> .dev.vars

# 2. Export the variable
export $(cat .dev.vars | grep RESEND_API_KEY)

# 3. Run the script
node send-delay-emails.js
```

**Expected Output:**
```
🚀 Transit Delay Email Sender
================================

📊 Fetching orders with tracking IDs...

✅ Found 64 orders with tracking IDs

📧 Sending emails...

✅ [1/64] Sent to customer1@example.com (FLYQ-1234567890123-ABCDEF)
✅ [2/64] Sent to customer2@example.com (FLYQ-2345678901234-BCDEFG)
✅ [3/64] Sent to customer3@example.com (FLYQ-3456789012345-CDEFGH)
...
✅ [64/64] Sent to customer64@example.com (FLYQ-9999999999999-ZZZZZZ)

============================================================

📊 EMAIL SENDING SUMMARY
============================================================
Total Orders: 64
✅ Sent Successfully: 64
❌ Failed: 0
============================================================

🎉 Email campaign completed!

📧 Customers can now track their orders at:
   https://flyqdrone.in/track/{TRACKING_ID}

✅ Script completed
```

---

## Email Content Preview

Each customer will receive:

### Subject
```
📦 Your FLYQ Drone Has Shipped - Track Your Order
```

### Key Sections
1. **Delay Notice** (Orange banner)
   - Due to increased demand, deliveries delayed
   - New delivery date: Feb 7 or Feb 8, 2026 (randomly assigned)
   - Apology for inconvenience

2. **Order Details**
   - Order Number
   - Tracking ID
   - Expected Delivery Date
   - Origin: Mumbai, Maharashtra

3. **Track Order Button**
   - Direct link: `https://flyqdrone.in/track/{TRACKING_ID}`

4. **Delivery Timeline**
   - ✓ Order Confirmed
   - ✓ Picked Up
   - 🚚 In Transit (Current - with delay)
   - ○ Delivery - Expected Feb 7/8

5. **Support Links**
   - Email: support@flyqdrones.com
   - WhatsApp: +91 91373 61474

---

## What Happens After Sending?

1. **Email Delivery** (Instant)
   - All 64 customers receive emails
   - Resend handles delivery

2. **Customer Actions**
   - Click tracking link
   - View real-time status at `https://flyqdrone.in/track/{TRACKING_ID}`
   - See delay notification
   - View Feb 7 or Feb 8 delivery date

3. **Live Tracking Pages**
   - All tracking pages show:
     - "In Transit - Delayed" status (orange)
     - Original vs Revised delivery dates
     - 2-3 days delay notice
     - Full timeline visualization

---

## Troubleshooting

### Problem: "RESEND_API_KEY environment variable not set"
**Solution:** Make sure you've set the API key:
```bash
export RESEND_API_KEY=your_actual_api_key
```

### Problem: "No orders with tracking IDs found"
**Solution:** Check the database:
```bash
cd /home/user/webapp
npx wrangler d1 execute webapp-production --local --command="SELECT COUNT(*) FROM orders WHERE tracking_id IS NOT NULL"
```

### Problem: Email sending fails
**Solution:** 
1. Verify your Resend API key is valid
2. Check domain verification at https://resend.com/
3. Review rate limits (script waits 100ms between emails)

### Problem: Want to test with one email first
**Solution:** Modify the script temporarily:
```javascript
// In send-delay-emails.js, line 323
for (let i = 0; i < 1; i++) {  // Change from orders.length to 1
```

---

## Rate Limiting

The script includes automatic rate limiting:
- **100ms wait between emails** (10 emails per second)
- **Resend free tier**: 100 emails/day
- **Resend paid tier**: Unlimited

For 64 emails:
- Total time: ~6.4 seconds
- Well within API limits

---

## Success Verification

After sending, verify by:

1. **Check Resend Dashboard**
   - Login: https://resend.com/
   - View sent emails
   - Check delivery status

2. **Test Tracking Links**
   ```bash
   # Test a few tracking IDs
   curl https://flyqdrone.in/track/TRK1769360779114MZIP0UZ4 | grep "In Transit - Delayed"
   ```

3. **Monitor Support Channels**
   - Email: support@flyqdrones.com
   - WhatsApp: +91 91373 61474

---

## Email Template Features

✅ **Mobile Responsive** - Works on all devices  
✅ **Plain Text Fallback** - For email clients without HTML  
✅ **Professional Design** - Gradient headers, timeline icons  
✅ **Actionable CTAs** - Track Order button, Support links  
✅ **Delay Notification** - Clear orange banner  
✅ **Random Dates** - Feb 7 (50%) or Feb 8 (50%)  

---

## Next Steps After Sending

1. **Monitor Customer Response**
   - Track support inquiries
   - Monitor WhatsApp messages

2. **Update Order Status** (Optional)
   - Mark emails as sent in database
   - Add sent_at timestamp

3. **Follow Up** (If Needed)
   - Send delivery confirmation when arrived
   - Send review request after delivery

---

## Quick Reference Commands

```bash
# Dry run (test mode)
DRY_RUN=true node send-delay-emails.js

# Send real emails
RESEND_API_KEY=your_key node send-delay-emails.js

# Check orders count
npx wrangler d1 execute webapp-production --local --command="SELECT COUNT(*) FROM orders WHERE tracking_id IS NOT NULL"

# Test tracking page
curl https://flyqdrone.in/track/TRK1769360779114MZIP0UZ4
```

---

## Important Notes

⚠️ **One-Time Campaign** - This is designed as a one-time notification  
⚠️ **Cannot Undo** - Once sent, emails cannot be recalled  
⚠️ **Test First** - Always run dry run before sending  
⚠️ **API Key Security** - Never commit .dev.vars to git  
⚠️ **Domain Verification** - Ensure flyqdrones.com is verified in Resend  

---

## Support

If you need help:
- Email script issues: Check error messages in console
- Resend API issues: https://resend.com/docs
- Database issues: Check wrangler.jsonc D1 configuration

---

**Status:** Ready to send ✅  
**Recipients:** 64 customers with tracking IDs  
**Delivery Dates:** Feb 7-8, 2026 (randomly assigned)  
**Tracking:** https://flyqdrone.in/track/{TRACKING_ID}  
**Production:** LIVE ✅
