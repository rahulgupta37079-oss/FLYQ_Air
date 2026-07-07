const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Helper function to generate password
function generatePassword(email, userId) {
  const hash = require('crypto').createHash('md5').update(email + userId).digest('hex');
  return hash.substring(0, 12);
}

// Customer data (all 67 users)
const users = [
  { id: 1, email: 'info@passion3dworld.com' },
  { id: 2, email: 'rahulgupta37079@gmail.com' },
  { id: 3, email: 'meshivam1402@gmail.com' },
  { id: 4, email: 'professorhulk00@gmail.com' },
  { id: 6, email: 'chiragnr72@gmail.com' },
  { id: 7, email: 'Sabarivasanmariyappan805@gmail.com' },
  { id: 8, email: 'gauravkp73@gmail.com' },
  { id: 9, email: 'arshbadwal5@gmail.com' },
  { id: 10, email: 'krishnanava62@gmail.com' },
  { id: 11, email: 'preetpal1951@gmail.com' },
  { id: 12, email: 'Khurana2983@gmail.com' },
  { id: 13, email: 'msbhuvan07@gmail.com' },
  { id: 14, email: 'rajeevkrishna3456@gmail.com' },
  { id: 15, email: 'dkakshai28@gmail.com' },
  { id: 16, email: 'srinathk3001@gmail.com' },
  { id: 17, email: 'keshavbg414@gmail.com' },
  { id: 18, email: '22btcs001hy@manuu.edu.in' },
  { id: 19, email: 'sairamkarnam676@gmail.com' },
  { id: 20, email: 'Photos4gomzy@gmail.com' },
  { id: 21, email: 'anushasureshb1303@gmail.com' },
  { id: 22, email: 'chinnarappagariananth303@gmail.com' },
  { id: 23, email: 'rameshpranavesh@gmail.com' },
  { id: 24, email: 'abhishekjena407@gmail.com' },
  { id: 25, email: 'shivanikhandelwal487@gmail.com' },
  { id: 26, email: 'vedantchomal@gmail.com' },
  { id: 27, email: 'amrithamanjunair@outlook.com' },
  { id: 28, email: 'meetnathanonline@gmail.com' },
  { id: 29, email: 'dhananjaya.bl@gmail.com' },
  { id: 30, email: 'agamyakulkarni7@gmail.com' },
  { id: 31, email: 'ravishlawrence@gmail.com' },
  { id: 32, email: 'abhikatkar12@gmail.com' },
  { id: 33, email: 'pavanrochester@gmail.com' },
  { id: 34, email: 'ritikacmakhija@gmail.com' },
  { id: 35, email: 'gattusagar04997@gmail.com' },
  { id: 36, email: 'abhinavjoshi7891@gmail.com' },
  { id: 37, email: 'bellubbivaishali@gmail.com' },
  { id: 38, email: 'ganesh.sahai2@gmail.com' },
  { id: 39, email: 'jaseel9544196709@gmail.com' },
  { id: 40, email: 'pravingreat7@outlook.in' },
  { id: 41, email: 'nandan23lakshminarayan@gmail.com' },
  { id: 42, email: 'ashwin280208@gmail.com' },
  { id: 43, email: 'ram5march2018@gmail.com' },
  { id: 44, email: 'sriyasneha2@gmail.com' },
  { id: 45, email: 'adwaithkumar4506@gmail.com' },
  { id: 46, email: 'neerav84@gmail.com' },
  { id: 47, email: 'yogeshnbhat@gmail.com' },
  { id: 48, email: 'pranjal.pradhan26@gmail.com' },
  { id: 49, email: 'titinmondal30@gmail.com' },
  { id: 50, email: 'Balajirao1511@gmail.com' },
  { id: 51, email: 'deepakaradurai222456@gmail.com' },
  { id: 52, email: 'ruchikchaudhari08@gmail.com' },
  { id: 53, email: 'rahulmani360@gmail.com' },
  { id: 54, email: 'tvnroshan@gmail.com' },
  { id: 55, email: 'arit.bose27@gmail.com' },
  { id: 56, email: 'mishrasom75@email.com' },
  { id: 57, email: 'avyuktgupta71@gmail.com' },
  { id: 58, email: 'gaurtarsh47@gmail.com' },
  { id: 59, email: 'rohith2313smpl@gmail.com' },
  { id: 60, email: 'akashsambare191@gmail.com' },
  { id: 61, email: 'pvijayakumara47@gmail.com' },
  { id: 62, email: 'dograparisha87@gmail.com' },
  { id: 63, email: 'saijayanth2000y@gmail.com' },
  { id: 64, email: 'suma@emailad.com' },
  { id: 65, email: 'smithsmitha766@gmail.com' },
  { id: 66, email: 'nikhilbhalerao86@gmail.com' },
  { id: 67, email: 'aleronandhiskeys@gmail.com' },
  { id: 68, email: 'sharmakuber011@gmail.com' }
];

console.log('📊 Generating Password Migration SQL...\n');

let sql = `-- Migration to update all customer passwords to match emailed credentials
-- Generated: 2026-01-24
-- This migration updates ${users.length} user passwords

`;

for (const user of users) {
  const password = generatePassword(user.email, user.id);
  const hash = bcrypt.hashSync(password, 10);
  
  sql += `-- User ID ${user.id}: ${user.email} -> ${password}\n`;
  sql += `UPDATE users SET password_hash = '${hash}' WHERE id = ${user.id};\n\n`;
  
  console.log(`✅ Generated hash for ${user.email} (ID: ${user.id}) -> ${password}`);
}

// Save to migration file
const migrationPath = path.join(__dirname, 'migrations', '0012_update_all_passwords.sql');
fs.writeFileSync(migrationPath, sql);

console.log(`\n✨ Migration SQL generated successfully!`);
console.log(`📄 File: ${migrationPath}\n`);
