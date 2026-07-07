# PayU Payment Gateway - Quick Setup Guide

## ✅ INTEGRATION COMPLETE

**Production**: https://7942552b.flyq-air.pages.dev  
**Status**: Live & Working  
**Mode**: Test (ready for production)

---

## Quick Test (5 Steps)

1. **Visit**: https://7942552b.flyq-air.pages.dev/products
2. **Add to Cart**: Click "Add to Cart" on any drone
3. **Checkout**: Click cart icon → Go to checkout
4. **Fill Form**:
   ```
   Name: Test User
   Email: test@example.com
   Phone: 9876543210
   Address: 123 Test Street
   ```
5. **Pay**: Use test card `5123456789012346`

---

## Test Cards

### Success Card
```
Number: 5123456789012346
CVV: 123
Expiry: 12/25
Name: Test User
```

### Failure Card
```
Number: 5123456789012344
CVV: 123
Expiry: 12/25
```

---

## Live Payment Setup

### 1. Get PayU Credentials
- Visit: https://payu.in/contact-us
- Register as merchant
- Get production credentials

### 2. Set Environment Variables (Cloudflare)
```bash
npx wrangler pages secret put PAYU_MERCHANT_KEY --project-name flyq-air
# Enter your live merchant key

npx wrangler pages secret put PAYU_SALT --project-name flyq-air
# Enter your live salt

npx wrangler pages secret put PAYU_MODE --project-name flyq-air
# Enter: live
```

### 3. Deploy
```bash
npm run build
npx wrangler pages deploy dist --project-name flyq-air
```

---

## Payment Flow

```
Cart → Checkout → Fill Details → Proceed to Payment
  ↓
PayU Payment Page (test.payu.in)
  ↓
Success (/payment/success) OR Failure (/payment/failure)
  ↓
View Transaction Details
```

---

## Routes

| Route | Purpose |
|-------|---------|
| `/checkout` | Checkout form |
| `/api/initiate-payment` | Generate PayU URL |
| `/payment/success` | Success callback |
| `/payment/failure` | Failure callback |

---

## Current Credentials (TEST MODE)

```
Merchant Key: rBxHIl
Salt: euyRUxvATr6SbkOtG9loHobIfY7FJrTr
URL: https://test.payu.in/_payment
```

⚠️ **Warning**: These are test credentials. Replace with live credentials before accepting real payments.

---

## Features

✅ Secure SHA-512 hash generation  
✅ Transaction ID generation (FLYQ + timestamp)  
✅ Success/failure callback handling  
✅ Cart clearing after payment  
✅ Transaction details display  
✅ Mobile responsive checkout  
✅ Form validation  
✅ Error handling  

---

## Support

- **Full Documentation**: See `PAYU_INTEGRATION.md`
- **PayU Docs**: https://docs.payu.in/
- **PayU Support**: https://payu.in/contact-us

---

## Summary

✅ Integration Complete  
✅ Test Mode Active  
✅ Production Ready  
✅ Deployed & Live  

**Next Step**: Get live credentials from PayU to enable real payments.
