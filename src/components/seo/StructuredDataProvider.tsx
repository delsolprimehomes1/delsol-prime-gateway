import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  generateOrganizationSchema, 
  websiteSchema, 
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateArticleSchema
} from '@/utils/seo/structuredData';

interface StructuredDataProviderProps {
  children: ReactNode;
  pageType?: 'home' | 'faq' | 'blog' | 'article' | 'location' | 'about';
  pageData?: {
    title?: string;
    description?: string;
    author?: string;
    datePublished?: string;
    dateModified?: string;
    image?: string;
    faqs?: Array<{question: string; answer: string}>;
    breadcrumbs?: Array<{name: string; url: string}>;
  };
}

// Strip HTML tags from text
const stripHtml = (html: string): string => {
  if (typeof window !== 'undefined') {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  }
  // Fallback for SSR - basic HTML tag removal
  return html.replace(/<[^>]*>/g, '');
};

export function StructuredDataProvider({ 
  children, 
  pageType = 'home',
  pageData = {}
}: StructuredDataProviderProps) {
  const location = useLocation();
  const { currentLanguage } = useLanguage();
  
  const currentUrl = `https://delsolprimehomes.com${location.pathname}${location.search}`;
  const currentDate = new Date().toISOString();
  
  // Base schemas that appear on every page
  const baseSchemas = [
    generateOrganizationSchema(currentLanguage),
    {
      ...websiteSchema,
      inLanguage: currentLanguage,
      url: currentUrl
    }
  ];

  // Generate breadcrumbs automatically based on URL
  const generateAutoBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      { name: 'Home', url: 'https://delsolprimehomes.com' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');
      breadcrumbs.push({
        name,
        url: `https://delsolprimehomes.com${currentPath}`
      });
    });

    return breadcrumbs;
  };

  // Page-specific schemas
  const getPageSchemas = () => {
    const schemas: any[] = [];
    
    // Add breadcrumbs (custom or auto-generated)
    const breadcrumbs = pageData.breadcrumbs || generateAutoBreadcrumbs();
    if (breadcrumbs.length > 1) {
      schemas.push(generateBreadcrumbSchema(breadcrumbs));
    }

    switch (pageType) {
      case 'faq':
        if (pageData.faqs) {
          // Strip HTML from FAQ answers
          const cleanFaqs = pageData.faqs.map(faq => ({
            question: stripHtml(faq.question),
            answer: stripHtml(faq.answer)
          }));
          
          schemas.push({
            ...generateFAQSchema(cleanFaqs, currentLanguage),
            url: currentUrl,
            lastReviewed: currentDate,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": currentUrl
            }
          });
        }
        break;

      case 'article':
      case 'blog':
        if (pageData.title) {
          schemas.push({
            ...generateArticleSchema({
              headline: pageData.title,
              description: pageData.description || '',
              author: pageData.author || 'DelSolPrimeHomes Team',
              datePublished: pageData.datePublished || currentDate,
              dateModified: pageData.dateModified || pageData.datePublished || currentDate,
              image: pageData.image,
              url: currentUrl
            }),
            "@type": pageType === 'blog' ? "BlogPosting" : "Article",
            inLanguage: currentLanguage,
            isPartOf: {
              "@type": "Blog",
              "@id": "https://delsolprimehomes.com/blog",
              name: "DelSolPrimeHomes Blog"
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": currentUrl
            }
          });
        }
        break;

      case 'location':
        // Add LocalBusiness schema for location pages
        schemas.push({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": currentUrl,
          "name": `DelSolPrimeHomes - ${pageData.title || 'Costa del Sol'}`,
          "description": pageData.description || "Luxury real estate services",
          "url": currentUrl,
          "inLanguage": currentLanguage,
          "areaServed": {
            "@type": "City",
            "name": pageData.title || "Costa del Sol"
          },
          "parentOrganization": {
            "@type": "Organization",
            "name": "DelSolPrimeHomes"
          }
        });
        break;

      case 'about':
        // Add AboutPage schema
        schemas.push({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "@id": currentUrl,
          "name": pageData.title || "About DelSolPrimeHomes",
          "description": pageData.description || "Learn about our luxury real estate services",
          "url": currentUrl,
          "inLanguage": currentLanguage,
          "mainEntity": {
            "@type": "Organization",
            "name": "DelSolPrimeHomes"
          },
          "lastReviewed": currentDate
        });
        break;

      case 'home':
      default:
        // Add WebPage schema for homepage
        schemas.push({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": currentUrl,
          "name": pageData.title || "DelSolPrimeHomes - Luxury Costa Del Sol Real Estate",
          "description": pageData.description || "Discover luxury properties on the Costa Del Sol",
          "url": currentUrl,
          "inLanguage": currentLanguage,
          "isPartOf": {
            "@type": "WebSite",
            "@id": "https://delsolprimehomes.com"
          },
          "lastReviewed": currentDate
        });
        break;
    }

    return schemas;
  };

  const allSchemas = [...baseSchemas, ...getPageSchemas()];

  return (
    <>
      <Helmet>
        {allSchemas.map((schema, index) => (
          <script
            key={`structured-data-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(schema, null, 0) 
            }}
          />
        ))}
      </Helmet>
      {children}
    </>
  );
}