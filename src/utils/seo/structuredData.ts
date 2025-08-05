
// Generate Organization schema with social media links
export const generateOrganizationSchema = (language = 'en') => {
  const descriptions = {
    en: "Premier Costa del Sol real estate agency specializing in luxury properties in Marbella, Estepona, Mijas, and surrounding areas. 15+ years of expertise helping international clients find their dream homes in Spain.",
    es: "Agencia inmobiliaria líder en Costa del Sol especializada en propiedades de lujo en Marbella, Estepona, Mijas y alrededores. Más de 15 años de experiencia ayudando a clientes internacionales.",
    fr: "Agence immobilière de premier plan sur la Costa del Sol spécialisée dans les propriétés de luxe à Marbella, Estepona, Mijas et environs.",
    nl: "Premier vastgoedkantoor aan de Costa del Sol gespecialiseerd in luxe eigendommen in Marbella, Estepona, Mijas en omgeving.",
    de: "Führende Immobilienagentur an der Costa del Sol, spezialisiert auf Luxusimmobilien in Marbella, Estepona, Mijas und Umgebung."
  };

  const availableLanguages = ['en', 'es', 'fr', 'nl', 'de', 'pl', 'da', 'sv'];

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "DelSolPrimeHomes",
    "alternateName": "DelSol Prime Homes",
    "description": descriptions[language as keyof typeof descriptions] || descriptions.en,
    "url": "https://delsolprimehomes.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://delsolprimehomes.com/logo.png",
      "width": 400,
      "height": 100
    },
    "image": "https://delsolprimehomes.com/logo.png",
    "telephone": "+34 952 123 456",
    "email": "info@delsolprimehomes.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Avenida Ricardo Soriano 29",
      "addressLocality": "Marbella",
      "addressRegion": "Andalusia", 
      "postalCode": "29600",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 36.5108,
      "longitude": -4.8851
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Marbella",
        "addressCountry": "ES"
      },
      {
        "@type": "City", 
        "name": "Estepona",
        "addressCountry": "ES"
      },
      {
        "@type": "City",
        "name": "Mijas",
        "addressCountry": "ES"
      },
      {
        "@type": "City",
        "name": "Fuengirola", 
        "addressCountry": "ES"
      },
      {
        "@type": "City",
        "name": "Benalmádena",
        "addressCountry": "ES"
      }
    ],
    "serviceType": [
      "Real Estate Sales",
      "Property Investment Consulting", 
      "Legal Assistance",
      "Property Management",
      "Relocation Services"
    ],
    "priceRange": "€€€€",
    "currenciesAccepted": ["EUR", "USD", "GBP"],
    "paymentAccepted": ["Cash", "Bank Transfer", "Cryptocurrency"],
    "openingHours": "Mo-Fr 09:00-18:00, Sa 10:00-14:00",
    "knowsLanguage": availableLanguages,
    "sameAs": [
      "https://www.linkedin.com/company/delsolprimehomes",
      "https://www.instagram.com/delsolprimehomes",
      "https://www.youtube.com/@delsolprimehomes",
      "https://www.facebook.com/delsolprimehomes",
      "https://twitter.com/delsolprimehomes"
    ],
    "foundingDate": "2008",
    "foundingLocation": {
      "@type": "City",
      "name": "Marbella",
      "addressCountry": "ES"
    },
    "slogan": "Your Gateway to Costa del Sol Luxury",
    "aggregateRating": {
      "@type": "AggregateRating", 
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Jennifer Smith"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Exceptional service from DelSolPrimeHomes. Hans and his team made buying our villa in Marbella seamless and stress-free."
      }
    ]
  };
};

// Generate Person schema for team members
export const generatePersonSchema = (person: {
  name: string;
  jobTitle: string;
  description: string;
  image?: string;
  url?: string;
  sameAs?: string[];
  knowsAbout?: string[];
  hasOccupation?: {
    name: string;
    occupationLocation: string;
  };
  alumniOf?: {
    name: string;
    department?: string;
  };
  award?: string[];
  telephone?: string;
  email?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": person.name,
  "jobTitle": person.jobTitle,
  "description": person.description,
  "image": person.image,
  "url": person.url || "https://delsolprimehomes.com/about",
  "sameAs": person.sameAs || [],
  "knowsAbout": person.knowsAbout || [],
  "hasOccupation": person.hasOccupation ? {
    "@type": "Occupation",
    "name": person.hasOccupation.name,
    "occupationLocation": {
      "@type": "City",
      "name": person.hasOccupation.occupationLocation
    }
  } : undefined,
  "alumniOf": person.alumniOf ? {
    "@type": "EducationalOrganization", 
    "name": person.alumniOf.name,
    "department": person.alumniOf.department
  } : undefined,
  "award": person.award || [],
  "telephone": person.telephone,
  "email": person.email,
  "worksFor": {
    "@type": "RealEstateAgent",
    "name": "DelSolPrimeHomes"
  }
});

// Legacy exports for backward compatibility
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

// Enhanced Website Schema with additional properties
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "DelSolPrimeHomes",
  "alternateName": "Del Sol Prime Homes",
  "url": "https://delsolprimehomes.com",
  "description": "Luxury Costa del Sol real estate - Find your dream property in Marbella, Estepona and surrounding areas",
  "inLanguage": "en",
  "publisher": {
    "@type": "Organization",
    "name": "DelSolPrimeHomes",
    "@id": "https://delsolprimehomes.com/#organization"
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
  },
  "about": {
    "@type": "Thing",
    "name": "Costa del Sol Real Estate",
    "description": "Luxury property market in southern Spain"
  },
  "keywords": "luxury real estate, Costa del Sol, Marbella, Estepona, property investment, Spain real estate"
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
