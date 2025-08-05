import { generateAllSitemaps, generateSitemapXML, generateSitemapIndexXML } from '@/utils/seo/sitemapGenerator';

// Automatically generate sitemap files for deployment
export const generateSitemapFiles = async (): Promise<void> => {
  console.log('🔄 Generating sitemap files for deployment...');
  
  try {
    const sitemapData = generateAllSitemaps();
    const currentDate = new Date().toISOString();
    
    // Generate main sitemap
    const mainEntries = [...sitemapData.staticPages, ...sitemapData.faqs];
    const mainSitemap = generateSitemapXML(mainEntries);
    
    // Generate blog sitemap
    const blogSitemap = generateSitemapXML(sitemapData.blogPosts);
    
    // Generate locations sitemap
    const locationsSitemap = generateSitemapXML(sitemapData.locations);
    
    // Generate sitemap index
    const sitemapIndex = generateSitemapIndexXML([
      { loc: 'https://delsolprimehomes.com/sitemap.xml', lastmod: currentDate },
      { loc: 'https://delsolprimehomes.com/sitemap-blog.xml', lastmod: currentDate },
      { loc: 'https://delsolprimehomes.com/sitemap-locations.xml', lastmod: currentDate }
    ]);
    
    // In a real build process, these would be written to the public directory
    console.log('📄 Generated sitemaps:');
    console.log('- sitemap.xml (main)');
    console.log('- sitemap-blog.xml');
    console.log('- sitemap-locations.xml');
    console.log('- sitemap-index.xml');
    
    // Log sample of main sitemap for verification
    console.log('📋 Main sitemap preview:', mainSitemap.substring(0, 500) + '...');
    
    return Promise.resolve();
  } catch (error) {
    console.error('❌ Error generating sitemap files:', error);
    throw error;
  }
};

// Hook for build process
if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
  // This would run during build in a real deployment
  generateSitemapFiles().catch(console.error);
}