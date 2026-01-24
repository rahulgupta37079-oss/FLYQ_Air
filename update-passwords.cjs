const bcrypt = require('bcryptjs');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// Find the SQLite database file
const wranglerDir = path.join(__dirname, '.wrangler/state/v3/d1/miniflare-D1DatabaseObject');
const files = fs.readdirSync(wranglerDir);
const dbFile = files.find(f => f.endsWith('.sqlite'));
const dbPath = path.join(wranglerDir, dbFile);

console.log('🔐 Updating User Passwords...\n');
console.log('Database:', dbPath);

const db = new Database(dbPath);

// Helper function to generate password (same as in email script)
function generatePassword(email, userId) {
  const hash = crypto.createHash('md5').update(email + userId).digest('hex');
  return hash.substring(0, 12);
}

// Get all users
const users = db.prepare(`
  SELECT id, email, name FROM users WHERE is_admin = 0
`).all();

console.log(`Found ${users.length} users\n`);

// Update each user's password
const updateStmt = db.prepare('UPDATE users SET password_hash = ? WHERE id = ?');

let updated = 0;
const passwordList = [];

for (const user of users) {
  const plainPassword = generatePassword(user.email, user.id);
  const hashedPassword = bcrypt.hashSync(plainPassword, 10);
  
  updateStmt.run(hashedPassword, user.id);
  
  passwordList.push({
    id: user.id,
    name: user.name,
    email: user.email,
    password: plainPassword
  });
  
  updated++;
  console.log(`✅ [${updated}/${users.length}] Updated ${user.name} (${user.email}) → ${plainPassword}`);
}

// Save password list to file
fs.writeFileSync(
  path.join(__dirname, 'customer-passwords.json'),
  JSON.stringify(passwordList, null, 2)
);

console.log('\n' + '='.repeat(60));
console.log('✅ PASSWORD UPDATE COMPLETE!');
console.log('='.repeat(60));
console.log(`Updated: ${updated} users`);
console.log('Passwords saved to: customer-passwords.json');
console.log('\n🔐 All users can now login with their emailed passwords!');

db.close();
