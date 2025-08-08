
# DelSolPrimeHomes - Production Deployment Guide

## Quick Deployment Steps

### 1. Configure Vite for Production
✅ **Already Done**: `vite.config.ts` updated with `base: "./"` for relative paths

### 2. Build for Production
```bash
# Clean install dependencies
npm ci

# Run production build
npm run build

# Alternative: Use our custom build script
./scripts/build-production.sh
```

### 3. Cloudflare Pages Setup

#### Manual Setup:
1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy

#### Environment Variables in Cloudflare:
Set these in your Cloudflare Pages project settings:
```
VITE_SUPABASE_URL=your-production-supabase-url
VITE_SUPABASE_ANON_KEY=your-production-supabase-anon-key  
VITE_GOOGLE_VERIFICATION=your-google-verification-code
VITE_BING_VERIFICATION=your-bing-verification-code
```

### 4. Post-Deployment

#### Purge Cloudflare Cache:
```bash
# Via Cloudflare Dashboard: Caching > Purge Everything
# Or via API:
curl -X POST "https://api.cloudflare.com/client/v4/zones/YOUR_ZONE_ID/purge_cache" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

## File Structure After Build

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [image files]
├── manifest.json
└── sw.js
```

## Verification Checklist

- [ ] All CSS/JS files use relative paths (`./assets/`)
- [ ] Images load correctly
- [ ] Service Worker registers
- [ ] SEO meta tags present
- [ ] Performance scores > 90
- [ ] All routes work correctly
- [ ] Mobile responsiveness maintained

## Troubleshooting

### Assets Not Loading
- Verify `base: "./"` in vite.config.ts
- Check Cloudflare Pages publish directory is `dist`
- Ensure assets are in `dist/assets/` after build

### Service Worker Issues  
- Verify `public/sw.js` is copied to `dist/sw.js`
- Check browser console for SW registration errors
- Clear browser cache and reload

### Route Issues
- Ensure `_routes.json` is in project root
- Check that all routes are defined in App.tsx
- Verify React Router configuration

## Performance Optimization

The build includes:
- Code splitting for vendor libraries
- Asset optimization and compression  
- Service Worker for caching
- Critical CSS inlining
- Image preloading for hero section

## Monitoring

After deployment, monitor:
- Core Web Vitals in Google Search Console
- Performance in Cloudflare Analytics
- Error reporting in browser console
- SEO performance in search results
