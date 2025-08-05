import React, { useMemo } from "react";
import SEOHead from "@/components/seo/SEOHead";
import BreadcrumbNavigation from "@/components/seo/BreadcrumbNavigation";
import { StructuredDataProvider } from "@/components/seo/StructuredDataProvider";
import { generateTitle } from "@/utils/seo/metaUtils";
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

  // Prepare FAQ data for structured data
  const faqData = useMemo(() => {
    return faqs.map(faq => ({
      question: faq.question,
      answer: faq.answer_short
    }));
  }, [faqs]);

  return (
    <StructuredDataProvider
      pageType="faq"
      pageData={{
        title: t('faq.title') || `Costa del Sol Real Estate FAQ - ${faqs.length}+ Expert Property Answers`,
        description: t('faq.subtitle') || "Get instant answers to all your Costa del Sol property questions. Expert advice on buying, selling, legal requirements, taxes, and more from DelSolPrimeHomes in 7 languages.",
        faqs: faqData,
        breadcrumbs: [
          { name: t('nav.home') || 'Home', url: 'https://delsolprimehomes.com' },
          { name: t('nav.faq') || 'FAQ', url: 'https://delsolprimehomes.com/faq' }
        ]
      }}
    >
      <div className="min-h-screen">
        <SEOHead
          title={generateTitle(t('faq.title') || `Costa del Sol Real Estate FAQ - ${faqs.length}+ Expert Property Answers`)}
          description={t('faq.subtitle') || "Get instant answers to all your Costa del Sol property questions. Expert advice on buying, selling, legal requirements, taxes, and more from DelSolPrimeHomes in 7 languages."}
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
    </StructuredDataProvider>
  );
};

export default FAQ;