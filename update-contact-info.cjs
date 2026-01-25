const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Find the SQLite database file
const wranglerDir = path.join(__dirname, '.wrangler/state/v3/d1/miniflare-D1DatabaseObject');
const files = fs.readdirSync(wranglerDir);
const dbFile = files.find(f => f.endsWith('.sqlite'));
const dbPath = path.join(wranglerDir, dbFile);

console.log('📝 Updating Contact Information\n');
console.log('Database:', dbPath, '\n');

const db = new Database(dbPath);

// Update admin user contact info
const adminEmail = 'info@passion3dworld.com';
const adminPhone = '+91 9137361474';

try {
  // Check if admin table has these columns
  const tableInfo = db.prepare("PRAGMA table_info(users)").all();
  console.log('User table columns:', tableInfo.map(col => col.name).join(', '));
  
  // Update admin user
  const updateResult = db.prepare(`
    UPDATE users 
    SET email = ?, phone = ?
    WHERE is_admin = 1
  `).run(adminEmail, adminPhone);
  
  console.log('\n✅ Updated admin contact info:');
  console.log('   Email:', adminEmail);
  console.log('   Phone:', adminPhone);
  console.log('   Rows affected:', updateResult.changes);
  
  // Verify update
  const admin = db.prepare(`
    SELECT id, name, email, phone, is_admin 
    FROM users 
    WHERE is_admin = 1
  `).get();
  
  console.log('\n📋 Admin User Details:');
  console.log('   ID:', admin.id);
  console.log('   Name:', admin.name);
  console.log('   Email:', admin.email);
  console.log('   Phone:', admin.phone);
  console.log('   Is Admin:', admin.is_admin);
  
  console.log('\n✨ Contact information updated successfully!');
  console.log('\n📞 New Contact Details:');
  console.log('   📧 Email: info@passion3dworld.com');
  console.log('   📱 WhatsApp: +91 9137361474');
  console.log('   🔗 WhatsApp Link: https://wa.me/919137361474');
  
} catch (error) {
  console.error('❌ Error:', error.message);
} finally {
  db.close();
}
