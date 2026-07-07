# 🚀 Quick Admin Access Guide

## ⚡ Fast Login Instructions

### Step 1: Open Login Page
**Local Development:**
```
https://3000-i9dkuxqg07opw1sw23plt-d0b9e1e2.sandbox.novita.ai/login
```

**Production:**
```
https://fab76be6.flyq-air.pages.dev/login
```

### Step 2: Enter Credentials
```
Email:    admin@flyq.com
Password: Admin@123
```

### Step 3: Access Analytics Dashboard
After login, navigate to:

**Local Development:**
```
https://3000-i9dkuxqg07opw1sw23plt-d0b9e1e2.sandbox.novita.ai/admin/analytics
```

**Production:**
```
https://fab76be6.flyq-air.pages.dev/admin/analytics
```

---

## 🐛 Troubleshooting "Malformed Request" Error

### Problem
If you see: **"The request is malformed: Requests without any query are not supported"**

### Solution 1: Ensure You're Logged In
1. Go to the login page first
2. Login with admin credentials
3. **Then** navigate to `/admin/analytics`
4. Don't try to access analytics directly without logging in

### Solution 2: Clear Browser Data
```
1. Press Ctrl+Shift+Delete (Chrome/Firefox)
2. Clear cookies and cached data
3. Close browser completely
4. Reopen and login again
```

### Solution 3: Use Incognito/Private Window
```
1. Open incognito/private window
2. Go to login page
3. Login with admin credentials
4. Access analytics dashboard
```

### Solution 4: Check Session Cookie
The session cookie should be named `session` and contain your authentication token.

**In Chrome DevTools:**
1. Press F12
2. Go to Application tab
3. Click Cookies on left
4. Check if `session` cookie exists
5. If not, login again

---

## ✅ Verify Setup

### Test 1: Check Admin User Exists
```bash
cd /home/user/webapp
npx wrangler d1 execute webapp-production --local \
  --command="SELECT id, email, name, is_admin FROM users WHERE email='admin@flyq.com';"
```

**Expected Output:**
```json
{
  "id": 1,
  "email": "admin@flyq.com",
  "name": "FLYQ Admin",
  "is_admin": 1
}
```

### Test 2: Test Login API
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@flyq.com","password":"Admin@123"}' \
  -c /tmp/cookies.txt
```

**Expected Output:**
```json
{
  "success": true,
  "message": "Login successful",
  "redirect": "/account"
}
```

### Test 3: Test Analytics API
```bash
curl -s http://localhost:3000/api/analytics/dashboard \
  -b /tmp/cookies.txt | jq '.success'
```

**Expected Output:**
```
true
```

---

## 📊 What You Should See

### Analytics Dashboard Sections

**1. Overview Cards (Top Row)**
- Total Visits: 9
- Unique Visitors: 2
- Visits Today: 9
- New Users This Week: 1

**2. Statistics Grid (Middle Row)**
- Visits This Week: 9
- Visits This Month: 9
- Total Users: 1

**3. Popular Pages Table**
```
| Page URL  | Page Title | Visits | Unique |
|-----------|------------|--------|--------|
| /         | Homepage   | 4      | 1      |
| /login    | Login      | 2      | 1      |
| /products | Products   | 1      | 1      |
```

**4. Recent Visits Feed**
```
| Time       | Page URL | User    | IP Address    |
|------------|----------|---------|---------------|
| 16:06:54   | /login   | Guest   | 10.64.142.90  |
| 16:05:13   | /        | Guest   | 10.64.142.90  |
```

**5. Daily Visits Chart**
Bar chart showing last 7 days of traffic

---

## 🔐 Security Checklist

✅ Admin account created with `is_admin = 1`
✅ Password hashed with bcryptjs
✅ Session cookies are HttpOnly
✅ Admin routes check database for admin flag
✅ Unauthorized users redirected to login

---

## 📝 Common Issues & Solutions

### Issue: "Unauthorized" or redirected to login
**Solution:** You're not logged in. Login first at `/login`

### Issue: "Access denied"
**Solution:** Your user doesn't have `is_admin = 1` flag. Check database:
```bash
npx wrangler d1 execute webapp-production --local \
  --command="SELECT is_admin FROM users WHERE email='admin@flyq.com';"
```

### Issue: Empty dashboard / No data
**Solution:** Visit some pages to generate analytics data:
```bash
curl http://localhost:3000/
curl http://localhost:3000/products
curl http://localhost:3000/about
```

### Issue: Session expired
**Solution:** Login again. Sessions expire after 7 days.

---

## 🎯 Quick Command Reference

**Create more visits for testing:**
```bash
for i in {1..10}; do
  curl -s http://localhost:3000/ > /dev/null
  curl -s http://localhost:3000/products > /dev/null
  sleep 0.5
done
```

**Check analytics data:**
```bash
npx wrangler d1 execute webapp-production --local \
  --command="SELECT COUNT(*) as total_visits FROM page_visits;"
```

**View popular pages:**
```bash
npx wrangler d1 execute webapp-production --local \
  --command="SELECT page_url, visit_count FROM popular_pages ORDER BY visit_count DESC;"
```

---

## 🌐 Direct Links (Click to Open)

### Local Development
- 🔐 **Login**: https://3000-i9dkuxqg07opw1sw23plt-d0b9e1e2.sandbox.novita.ai/login
- 📊 **Analytics**: https://3000-i9dkuxqg07opw1sw23plt-d0b9e1e2.sandbox.novita.ai/admin/analytics
- 🎛️ **Admin Dashboard**: https://3000-i9dkuxqg07opw1sw23plt-d0b9e1e2.sandbox.novita.ai/admin/dashboard

### Production
- 🔐 **Login**: https://fab76be6.flyq-air.pages.dev/login
- 📊 **Analytics**: https://fab76be6.flyq-air.pages.dev/admin/analytics
- 🎛️ **Admin Dashboard**: https://fab76be6.flyq-air.pages.dev/admin/dashboard

---

## 💡 Pro Tips

1. **Always login first** before accessing admin pages
2. **Use incognito mode** for testing to avoid cookie conflicts
3. **Check browser console** (F12) for any JavaScript errors
4. **Clear cookies** if you experience session issues
5. **Generate test data** by visiting various pages

---

**Last Updated:** November 9, 2025
**Status:** ✅ Working in Local Development
**Production Status:** ⚠️ Requires database migration
