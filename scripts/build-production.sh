
#!/bin/bash

echo "🚀 Starting production build for DelSolPrimeHomes..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run production build
echo "🔨 Building for production..."
npm run build

# Verify build output
echo "✅ Verifying build output..."
if [ -d "dist" ]; then
  echo "📁 Build directory created successfully"
  echo "📄 Build contents:"
  ls -la dist/
  
  if [ -d "dist/assets" ]; then
    echo "🎨 Assets directory found:"
    ls -la dist/assets/
  fi
else
  echo "❌ Build failed - dist directory not found"
  exit 1
fi

echo "🎉 Production build completed successfully!"
echo "📤 Ready for deployment to Cloudflare Pages"
