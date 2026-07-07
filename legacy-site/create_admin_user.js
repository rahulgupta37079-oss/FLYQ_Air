/**
 * Script to create an admin user in the database
 * Run with: node create_admin_user.js
 */

import bcryptjs from 'bcryptjs';
import { readFileSync, writeFileSync } from 'fs';

// Admin credentials
const ADMIN_EMAIL = 'admin@flyq.com';
const ADMIN_PASSWORD = 'Admin@123';
const ADMIN_NAME = 'FLYQ Admin';

// Hash the password
const hashedPassword = bcryptjs.hashSync(ADMIN_PASSWORD, 10);

console.log('='.repeat(70));
console.log('🔐 ADMIN USER CREATION SCRIPT');
console.log('='.repeat(70));
console.log('\n📧 Admin Email:', ADMIN_EMAIL);
console.log('🔑 Admin Password:', ADMIN_PASSWORD);
console.log('🔐 Hashed Password:', hashedPassword);
console.log('\n' + '='.repeat(70));

// Create SQL file
const sql = `-- Create Admin User
-- Email: ${ADMIN_EMAIL}
-- Password: ${ADMIN_PASSWORD}

-- Check if admin already exists
SELECT id, email, name, is_admin FROM users WHERE email = '${ADMIN_EMAIL}';

-- Insert admin user (will be ignored if email already exists)
INSERT OR IGNORE INTO users (name, email, password, is_admin, created_at)
VALUES (
  '${ADMIN_NAME}',
  '${ADMIN_EMAIL}',
  '${hashedPassword}',
  1,
  datetime('now')
);

-- Verify admin was created/exists
SELECT id, email, name, is_admin, created_at FROM users WHERE email = '${ADMIN_EMAIL}';
`;

writeFileSync('admin_user.sql', sql);

console.log('\n✅ SQL file created: admin_user.sql');
console.log('\n📝 To create the admin user, run:');
console.log('   npx wrangler d1 execute webapp-production --local --file=admin_user.sql');
console.log('\n🌐 For production database:');
console.log('   npx wrangler d1 execute webapp-production --remote --file=admin_user.sql');
console.log('\n' + '='.repeat(70));
console.log('🔐 LOGIN CREDENTIALS');
console.log('='.repeat(70));
console.log('Email:    admin@flyq.com');
console.log('Password: Admin@123');
console.log('='.repeat(70));
