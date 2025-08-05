// Content metadata configuration for all pages
import ogMainImage from "@/assets/og-delsolprimehomes-main.jpg";
import ogAboutImage from "@/assets/og-about-team.jpg";
import ogBlogImage from "@/assets/og-blog-insights.jpg";
import ogFaqImage from "@/assets/og-faq-help.jpg";
import twitterMobileImage from "@/assets/twitter-card-mobile.jpg";

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  ogType: 'website' | 'article' | 'profile';
  twitterCard: 'summary' | 'summary_large_image';
  canonical: string;
  structuredDataType?: string;
  hreflangPages?: string[];
  lastModified?: string;
  author?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

export const PAGE_METADATA: Record<string, PageMetadata> = {
  // Homepage
  '/': {
    title: 'DelSolPrimeHomes - Luxury Costa del Sol Real Estate',
    description: 'Discover luxury properties on the Costa del Sol with DelSolPrimeHomes\' expert guidance. From Marbella to Estepona, find your dream home in Spain with 15+ years of expertise.',
    keywords: [
      'Costa Del Sol real estate',
      'Marbella properties',
      'Estepona luxury homes',
      'Spanish property investment',
      'Costa Del Sol property prices',
      'DelSolPrimeHomes',
      'luxury villas Spain',
      'international property buyers'
    ],
    ogImage: ogMainImage,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    canonical: 'https://delsolprimehomes.com',
    structuredDataType: 'WebSite',
    hreflangPages: ['/es', '/fr', '/nl', '/de', '/pl', '/dk', '/se'],
    lastModified: new Date().toISOString()
  },

  // About Page
  '/about': {
    title: 'About DelSolPrimeHomes - Meet Our Expert Real Estate Team',
    description: 'Meet Hans van der Berg and the DelSolPrimeHomes team. 15+ years of expertise in Costa del Sol real estate, helping international clients find their dream properties in Spain.',
    keywords: [
      'DelSolPrimeHomes team',
      'Hans van der Berg',
      'Costa del Sol real estate experts',
      'international property consultants',
      'Spanish real estate professionals',
      'Marbella property advisors',
      'real estate agency Costa del Sol'
    ],
    ogImage: ogAboutImage,
    ogType: 'profile',
    twitterCard: 'summary_large_image',
    canonical: 'https://delsolprimehomes.com/about',
    structuredDataType: 'AboutPage',
    hreflangPages: ['/about?lang=es', '/about?lang=fr', '/about?lang=nl'],
    lastModified: new Date().toISOString(),
    author: 'DelSolPrimeHomes Team'
  },

  // Blog Page
  '/blog': {
    title: 'Costa del Sol Real Estate Blog - Expert Insights & Market Analysis',
    description: 'Expert insights and advice on Costa del Sol real estate market, property investment, and living in Spain from DelSolPrimeHomes professionals. Latest market trends and buying guides.',
    keywords: [
      'Costa del Sol real estate blog',
      'Spanish property market analysis',
      'real estate investment insights',
      'Marbella property trends',
      'Spain property buying guide',
      'Costa del Sol market outlook',
      'international property investment'
    ],
    ogImage: ogBlogImage,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    canonical: 'https://delsolprimehomes.com/blog',
    structuredDataType: 'Blog',
    lastModified: new Date().toISOString(),
    author: 'DelSolPrimeHomes Editorial Team'
  },

  // FAQ Page
  '/faq': {
    title: 'Costa del Sol Real Estate FAQ - Expert Property Answers',
    description: 'Get instant answers to all your Costa del Sol property questions. Expert advice on buying, selling, legal requirements, taxes, and more from DelSolPrimeHomes in 7 languages.',
    keywords: [
      'Costa del Sol property FAQ',
      'Spanish real estate questions',
      'buying property in Spain',
      'Costa del Sol property taxes',
      'international property buyers guide',
      'Spanish property legal requirements',
      'real estate FAQ Spain'
    ],
    ogImage: ogFaqImage,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    canonical: 'https://delsolprimehomes.com/faq',
    structuredDataType: 'FAQPage',
    hreflangPages: ['/faq?lang=es', '/faq?lang=fr', '/faq?lang=nl', '/faq?lang=de'],
    lastModified: new Date().toISOString()
  },

  // Location Pages
  '/locations/marbella': {
    title: 'Luxury Properties for Sale in Marbella - DelSolPrimeHomes',
    description: 'Discover luxury properties for sale in Marbella, Costa del Sol. Exclusive villas, penthouses, and apartments in Puerto Banús, Golden Mile, and Nueva Andalucía.',
    keywords: [
      'Marbella properties for sale',
      'luxury villas Marbella',
      'Puerto Banús real estate',
      'Marbella Golden Mile properties',
      'Nueva Andalucía homes',
      'Marbella penthouse for sale',
      'exclusive Marbella real estate'
    ],
    ogImage: ogMainImage,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    canonical: 'https://delsolprimehomes.com/locations/marbella',
    structuredDataType: 'Place',
    lastModified: new Date().toISOString()
  },

  '/locations/estepona': {
    title: 'Estepona Properties for Sale - Luxury Real Estate Costa del Sol',
    description: 'Explore luxury properties for sale in Estepona, Costa del Sol. Modern developments, beachfront apartments, and traditional Spanish villas with expert guidance.',
    keywords: [
      'Estepona properties for sale',
      'Estepona luxury real estate',
      'beachfront properties Estepona',
      'new developments Estepona',
      'Estepona villas for sale',
      'Costa del Sol Estepona homes'
    ],
    ogImage: ogMainImage,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    canonical: 'https://delsolprimehomes.com/locations/estepona',
    structuredDataType: 'Place',
    lastModified: new Date().toISOString()
  }
};

// Generate metadata for blog posts
export const generateBlogPostMetadata = (post: {
  title: string;
  excerpt: string;
  slug: string;
  author: string;
  publishDate: string;
  category: string;
  tags?: string[];
}): PageMetadata => ({
  title: `${post.title} | DelSolPrimeHomes Blog`,
  description: post.excerpt,
  keywords: [
    'Costa del Sol real estate',
    post.category.toLowerCase(),
    'Spanish property market',
    'real estate investment',
    ...(post.tags || [])
  ],
  ogImage: ogBlogImage,
  ogType: 'article',
  twitterCard: 'summary_large_image',
  canonical: `https://delsolprimehomes.com/blog/${post.slug}`,
  structuredDataType: 'Article',
  lastModified: new Date().toISOString(),
  author: post.author,
  article: {
    publishedTime: new Date(post.publishDate).toISOString(),
    modifiedTime: new Date().toISOString(),
    author: post.author,
    section: post.category,
    tags: post.tags || []
  }
});

// Generate hreflang links for multilingual pages
export const generateHreflangLinks = (basePath: string, supportedLanguages: string[] = ['en', 'es', 'fr', 'nl', 'de', 'pl', 'da', 'sv']) => {
  const baseUrl = 'https://delsolprimehomes.com';
  
  return supportedLanguages.map(lang => ({
    href: lang === 'en' ? `${baseUrl}${basePath}` : `${baseUrl}${basePath}?lang=${lang}`,
    hreflang: lang
  }));
};

// Generate Twitter Card metadata optimized for mobile
export const generateTwitterCardMeta = (metadata: PageMetadata) => ({
  'twitter:card': metadata.twitterCard,
  'twitter:site': '@delsolprimehomes',
  'twitter:creator': '@delsolprimehomes', 
  'twitter:title': metadata.title,
  'twitter:description': metadata.description,
  'twitter:image': metadata.ogImage,
  'twitter:image:alt': metadata.title,
  'twitter:app:name:iphone': 'DelSolPrimeHomes',
  'twitter:app:name:googleplay': 'DelSolPrimeHomes'
});

// Generate Open Graph metadata
export const generateOpenGraphMeta = (metadata: PageMetadata) => ({
  'og:type': metadata.ogType,
  'og:url': metadata.canonical,
  'og:title': metadata.title,
  'og:description': metadata.description,
  'og:image': metadata.ogImage,
  'og:image:width': '1200',
  'og:image:height': '630',
  'og:image:alt': metadata.title,
  'og:site_name': 'DelSolPrimeHomes',
  'og:locale': 'en_US'
});