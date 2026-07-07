const bcrypt = require('bcryptjs');

const password = '4b2dcddec60c';
const hash = '$2b$10$GdGH93YFntIpjkrzj2YNLecQwjHIMmzDgYo7jyuDvv1G..59uMsZG';

console.log('Testing password verification:');
console.log('Password:', password);
console.log('Hash:', hash);
console.log('Matches:', bcrypt.compareSync(password, hash));
