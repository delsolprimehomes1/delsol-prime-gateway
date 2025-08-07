
const fs = require('fs');
const path = require('path');

// Read current package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Add/update scripts
packageJson.scripts = {
  ...packageJson.scripts,
  "build:production": "vite build --mode production",
  "build:staging": "vite build --mode staging", 
  "preview:production": "vite preview --host --port 4173",
  "deploy:cloudflare": "wrangler pages publish dist",
  "build:deploy": "./scripts/build-production.sh && npm run deploy:cloudflare"
};

// Write updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('✅ Updated package.json with production build scripts');
