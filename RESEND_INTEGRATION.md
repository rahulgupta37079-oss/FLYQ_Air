# Resend Email Integration - Complete Guide

## ✅ STATUS: INTEGRATED & CONFIGURED

**Integration Date**: January 19, 2026  
**SDK Version**: resend@latest  
**Bundle Size**: 857.02 kB (includes Resend SDK)

---

## 📧 Email Scenarios Implemented

### 1. **Order Confirmation Email** (Payment Success)

**Trigger**: After successful PayU payment  
**From**: orders@flyqdrones.com  
**To**: Customer email (from PayU callback)  
**Subject**: Order Confirmation - Transaction {txnid}

**Content Includes**:
- Thank you message
- Transaction ID
- Amount paid (₹)
- Payment status
- Shipping information message
- Support contact details
- Professional branded HTML template

**Code Location**: `/payment/success` handler in `src/index.tsx`

---

### 2. **Newsletter Welcome Email**

**Trigger**: When user subscribes to newsletter  
**From**: newsletter@flyqdrones.com  
**To**: Subscriber email  
**Subject**: Welcome to FLYQ Drones Newsletter!

**Content Includes**:
- Welcome message
- Subscription benefits list:
  - New product launches
  - Exclusive offers and discounts
  - Drone flying tips and tutorials
  - Community events and competitions
- Call-to-action button (Explore Our Drones)
- Professional branded HTML template

**Code Location**: `/api/newsletter/subscribe` handler

---

### 3. **Contact Form Emails** (2 emails sent)

#### 3A. Admin Notification Email

**Trigger**: When user submits contact form  
**From**: contact@flyqdrones.com  
**To**: admin@flyqdrones.com  
**Subject**: New Contact Form Submission from {name}

**Content Includes**:
- Submitter name
- Submitter email
- Message content
- Clean, professional layout

#### 3B. Customer Auto-Reply Email

**From**: support@flyqdrones.com  
**To**: Customer email  
**Subject**: We received your message - FLYQ Drones

**Content Includes**:
- Thank you message
- Copy of submitted message
- 24-hour response time promise
- Professional branded HTML template

**Code Location**: `/api/contact/submit` handler

---

## 🔧 Setup Instructions

### Step 1: Get Resend API Key

1. Visit: https://resend.com
2. Sign up or log in
3. Go to **API Keys** section
4. Click **Create API Key**
5. Copy the key (starts with `re_`)

### Step 2: Configure Domain (IMPORTANT)

Before sending emails, you must verify your domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain: `flyqdrones.com`
4. Add the provided DNS records to your domain:
   ```
   TXT Record: resend._domainkey
   Value: (provided by Resend)
   ```
5. Wait for verification (can take up to 48 hours)
6. Status should change to **Verified**

**Alternative**: Use Resend's test domain for testing:
- From: `onboarding@resend.dev`
- To: Your verified email only

### Step 3: Set Environment Variables

#### For Local Development (`.dev.vars`):

Create a `.dev.vars` file (copy from `.dev.vars.example`):

```bash
# Resend API Key
RESEND_API_KEY=re_your_actual_api_key_here

# PayU Credentials
PAYU_MERCHANT_KEY=gtKFFx
PAYU_SALT=4R38IvwiV57FwVpsgOvTXBdLE4tHUXFW
PAYU_MODE=test
```

#### For Production (Cloudflare Pages):

```bash
# Set via wrangler CLI
npx wrangler pages secret put RESEND_API_KEY --project-name flyq-air
# Enter your Resend API key when prompted

# Or via Cloudflare Dashboard:
# 1. Go to Cloudflare Dashboard → Workers & Pages
# 2. Select flyq-air project
# 3. Go to Settings → Environment Variables
# 4. Add RESEND_API_KEY = your_key
# 5. Save and redeploy
```

### Step 4: Update Email Addresses

Edit `src/index.tsx` and update these email addresses:

```typescript
// Order confirmations
from: 'FLYQ Drones <orders@yourdomain.com>'

// Newsletter
from: 'FLYQ Drones <newsletter@yourdomain.com>'

// Contact form - Admin notification
to: 'admin@yourdomain.com'  // ⚠️ Change this to your actual admin email

// Contact form - Auto reply
from: 'FLYQ Drones <support@yourdomain.com>'
```

### Step 5: Test Emails

#### Test Newsletter Subscription:

```bash
curl -X POST http://localhost:3000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "your-test@email.com"}'
```

#### Test Contact Form:

```bash
curl -X POST http://localhost:3000/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "your-test@email.com",
    "message": "This is a test message"
  }'
```

#### Test Order Confirmation:

Complete a test payment on your site:
1. Add product to cart
2. Go through checkout
3. Use test card: `5123456789012346`
4. Complete payment on PayU
5. Check email for order confirmation

---

## 📊 Email Templates

All emails use professional HTML templates with:
- FLYQ branding (sky blue gradient header)
- Responsive design (mobile-friendly)
- Clean typography (Arial, sans-serif)
- Professional footer
- Proper spacing and colors
- Call-to-action buttons where appropriate

### Color Scheme:
- Primary: `#0ea5e9` (Sky Blue)
- Secondary: `#38bdf8` (Light Blue)
- Success: `#10b981` (Green)
- Text: `#374151` (Dark Gray)
- Muted: `#6b7280` (Gray)
- Background: `#f9fafb` (Light Gray)
- Footer: `#1f2937` (Dark)

---

## 🔒 Security & Best Practices

### Email Sending:
- ✅ All emails sent asynchronously (fire-and-forget)
- ✅ Errors logged but don't break main flow
- ✅ Input sanitization for contact form
- ✅ Email validation before sending
- ✅ No sensitive data in email content

### API Key Security:
- ✅ Stored in environment variables
- ✅ Never committed to git (in `.gitignore`)
- ✅ Different keys for dev/production
- ✅ Rotatable without code changes

### Rate Limiting:
- Resend free tier: 100 emails/day
- Paid tier: 50,000+ emails/month
- Consider implementing rate limiting on your endpoints

---

## 🎯 Testing Checklist

Before going to production:

- [ ] Resend API key obtained
- [ ] Domain verified in Resend dashboard
- [ ] `.dev.vars` file created locally
- [ ] `RESEND_API_KEY` set in Cloudflare
- [ ] Admin email address updated in code
- [ ] From addresses updated to your domain
- [ ] Newsletter email tested and received
- [ ] Contact form emails tested (both admin + customer)
- [ ] Order confirmation tested via test payment
- [ ] All emails display correctly (check spam folder)
- [ ] Mobile responsiveness verified
- [ ] Email links working (if any)

---

## 📈 Monitoring & Analytics

### Resend Dashboard:
- View all sent emails
- Check delivery status
- Monitor open rates (if enabled)
- Track bounces and spam complaints
- View error logs

### Access Dashboard:
https://resend.com/emails

### Check Email Status:
```bash
# Via Resend API
curl https://api.resend.com/emails/{email_id} \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

## 🐛 Troubleshooting

### Problem: Emails not sending

**Check**:
1. Is `RESEND_API_KEY` set correctly?
2. Is domain verified in Resend?
3. Check browser console for errors
4. Check Cloudflare logs: `npx wrangler pages deployment tail`

**Solution**:
```bash
# Verify API key is set
npx wrangler pages secret list --project-name flyq-air

# Check logs
npx wrangler pages deployment tail --project-name flyq-air
```

### Problem: Emails going to spam

**Solutions**:
1. Verify SPF and DKIM records in Resend
2. Add domain to Resend (don't use @resend.dev for production)
3. Warm up your domain (start with low volume)
4. Avoid spam trigger words
5. Include unsubscribe link (for newsletters)

### Problem: Domain not verifying

**Check**:
1. DNS records added correctly?
2. Wait 24-48 hours for propagation
3. Use `dig` or `nslookup` to verify records
4. Contact Resend support if still failing

```bash
# Check DNS records
dig TXT resend._domainkey.flyqdrones.com
```

---

## 💡 Enhancement Ideas

### Future Improvements:

1. **Email Templates**:
   - Create reusable template components
   - Add email template preview page
   - Support multiple languages

2. **Advanced Features**:
   - Email scheduling (send later)
   - A/B testing for newsletters
   - Personalization tokens
   - Transactional email tracking

3. **Analytics**:
   - Track open rates
   - Click-through rates
   - Conversion tracking
   - Email engagement metrics

4. **Automation**:
   - Abandoned cart emails (24h after cart addition)
   - Order shipping notifications
   - Product review requests (7 days after delivery)
   - Re-engagement campaigns

5. **User Management**:
   - Email preferences page
   - Unsubscribe functionality
   - Email frequency controls
   - Topic preferences

---

## 📚 Resources

- **Resend Documentation**: https://resend.com/docs
- **Resend API Reference**: https://resend.com/docs/api-reference
- **Resend SDK (Node.js)**: https://github.com/resendlabs/resend-node
- **Email Best Practices**: https://resend.com/docs/knowledge-base/email-best-practices

---

## ✅ Summary

**What's Working**:
- ✅ Resend SDK installed and configured
- ✅ 3 email scenarios implemented
- ✅ Professional HTML templates
- ✅ Async sending (non-blocking)
- ✅ Error handling
- ✅ Environment variable configuration
- ✅ Ready for production (after setup)

**Next Steps**:
1. Get Resend API key
2. Verify your domain
3. Set environment variables
4. Update email addresses
5. Test all email scenarios
6. Deploy to production

**Support**:
- Resend Support: support@resend.com
- Documentation: https://resend.com/docs

---

**Last Updated**: January 19, 2026  
**Status**: ✅ Integrated (Setup Required)  
**Bundle Size**: 857.02 kB
