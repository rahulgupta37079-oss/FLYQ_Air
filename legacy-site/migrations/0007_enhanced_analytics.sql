-- Enhanced analytics with conversion tracking and user journey

-- Conversion events tracking
CREATE TABLE IF NOT EXISTS conversion_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  session_id TEXT,
  event_type TEXT NOT NULL, -- 'product_view', 'add_to_cart', 'checkout_start', 'purchase', 'signup', 'login'
  event_data TEXT, -- JSON data with event details
  product_id INTEGER,
  order_id INTEGER,
  revenue REAL DEFAULT 0,
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE INDEX IF NOT EXISTS idx_conversion_type ON conversion_events(event_type);
CREATE INDEX IF NOT EXISTS idx_conversion_user ON conversion_events(user_id);
CREATE INDEX IF NOT EXISTS idx_conversion_session ON conversion_events(session_id);
CREATE INDEX IF NOT EXISTS idx_conversion_created ON conversion_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversion_product ON conversion_events(product_id);

-- User sessions for journey tracking
CREATE TABLE IF NOT EXISTS user_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL UNIQUE,
  user_id INTEGER,
  ip_address TEXT,
  user_agent TEXT,
  device_type TEXT, -- 'mobile', 'tablet', 'desktop'
  browser TEXT,
  os TEXT,
  referrer TEXT,
  landing_page TEXT,
  exit_page TEXT,
  page_count INTEGER DEFAULT 0,
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_activity DATETIME DEFAULT CURRENT_TIMESTAMP,
  ended_at DATETIME,
  duration_seconds INTEGER DEFAULT 0,
  converted INTEGER DEFAULT 0, -- 1 if user completed a conversion event
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_session_id ON user_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_session_user ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_session_started ON user_sessions(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_session_converted ON user_sessions(converted);

-- Page views for journey mapping
CREATE TABLE IF NOT EXISTS session_page_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  page_url TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  time_spent_seconds INTEGER DEFAULT 0,
  scroll_depth INTEGER DEFAULT 0, -- percentage 0-100
  sequence_number INTEGER DEFAULT 1, -- order in session
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES user_sessions(session_id)
);

CREATE INDEX IF NOT EXISTS idx_page_session ON session_page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_page_sequence ON session_page_views(session_id, sequence_number);
CREATE INDEX IF NOT EXISTS idx_page_created ON session_page_views(created_at DESC);

-- Conversion funnel stages
CREATE TABLE IF NOT EXISTS funnel_stages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  stage_name TEXT NOT NULL, -- 'landing', 'product_view', 'cart', 'checkout', 'purchase'
  stage_number INTEGER NOT NULL,
  completed INTEGER DEFAULT 0,
  completed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES user_sessions(session_id)
);

CREATE INDEX IF NOT EXISTS idx_funnel_session ON funnel_stages(session_id);
CREATE INDEX IF NOT EXISTS idx_funnel_stage ON funnel_stages(stage_name);
CREATE INDEX IF NOT EXISTS idx_funnel_completed ON funnel_stages(completed);

-- Product analytics
CREATE TABLE IF NOT EXISTS product_analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  date DATE NOT NULL,
  views INTEGER DEFAULT 0,
  add_to_cart INTEGER DEFAULT 0,
  purchases INTEGER DEFAULT 0,
  revenue REAL DEFAULT 0,
  unique_viewers INTEGER DEFAULT 0,
  conversion_rate REAL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(product_id, date),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE INDEX IF NOT EXISTS idx_product_analytics_product ON product_analytics(product_id);
CREATE INDEX IF NOT EXISTS idx_product_analytics_date ON product_analytics(date DESC);

-- Traffic sources
CREATE TABLE IF NOT EXISTS traffic_sources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  source_type TEXT, -- 'direct', 'search', 'social', 'referral', 'email', 'ads'
  source_name TEXT, -- 'google', 'facebook', 'twitter', specific domain
  campaign TEXT,
  medium TEXT,
  content TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES user_sessions(session_id)
);

CREATE INDEX IF NOT EXISTS idx_traffic_session ON traffic_sources(session_id);
CREATE INDEX IF NOT EXISTS idx_traffic_type ON traffic_sources(source_type);
CREATE INDEX IF NOT EXISTS idx_traffic_created ON traffic_sources(created_at DESC);
