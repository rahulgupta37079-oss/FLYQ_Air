# 📋 Missing Customers Report

## 🔍 **Analysis Summary**

### **Overview:**
- **Total customers in your list**: 71
- **Total orders with tracking emails sent**: 63
- **Missing customers**: 8

---

## ❌ **Missing Customers List**

These 8 customers are in your list but **DID NOT receive** delay notification emails:

| # | Customer Name | Email | Status |
|---|--------------|-------|--------|
| 1 | **Bharathi Hiranmayee Brundavanam** | bbhiranmayeeandhrauniversity.edu.in | ❌ Missing |
| 2 | **Siddhi jadhav** | jsiddhi961@gmail.com | ❌ Missing |
| 3 | **Alvina Mary Thomas** | alvinamary4710@gmail.com | ❌ Missing |
| 4 | **Ratan** | rtnmali2025@gmail.com | ❌ Missing |
| 5 | **sudhir** | badgujar.sudhir1010@gmail.com | ❌ Missing |
| 6 | **Sanjana.p** | sanjanapsanjana808@gmail.com | ❌ Missing |
| 7 | **Siva** | sivashankeran@gmail.com | ❌ Missing |
| 8 | **Sunil Mardi** | sunilmardi1000@gmail.com | ❌ Missing |

---

## 📊 **Statistics**

### **Email Campaign Results:**
- ✅ **Emails Sent**: 63 customers
- ❌ **Not Sent**: 8 customers
- 📈 **Coverage**: 88.7% (63/71)

### **Breakdown:**
- **November orders**: Mostly covered
- **December orders**: Mostly covered
- **January orders**: Some missing

---

## 🤔 **Possible Reasons**

### **Why these customers might be missing:**

1. **No Order Placed Yet**
   - Customer registered but didn't complete purchase
   - Order pending or cancelled

2. **No Tracking ID Assigned**
   - Order placed but not yet shipped
   - Tracking ID not generated in system

3. **Different Email Address**
   - Used different email for order vs registration
   - Email typo in order system

4. **Order Not in Database**
   - Recent orders not yet in export
   - Manual orders not added to system

---

## 🎯 **Recommended Actions**

### **Option 1: Manual Email Send**

Send individual delay emails to these 8 customers:

```json
[
  {
    "order_number": "MANUAL-001",
    "tracking_id": "TRK_TO_BE_ASSIGNED",
    "customer_name": "Bharathi Hiranmayee Brundavanam",
    "customer_email": "bbhiranmayeeandhrauniversity.edu.in"
  },
  {
    "order_number": "MANUAL-002",
    "tracking_id": "TRK_TO_BE_ASSIGNED",
    "customer_name": "Siddhi jadhav",
    "customer_email": "jsiddhi961@gmail.com"
  },
  {
    "order_number": "MANUAL-003",
    "tracking_id": "TRK_TO_BE_ASSIGNED",
    "customer_name": "Alvina Mary Thomas",
    "customer_email": "alvinamary4710@gmail.com"
  },
  {
    "order_number": "MANUAL-004",
    "tracking_id": "TRK_TO_BE_ASSIGNED",
    "customer_name": "Ratan",
    "customer_email": "rtnmali2025@gmail.com"
  },
  {
    "order_number": "MANUAL-005",
    "tracking_id": "TRK_TO_BE_ASSIGNED",
    "customer_name": "sudhir",
    "customer_email": "badgujar.sudhir1010@gmail.com"
  },
  {
    "order_number": "MANUAL-006",
    "tracking_id": "TRK_TO_BE_ASSIGNED",
    "customer_name": "Sanjana.p",
    "customer_email": "sanjanapsanjana808@gmail.com"
  },
  {
    "order_number": "MANUAL-007",
    "tracking_id": "TRK_TO_BE_ASSIGNED",
    "customer_name": "Siva",
    "customer_email": "sivashankeran@gmail.com"
  },
  {
    "order_number": "MANUAL-008",
    "tracking_id": "TRK_TO_BE_ASSIGNED",
    "customer_name": "Sunil Mardi",
    "customer_email": "sunilmardi1000@gmail.com"
  }
]
```

**Steps:**
1. Check if these customers actually placed orders
2. Get their order numbers and tracking IDs from database
3. Use the email sender page: https://flyqdrone.in/admin/send-delay-emails
4. Paste corrected JSON with real order data
5. Send emails

---

### **Option 2: Database Verification**

**Check Admin Panel:**
1. Go to: https://flyqdrone.in/admin/login
2. Search for each customer by email
3. Verify if they have orders
4. Check if tracking IDs are assigned
5. Export missing orders

**SQL Query:**
```sql
SELECT 
  o.order_number,
  o.tracking_id,
  u.name as customer_name,
  u.email as customer_email,
  o.status,
  o.created_at
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE u.email IN (
  'bbhiranmayeeandhrauniversity.edu.in',
  'jsiddhi961@gmail.com',
  'alvinamary4710@gmail.com',
  'rtnmali2025@gmail.com',
  'badgujar.sudhir1010@gmail.com',
  'sanjanapsanjana808@gmail.com',
  'sivashankeran@gmail.com',
  'sunilmardi1000@gmail.com'
)
ORDER BY o.created_at DESC;
```

---

### **Option 3: No Action Needed**

If these customers:
- Haven't placed orders yet
- Orders are pending/cancelled
- Don't need tracking emails

Then **no action required** - only customers with active orders and tracking IDs need delay emails.

---

## ✅ **Already Notified (63 Customers)**

These customers successfully received delay notification emails:

1. Chirag - chiragnr72@gmail.com
2. Sabarivasan mariyappan - Sabarivasanmariyappan805@gmail.com
3. Gourav Kumar pal - gauravkp73@gmail.com
4. Arshdeep Singh - arshbadwal5@gmail.com
5. GOPI KRISHNAN A. V. A - krishnanava62@gmail.com
6. SHYAMPREET l - preetpal1951@gmail.com
7. Prashant - Khurana2983@gmail.com
8. Bhushan ms - msbhuvan07@gmail.com
9. Rajeev krishna - rajeevkrishna3456@gmail.com
10. Akshai D K - dkakshai28@gmail.com
... (and 53 more)

**Full list available in**: `/home/user/webapp/orders_with_tracking.json`

---

## 📞 **Next Steps**

### **Immediate Actions:**

1. **Verify Orders**
   - Check if missing customers have orders
   - Verify tracking IDs exist
   - Check order status

2. **Send Missing Emails** (if needed)
   - Get correct order data
   - Use email sender page
   - Send individually or in batch

3. **Update Records**
   - Add tracking IDs if missing
   - Update order status
   - Sync database

---

## 📁 **Files**

### **Generated Files:**
- **Script**: `/home/user/webapp/find_missing_customers.py`
- **Orders Data**: `/home/user/webapp/orders_with_tracking.json`
- **This Report**: `/home/user/webapp/MISSING_CUSTOMERS_REPORT.md`

### **Email Sender:**
- **URL**: https://flyqdrone.in/admin/send-delay-emails
- **API**: https://flyqdrone.in/api/admin/send-bulk-delay-emails

---

## 📊 **Summary Table**

| Metric | Count | Percentage |
|--------|-------|------------|
| Total Customers | 71 | 100% |
| Emails Sent | 63 | 88.7% |
| Missing | 8 | 11.3% |
| Success Rate | - | 88.7% |

---

## 🎯 **Conclusion**

**8 customers** from your list did not receive delay notification emails. 

**Recommended Action**: 
1. Check admin panel for these 8 customers
2. Verify if they have orders with tracking IDs
3. If yes, send them delay emails manually
4. If no, they don't need notification emails

**Quick Check URL**: https://flyqdrone.in/admin/login

---

*Report Generated: February 3, 2026*  
*Analysis Tool: `find_missing_customers.py`*  
*Total Analyzed: 71 customers*  
*Missing: 8 customers*
