import React, { useMemo } from "react";
import SEOHead from "@/components/seo/SEOHead";
import BreadcrumbNavigation from "@/components/seo/BreadcrumbNavigation";
import { generateTitle } from "@/utils/seo/metaUtils";
import { generateFAQSchema, generateBreadcrumbSchema, organizationSchema } from "@/utils/seo/structuredData";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSupabaseFAQ } from "@/hooks/useSupabaseFAQ";
import MultilingualFAQSection from "@/components/sections/MultilingualFAQSection";

const FAQ = () => {
  const { t, currentLanguage } = useLanguage();
  const { faqs } = useSupabaseFAQ();

  // Generate hreflang links for multilingual SEO
  const hreflangLinks = useMemo(() => {
    const supportedLanguages = ['en', 'es', 'fr', 'nl', 'de', 'pl', 'dk', 'se'];
    const baseUrl = 'https://delsolprimehomes.com/faq';
    
    return supportedLanguages
      .filter(lang => lang !== currentLanguage)
      .map(lang => ({
        href: `${baseUrl}?lang=${lang}`,
        hreflang: lang === 'dk' ? 'da' : lang === 'se' ? 'sv' : lang
      }));
  }, [currentLanguage]);

  // Generate comprehensive multilingual structured data for SEO
  const structuredData = useMemo(() => {
    if (faqs.length === 0) return [];
    
    const schemas = [];
    
    // Current language FAQ schema
    const currentLanguageFAQs = faqs.map(faq => ({
      question: faq.question,
      answer: faq.answer_short
    }));
    
    schemas.push(generateFAQSchema(currentLanguageFAQs));
    
    // Organization schema
    schemas.push(organizationSchema);
    
    // Breadcrumb schema
    schemas.push(generateBreadcrumbSchema([
      { name: "Home", url: "https://delsolprimehomes.com" },
      { name: "FAQ", url: "https://delsolprimehomes.com/faq" }
    ]));
    
    // Hreflang schema for all languages
    const hreflangSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "url": `https://delsolprimehomes.com/faq?lang=${currentLanguage}`,
      "inLanguage": currentLanguage,
      "name": t('faq.title') || 'Frequently Asked Questions',
      "description": t('faq.subtitle') || 'Expert answers to Costa del Sol property questions',
      "isPartOf": {
        "@type": "WebSite",
        "name": "DelSolPrimeHomes",
        "url": "https://delsolprimehomes.com"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://delsolprimehomes.com/faq?q={search_term_string}",
          "actionPlatform": [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform"
          ]
        },
        "query-input": "required name=search_term_string"
      }
    };
    
    schemas.push(hreflangSchema);
    
    // Voice search optimization schema
    const voiceSearchSchema = {
      "@context": "https://schema.org",
      "@type": "SpeakableSpecification",
      "xpath": [
        "/html/head/title",
        "//*[@itemscope and @itemtype='https://schema.org/Question']//h3",
        "//*[@itemscope and @itemtype='https://schema.org/Answer']//p"
      ]
    };
    
    schemas.push(voiceSearchSchema);
    
    return schemas;
  }, [faqs, currentLanguage, t]);

  return (
    <div className="min-h-screen">
      <SEOHead
        title={generateTitle(t('faq.title') || `Costa del Sol Real Estate FAQ - ${faqs.length}+ Expert Property Answers`)}
        description={t('faq.subtitle') || "Get instant answers to all your Costa del Sol property questions. Expert advice on buying, selling, legal requirements, taxes, and more from DelSolPrimeHomes in 7 languages."}
        structuredData={structuredData}
        hreflangLinks={hreflangLinks}
        currentLanguage={currentLanguage}
      />

      <BreadcrumbNavigation
        items={[
          { name: t('nav.home') || 'Home', href: '/' },
          { name: t('nav.faq') || 'FAQ', href: '/faq' }
        ]}
      />

      <MultilingualFAQSection />
    </div>
  );
};

export default FAQ;