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
