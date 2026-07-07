-- Create admin user for local development
-- This adds the is_admin column and creates the admin user

-- First, add is_admin column if it doesn't exist
ALTER TABLE users ADD COLUMN is_admin INTEGER DEFAULT 0;

-- Delete any existing admin user to avoid conflicts
DELETE FROM users WHERE email = 'admin@flyq.com';

-- Create the admin user
INSERT INTO users (name, email, password_hash, is_admin, created_at)
VALUES (
  'FLYQ Admin',
  'admin@flyq.com',
  'admin123',
  1,
  datetime('now')
);

-- Verify the admin user was created
SELECT id, name, email, is_admin, created_at FROM users WHERE email = 'admin@flyq.com';
