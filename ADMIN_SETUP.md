# Admin Dashboard Setup Guide

## Overview
The admin dashboard provides a comprehensive view of your FLYQ website database, including users, orders, and active sessions.

## Access URLs

### Local Development
- **URL**: http://localhost:3000/admin/dashboard
- **Public URL**: https://3000-i9dkuxqg07opw1sw23plt-d0b9e1e2.sandbox.novita.ai/admin/dashboard

### Production
- **URL**: https://1450370f.flyq-air.pages.dev/admin/dashboard
- **Custom Domain**: https://flyq-air.pages.dev/admin/dashboard (when available)

## Admin User Setup

### Step 1: Create Admin User (Local Development)
The admin user has already been created locally with:
- **Email**: admin@passion3dworld.com
- **Name**: Admin User
- **Password**: You'll need to set this via login page or database

### Step 2: Create Admin User (Production)
You need to manually create the admin user in production:

```bash
# Apply the is_admin migration (if permissions allow)
npx wrangler d1 migrations apply webapp-production --remote

# Create admin user
npx wrangler d1 execute webapp-production --remote --command="INSERT INTO users (email, name, password_hash, is_admin) VALUES ('admin@passion3dworld.com', 'Admin User', '\$2a\$10\$abcdefghijklmnopqrstuuO7xV6R2fQBQGXGxlNnZ.YwR0uD5Z5Y8', 1)"
```

**Alternative**: Use the signup page to create the admin account, then update it to admin:
```bash
npx wrangler d1 execute webapp-production --remote --command="UPDATE users SET is_admin = 1 WHERE email = 'admin@passion3dworld.com'"
```

## How to Access Admin Dashboard

1. **Login First**: Visit `/login` and login with admin credentials
2. **Navigate to Dashboard**: Go to `/admin/dashboard`
3. **View Data**: You'll see:
   - Total Users count
   - Total Orders count
   - Active Sessions count
   - Total Revenue
   - Registered Users table
   - Recent Orders table
   - Active Sessions table

## Dashboard Features

### Statistics Cards
- **Total Users**: Number of registered users
- **Total Orders**: Number of completed orders
- **Active Sessions**: Currently logged-in users
- **Total Revenue**: Sum of all paid orders

### Data Tables

#### Registered Users
- User ID
- Name
- Email
- Registration Date
- Admin Status (Yes/No badge)

#### Recent Orders (Last 50)
- Order Number
- Customer Name & Email
- Total Amount
- Status (Paid/Pending)
- Order Date

#### Active Sessions
- User Email
- Session ID
- Expiration Timestamp

## Security Notes

1. **Admin Check**: Dashboard verifies `is_admin = 1` in database
2. **Login Required**: Must be logged in to access
3. **Cookie-based Auth**: Uses HttpOnly, Secure cookies
4. **Database-level Protection**: Admin flag stored securely in D1 database

## Making Other Users Admin

To promote any user to admin:

```bash
# Local
npx wrangler d1 execute webapp-production --local --command="UPDATE users SET is_admin = 1 WHERE email = 'user@example.com'"

# Production (if permissions allow)
npx wrangler d1 execute webapp-production --remote --command="UPDATE users SET is_admin = 1 WHERE email = 'user@example.com'"
```

## Troubleshooting

### "Access Denied - Please login first"
- You're not logged in. Go to `/login` first.

### "Access Denied - Admin access only"
- Your account doesn't have `is_admin = 1`. Update it in the database.

### "Database Not Available"
- D1 database binding is missing. Check `wrangler.jsonc` configuration.

### Production Database Permissions Error
- The Cloudflare API token may not have D1 database access permissions
- Create/modify users through the website UI instead
- Contact Cloudflare support to verify API token permissions

## Contact Support

For admin access issues, contact:
- **Email**: info@passion3dworld.com
- **Phone**: +91 9137361474
