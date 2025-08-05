import { Language } from '@/contexts/LanguageContext';

export interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  alternates?: { [lang: string]: string };
}

export interface SitemapData {
  staticPages: SitemapEntry[];
  blogPosts: SitemapEntry[];
  locations: SitemapEntry[];
  faqs: SitemapEntry[];
}

// Supported languages for sitemap generation
export const SUPPORTED_LANGUAGES: Language[] = ['en', 'es', 'nl', 'fr', 'de', 'pl', 'se', 'dk'];

// Base URL configuration
const BASE_URL = 'https://delsolprimehomes.com';

// Generate alternates for multilingual pages
export const generateAlternates = (path: string, excludeLang?: string): { [lang: string]: string } => {
  const alternates: { [lang: string]: string } = {};
  
  SUPPORTED_LANGUAGES.forEach(lang => {
    if (lang !== excludeLang) {
      alternates[lang === 'dk' ? 'da' : lang === 'se' ? 'sv' : lang] = 
        `${BASE_URL}${path}${path.includes('?') ? '&' : '?'}lang=${lang}`;
    }
  });
  
  return alternates;
};

// Static pages configuration
export const getStaticPages = (): SitemapEntry[] => {
  const currentDate = new Date().toISOString();
  
  const staticPages = [
    {
      path: '',
      priority: 1.0,
      changefreq: 'daily' as const,
      lastmod: currentDate
    },
    {
      path: '/about',
      priority: 0.8,
      changefreq: 'monthly' as const,
      lastmod: currentDate
    },
    {
      path: '/faq',
      priority: 0.9,
      changefreq: 'weekly' as const,
      lastmod: currentDate
    },
    {
      path: '/blog',
      priority: 0.8,
      changefreq: 'daily' as const,
      lastmod: currentDate
    },
    {
      path: '/calendar',
      priority: 0.6,
      changefreq: 'weekly' as const,
      lastmod: currentDate
    }
  ];

  return staticPages.map(page => ({
    url: `${BASE_URL}${page.path}`,
    lastmod: page.lastmod,
    changefreq: page.changefreq,
    priority: page.priority,
    alternates: generateAlternates(page.path)
  }));
};

// Location pages configuration
export const getLocationPages = (): SitemapEntry[] => {
  const currentDate = new Date().toISOString();
  
  const locations = [
    'marbella',
    'estepona', 
    'mijas',
    'fuengirola',
    'benalmadena'
  ];

  return locations.map(location => ({
    url: `${BASE_URL}/locations/${location}`,
    lastmod: currentDate,
    changefreq: 'weekly' as const,
    priority: 0.7,
    alternates: generateAlternates(`/locations/${location}`)
  }));
};

// Blog posts configuration (sample data - replace with real CMS data)
export const getBlogPosts = (): SitemapEntry[] => {
  const blogPosts = [
    {
      slug: 'costa-del-sol-market-outlook-2024',
      lastmod: '2024-01-15T00:00:00.000Z',
      priority: 0.6
    },
    {
      slug: 'luxury-villa-investment-marbella-estepona',
      lastmod: '2024-01-12T00:00:00.000Z',
      priority: 0.6
    },
    {
      slug: 'buying-property-spain-foreigner-guide',
      lastmod: '2024-01-10T00:00:00.000Z',
      priority: 0.7
    }
  ];

  return blogPosts.map(post => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastmod: post.lastmod,
    changefreq: 'monthly' as const,
    priority: post.priority,
    alternates: generateAlternates(`/blog/${post.slug}`)
  }));
};

// Generate XML sitemap content
export const generateSitemapXML = (entries: SitemapEntry[]): string => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">';
  const urlsetClose = '</urlset>';

  const urls = entries.map(entry => {
    let urlXml = `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>`;

    // Add hreflang alternates
    if (entry.alternates) {
      Object.entries(entry.alternates).forEach(([lang, url]) => {
        urlXml += `\n    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}" />`;
      });
      
      // Add x-default hreflang
      urlXml += `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${entry.url}" />`;
    }

    urlXml += '\n  </url>';
    return urlXml;
  }).join('\n');

  return `${xmlHeader}\n${urlsetOpen}\n${urls}\n${urlsetClose}`;
};

// Generate sitemap index for multiple sitemaps
export const generateSitemapIndexXML = (sitemaps: { loc: string; lastmod: string }[]): string => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const sitemapIndexOpen = '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const sitemapIndexClose = '</sitemapindex>';

  const sitemapEntries = sitemaps.map(sitemap => 
    `  <sitemap>
    <loc>${sitemap.loc}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`
  ).join('\n');

  return `${xmlHeader}\n${sitemapIndexOpen}\n${sitemapEntries}\n${sitemapIndexClose}`;
};

// Search engine submission URLs
export const SEARCH_ENGINE_ENDPOINTS = {
  google: 'https://www.google.com/ping?sitemap=',
  bing: 'https://www.bing.com/ping?sitemap='
};

// Submit sitemap to search engines
export const submitSitemapToSearchEngines = async (sitemapUrl: string): Promise<void> => {
  const submissions = Object.entries(SEARCH_ENGINE_ENDPOINTS).map(async ([engine, endpoint]) => {
    try {
      const response = await fetch(`${endpoint}${encodeURIComponent(sitemapUrl)}`, {
        method: 'GET',
        mode: 'no-cors' // Required for cross-origin requests
      });
      
      console.log(`✅ Sitemap submitted to ${engine}: ${sitemapUrl}`);
      return { engine, success: true };
    } catch (error) {
      console.error(`❌ Failed to submit sitemap to ${engine}:`, error);
      return { engine, success: false, error };
    }
  });

  const results = await Promise.allSettled(submissions);
  
  results.forEach((result, index) => {
    const engine = Object.keys(SEARCH_ENGINE_ENDPOINTS)[index];
    if (result.status === 'fulfilled') {
      console.log(`${engine}: ${result.value.success ? 'Success' : 'Failed'}`);
    } else {
      console.error(`${engine}: Promise rejected`, result.reason);
    }
  });
};

// Generate all sitemaps
export const generateAllSitemaps = (): SitemapData => {
  return {
    staticPages: getStaticPages(),
    blogPosts: getBlogPosts(),
    locations: getLocationPages(),
    faqs: [{
      url: `${BASE_URL}/faq`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.9,
      alternates: generateAlternates('/faq')
    }]
  };
};