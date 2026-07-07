#!/usr/bin/env node
// Fix _routes.json to exclude videos directory from Worker routing

const fs = require('fs');
const path = require('path');

const routesPath = path.join(__dirname, 'dist', '_routes.json');

try {
  const routes = JSON.parse(fs.readFileSync(routesPath, 'utf8'));
  
  // Add /videos/* and /images/* to exclude list if not already there
  let updated = false;
  
  if (!routes.exclude.includes('/videos/*')) {
    routes.exclude.push('/videos/*');
    updated = true;
  }
  
  if (!routes.exclude.includes('/images/*')) {
    routes.exclude.push('/images/*');
    updated = true;
  }
  
  if (updated) {
    fs.writeFileSync(routesPath, JSON.stringify(routes));
    console.log('✅ Updated _routes.json to exclude /videos/* and /images/*');
  } else {
    console.log('✅ _routes.json already configured correctly');
  }
} catch (error) {
  console.error('❌ Error updating _routes.json:', error.message);
  process.exit(1);
}
