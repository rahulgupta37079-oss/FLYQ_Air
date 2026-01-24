# FLYQ Air - Quick API Reference Card

## 🔑 Credentials

### Resend Email API
```
API Key: re_Thq9M1VWe_7SWexxjCwebxfBfJYKRiTsz6
```

### PayU Payment (Test)
```
Merchant Key: gtKFFx
Salt: 4R38IvwiV57FwVpsgOvTXBdLE4tHUXFW
```

---

## 📧 Email APIs

### Newsletter
```bash
POST /api/newsletter/subscribe
{"email": "user@example.com"}
→ Welcome email sent to user
```

### Contact Form
```bash
POST /api/contact/submit
{"name": "...", "email": "...", "message": "..."}
→ 2 emails sent (admin + customer)
```

---

## 💳 Payment APIs

### Initiate Payment
```bash
POST /api/payment/initiate
{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "9876543210",
  "address": "123 Test St",
  "cart": [{"name": "FLYQ Air", "price": 7999, "quantity": 1}]
}
→ Returns paymentData for PayU
```

### Test Cards
```
Success: 5123456789012346 (CVV: 123)
Failure: 5123456789012344 (CVV: 123)
```

---

## 🌐 URLs

```
Production: https://6602f9ce.flyq-air.pages.dev
Products: /products
Checkout: /checkout
Analytics: /analytics
```

---

## 📧 Email Addresses

```
Newsletter: newsletter@flyqdrones.com
Orders: orders@flyqdrones.com
Support: support@flyqdrones.com
Contact: contact@flyqdrones.com
Admin: admin@flyqdrones.com (⚠️ Update this!)
```

---

## 🧪 Test Flow

```
1. Add to Cart → /products
2. View Cart → Cart icon
3. Checkout → /checkout
4. Fill Form → Name, Email, Phone, Address
5. Payment → Card 5123456789012346
6. Success → Email sent + Cart cleared
```

---

## 🔧 Deploy

```bash
# Local
npm run build
pm2 restart flyq

# Production
npx wrangler pages deploy dist --project-name flyq-air
```

---

## 📚 Docs

- Full API: `/home/user/webapp/API_DOCUMENTATION.md`
- Resend: `/home/user/webapp/RESEND_INTEGRATION.md`
- PayU: `/home/user/webapp/PAYU_INTEGRATION.md`
- Testing: `/home/user/webapp/TESTING_GUIDE.md`
