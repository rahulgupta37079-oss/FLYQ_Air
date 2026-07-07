# Production Blog Deployment Guide

**Date**: November 22, 2025  
**Current Status**: Code deployed, database migrations pending  
**Production URL**: https://48e97104.flyq-air.pages.dev

---

## ✅ Completed Steps

1. ✅ **Cloudflare API Authentication** - Successfully configured
2. ✅ **Project Build** - Built successfully (dist/_worker.js 536.15 kB)
3. ✅ **Cloudflare Pages Deployment** - Deployed to https://48e97104.flyq-air.pages.dev
4. ⚠️ **Database Migrations** - Partially applied (only 4 of 8 migrations)
5. ❌ **Blog Data Seeding** - Pending (requires migration completion first)
6. ⚠️ **GitHub Push** - Authentication expired (requires re-authorization)

---

## 🔴 Critical Issue: Migrations Not Fully Applied

### Current State
Only **4 of 8 migrations** have been applied to production database:
- ✅ 0001_ecommerce_schema.sql
- ✅ 0002_seed_products.sql
- ✅ 0003_contact_submissions.sql
- ✅ 0004_newsletter_subscriptions.sql
- ❌ 0005_analytics_system.sql
- ❌ 0006_add_admin_flag.sql
- ❌ 0007_enhanced_analytics.sql
- ❌ 0008_blog_system.sql (CRITICAL - needed for blog)

### Why Migrations Failed
Wrangler CLI attempted to apply migrations 5-8 but they appear to have timed out or failed silently during bulk application.

---

## 📋 Manual Database Setup Required

Since automated migrations failed, you need to manually execute SQL via **Cloudflare Dashboard**.

### Step-by-Step Instructions

#### 1. Access Cloudflare Dashboard

1. Go to https://dash.cloudflare.com
2. Log in with rahulgupta37079@gmail.com
3. Navigate to **Workers & Pages** → **D1**
4. Select database: **webapp-production**
   - Database ID: `6d2cdedc-73a0-48e2-b1f5-a952e3ffb8e0`
5. Click **Console** tab

---

#### 2. Apply Missing Migrations (Execute in Order)

**⚠️ IMPORTANT: Execute each migration separately in the console. Don't combine them.**

##### Migration 5: Analytics System

```sql
-- 0005_analytics_system.sql
CREATE TABLE IF NOT EXISTS page_visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_path TEXT NOT NULL,
  visitor_ip TEXT,
  user_agent TEXT,
  referer TEXT,
  user_id INTEGER,
  visited_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS popular_pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_path TEXT NOT NULL UNIQUE,
  visit_count INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  last_visited DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS analytics_daily (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date DATE NOT NULL UNIQUE,
  total_visits INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  new_users INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS user_activities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  activity_type TEXT NOT NULL,
  activity_data TEXT,
  ip_address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_page_visits_path ON page_visits(page_path);
CREATE INDEX IF NOT EXISTS idx_page_visits_user ON page_visits(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activities_user ON user_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activities_type ON user_activities(activity_type);
```

**Verify**: Check that 4 tables created
```sql
SELECT name FROM sqlite_master WHERE type='table' AND name IN ('page_visits', 'popular_pages', 'analytics_daily', 'user_activities');
```

---

##### Migration 6: Add Admin Flag

```sql
-- 0006_add_admin_flag.sql
ALTER TABLE users ADD COLUMN is_admin INTEGER DEFAULT 0;

UPDATE users SET is_admin = 1 WHERE email = 'admin@flyq.com';
```

**Verify**: Check admin column exists
```sql
SELECT is_admin FROM users WHERE email = 'admin@flyq.com';
```

---

##### Migration 7: Enhanced Analytics

```sql
-- 0007_enhanced_analytics.sql
CREATE TABLE IF NOT EXISTS conversion_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  user_id INTEGER,
  event_type TEXT NOT NULL,
  event_value TEXT,
  product_id INTEGER,
  revenue REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS user_sessions (
  id TEXT PRIMARY KEY,
  user_id INTEGER,
  ip_address TEXT,
  user_agent TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ended_at DATETIME,
  duration_seconds INTEGER,
  pages_viewed INTEGER DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS session_page_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  time_spent_seconds INTEGER,
  viewed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES user_sessions(id)
);

CREATE TABLE IF NOT EXISTS funnel_stages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  stage TEXT NOT NULL,
  entered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES user_sessions(id)
);

CREATE TABLE IF NOT EXISTS product_analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  date DATE NOT NULL,
  views INTEGER DEFAULT 0,
  add_to_cart INTEGER DEFAULT 0,
  purchases INTEGER DEFAULT 0,
  revenue REAL DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id),
  UNIQUE(product_id, date)
);

CREATE TABLE IF NOT EXISTS traffic_sources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT NOT NULL,
  medium TEXT,
  campaign TEXT,
  date DATE NOT NULL,
  sessions INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  revenue REAL DEFAULT 0,
  UNIQUE(source, medium, campaign, date)
);

CREATE INDEX IF NOT EXISTS idx_conversion_events_session ON conversion_events(session_id);
CREATE INDEX IF NOT EXISTS idx_conversion_events_user ON conversion_events(user_id);
CREATE INDEX IF NOT EXISTS idx_session_page_views_session ON session_page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_funnel_stages_session ON funnel_stages(session_id);
CREATE INDEX IF NOT EXISTS idx_product_analytics_product_date ON product_analytics(product_id, date);
CREATE INDEX IF NOT EXISTS idx_traffic_sources_date ON traffic_sources(date);
```

**Verify**: Check that 6 tables created
```sql
SELECT name FROM sqlite_master WHERE type='table' AND name IN ('conversion_events', 'user_sessions', 'session_page_views', 'funnel_stages', 'product_analytics', 'traffic_sources');
```

---

##### Migration 8: Blog System (CRITICAL)

```sql
-- 0008_blog_system.sql
CREATE TABLE IF NOT EXISTS blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  author_id INTEGER,
  category TEXT,
  tags TEXT,
  status TEXT DEFAULT 'draft',
  views INTEGER DEFAULT 0,
  reading_time INTEGER DEFAULT 5,
  published_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS blog_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  post_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blog_comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_comments_post ON blog_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_user ON blog_comments(user_id);

INSERT OR IGNORE INTO blog_categories (name, slug, description) VALUES
  ('Getting Started', 'getting-started', 'Beginner guides and tutorials for FLYQ drones'),
  ('Tutorials', 'tutorials', 'Step-by-step programming and assembly tutorials'),
  ('Projects', 'projects', 'Complete project showcases and implementations'),
  ('Tips & Tricks', 'tips-tricks', 'Quick tips and optimization guides'),
  ('News', 'news', 'Latest updates and announcements from FLYQ');
```

**Verify**: Check that 3 tables and 5 categories created
```sql
SELECT name FROM sqlite_master WHERE type='table' AND name LIKE 'blog%';
SELECT COUNT(*) as category_count FROM blog_categories;
```

---

#### 3. Seed Blog Posts (Execute in Order)

**⚠️ IMPORTANT: This will take time. Do NOT close the console during execution.**

##### A. First Blog Post (Getting Started)

Open file: `/home/user/webapp/seed_blog_post.sql` and copy the entire content. Execute in console.

**Verify**:
```sql
SELECT id, title, category FROM blog_posts WHERE id = 1;
```

---

##### B. Remaining 50 Blog Posts

Open file: `/home/user/webapp/seed_50_blog_posts.sql` and copy the entire content. Execute in console.

**This file is LARGE (47 KB). The console may take 30-60 seconds to execute.**

**Verify**:
```sql
SELECT category, COUNT(*) as count FROM blog_posts GROUP BY category;
SELECT COUNT(*) as total FROM blog_posts;
```

Expected result:
- Getting Started: 11
- Tutorials: 15
- Projects: 12
- Tips & Tricks: 8
- News: 5
- **Total: 51 posts**

---

#### 4. Update d1_migrations Table

After manual execution, update the migrations tracking table:

```sql
INSERT INTO d1_migrations (name, applied_at) VALUES
  ('0005_analytics_system.sql', datetime('now')),
  ('0006_add_admin_flag.sql', datetime('now')),
  ('0007_enhanced_analytics.sql', datetime('now')),
  ('0008_blog_system.sql', datetime('now'));
```

**Verify**:
```sql
SELECT * FROM d1_migrations ORDER BY id;
```

Should show 8 total migrations.

---

## 🧪 Production Verification

After completing database setup, test the production site:

### 1. Blog Listing Page
Visit: https://48e97104.flyq-air.pages.dev/blog

**Expected**:
- Grid layout with blog posts
- Category filter tabs (Getting Started, Tutorials, Projects, Tips & Tricks, News)
- 51 blog posts displayed

### 2. Category Filtering
Test each category filter:
- https://48e97104.flyq-air.pages.dev/blog?category=Getting%20Started (11 posts)
- https://48e97104.flyq-air.pages.dev/blog?category=Tutorials (15 posts)
- https://48e97104.flyq-air.pages.dev/blog?category=Projects (12 posts)
- https://48e97104.flyq-air.pages.dev/blog?category=Tips%20%26%20Tricks (8 posts)
- https://48e97104.flyq-air.pages.dev/blog?category=News (5 posts)

### 3. Individual Blog Posts
Test sample posts:
- https://48e97104.flyq-air.pages.dev/blog/getting-started-with-flyq
- https://48e97104.flyq-air.pages.dev/blog/programming-led-patterns
- https://48e97104.flyq-air.pages.dev/blog/autonomous-delivery-drone
- https://48e97104.flyq-air.pages.dev/blog/firmware-2-0-released

**Expected**:
- Full article content displays
- Featured image shows
- Social sharing buttons work
- View counter increments
- "Back to Blog" link functions

### 4. Main Site Integration
Visit: https://48e97104.flyq-air.pages.dev

**Expected**:
- Navigation menu includes "Blog" link
- Blog link goes to /blog page
- All other site features working

---

## 📝 GitHub Push (After Database Setup)

Once database is ready, push code to GitHub:

### Method 1: Via GitHub Web Interface
1. Go to https://github.com/rahulgupta37079-oss/FLYQ_Air
2. Navigate to #github tab in user interface
3. Complete authorization if needed
4. Upload files manually or use web editor

### Method 2: Generate New Personal Access Token
1. Go to https://github.com/settings/tokens
2. Generate new classic token with `repo` scope
3. In sandbox, configure:
   ```bash
   git remote set-url origin https://YOUR_TOKEN@github.com/rahulgupta37079-oss/FLYQ_Air.git
   git push origin main
   ```

---

## 📊 Summary Checklist

Use this checklist to track progress:

- [ ] **Migration 5**: Analytics system (4 tables)
- [ ] **Migration 6**: Admin flag column
- [ ] **Migration 7**: Enhanced analytics (6 tables)
- [ ] **Migration 8**: Blog system (3 tables + 5 categories)
- [ ] **Seed Data**: First blog post (1 post)
- [ ] **Seed Data**: 50 additional blog posts
- [ ] **Verify**: All 51 posts in database
- [ ] **Update**: d1_migrations table (8 entries)
- [ ] **Test**: Blog listing page loads
- [ ] **Test**: Category filtering works
- [ ] **Test**: Individual posts display
- [ ] **Test**: Navigation menu has Blog link
- [ ] **GitHub**: Push latest commits
- [ ] **Documentation**: Update README with new production URL

---

## 🆘 Troubleshooting

### Blog page shows "Blog Coming Soon"
- Migrations not applied or failed
- Check database has blog_posts table
- Verify 51 posts exist in database

### Individual blog posts show 404
- Check slug matches exactly (case-sensitive)
- Verify post status is 'published'
- Check database for post existence

### Categories showing zero posts
- Seed data not executed
- Check blog_posts table has data
- Verify category names match exactly

### Images not loading
- Featured images using CDN URLs (should work)
- Check browser console for errors
- Verify featured_image field has valid URL

---

## 📚 Additional Resources

- **Local Blog URL**: https://3000-i9dkuxqg07opw1sw23plt-d0b9e1e2.sandbox.novita.ai/blog
- **Production URL**: https://48e97104.flyq-air.pages.dev
- **Previous Production**: https://2bd3f407.flyq-air.pages.dev (may still work)
- **Database ID**: 6d2cdedc-73a0-48e2-b1f5-a952e3ffb8e0
- **Cloudflare Account**: rahulgupta37079@gmail.com
- **GitHub Repo**: https://github.com/rahulgupta37079-oss/FLYQ_Air

---

**Last Updated**: November 22, 2025  
**Status**: Awaiting manual database setup  
**Estimated Time**: 15-20 minutes for complete setup
