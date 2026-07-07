# Admin Dashboard - Step-by-Step Access Guide

## 🎯 How to Access Your Admin Dashboard

### Step 1: Open Production Website
Go to: **https://0e26643a.flyq-air.pages.dev**

### Step 2: Create Admin Account (If Needed)

#### Option A: Create New Admin Account
1. Click "Login" button in navigation
2. Click "Don't have an account? Sign up"
3. Fill in the form with:
   - **Name**: Your name
   - **Email**: admin@passion3dworld.com (or any email you prefer)
   - **Password**: Choose a strong password
   - **Phone**: Your phone number
4. Click "Sign Up"
5. You'll be automatically logged in

#### Option B: Use Existing Account
1. Just login with your existing credentials at `/login`

### Step 3: Promote Account to Admin

Since you just created the account via the website, you need to promote it to admin status:

**Run this command in terminal (requires wrangler CLI):**

```bash
# Navigate to project directory
cd /home/user/webapp

# Set your account as admin (replace with your email)
npx wrangler d1 execute webapp-production --remote \
  --command="UPDATE users SET is_admin = 1 WHERE email = 'your-email@example.com'"
```

**Note**: If wrangler remote commands fail due to permissions, you can:
1. Use the local database for testing: Replace `--remote` with `--local`
2. Or manually update via Cloudflare Dashboard → D1 → webapp-production → Query

### Step 4: Access Admin Dashboard

Once your account has `is_admin = 1`, simply navigate to:

**https://0e26643a.flyq-air.pages.dev/admin/dashboard**

You'll see:
- 📊 Statistics cards (users, orders, sessions, revenue)
- 👥 All registered users
- 🛒 Recent orders
- 🔐 Active sessions

---

## 🚨 Troubleshooting

### "Access Denied - Please login first"
**Solution**: You're not logged in. Go to `/login` and login first.

### "Access Denied - Admin access only"
**Solution**: Your account doesn't have admin privileges. Run the UPDATE command above.

### "Database Not Available"
**Solution**: D1 database binding issue. Contact support or check Cloudflare Pages settings.

### Wrangler Commands Not Working (Permission Error)
**Solution**: 
1. Try using `--local` instead of `--remote` for local testing
2. Or update via Cloudflare Dashboard:
   - Go to https://dash.cloudflare.com
   - Navigate to D1 → webapp-production
   - Use SQL query tab:
     ```sql
     UPDATE users SET is_admin = 1 WHERE email = 'your-email@example.com';
     ```

---

## 📊 What You Can Do in Admin Dashboard

### View Statistics
- Total registered users
- Total orders placed
- Active logged-in sessions
- Total revenue from paid orders

### Monitor Users
- See all user accounts
- View registration dates
- Identify admin users (with badge)
- Check user emails and names

### Track Orders
- View last 50 orders
- See customer details
- Check order status (Paid/Pending)
- Monitor order amounts

### Session Management
- See who's currently logged in
- Check session expiration times
- Monitor active user sessions

---

## 🔐 Security Notes

1. **Admin Flag**: Admin status is stored securely in database (`is_admin = 1`)
2. **Cookie-Based Auth**: Uses HttpOnly, Secure cookies with 7-day expiry
3. **Protected Route**: Admin dashboard requires both login AND admin flag
4. **Database-Level**: Admin check queries database on every access

---

## 📞 Need Help?

Contact FLYQ Support:
- **Email**: info@passion3dworld.com
- **Phone**: +91 9137361474
- **WhatsApp**: https://wa.me/919137361474

---

## 🎯 Quick Command Reference

```bash
# Check if you're an admin (local DB)
npx wrangler d1 execute webapp-production --local \
  --command="SELECT email, name, is_admin FROM users WHERE email = 'your-email@example.com'"

# Set admin flag (local DB)
npx wrangler d1 execute webapp-production --local \
  --command="UPDATE users SET is_admin = 1 WHERE email = 'your-email@example.com'"

# Set admin flag (production DB - may require permissions)
npx wrangler d1 execute webapp-production --remote \
  --command="UPDATE users SET is_admin = 1 WHERE email = 'your-email@example.com'"

# List all admin users (local DB)
npx wrangler d1 execute webapp-production --local \
  --command="SELECT email, name, is_admin FROM users WHERE is_admin = 1"
```

---

**Remember**: The admin dashboard is LIVE at:
**https://0e26643a.flyq-air.pages.dev/admin/dashboard**

Just login and make sure your account has `is_admin = 1`! 🚀
