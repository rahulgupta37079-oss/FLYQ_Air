-- Create admin user (simple version)
DELETE FROM users WHERE email = 'admin@flyq.com';

INSERT INTO users (name, email, password_hash, is_admin, created_at)
VALUES (
  'FLYQ Admin',
  'admin@flyq.com',
  'admin123',
  1,
  datetime('now')
);

SELECT id, name, email, is_admin FROM users WHERE email = 'admin@flyq.com';
