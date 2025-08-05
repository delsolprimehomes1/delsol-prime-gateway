
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  noindex?: boolean;
  structuredData?: object[];
  hreflangLinks?: Array<{
    href: string;
    hreflang: string;
  }>;
  currentLanguage?: string;
  keywords?: string[];
  lastModified?: string;
  twitterCard?: 'summary' | 'summary_large_image';
}

export default function SEOHead({
  title = "DelSolPrimeHomes - Luxury Costa Del Sol Real Estate",
  description = "Discover luxury properties on the Costa Del Sol with DelSolPrimeHomes' expert guidance. From Marbella to Estepona, find your dream home in Spain.",
  canonical,
  ogImage = "https://lovable.dev/opengraph-image-p98pqg.png",
  ogType = "website",
  article,
  noindex = false,
  structuredData = [],
  hreflangLinks = [],
  currentLanguage = 'en',
  keywords = [],
  lastModified,
  twitterCard = 'summary_large_image'
}: SEOHeadProps) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const canonicalUrl = canonical || currentUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Keywords */}
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* Last Modified */}
      {lastModified && (
        <meta name="last-modified" content={lastModified} />
      )}
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Viewport and Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="DelSolPrimeHomes" />
      <meta property="og:locale" content={currentLanguage === 'en' ? 'en_US' : currentLanguage} />
      
      {/* Hreflang Links for Multilingual SEO */}
      {hreflangLinks.map((link, index) => (
        <link key={index} rel="alternate" hrefLang={link.hreflang} href={link.href} />
      ))}
      {hreflangLinks.length > 0 && (
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@delsolprimehomes" />
      <meta name="twitter:creator" content="@delsolprimehomes" />
      
      {/* Mobile Twitter Card Optimization */}
      <meta name="twitter:app:name:iphone" content="DelSolPrimeHomes" />
      <meta name="twitter:app:name:googleplay" content="DelSolPrimeHomes" />
      
      {/* Article specific meta tags */}
      {article && ogType === 'article' && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.section && (
            <meta property="article:section" content={article.section} />
          )}
          {article.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Structured Data */}
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </Helmet>
  );
}
