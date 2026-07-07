# 🔐 Admin Login Guide - FLYQ Air

## Quick Access

### 🌐 Admin Login Credentials
```
Email:    admin@flyq.com
Password: Admin@123
```

### 📍 URLs

**Local Development:**
- Login: https://3000-i9dkuxqg07opw1sw23plt-d0b9e1e2.sandbox.novita.ai/login
- Analytics Dashboard: https://3000-i9dkuxqg07opw1sw23plt-d0b9e1e2.sandbox.novita.ai/admin/analytics
- Admin Dashboard: https://3000-i9dkuxqg07opw1sw23plt-d0b9e1e2.sandbox.novita.ai/admin/dashboard

**Production:**
- Login: https://fab76be6.flyq-air.pages.dev/login
- Analytics Dashboard: https://fab76be6.flyq-air.pages.dev/admin/analytics
- Admin Dashboard: https://fab76be6.flyq-air.pages.dev/admin/dashboard

---

## 📝 Step-by-Step Login Process

### 1. Open Login Page
Go to your login URL (local or production)

### 2. Enter Admin Credentials
- **Email**: `admin@flyq.com`
- **Password**: `Admin@123`

### 3. Click "Sign In"
You'll see a success message and be redirected automatically

### 4. Access Admin Features
Once logged in, you can access:
- **Analytics Dashboard** (`/admin/analytics`) - View visitor statistics
- **Admin Dashboard** (`/admin/dashboard`) - Manage users, orders, sessions

---

## 🎯 What You Can See in Admin Dashboards

### 📊 Analytics Dashboard (`/admin/analytics`)
**Overview Cards:**
- Total Visits (all time)
- Unique Visitors (by IP)
- Visits Today (24-hour count)
- New Users This Week

**Statistics:**
- Visits This Week
- Visits This Month
- Total Registered Users

**Popular Pages Table:**
- Page URL
- Visit Count
- Unique Visitors

**Recent Visits Feed:**
- Timestamp
- Page URL
- User Name (if logged in)
- IP Address

**Daily Visits Chart:**
- 7-day trend visualization
- Bar chart showing traffic patterns

### 🎛️ Admin Dashboard (`/admin/dashboard`)
- User Management
- Order Tracking
- Session Monitoring
- Revenue Statistics

---

## 🔧 How Admin Account Was Created

The admin account was created using these steps:

1. **Added `is_admin` column** to users table (migration 0006)
2. **Generated hashed password** using bcryptjs
3. **Inserted admin user** into database with `is_admin = 1`

### Database Structure
```sql
users table:
- id: INTEGER (primary key)
- email: TEXT (unique)
- password_hash: TEXT
- name: TEXT
- is_admin: INTEGER (0 = regular user, 1 = admin)
- phone, address, city, state, pincode
- created_at, updated_at
```

---

## 🚀 Creating Additional Admin Accounts

### Option 1: Using the Script (Recommended)
```bash
# 1. Edit create_admin_user.js and change credentials
const ADMIN_EMAIL = 'newadmin@example.com';
const ADMIN_PASSWORD = 'YourSecurePassword';

# 2. Run the script
node create_admin_user.js

# 3. Execute the generated SQL
npx wrangler d1 execute webapp-production --local --file=admin_user.sql

# For production:
npx wrangler d1 execute webapp-production --remote --file=admin_user.sql
```

### Option 2: Direct SQL (Advanced)
```sql
-- 1. Hash your password first (use Node.js or online bcrypt tool)
-- 2. Insert with is_admin = 1
INSERT INTO users (name, email, password_hash, is_admin, created_at)
VALUES (
  'New Admin',
  'newadmin@example.com',
  '$2b$10$YourHashedPasswordHere',
  1,
  datetime('now')
);
```

---

## 🔒 Security Features

### Admin Protection
- ✅ Admin routes check `is_admin` flag in database
- ✅ Non-admin users redirected to login
- ✅ Session-based authentication with HttpOnly cookies
- ✅ Password hashing with bcryptjs (10 rounds)
- ✅ 7-day session expiry

### Password Requirements
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- Special characters recommended

---

## 📊 Analytics Data Collection

### What Gets Tracked
- **Page URL** - Which page was visited
- **Page Title** - Document title
- **IP Address** - Visitor's IP (from Cloudflare headers)
- **User Agent** - Browser and device info
- **Referrer** - Where visitor came from
- **User ID** - If user is logged in
- **Timestamp** - When the visit occurred

### Privacy Notes
- IP addresses are stored for unique visitor counting
- User data is linked only for logged-in users
- All data stored in Cloudflare D1 (SQLite)
- GDPR compliant with proper data handling

---

## 🛠️ Troubleshooting

### Can't Login?
1. ✅ Check you're using correct email: `admin@flyq.com`
2. ✅ Check password is exactly: `Admin@123` (case-sensitive)
3. ✅ Clear browser cookies and try again
4. ✅ Check if admin user exists in database:
   ```bash
   npx wrangler d1 execute webapp-production --local \
     --command="SELECT id, email, name, is_admin FROM users WHERE email='admin@flyq.com';"
   ```

### Can't Access Admin Dashboard?
1. ✅ Make sure you're logged in first
2. ✅ Check `is_admin` column is `1` in database
3. ✅ Try logging out and logging back in
4. ✅ Clear browser cache and cookies

### No Analytics Data Showing?
1. ✅ Visit some pages to generate data
2. ✅ Check if analytics migration was applied:
   ```bash
   npx wrangler d1 execute webapp-production --local \
     --command="SELECT name FROM sqlite_master WHERE type='table' AND name='page_visits';"
   ```
3. ✅ Check PM2 logs for errors: `pm2 logs --nostream`

---

## 📦 Database Migrations Status

### Applied Migrations (Local)
- ✅ 0001_ecommerce_schema.sql
- ✅ 0002_seed_products.sql
- ✅ 0003_contact_submissions.sql
- ✅ 0004_newsletter_subscriptions.sql
- ✅ 0005_analytics_system.sql
- ✅ 0006_add_admin_flag.sql

### Production Setup Required
To enable admin features in production:
1. Apply migration 0006 (is_admin column)
2. Apply migration 0005 (analytics system)
3. Create admin user using admin_user.sql

---

## 🎓 Advanced Features

### Making Regular User an Admin
```bash
# Get user ID first
npx wrangler d1 execute webapp-production --local \
  --command="SELECT id, email, name FROM users WHERE email='user@example.com';"

# Set is_admin flag
npx wrangler d1 execute webapp-production --local \
  --command="UPDATE users SET is_admin = 1 WHERE email='user@example.com';"
```

### Removing Admin Access
```bash
npx wrangler d1 execute webapp-production --local \
  --command="UPDATE users SET is_admin = 0 WHERE email='user@example.com';"
```

### View All Admins
```bash
npx wrangler d1 execute webapp-production --local \
  --command="SELECT id, email, name, created_at FROM users WHERE is_admin = 1;"
```

---

## 📞 Support

If you encounter any issues:
1. Check PM2 logs: `pm2 logs flyq --nostream`
2. Check browser console for errors (F12 → Console tab)
3. Verify database connection in wrangler.jsonc
4. Ensure all migrations are applied

---

**Last Updated**: November 9, 2025
**Version**: 1.0
**Admin User Created**: ✅ Successfully
