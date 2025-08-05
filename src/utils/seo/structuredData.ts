
// Multilingual Organization Schema for Homepage
export const generateOrganizationSchema = (language = 'en') => {
  const languageMap = {
    'en': {
      description: "Premier luxury real estate agency specializing in Costa Del Sol properties including Marbella, Estepona, and surrounding areas.",
      availableLanguages: ["English", "Spanish", "Dutch", "German", "French", "Polish", "Danish", "Swedish"]
    },
    'es': {
      description: "Agencia inmobiliaria de lujo especializada en propiedades de la Costa del Sol, incluyendo Marbella, Estepona y áreas circundantes.",
      availableLanguages: ["Inglés", "Español", "Holandés", "Alemán", "Francés", "Polaco", "Danés", "Sueco"]
    },
    'fr': {
      description: "Agence immobilière de luxe spécialisée dans les propriétés de la Costa del Sol, y compris Marbella, Estepona et les zones environnantes.",
      availableLanguages: ["Anglais", "Espagnol", "Néerlandais", "Allemand", "Français", "Polonais", "Danois", "Suédois"]
    },
    'nl': {
      description: "Premier luxe makelaarskantoor gespecialiseerd in Costa Del Sol eigendommen waaronder Marbella, Estepona en omliggende gebieden.",
      availableLanguages: ["Engels", "Spaans", "Nederlands", "Duits", "Frans", "Pools", "Deens", "Zweeds"]
    },
    'de': {
      description: "Premium Luxus-Immobilienagentur spezialisiert auf Costa Del Sol Immobilien einschließlich Marbella, Estepona und umliegende Gebiete.",
      availableLanguages: ["Englisch", "Spanisch", "Niederländisch", "Deutsch", "Französisch", "Polnisch", "Dänisch", "Schwedisch"]
    },
    'pl': {
      description: "Ekskluzywna agencja nieruchomości luksusowych specjalizująca się w nieruchomościach Costa Del Sol, w tym Marbella, Estepona i okoliczne obszary.",
      availableLanguages: ["Angielski", "Hiszpański", "Holenderski", "Niemiecki", "Francuski", "Polski", "Duński", "Szwedzki"]
    },
    'dk': {
      description: "Førende luksus ejendomsmægler specialiseret i Costa Del Sol ejendomme inklusive Marbella, Estepona og omkringliggende områder.",
      availableLanguages: ["Engelsk", "Spansk", "Hollandsk", "Tysk", "Fransk", "Polsk", "Dansk", "Svensk"]
    },
    'se': {
      description: "Främsta lyxfastighetsmäklare specialiserad på Costa Del Sol fastigheter inklusive Marbella, Estepona och omkringliggande områden.",
      availableLanguages: ["Engelska", "Spanska", "Holländska", "Tyska", "Franska", "Polska", "Danska", "Svenska"]
    }
  };

  const langData = languageMap[language] || languageMap['en'];

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DelSolPrimeHomes",
    "url": "https://delsolprimehomes.com",
    "logo": "https://delsolprimehomes.com/logo.png",
    "description": langData.description,
    "inLanguage": language,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Marbella",
      "addressRegion": "Andalusia",
      "addressCountry": "Spain",
      "postalCode": "29600"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+34-952-XXX-XXX",
        "contactType": "customer service",
        "availableLanguage": langData.availableLanguages,
        "areaServed": ["ES"]
      }
    ],
    "sameAs": [
      "https://facebook.com/delsolprimehomes",
      "https://instagram.com/delsolprimehomes",
      "https://linkedin.com/company/delsolprimehomes"
    ],
    "founder": {
      "@type": "Person",
      "name": "Hans [Last Name]"
    },
    "foundingDate": "2010",
    "numberOfEmployees": "10-50",
    "areaServed": [
      "Marbella",
      "Estepona", 
      "Mijas",
      "Fuengirola",
      "Benalmádena",
      "Puerto Banús"
    ],
    "serviceType": [
      "Real Estate Sales",
      "Property Investment Consulting", 
      "Legal Assistance",
      "Property Management"
    ]
  };
};

// Legacy export for backward compatibility
export const organizationSchema = generateOrganizationSchema('en');

// Real Estate Agent Schema
export const realEstateAgentSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "DelSolPrimeHomes",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Marbella",
    "addressRegion": "Andalusia", 
    "addressCountry": "Spain"
  },
  "telephone": "+34-952-XXX-XXX",
  "url": "https://delsolprimehomes.com",
  "areaServed": ["Marbella", "Estepona", "Mijas", "Fuengirola", "Benalmádena"],
  "priceRange": "€200,000 - €15,000,000",
  "paymentAccepted": ["Cash", "Mortgage", "Bank Transfer"],
  "currenciesAccepted": "EUR"
};

// Website Schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "DelSolPrimeHomes",
  "url": "https://delsolprimehomes.com",
  "description": "Luxury Costa del Sol real estate - Find your dream property in Marbella, Estepona and surrounding areas",
  "publisher": {
    "@type": "Organization",
    "name": "DelSolPrimeHomes"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://delsolprimehomes.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "mainEntity": {
    "@type": "ItemList",
    "name": "Costa Del Sol Properties",
    "description": "Premium real estate listings in Costa Del Sol region"
  }
};

// FAQ Page Schema Generator with Multilingual Support
export const generateFAQSchema = (faqs: Array<{question: string; answer: string}>, language = 'en') => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "inLanguage": language,
  "url": `https://delsolprimehomes.com/faq?lang=${language}`,
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "inLanguage": language,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
      "inLanguage": language
    }
  }))
});

// Enhanced Multilingual FAQ Schema with Hreflang
export const generateMultilingualFAQSchema = (faqsByLanguage: Record<string, Array<{question: string; answer: string}>>) => {
  const languages = Object.keys(faqsByLanguage);
  const baseUrl = "https://delsolprimehomes.com/faq";
  
  return languages.map(lang => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "inLanguage": lang,
    "url": `${baseUrl}?lang=${lang}`,
    "name": `Frequently Asked Questions - Costa del Sol Real Estate (${lang.toUpperCase()})`,
    "description": `Expert answers to Costa del Sol property questions in ${lang}`,
    "mainEntity": faqsByLanguage[lang].map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "inLanguage": lang,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
        "inLanguage": lang
      }
    })),
    "sameAs": languages
      .filter(l => l !== lang)
      .map(l => `${baseUrl}?lang=${l}`)
  }));
};

// Blog Article Schema Generator
export const generateArticleSchema = (article: {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.headline,
  "description": article.description,
  "author": {
    "@type": "Person",
    "name": article.author
  },
  "publisher": {
    "@type": "Organization",
    "name": "DelSolPrimeHomes",
    "logo": {
      "@type": "ImageObject",
      "url": "https://delsolprimehomes.com/logo.png"
    }
  },
  "datePublished": article.datePublished,
  "dateModified": article.dateModified || article.datePublished,
  "image": article.image || "https://lovable.dev/opengraph-image-p98pqg.png",
  "url": article.url,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": article.url
  }
});

// Property Schema Generator
export const generatePropertySchema = (property: {
  name: string;
  description: string;
  price: number;
  currency: string;
  address: string;
  city: string;
  country: string;
  propertyType: string;
  bedrooms?: number;
  bathrooms?: number;
  floorSize?: number;
  images?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": property.name,
  "description": property.description,
  "category": property.propertyType,
  "offers": {
    "@type": "Offer",
    "price": property.price,
    "priceCurrency": property.currency,
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "DelSolPrimeHomes"
    }
  },
  "location": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": property.address,
      "addressLocality": property.city,
      "addressCountry": property.country
    }
  },
  ...(property.images && {
    "image": property.images
  }),
  "additionalProperty": [
    ...(property.bedrooms ? [{
      "@type": "PropertyValue",
      "name": "Number of bedrooms",
      "value": property.bedrooms
    }] : []),
    ...(property.bathrooms ? [{
      "@type": "PropertyValue", 
      "name": "Number of bathrooms",
      "value": property.bathrooms
    }] : []),
    ...(property.floorSize ? [{
      "@type": "PropertyValue",
      "name": "Floor size",
      "value": property.floorSize,
      "unitCode": "MTK"
    }] : [])
  ]
});

// Breadcrumb Schema Generator
export const generateBreadcrumbSchema = (breadcrumbs: Array<{name: string; url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});
