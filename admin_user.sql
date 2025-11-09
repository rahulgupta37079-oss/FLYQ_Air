-- Create Admin User
-- Email: admin@flyq.com
-- Password: Admin@123

-- Check if admin already exists
SELECT id, email, name, is_admin FROM users WHERE email = 'admin@flyq.com';

-- Insert admin user (will be ignored if email already exists)
INSERT OR IGNORE INTO users (name, email, password_hash, is_admin, created_at)
VALUES (
  'FLYQ Admin',
  'admin@flyq.com',
  '$2b$10$GSholCrtoV831w3Awg1PsucKaHiWAQcq.QJKgQwmz9mWZldToOeo2',
  1,
  datetime('now')
);

-- Verify admin was created/exists
SELECT id, email, name, is_admin, created_at FROM users WHERE email = 'admin@flyq.com';
