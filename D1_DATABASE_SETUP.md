# D1 Database Setup Guide

## Overview
This guide will help you create and configure the Cloudflare D1 database for FLYQ e-commerce authentication and order management.

---

## Part 1: Create D1 Database via Cloudflare Dashboard

### Step 1: Access Cloudflare Dashboard
1. Go to **https://dash.cloudflare.com**
2. Log in with your Cloudflare account
3. Select your account from the account list

### Step 2: Navigate to D1 Databases
1. In the left sidebar, click **"Workers & Pages"**
2. Click on the **"D1 SQL Database"** tab
3. Click the **"Create database"** button (blue button, top right)

### Step 3: Create Database
1. **Database name**: `webapp-production` (exactly as shown)
2. **Location**: Select **"Automatic"** (recommended)
3. Click **"Create"** button

### Step 4: Copy Database ID
After creation, you'll see:
```
Database: webapp-production
Database ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```
**IMPORTANT**: Copy the Database ID (the long string with dashes)

---

## Part 2: Update wrangler.jsonc

### Step 5: Edit wrangler.jsonc
Open `/home/user/webapp/wrangler.jsonc` and replace `REPLACE_WITH_YOUR_DATABASE_ID` with your actual Database ID:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "flyq",
  "compatibility_date": "2025-10-29",
  "pages_build_output_dir": "./dist",
  "compatibility_flags": [
    "nodejs_compat"
  ],
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "webapp-production",
      "database_id": "YOUR_ACTUAL_DATABASE_ID_HERE"
    }
  ]
}
```

**Example** (your ID will be different):
```
"database_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
```

---

## Part 3: Apply Database Migrations

### Step 6: Apply Migrations Locally (for development)
Run this command to create tables in your local D1 database:

```bash
cd /home/user/webapp
npx wrangler d1 migrations apply webapp-production --local
```

This will create:
- `users` table (email, password_hash, name, address)
- `products` table (name, price, description, stock)
- `orders` table (user_id, total, status, payment_id)
- `order_items` table (order_id, product_id, quantity, price)
- `curriculum_access` table (user_id, product_id, order_id)
- `sessions` table (user_id, session_id, expires_at)
- `cart_items` table (user_id, product_id, quantity)
- `reviews` table (product_id, user_id, rating, comment)

### Step 7: Seed Products Data
```bash
npx wrangler d1 execute webapp-production --local --file=./migrations/0002_seed_products.sql
```

This will insert:
- FLYQ Air (₹4,999)
- FLYQ Vision (₹7,999)

### Step 8: Test Local Development
```bash
# Start local dev server with D1 binding
npm run build
pm2 restart flyq
```

Try registering a user and logging in to test authentication!

---

## Part 4: Deploy to Production

### Step 9: Apply Migrations to Production
Once everything works locally, apply migrations to production:

```bash
npx wrangler d1 migrations apply webapp-production
```

**Warning**: This will create tables in your production database. Make sure you're ready!

### Step 10: Deploy to Cloudflare Pages
```bash
npm run build
npx wrangler pages deploy dist --project-name flyq
```

---

## Verification Checklist

After setup, verify:
- [ ] Database created in Cloudflare Dashboard
- [ ] Database ID copied to wrangler.jsonc
- [ ] Local migrations applied successfully
- [ ] Products seeded in local database
- [ ] User registration works locally
- [ ] Login works and creates session
- [ ] Curriculum access control works
- [ ] Production migrations applied
- [ ] Deployed to Cloudflare Pages

---

## Database Schema Overview

### users
- `id` (INTEGER PRIMARY KEY)
- `email` (TEXT UNIQUE)
- `password_hash` (TEXT)
- `name` (TEXT)
- `address` (TEXT)
- `phone` (TEXT)
- `created_at` (DATETIME)

### orders
- `id` (INTEGER PRIMARY KEY)
- `user_id` (INTEGER)
- `total` (REAL)
- `status` (TEXT) - 'pending', 'paid', 'shipped', 'delivered'
- `payment_id` (TEXT)
- `created_at` (DATETIME)

### curriculum_access
- `id` (INTEGER PRIMARY KEY)
- `user_id` (INTEGER)
- `product_id` (INTEGER)
- `order_id` (INTEGER)
- `granted_at` (DATETIME)

---

## Common Issues & Solutions

### Issue: "Database not found"
**Solution**: Make sure database name is exactly `webapp-production` (no typos)

### Issue: "Migrations failed"
**Solution**: Check if database ID in wrangler.jsonc is correct

### Issue: "Authentication not working"
**Solution**: 
1. Make sure migrations are applied
2. Check if `users` and `sessions` tables exist
3. Verify wrangler.jsonc has D1 binding

### Issue: "Can't access curriculum after purchase"
**Solution**: Check `curriculum_access` table has entry for user

---

## Testing Commands

### View all tables
```bash
npx wrangler d1 execute webapp-production --local --command="SELECT name FROM sqlite_master WHERE type='table';"
```

### Check users
```bash
npx wrangler d1 execute webapp-production --local --command="SELECT * FROM users;"
```

### Check products
```bash
npx wrangler d1 execute webapp-production --local --command="SELECT * FROM products;"
```

### Check orders
```bash
npx wrangler d1 execute webapp-production --local --command="SELECT * FROM orders;"
```

### Check curriculum access
```bash
npx wrangler d1 execute webapp-production --local --command="SELECT * FROM curriculum_access;"
```

---

## Next Steps After Setup

1. Test user registration at `/register`
2. Test login at `/login`
3. Add items to cart and create order
4. Grant curriculum access manually (testing)
5. Access `/curriculum` page as logged-in user
6. Deploy to production when everything works!

---

## Support

If you encounter any issues:
1. Check Cloudflare Dashboard for database status
2. Review wrangler logs: `pm2 logs flyq --nostream`
3. Verify migrations were applied correctly
4. Check database ID is correct in wrangler.jsonc

---

**Last Updated**: 2025-11-03
**Status**: Ready for D1 database creation
