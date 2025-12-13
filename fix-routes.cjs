#!/usr/bin/env node
// Fix _routes.json to exclude videos directory from Worker routing

const fs = require('fs');
const path = require('path');

const routesPath = path.join(__dirname, 'dist', '_routes.json');

try {
  const routes = JSON.parse(fs.readFileSync(routesPath, 'utf8'));
  
  // Add /videos/* to exclude list if not already there
  if (!routes.exclude.includes('/videos/*')) {
    routes.exclude.push('/videos/*');
    fs.writeFileSync(routesPath, JSON.stringify(routes));
    console.log('✅ Updated _routes.json to exclude /videos/*');
  } else {
    console.log('✅ _routes.json already configured correctly');
  }
} catch (error) {
  console.error('❌ Error updating _routes.json:', error.message);
  process.exit(1);
}
