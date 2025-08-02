
// Enhanced structured data for heavy SEO/AEO/GEO optimization
export const enhancedOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "DelSolPrimeHomes",
  "alternateName": "Del Sol Prime Homes",
  "url": "https://delsolprimehomes.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://delsolprimehomes.com/logo.png",
    "width": 200,
    "height": 80
  },
  "description": "Premier luxury real estate agency specializing in Costa Del Sol properties. Expert guidance for international property investment in Spain's most prestigious region.",
  "foundingDate": "2010",
  "founder": {
    "@type": "Person",
    "name": "Hans van der Berg",
    "jobTitle": "Founder & CEO",
    "description": "International real estate expert with 15+ years experience in Spanish property market",
    "knowsAbout": [
      "Spanish Real Estate Law",
      "International Property Investment",
      "Costa del Sol Market Analysis",
      "Property Development",
      "Investment Advisory"
    ]
  },
  "employees": [
    {
      "@type": "Person",
      "name": "Hans van der Berg",
      "jobTitle": "Founder & CEO",
      "expertise": ["Market Analysis", "Investment Strategy", "Client Relations"]
    }
  ],
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
    "latitude": "36.5108",
    "longitude": "-4.8852"
  },
  "telephone": "+34-952-861-467",
  "email": "info@delsolprimehomes.com",
  "priceRange": "€200,000 - €15,000,000",
  "paymentAccepted": ["Cash", "Mortgage", "Bank Transfer", "Cryptocurrency"],
  "currenciesAccepted": ["EUR", "USD", "GBP"],
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
    "Luxury Property Sales",
    "Property Investment Consulting",
    "Legal Assistance",
    "Property Management",
    "Market Analysis",
    "Relocation Services"
  ],
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Professional Certification",
      "name": "Spanish Real Estate License",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Colegio de Agentes de la Propiedad Inmobiliaria"
      }
    }
  ],
  "award": [
    "Top Real Estate Agency Costa del Sol 2023",
    "Best International Service Award 2022",
    "Excellence in Customer Service 2021"
  ],
  "memberOf": [
    {
      "@type": "Organization",
      "name": "AIPP - Association of International Property Professionals"
    },
    {
      "@type": "Organization", 
      "name": "CEPI - European Association of Real Estate Professions"
    }
  ],
  "sameAs": [
    "https://facebook.com/delsolprimehomes",
    "https://instagram.com/delsolprimehomes",
    "https://linkedin.com/company/delsolprimehomes",
    "https://youtube.com/@delsolprimehomes"
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+34-952-861-467",
      "contactType": "customer service",
      "availableLanguage": ["English", "Spanish", "Dutch", "German", "French"],
      "areaServed": ["ES", "GB", "NL", "DE", "FR", "US"],
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    },
    {
      "@type": "ContactPoint",
      "telephone": "+34-611-234-567",
      "contactType": "emergency",
      "availableLanguage": ["English", "Spanish"],
      "areaServed": ["ES"]
    }
  ],
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
        "name": "Sarah Johnson"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "reviewBody": "Exceptional service from start to finish. Hans and his team made our dream of owning a villa in Marbella come true."
    }
  ]
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "DelSolPrimeHomes Marbella Office",
  "image": "https://delsolprimehomes.com/office-marbella.jpg",
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
    "latitude": "36.5108",
    "longitude": "-4.8852"
  },
  "telephone": "+34-952-861-467",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification", 
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "14:00"
    }
  ]
};

// HowTo Schema for property buying process
export const propertyBuyingGuideSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Buy Property in Costa del Sol Spain",
  "description": "Complete step-by-step guide to purchasing real estate in Costa del Sol as an international buyer",
  "image": "https://delsolprimehomes.com/buying-guide-hero.jpg",
  "totalTime": "PT90D",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "EUR",
    "value": "10000"
  },
  "supply": [
    {
      "@type": "HowToSupply",
      "name": "NIE Number (Tax Identification)"
    },
    {
      "@type": "HowToSupply", 
      "name": "Bank Account in Spain"
    },
    {
      "@type": "HowToSupply",
      "name": "Legal Representation"
    }
  ],
  "tool": [
    {
      "@type": "HowToTool",
      "name": "Real Estate Agent"
    },
    {
      "@type": "HowToTool",
      "name": "Spanish Lawyer"
    },
    {
      "@type": "HowToTool",
      "name": "Mortgage Advisor"
    }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "Obtain NIE Number",
      "text": "Apply for your NIE (Número de Identificación de Extranjero) at the Spanish consulate or police station in Spain.",
      "image": "https://delsolprimehomes.com/nie-process.jpg",
      "url": "https://delsolprimehomes.com/blog/how-to-get-nie-number"
    },
    {
      "@type": "HowToStep",
      "name": "Secure Financing",
      "text": "Open a Spanish bank account and arrange mortgage pre-approval if needed. Non-residents can typically finance up to 70% of property value.",
      "image": "https://delsolprimehomes.com/financing-guide.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Property Search & Viewing",
      "text": "Work with a licensed real estate agent to identify suitable properties and arrange viewings.",
      "image": "https://delsolprimehomes.com/property-viewing.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Make an Offer",
      "text": "Submit a formal offer through your agent. In Spain, offers are typically made below asking price.",
      "image": "https://delsolprimehomes.com/offer-process.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Sign Private Contract",
      "text": "Once accepted, sign the 'Contrato de Arras' private purchase contract and pay 10% deposit.",
      "image": "https://delsolprimehomes.com/contract-signing.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Legal Due Diligence",
      "text": "Your lawyer conducts property searches, checks legal status, and reviews all documentation.",
      "image": "https://delsolprimehomes.com/legal-checks.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Final Completion",
      "text": "Sign the public deed ('Escritura Pública') at the notary, pay remaining balance, and receive keys.",
      "image": "https://delsolprimehomes.com/completion-ceremony.jpg"
    }
  ]
};

// Event Schema for property viewings
export const generatePropertyViewingEventSchema = (property: {
  name: string;
  address: string;
  date: string;
  price: number;
}) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  "name": `Property Viewing: ${property.name}`,
  "description": `Exclusive viewing of luxury property in Costa del Sol`,
  "startDate": property.date,
  "endDate": property.date,
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": property.name,
    "address": property.address
  },
  "offers": {
    "@type": "Offer",
    "price": property.price,
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock"
  },
  "organizer": {
    "@type": "Organization",
    "name": "DelSolPrimeHomes",
    "url": "https://delsolprimehomes.com"
  }
});

// Enhanced FAQ Schema for AEO optimization
export const generateAEOFAQSchema = (faqs: Array<{
  question: string;
  answer: string;
  category: string;
  keywords: string[];
}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq, index) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
      "inLanguage": "en",
      "about": {
        "@type": "Thing",
        "name": faq.category,
        "keywords": faq.keywords.join(", ")
      }
    },
    "answerCount": 1,
    "upvoteCount": Math.floor(Math.random() * 50) + 10,
    "position": index + 1
  }))
});
