# 🛒 Complete PayU Payment Flow - Testing Guide

## ✅ PRODUCTION URL: https://6855f633.flyq-air.pages.dev

---

## 📋 Step-by-Step Testing Instructions

### **Step 1: Add Products to Cart**

1. Visit: https://6855f633.flyq-air.pages.dev/products
2. You'll see two products:
   - **FLYQ Air** - ₹7,999 (ESP32-S3 programmable drone)
   - **FLYQ Vision** - ₹11,999 (Camera drone with AI)
3. Click **"Add to Cart"** button on any product
4. Notice the cart badge in the navigation bar updates with item count

**Expected Result**: ✅ Cart badge shows "1" (or number of items)

---

### **Step 2: View Shopping Cart**

1. Click the **cart icon** (🛒) in the top navigation bar
2. Or directly visit: https://6855f633.flyq-air.pages.dev/cart
3. You should see:
   - Product name
   - Quantity controls (+ / -)
   - Price per item
   - Subtotal
   - Total amount
   - **"Proceed to Checkout"** button (blue gradient)

**Expected Result**: ✅ Cart page displays all items with prices

---

### **Step 3: Proceed to Checkout**

1. On the cart page, click **"Proceed to Checkout"** button
2. You'll be redirected to: https://6855f633.flyq-air.pages.dev/checkout
3. The checkout page shows:
   - **Order Summary** section with cart items
   - **Customer Information** form
   - Total amount
   - **"Proceed to Payment"** button

**Expected Result**: ✅ Checkout page loads with order summary

---

### **Step 4: Fill Customer Details**

Fill in the form with test data:

```
Full Name: Test User
Email: test@example.com
Phone: 9876543210
Shipping Address: 123 Test Street, Test City, Test State - 123456, India
```

**Expected Result**: ✅ Form accepts all inputs

---

### **Step 5: Proceed to Payment**

1. Click **"Proceed to Payment"** button
2. A POST request is sent to `/api/payment/initiate`
3. Server generates:
   - Transaction ID (format: FLYQ + timestamp)
   - SHA-512 hash for security
   - PayU payment URL
4. Browser redirects to: **https://test.payu.in/_payment?key=...**

**Expected Result**: ✅ Redirect to PayU payment page

---

### **Step 6: Complete Payment on PayU**

You're now on PayU's test payment page.

#### **Option A: Test Credit Card (Success)**
```
Card Number: 5123456789012346
CVV: 123
Expiry Date: 12/25 (any future date)
Cardholder Name: Test User
```

#### **Option B: Test Credit Card (Failure)**
```
Card Number: 5123456789012344
CVV: 123
Expiry Date: 12/25
Cardholder Name: Test User
```

#### **Option C: Net Banking (Test)**
- Select any test bank from the list
- Use test credentials (varies by bank)

**Steps**:
1. Select **"Credit Card"** or **"Net Banking"**
2. Enter the test card details above
3. Click **"Pay"** or **"Submit"** button
4. PayU processes the payment (test mode)
5. Redirect back to your site

**Expected Result**: ✅ Payment processed on PayU

---

### **Step 7A: Payment Success Page**

If payment succeeds, you'll be redirected to:
**https://6855f633.flyq-air.pages.dev/payment/success**

You should see:
- ✅ **Green checkmark icon**
- **"Payment Successful!"** heading
- Transaction details:
  - Transaction ID (e.g., FLYQ1768817288958)
  - Amount paid (e.g., ₹7,999)
  - Status: Success
- Order confirmation message
- **"Back to Home"** button

**Automatic Actions**:
- Cart is cleared from localStorage
- Cart badge resets to 0

**Expected Result**: ✅ Success page displays transaction details

---

### **Step 7B: Payment Failure Page**

If payment fails, you'll be redirected to:
**https://6855f633.flyq-air.pages.dev/payment/failure**

You should see:
- ❌ **Red cross icon**
- **"Payment Failed"** heading
- Error details:
  - Transaction ID
  - Status: Failed
  - Error message
- **"Try Again"** button (returns to checkout)
- **"Back to Home"** button

**Expected Result**: ✅ Failure page displays error details

---

## 🧪 API Testing (Direct)

### Test Payment Initiation Endpoint

```bash
curl -X POST https://6855f633.flyq-air.pages.dev/api/payment/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "address": "123 Test Street",
    "cart": [
      {"name": "FLYQ Air", "price": 7999, "quantity": 1}
    ]
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "paymentUrl": "https://test.payu.in/_payment?key=rBxHIl&txnid=FLYQ1768817288958&amount=7999&...",
  "txnid": "FLYQ1768817288958"
}
```

---

## 💳 Test Cards Reference

### Credit Cards

| Card Number | CVV | Expiry | Result |
|------------|-----|--------|--------|
| 5123456789012346 | 123 | 12/25 | ✅ Success |
| 5123456789012344 | 123 | 12/25 | ❌ Failure |

### Net Banking
- Use any test bank from PayU's list
- Credentials provided on PayU's test page

---

## 🔍 Troubleshooting

### Issue: Cart is empty on checkout
**Solution**: Add items to cart first from /products page

### Issue: "Your cart is empty" alert
**Solution**: Click back, go to /products, add items

### Issue: Payment URL not generating
**Solution**: 
1. Check browser console for errors (F12)
2. Verify all form fields are filled
3. Check network tab for API errors

### Issue: Stuck on PayU page
**Solution**: 
1. Use the test cards provided above
2. Ensure card number is exactly as shown
3. Use any future expiry date

### Issue: Success page not loading
**Solution**: 
1. Check if PayU redirected correctly
2. Verify URL is `/payment/success`
3. Check browser console for errors

---

## 📊 What Happens Behind the Scenes

### Payment Initiation Flow:
```
User clicks "Proceed to Payment"
    ↓
JavaScript collects form data + cart
    ↓
POST to /api/payment/initiate
    ↓
Server calculates total
    ↓
Server generates transaction ID
    ↓
Server creates SHA-512 hash
    ↓
Server constructs PayU URL
    ↓
Browser redirects to PayU
```

### Hash Generation:
```
Hash String Format:
merchantKey|txnid|amount|productinfo|firstname|email|||||||||||salt

Example:
rBxHIl|FLYQ1768817288958|7999|FLYQ Drones Order|Test User|test@example.com|||||||||||euyRUxvATr6SbkOtG9loHobIfY7FJrTr

SHA-512 Hash:
044b5913ad25a9162b0d433aa80ae3bf6c87017836ac0d200365d04c5980e6e1...
```

### Payment Callback Flow:
```
PayU processes payment
    ↓
Success: Redirect to /payment/success
OR
Failure: Redirect to /payment/failure
    ↓
Display transaction details
    ↓
Clear cart (success only)
    ↓
User clicks "Back to Home"
```

---

## 🎯 Key URLs

| Page | URL |
|------|-----|
| **Production Homepage** | https://6855f633.flyq-air.pages.dev |
| **Products** | https://6855f633.flyq-air.pages.dev/products |
| **Cart** | https://6855f633.flyq-air.pages.dev/cart |
| **Checkout** | https://6855f633.flyq-air.pages.dev/checkout |
| **Payment Success** | https://6855f633.flyq-air.pages.dev/payment/success |
| **Payment Failure** | https://6855f633.flyq-air.pages.dev/payment/failure |
| **Analytics** | https://6855f633.flyq-air.pages.dev/analytics |

---

## ✅ Expected Results Summary

- ✅ Products page loads with 2 drones
- ✅ Add to cart updates badge
- ✅ Cart page shows items
- ✅ Checkout page displays order summary
- ✅ Form accepts customer details
- ✅ Payment initiation generates PayU URL
- ✅ Redirect to PayU payment page
- ✅ Test card processes payment
- ✅ Success page shows transaction details
- ✅ Cart is cleared after success
- ✅ Failure page shows error details

---

## 🚀 Production Ready!

**Current Status**: ✅ All systems working  
**Mode**: Test (PayU test environment)  
**Credentials**: Test merchant key (rBxHIl)  

**To Go Live**:
1. Get production credentials from PayU
2. Set environment variables in Cloudflare
3. Change PAYU_MODE to "live"
4. Test with real small amounts (₹1-10)

---

**Last Updated**: January 19, 2026  
**Production URL**: https://6855f633.flyq-air.pages.dev  
**Status**: ✅ Working
