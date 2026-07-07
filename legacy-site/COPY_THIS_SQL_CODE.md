# SQL Code to Paste in Cloudflare Dashboard

**Where to paste**: Cloudflare Dashboard → Workers & Pages → D1 → webapp-production → Console

---

## STEP 1: Create Blog Tables (Copy & Paste This)

```sql
-- Blog system tables

-- Blog posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  author_id INTEGER,
  category TEXT,
  tags TEXT, -- JSON array of tags
  status TEXT DEFAULT 'draft', -- 'draft', 'published', 'archived'
  views INTEGER DEFAULT 0,
  reading_time INTEGER DEFAULT 5, -- minutes
  published_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published_at DESC);

-- Blog categories
CREATE TABLE IF NOT EXISTS blog_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  post_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_category_slug ON blog_categories(slug);

-- Blog comments
CREATE TABLE IF NOT EXISTS blog_comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  user_id INTEGER,
  author_name TEXT,
  author_email TEXT,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'spam'
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES blog_posts(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_comment_post ON blog_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comment_status ON blog_comments(status);
CREATE INDEX IF NOT EXISTS idx_comment_created ON blog_comments(created_at DESC);

-- Seed initial categories
INSERT OR IGNORE INTO blog_categories (name, slug, description) VALUES
  ('Getting Started', 'getting-started', 'Beginner guides and tutorials for FLYQ drones'),
  ('Tutorials', 'tutorials', 'Step-by-step programming and assembly tutorials'),
  ('Projects', 'projects', 'Community projects and use cases'),
  ('Tips & Tricks', 'tips-tricks', 'Expert tips for optimizing your FLYQ experience'),
  ('News', 'news', 'Latest updates and announcements from FLYQ');
```

**After pasting and executing, verify**:
```sql
SELECT COUNT(*) FROM blog_categories;
-- Should return: 5
```

---

## STEP 2: The SQL files are too large to display here

The blog post seed files are 47 KB and 9.5 KB - too large to paste in a markdown file.

### Two Options:

#### Option A: Download from Sandbox (RECOMMENDED)
You can download the SQL files directly from the sandbox and then paste them into Cloudflare Dashboard.

**File locations in sandbox**:
```
/home/user/webapp/seed_50_blog_posts.sql (47 KB - 50 blog posts)
/home/user/webapp/seed_blog_post.sql (9.5 KB - 1 blog post)
```

#### Option B: Use cat command to view content
Run these commands in the sandbox terminal to see the full SQL:

```bash
# View the 50 blog posts SQL
cat /home/user/webapp/seed_50_blog_posts.sql

# View the Getting Started post SQL  
cat /home/user/webapp/seed_blog_post.sql
```

Then copy the output and paste into Cloudflare D1 Console.

---

## VERIFICATION QUERIES

After executing all SQL files, run these to verify:

```sql
-- Check total posts
SELECT COUNT(*) FROM blog_posts WHERE status='published';
-- Expected: 51

-- Check posts by category
SELECT category, COUNT(*) as count 
FROM blog_posts 
WHERE status='published'
GROUP BY category 
ORDER BY category;
-- Expected:
-- Getting Started: 11
-- News: 5
-- Projects: 12
-- Tips & Tricks: 8
-- Tutorials: 15

-- Check categories
SELECT name, slug FROM blog_categories ORDER BY name;
-- Expected: 5 rows

-- Sample post titles
SELECT id, title, slug, category FROM blog_posts LIMIT 10;
-- Should show diverse posts
```

---

## QUICK STEPS SUMMARY

1. **Go to**: https://dash.cloudflare.com
2. **Navigate**: Workers & Pages → D1 → webapp-production → Console
3. **Execute**: STEP 1 SQL (copy from above)
4. **Verify**: `SELECT COUNT(*) FROM blog_categories;` returns 5
5. **Get seed files**: Use cat command or download from sandbox
6. **Execute**: seed_50_blog_posts.sql content
7. **Execute**: seed_blog_post.sql content
8. **Verify**: `SELECT COUNT(*) FROM blog_posts;` returns 51
9. **Visit**: https://183cd0ac.flyq-air.pages.dev/blog
10. **Enjoy**: 51 live blog posts! 🎉

---

## NEED THE FULL SQL CODE?

I'll create separate output files for you to easily copy.
