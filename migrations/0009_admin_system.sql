-- ============================================================================
-- Admin System Enhancement
-- Comprehensive backend for orders, blogs, SEO, quotations, and analytics
-- ============================================================================

-- Quotations table
CREATE TABLE IF NOT EXISTS quotations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quote_number TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  project_type TEXT, -- 'aerial_survey', 'inspection', 'photography', 'custom'
  description TEXT NOT NULL,
  budget_range TEXT, -- 'under_5k', '5k_10k', '10k_25k', '25k_50k', 'above_50k'
  timeline TEXT, -- 'urgent', '1_week', '1_month', '3_months', 'flexible'
  status TEXT DEFAULT 'pending', -- 'pending', 'reviewed', 'quoted', 'accepted', 'rejected', 'expired'
  quoted_amount REAL,
  quoted_details TEXT,
  admin_notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME
);

-- SEO metadata table
CREATE TABLE IF NOT EXISTS seo_metadata (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_path TEXT UNIQUE NOT NULL, -- '/', '/products/flyq-air', '/blog/slug'
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  keywords TEXT, -- JSON array as string
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  twitter_card TEXT DEFAULT 'summary_large_image',
  canonical_url TEXT,
  robots TEXT DEFAULT 'index, follow', -- 'index, follow', 'noindex, nofollow'
  structured_data TEXT, -- JSON-LD schema markup
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Enhanced orders table
CREATE TABLE IF NOT EXISTS orders_enhanced (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_number TEXT UNIQUE NOT NULL,
  user_id INTEGER,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  shipping_address TEXT NOT NULL,
  billing_address TEXT,
  subtotal REAL NOT NULL,
  tax REAL DEFAULT 0,
  shipping_cost REAL DEFAULT 0,
  discount REAL DEFAULT 0,
  total REAL NOT NULL,
  payment_status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'failed', 'refunded'
  payment_method TEXT, -- 'credit_card', 'paypal', 'bank_transfer', 'cod'
  payment_transaction_id TEXT,
  order_status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'
  tracking_number TEXT,
  shipping_carrier TEXT,
  estimated_delivery DATE,
  notes TEXT,
  admin_notes TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  product_name TEXT NOT NULL,
  product_sku TEXT,
  quantity INTEGER NOT NULL,
  unit_price REAL NOT NULL,
  total_price REAL NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders_enhanced(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Blog categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#0EA5E9',
  icon TEXT,
  post_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Blog tags table
CREATE TABLE IF NOT EXISTS blog_tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  usage_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Blog post tags relationship
CREATE TABLE IF NOT EXISTS blog_post_tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  tag_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES blog_tags(id) ON DELETE CASCADE,
  UNIQUE(post_id, tag_id)
);

-- Blog comments table
CREATE TABLE IF NOT EXISTS blog_comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  user_id INTEGER,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  author_website TEXT,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'spam', 'trash'
  ip_address TEXT,
  user_agent TEXT,
  parent_id INTEGER, -- For nested replies
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (parent_id) REFERENCES blog_comments(id)
);

-- Admin activity log
CREATE TABLE IF NOT EXISTS admin_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  admin_id INTEGER NOT NULL,
  action TEXT NOT NULL, -- 'login', 'create', 'update', 'delete', 'export'
  entity_type TEXT NOT NULL, -- 'order', 'blog', 'product', 'user', 'quotation'
  entity_id INTEGER,
  description TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES users(id)
);

-- Email templates
CREATE TABLE IF NOT EXISTS email_templates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  variables TEXT, -- JSON array of available variables
  category TEXT, -- 'order', 'quotation', 'newsletter', 'notification'
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- System settings
CREATE TABLE IF NOT EXISTS system_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  type TEXT DEFAULT 'string', -- 'string', 'number', 'boolean', 'json'
  category TEXT, -- 'general', 'email', 'payment', 'shipping', 'seo'
  description TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Product reviews
CREATE TABLE IF NOT EXISTS product_reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  user_id INTEGER,
  order_id INTEGER,
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  title TEXT,
  review TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  verified_purchase INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  admin_response TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (order_id) REFERENCES orders_enhanced(id)
);

-- Inventory management
CREATE TABLE IF NOT EXISTS inventory_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  change_type TEXT NOT NULL, -- 'sale', 'restock', 'return', 'adjustment', 'damage'
  quantity_change INTEGER NOT NULL,
  previous_quantity INTEGER NOT NULL,
  new_quantity INTEGER NOT NULL,
  reference_type TEXT, -- 'order', 'manual', 'system'
  reference_id INTEGER,
  notes TEXT,
  admin_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (admin_id) REFERENCES users(id)
);

-- Discount codes
CREATE TABLE IF NOT EXISTS discount_codes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL, -- 'percentage', 'fixed_amount', 'free_shipping'
  value REAL NOT NULL,
  min_purchase REAL DEFAULT 0,
  max_uses INTEGER,
  used_count INTEGER DEFAULT 0,
  starts_at DATETIME,
  expires_at DATETIME,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default blog categories
INSERT OR IGNORE INTO blog_categories (name, slug, description, color) VALUES
  ('Getting Started', 'getting-started', 'Beginner guides and setup tutorials', '#10B981'),
  ('Tutorials', 'tutorials', 'Step-by-step technical guides', '#3B82F6'),
  ('Projects', 'projects', 'Real-world drone projects and applications', '#8B5CF6'),
  ('Tips & Tricks', 'tips-tricks', 'Expert tips and best practices', '#F59E0B'),
  ('News', 'news', 'Latest updates and announcements', '#EF4444');

-- Insert default system settings
INSERT OR IGNORE INTO system_settings (key, value, type, category, description) VALUES
  ('site_name', 'FLYQ Air', 'string', 'general', 'Website name'),
  ('site_tagline', 'Professional Drone Solutions', 'string', 'general', 'Website tagline'),
  ('admin_email', 'admin@flyq.com', 'string', 'general', 'Admin email address'),
  ('support_email', 'support@flyq.com', 'string', 'general', 'Support email address'),
  ('currency', 'USD', 'string', 'general', 'Default currency'),
  ('currency_symbol', '$', 'string', 'general', 'Currency symbol'),
  ('tax_rate', '0.08', 'number', 'general', 'Default tax rate (8%)'),
  ('shipping_cost', '15.00', 'number', 'general', 'Standard shipping cost'),
  ('free_shipping_threshold', '100.00', 'number', 'general', 'Free shipping above this amount'),
  ('order_prefix', 'FLYQ-', 'string', 'general', 'Order number prefix'),
  ('quote_prefix', 'QT-', 'string', 'general', 'Quotation number prefix'),
  ('items_per_page', '20', 'number', 'general', 'Pagination items per page'),
  ('maintenance_mode', 'false', 'boolean', 'general', 'Enable maintenance mode'),
  ('google_analytics_id', '', 'string', 'seo', 'Google Analytics tracking ID'),
  ('meta_description', 'FLYQ Air - Professional programmable drones for developers', 'string', 'seo', 'Default meta description');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_quotations_status ON quotations(status);
CREATE INDEX IF NOT EXISTS idx_quotations_created ON quotations(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders_enhanced(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_payment ON orders_enhanced(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders_enhanced(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_post ON blog_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_status ON blog_comments(status);
CREATE INDEX IF NOT EXISTS idx_admin_logs_admin ON admin_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_logs_entity ON admin_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON product_reviews(status);
CREATE INDEX IF NOT EXISTS idx_inventory_product ON inventory_log(product_id);
CREATE INDEX IF NOT EXISTS idx_seo_path ON seo_metadata(page_path);
