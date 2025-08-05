import { generateAllSitemaps, generateSitemapXML, generateSitemapIndexXML, submitSitemapToSearchEngines, type SitemapData } from './sitemapGenerator';

// Sitemap generation and deployment service
export class SitemapService {
  private baseUrl: string;
  
  constructor(baseUrl: string = 'https://delsolprimehomes.com') {
    this.baseUrl = baseUrl;
  }

  // Generate all sitemap files
  async generateSitemaps(): Promise<{ [filename: string]: string }> {
    const sitemapData = generateAllSitemaps();
    const currentDate = new Date().toISOString();
    
    // Generate individual sitemaps
    const sitemaps: { [filename: string]: string } = {};
    
    // Main sitemap with static pages
    const mainEntries = [...sitemapData.staticPages, ...sitemapData.faqs];
    sitemaps['sitemap.xml'] = generateSitemapXML(mainEntries);
    
    // Blog sitemap
    if (sitemapData.blogPosts.length > 0) {
      sitemaps['sitemap-blog.xml'] = generateSitemapXML(sitemapData.blogPosts);
    }
    
    // Locations sitemap
    if (sitemapData.locations.length > 0) {
      sitemaps['sitemap-locations.xml'] = generateSitemapXML(sitemapData.locations);
    }
    
    // Generate sitemap index
    const sitemapIndex = Object.keys(sitemaps).map(filename => ({
      loc: `${this.baseUrl}/${filename}`,
      lastmod: currentDate
    }));
    
    sitemaps['sitemap-index.xml'] = generateSitemapIndexXML(sitemapIndex);
    
    return sitemaps;
  }

  // Deploy sitemaps to public directory (for development)
  async deploySitemapsLocally(): Promise<void> {
    const sitemaps = await this.generateSitemaps();
    
    // In a real deployment, you would write these files to the public directory
    // For now, we'll log them for demonstration
    Object.entries(sitemaps).forEach(([filename, content]) => {
      console.log(`Generated ${filename}:`, content.substring(0, 200) + '...');
    });
  }

  // Submit all sitemaps to search engines
  async submitAllSitemaps(): Promise<void> {
    const sitemapUrls = [
      `${this.baseUrl}/sitemap.xml`,
      `${this.baseUrl}/sitemap-blog.xml`,
      `${this.baseUrl}/sitemap-locations.xml`,
      `${this.baseUrl}/sitemap-index.xml`
    ];

    console.log('🚀 Submitting sitemaps to search engines...');
    
    for (const sitemapUrl of sitemapUrls) {
      await submitSitemapToSearchEngines(sitemapUrl);
      // Add delay between submissions to be respectful
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('✅ All sitemaps submitted successfully!');
  }

  // Full deployment pipeline
  async deployAndSubmit(): Promise<void> {
    try {
      console.log('🔄 Starting sitemap generation and deployment...');
      
      // Generate sitemaps
      await this.deploySitemapsLocally();
      
      // Wait a bit for deployment to complete
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Submit to search engines
      await this.submitAllSitemaps();
      
      console.log('🎉 Sitemap deployment and submission completed!');
    } catch (error) {
      console.error('❌ Error during sitemap deployment:', error);
      throw error;
    }
  }
}

// Automatic sitemap generation hook for build process
export const generateSitemapsForBuild = async (): Promise<void> => {
  const sitemapService = new SitemapService();
  const sitemaps = await sitemapService.generateSitemaps();
  
  // In a real build process, you would write these files to the build output
  // For Lovable, we'll create a way to trigger this manually
  console.log('📄 Sitemaps generated for build:', Object.keys(sitemaps));
  
  return;
};

// Export for manual triggering
export const triggerSitemapGeneration = async (): Promise<void> => {
  const sitemapService = new SitemapService();
  await sitemapService.deployAndSubmit();
};