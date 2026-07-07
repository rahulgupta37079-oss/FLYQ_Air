# Production Analytics Setup Guide

## Current Status
- ✅ Local analytics: 60 visits tracked
- ✅ Cloudflare Domain Analytics: 783 unique visitors
- ⚠️ Production database needs analytics migrations applied

## Why Production Analytics Isn't Showing Data

Your custom analytics dashboard currently only tracks **local development** visits. The production database (`webapp-production` on Cloudflare D1) needs the analytics tables created.

## Step-by-Step Setup Instructions

### Option 1: Via Cloudflare Dashboard (Recommended - No API Token Issues)

#### 1. Access Your D1 Database
1. Go to: https://dash.cloudflare.com
2. Navigate to: **Workers & Pages** → **D1**
3. Find and click: **webapp-production** database

#### 2. Open Console
1. Click the **Console** tab
2. You'll see an SQL query editor

#### 3. Apply Migration 0005 (Analytics System)

Copy and paste this SQL:

```sql
-- Analytics and tracking system

-- Page visits tracking
CREATE TABLE IF NOT EXISTS page_visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_url TEXT NOT NULL,
  page_title TEXT,
  user_agent TEXT,
  referrer TEXT,
  ip_address TEXT,
  user_id INTEGER,
  session_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_visits_page ON page_visits(page_url);
CREATE INDEX IF NOT EXISTS idx_visits_created ON page_visits(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_visits_user ON page_visits(user_id);

-- Daily analytics summary
CREATE TABLE IF NOT EXISTS analytics_daily (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date DATE NOT NULL UNIQUE,
  total_visits INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  new_users INTEGER DEFAULT 0,
  returning_users INTEGER DEFAULT 0,
  page_views INTEGER DEFAULT 0,
  avg_session_duration REAL DEFAULT 0,
  bounce_rate REAL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_analytics_date ON analytics_daily(date DESC);

-- Popular pages tracking
CREATE TABLE IF NOT EXISTS popular_pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_url TEXT NOT NULL UNIQUE,
  page_title TEXT,
  visit_count INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  avg_time_spent REAL DEFAULT 0,
  last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_popular_page ON popular_pages(page_url);
CREATE INDEX IF NOT EXISTS idx_popular_count ON popular_pages(visit_count DESC);

-- User activity tracking
CREATE TABLE IF NOT EXISTS user_activities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  activity_type TEXT NOT NULL,
  activity_data TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_activity_user ON user_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_type ON user_activities(activity_type);
CREATE INDEX IF NOT EXISTS idx_activity_created ON user_activities(created_at DESC);
```

Click **Execute** and wait for success message.

#### 4. Apply Migration 0006 (Admin Flag)

Copy and paste this SQL:

```sql
-- Add is_admin column to users table
ALTER TABLE users ADD COLUMN is_admin INTEGER DEFAULT 0;

-- Create index on is_admin for faster admin checks
CREATE INDEX IF NOT EXISTS idx_users_admin ON users(is_admin);
```

Click **Execute** and wait for success message.

#### 5. Create Admin User (If Needed)

Check if admin user exists:
```sql
SELECT id, email, is_admin FROM users WHERE email = 'admin@flyq.com';
```

If it doesn't exist, create it:
```sql
INSERT INTO users (name, email, password_hash, is_admin, created_at)
VALUES (
  'FLYQ Admin',
  'admin@flyq.com',
  '$2b$10$GSholCrtoV831w3Awg1PsucKaHiWAQcq.QJKgQwmz9mWZldToOeo2',
  1,
  datetime('now')
);
```

#### 6. Verify Setup

Run this verification query:
```sql
SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;
```

You should see these tables:
- ✅ analytics_daily
- ✅ cart_items
- ✅ contact_submissions
- ✅ newsletter_subscriptions
- ✅ order_items
- ✅ orders
- ✅ page_visits
- ✅ popular_pages
- ✅ products
- ✅ reviews
- ✅ sessions
- ✅ user_activities
- ✅ users
- ✅ wishlist

### Option 2: Via API (Requires D1 Permissions)

If you update your API token to include D1 permissions:

1. **Update API Token**:
   - Go to: https://dash.cloudflare.com/profile/api-tokens
   - Edit your token
   - Add: **Account** → **D1** → **Edit**
   - Save

2. **Apply Migrations**:
```bash
cd /home/user/webapp
export CLOUDFLARE_API_TOKEN="your-token-here"
npx wrangler d1 migrations apply webapp-production --remote
```

3. **Verify**:
```bash
npx wrangler d1 execute webapp-production --remote \
  --command="SELECT COUNT(*) FROM page_visits"
```

## After Setup: What to Expect

### Immediate Results
- ✅ Analytics tables created in production database
- ✅ Admin user can login at production URL
- ✅ Analytics dashboard accessible at `/admin/analytics`

### Data Collection Starts
Once tables exist, the app will automatically:
- 📊 Track every page visit with details (URL, timestamp, IP, user agent)
- 👥 Count unique visitors by IP address
- 📈 Update popular pages rankings
- 🎯 Track user activities (login, register, purchases, etc.)

### View Production Analytics
1. Visit: **https://flyqdrone.in/admin/analytics**
2. Login:
   - Email: `admin@flyq.com`
   - Password: `Admin@123`
3. View:
   - Total visits today/week/month
   - Popular pages with visit counts
   - Recent activity feed
   - Unique visitors statistics

## Troubleshooting

### Issue: "Access denied" on analytics page
**Solution**: Make sure you're logged in as admin user (admin@flyq.com)

### Issue: No data showing
**Solution**: 
- Data collection starts AFTER tables are created
- Wait 5-10 minutes for visitors to generate data
- Check: `SELECT COUNT(*) FROM page_visits` in D1 Console

### Issue: "Table doesn't exist" error
**Solution**: Re-run the migration SQL from Step 3 above

### Issue: Admin login doesn't work
**Solution**: Run the "Create Admin User" SQL from Step 5 above

## Performance Notes

- **Cloudflare D1** is a globally distributed database
- Analytics queries are fast (<100ms for most queries)
- Data is automatically backed up by Cloudflare
- No additional costs for reasonable traffic levels

## Next Steps

After production analytics is set up:
1. ✅ Monitor your 783 unique visitors growing
2. 📊 Analyze which pages are most popular
3. 🎯 Track conversion funnels (visitors → signups → purchases)
4. 📈 Optimize based on user behavior data

---

**Need Help?**

If you encounter any issues:
1. Check D1 Console for error messages
2. Verify tables exist with the verification query
3. Ensure admin user is created and has `is_admin = 1`
4. Check application logs in Cloudflare Pages dashboard
