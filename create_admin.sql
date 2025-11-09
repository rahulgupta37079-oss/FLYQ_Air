-- First, let's check if admin already exists
SELECT id, email, name, is_admin FROM users WHERE email = 'admin@flyq.com';

-- If not exists, we'll create one
-- Note: Password is 'Admin@123' hashed with bcryptjs
INSERT OR IGNORE INTO users (name, email, password, is_admin, created_at)
VALUES (
  'FLYQ Admin',
  'admin@flyq.com',
  '$2a$10$YourHashedPasswordHere',
  1,
  datetime('now')
);

-- Verify admin was created
SELECT id, email, name, is_admin FROM users WHERE email = 'admin@flyq.com';
