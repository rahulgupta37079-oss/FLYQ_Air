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
