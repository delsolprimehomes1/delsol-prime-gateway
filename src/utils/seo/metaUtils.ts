
// Utility functions for generating SEO meta tags

export const generateTitle = (pageTitle?: string, includeCompany = true): string => {
  const companyName = "DelSolPrimeHomes";
  const suffix = "Luxury Costa del Sol Real Estate";
  
  if (!pageTitle) {
    return `${companyName} - ${suffix}`;
  }
  
  if (includeCompany) {
    return `${pageTitle} | ${companyName}`;
  }
  
  return pageTitle;
};

export const truncateDescription = (description: string, maxLength = 160): string => {
  if (description.length <= maxLength) {
    return description;
  }
  
  const truncated = description.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > maxLength - 50 
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
};

export const generateCanonicalUrl = (path: string): string => {
  const baseUrl = 'https://delsolprimehomes.com';
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

export const formatDateForSchema = (date: Date | string): string => {
  if (typeof date === 'string') {
    return new Date(date).toISOString();
  }
  return date.toISOString();
};

// Common meta descriptions for different page types
export const META_DESCRIPTIONS = {
  homepage: "Discover luxury properties on the Costa del Sol with DelSolPrimeHomes' expert guidance. From Marbella to Estepona, find your dream home in Spain.",
  blog: "Expert insights and advice on Costa del Sol real estate market, property investment, and living in Spain from DelSolPrimeHomes professionals.",
  faq: "Get answers to frequently asked questions about buying property in Spain, Costa del Sol real estate process, and international property investment.",
  properties: "Browse luxury properties for sale in Costa del Sol including Marbella, Estepona, Mijas and surrounding areas. Expert guidance included.",
  locations: "Explore the best locations for property investment in Costa del Sol including Marbella, Estepona, Mijas, Fuengirola and Benalmádena."
};

// Keywords for different page types
export const PAGE_KEYWORDS = {
  primary: ["Costa del Sol properties", "Marbella real estate", "luxury homes Spain", "property investment Spain"],
  secondary: ["Spanish property investment", "Estepona properties", "Mijas real estate", "international property buyers"],
  longTail: ["buy property Marbella as foreigner", "luxury villa Costa del Sol", "Spanish property legal process", "Costa del Sol property prices"]
};
