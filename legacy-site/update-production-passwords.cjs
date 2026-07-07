const bcrypt = require('bcryptjs');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

console.log('📊 Updating Production Passwords\n');

// Find the local SQLite database file
const wranglerDir = path.join(__dirname, '.wrangler/state/v3/d1/miniflare-D1DatabaseObject');
const files = fs.readdirSync(wranglerDir);
const dbFile = files.find(f => f.endsWith('.sqlite'));
const dbPath = path.join(wranglerDir, dbFile);

console.log('Database:', dbPath);

const db = new Database(dbPath);

// Helper function to generate password
function generatePassword(email, userId) {
  const hash = require('crypto').createHash('md5').update(email + userId).digest('hex');
  return hash.substring(0, 12);
}

// Get all non-admin users
const users = db.prepare('SELECT id, email, name FROM users WHERE is_admin = 0').all();

console.log(`\n📧 Found ${users.length} users\n`);

// Update each user's password
let updated = 0;
const passwordList = [];

for (const user of users) {
  const password = generatePassword(user.email, user.id);
  const hash = bcrypt.hashSync(password, 10);
  
  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(hash, user.id);
  
  passwordList.push({
    id: user.id,
    name: user.name,
    email: user.email,
    password: password
  });
  
  updated++;
  console.log(`✅ [${updated}/${users.length}] Updated ${user.name} (${user.email}) - Password: ${password}`);
}

// Save password list
fs.writeFileSync(
  path.join(__dirname, 'all-customer-passwords.json'),
  JSON.stringify(passwordList, null, 2)
);

console.log(`\n✨ Successfully updated ${updated} passwords!`);
console.log(`📄 Password list saved to: all-customer-passwords.json\n`);

db.close();
