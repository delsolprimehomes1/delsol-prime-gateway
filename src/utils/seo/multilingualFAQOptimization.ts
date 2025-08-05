/**
 * Multilingual FAQ Optimization Utilities
 * Provides comprehensive SEO and AEO optimization for DelSolPrimeHomes FAQ system
 */

import { generateAEOFAQSchema } from './enhancedStructuredData';
import { generateBreadcrumbSchema, organizationSchema } from './structuredData';

export interface MultilingualFAQ {
  id: string;
  language: string;
  question: string;
  answer_short: string;
  answer_long?: string;
  category: string;
  keywords?: string[];
  voice_queries?: string[];
  target_areas?: string[];
  property_types?: string[];
  is_featured: boolean;
  meta_title?: string;
  meta_description?: string;
}

export interface LanguageStatistics {
  language: string;
  totalFAQs: number;
  featuredFAQs: number;
  voiceOptimizedFAQs: number;
  categories: number;
  coverage: number; // percentage compared to English
}

/**
 * Generate comprehensive multilingual schema for all supported languages
 */
export const generateComprehensiveMultilingualSchema = (
  faqs: MultilingualFAQ[],
  currentLanguage: string = 'en'
) => {
  const supportedLanguages = ['en', 'es', 'fr', 'nl', 'de', 'pl', 'dk', 'se'];
  const baseUrl = 'https://delsolprimehomes.com';
  
  // Group FAQs by language
  const faqsByLanguage = faqs.reduce((acc, faq) => {
    if (!acc[faq.language]) acc[faq.language] = [];
    acc[faq.language].push(faq);
    return acc;
  }, {} as Record<string, MultilingualFAQ[]>);

  // Generate main FAQ schema for current language
  const currentLanguageFAQs = faqsByLanguage[currentLanguage] || [];
  const faqsForSchema = currentLanguageFAQs.map(faq => ({
    question: faq.question,
    answer: faq.answer_short,
    category: faq.category,
    keywords: faq.keywords || []
  }));
  const mainFAQSchema = generateAEOFAQSchema(faqsForSchema);

  // Generate hreflang alternates
  const hreflangs = supportedLanguages.map(lang => ({
    "@type": "WebPage",
    "@id": `${baseUrl}/${lang === 'en' ? '' : lang + '/'}faq`,
    "inLanguage": lang === 'dk' ? 'da' : lang === 'se' ? 'sv' : lang,
    "url": `${baseUrl}/${lang === 'en' ? '' : lang + '/'}faq`,
    "name": getLocalizedTitle(lang),
    "description": getLocalizedDescription(lang),
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": (faqsByLanguage[lang] || []).slice(0, 10).map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer_short
        }
      }))
    }
  }));

  // Enhanced organization schema with multilingual support
  const enhancedOrganizationSchema = {
    ...organizationSchema,
    "@id": `${baseUrl}/#organization`,
    "knowsLanguage": supportedLanguages.map(lang => lang === 'dk' ? 'da' : lang === 'se' ? 'sv' : lang),
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 36.5108,
        "longitude": -4.8844
      },
      "geoRadius": "50000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Costa del Sol Real Estate Services",
      "itemListElement": supportedLanguages.map((lang, index) => ({
        "@type": "Offer",
        "position": index + 1,
        "name": `Real Estate Services in ${getLanguageName(lang)}`,
        "description": `Professional real estate services on Costa del Sol in ${getLanguageName(lang)}`,
        "url": `${baseUrl}/${lang === 'en' ? '' : lang + '/'}`,
        "inLanguage": lang === 'dk' ? 'da' : lang === 'se' ? 'sv' : lang
      }))
    }
  };

  // Website schema with comprehensive language support
  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": "DelSolPrimeHomes - Costa del Sol Real Estate",
    "description": "Luxury real estate on Costa del Sol. Properties in Marbella, Estepona, Fuengirola, and more.",
    "publisher": { "@id": `${baseUrl}/#organization` },
    "inLanguage": supportedLanguages.map(lang => lang === 'dk' ? 'da' : lang === 'se' ? 'sv' : lang),
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}&lang=${currentLanguage}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "FAQ", url: `${baseUrl}/${currentLanguage === 'en' ? '' : currentLanguage + '/'}faq` }
  ]);

  return {
    "@context": "https://schema.org",
    "@graph": [
      mainFAQSchema,
      enhancedOrganizationSchema,
      websiteSchema,
      breadcrumbSchema,
      ...hreflangs
    ]
  };
};

/**
 * Generate language-specific statistics for monitoring FAQ coverage
 */
export const generateLanguageStatistics = (faqs: MultilingualFAQ[]): LanguageStatistics[] => {
  const faqsByLanguage = faqs.reduce((acc, faq) => {
    if (!acc[faq.language]) {
      acc[faq.language] = {
        total: 0,
        featured: 0,
        voiceOptimized: 0,
        categories: new Set()
      };
    }
    acc[faq.language].total++;
    if (faq.is_featured) acc[faq.language].featured++;
    if (faq.voice_queries && faq.voice_queries.length > 0) acc[faq.language].voiceOptimized++;
    acc[faq.language].categories.add(faq.category);
    return acc;
  }, {} as Record<string, any>);

  const englishCount = faqsByLanguage['en']?.total || 1;

  return Object.entries(faqsByLanguage).map(([lang, stats]) => ({
    language: lang,
    totalFAQs: stats.total,
    featuredFAQs: stats.featured,
    voiceOptimizedFAQs: stats.voiceOptimized,
    categories: stats.categories.size,
    coverage: Math.round((stats.total / englishCount) * 100)
  }));
};

/**
 * Get localized page titles for different languages
 */
function getLocalizedTitle(language: string): string {
  const titles = {
    en: "Costa del Sol Real Estate FAQ - Expert Property Answers",
    es: "FAQ Inmobiliaria Costa del Sol - Respuestas de Expertos",
    fr: "FAQ Immobilier Costa del Sol - Réponses d'Experts",
    nl: "Costa del Sol Vastgoed FAQ - Expert Antwoorden",
    de: "Costa del Sol Immobilien FAQ - Experten Antworten",
    pl: "FAQ Nieruchomości Costa del Sol - Odpowiedzi Ekspertów",
    dk: "Costa del Sol Ejendom FAQ - Ekspert Svar",
    se: "Costa del Sol Fastigheter FAQ - Expert Svar"
  };
  return titles[language as keyof typeof titles] || titles.en;
}

/**
 * Get localized page descriptions for different languages
 */
function getLocalizedDescription(language: string): string {
  const descriptions = {
    en: "Expert answers to Costa del Sol property questions. Buying, selling, legal, taxes, and investment advice.",
    es: "Respuestas expertas a preguntas sobre propiedades en Costa del Sol. Compra, venta, legal, impuestos e inversión.",
    fr: "Réponses d'experts aux questions immobilières de la Costa del Sol. Achat, vente, juridique, taxes et investissement.",
    nl: "Expert antwoorden op Costa del Sol vastgoedvragen. Kopen, verkopen, juridisch, belastingen en investeringen.",
    de: "Experten-Antworten zu Costa del Sol Immobilienfragen. Kauf, Verkauf, Recht, Steuern und Investitionen.",
    pl: "Eksperckie odpowiedzi na pytania o nieruchomości Costa del Sol. Kupno, sprzedaż, prawo, podatki i inwestycje.",
    dk: "Ekspert svar på Costa del Sol ejendomsspørgsmål. Køb, salg, juridisk, skatter og investeringer.",
    se: "Expert svar på Costa del Sol fastighetsfrågor. Köp, försäljning, juridik, skatter och investeringar."
  };
  return descriptions[language as keyof typeof descriptions] || descriptions.en;
}

/**
 * Get human-readable language names
 */
function getLanguageName(language: string): string {
  const names = {
    en: "English",
    es: "Spanish",
    fr: "French", 
    nl: "Dutch",
    de: "German",
    pl: "Polish",
    dk: "Danish",
    se: "Swedish"
  };
  return names[language as keyof typeof names] || language;
}

/**
 * Voice search optimization keywords by language
 */
export const getVoiceSearchKeywords = (language: string): string[] => {
  const keywords = {
    en: ["how to buy", "what is", "how much", "where can I", "when should"],
    es: ["cómo comprar", "qué es", "cuánto cuesta", "dónde puedo", "cuándo debo"],
    fr: ["comment acheter", "qu'est-ce que", "combien coûte", "où puis-je", "quand dois-je"],
    nl: ["hoe koop je", "wat is", "hoeveel kost", "waar kan ik", "wanneer moet"],
    de: ["wie kaufe ich", "was ist", "wie viel kostet", "wo kann ich", "wann sollte"],
    pl: ["jak kupić", "co to jest", "ile kosztuje", "gdzie mogę", "kiedy powinienem"],
    dk: ["hvordan køber", "hvad er", "hvor meget koster", "hvor kan jeg", "hvornår skal"],
    se: ["hur köper man", "vad är", "hur mycket kostar", "var kan jag", "när ska"]
  };
  return keywords[language as keyof typeof keywords] || keywords.en;
};

/**
 * AEO (Answer Engine Optimization) helpers
 */
export const optimizeForAEO = (faq: MultilingualFAQ): MultilingualFAQ => {
  // Ensure voice queries are optimized for natural language
  const voiceQueries = faq.voice_queries || [];
  const languageKeywords = getVoiceSearchKeywords(faq.language);
  
  // Add natural language voice queries if missing
  if (voiceQueries.length === 0) {
    const naturalQueries = languageKeywords.map(keyword => 
      `${keyword} ${faq.question.toLowerCase()}`
    );
    voiceQueries.push(...naturalQueries.slice(0, 3));
  }

  // Optimize answer for voice search (30-50 words for featured snippets)
  let optimizedAnswer = faq.answer_short;
  if (optimizedAnswer.split(' ').length > 50) {
    optimizedAnswer = optimizedAnswer.split(' ').slice(0, 45).join(' ') + '...';
  }

  return {
    ...faq,
    answer_short: optimizedAnswer,
    voice_queries: voiceQueries,
    meta_title: faq.meta_title || `${faq.question} | DelSolPrimeHomes`,
    meta_description: faq.meta_description || optimizedAnswer.substring(0, 150) + '...'
  };
};

export default {
  generateComprehensiveMultilingualSchema,
  generateLanguageStatistics,
  getVoiceSearchKeywords,
  optimizeForAEO
};