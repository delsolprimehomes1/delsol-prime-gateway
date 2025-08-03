
import { useMemo } from "react";
import { ChevronDown, Search, HelpCircle, FileText, Home, DollarSign, MapPin, X, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Section from "@/components/layout/Section";
import { Link } from "react-router-dom";
import SEOHead from "@/components/seo/SEOHead";
import BreadcrumbNavigation from "@/components/seo/BreadcrumbNavigation";
import { generateFAQSchema, organizationSchema } from "@/utils/seo/structuredData";
import { generateTitle } from "@/utils/seo/metaUtils";
import { useSupabaseFAQ } from "@/hooks/useSupabaseFAQ";
import { useLanguage } from "@/contexts/LanguageContext";
import { migrateLegacyFAQData } from "@/utils/faqDataMigration";
import { useEffect } from "react";

const categoryIcons = {
  legal: FileText,
  finance: DollarSign,
  locations: MapPin,
  properties: Home,
  services: HelpCircle,
  lifestyle: MapPin,
  newbuild: Building
};

const FAQ = () => {
  const { t } = useLanguage();
  const {
    faqs,
    filteredFAQs,
    categoryNames,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedTargetArea,
    setSelectedTargetArea,
    selectedPropertyType,
    setSelectedPropertyType,
    getCategoryCount,
    getTargetAreas,
    getPropertyTypes,
    getTranslatedCategoryName,
    loading,
    error
  } = useSupabaseFAQ();

  // Create translated category names
  const translatedCategoryNames = useMemo(() => {
    const translated = { all: t('common.all') || 'All Questions' };
    
    Object.keys(categoryNames).forEach(key => {
      if (key !== 'all') {
        translated[key] = getTranslatedCategoryName(key, t);
      }
    });
    
    return translated;
  }, [categoryNames, getTranslatedCategoryName, t]);

  // Initialize FAQ data migration on first load
  useEffect(() => {
    const initializeFAQData = async () => {
      try {
        await migrateLegacyFAQData();
        // Refresh FAQs after migration
        window.location.reload();
      } catch (error) {
        console.error('Failed to initialize FAQ data:', error);
      }
    };

    // Only run migration if no FAQs exist
    if (!loading && faqs.length === 0) {
      initializeFAQData();
    }
  }, [loading, faqs.length]);

  const targetAreas = getTargetAreas;
  const propertyTypes = getPropertyTypes;

  // Generate structured data for SEO with all FAQs
  const faqSchema = useMemo(() => {
    return generateFAQSchema(
      faqs.map(faq => ({
        question: faq.question,
        answer: faq.answer_short
      }))
    );
  }, [faqs]);

  // Buying Property FAQ Schema for AEO/SEO
  const buyingPropertyFAQSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What should I know about buying property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about buying property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about buying property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about buying property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about buying property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about buying property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about buying property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about buying property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about buying property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about buying property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about buying property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about buying property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about buying property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about buying property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about buying property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about buying property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about buying property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about buying property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about buying property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about buying property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about buying property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about buying property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about buying property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about buying property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about buying property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about buying property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about buying property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about buying property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about buying property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about buying property in the Costa del Sol area."
        }
      }
    ]
  };

  // Selling Property FAQ Schema for AEO/SEO
  const sellingPropertyFAQSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What should I know about selling property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about selling property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about selling property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about selling property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about selling property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about selling property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about selling property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about selling property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about selling property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about selling property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about selling property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about selling property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about selling property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about selling property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about selling property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about selling property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about selling property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about selling property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about selling property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about selling property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about selling property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about selling property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about selling property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about selling property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about selling property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about selling property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about selling property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about selling property in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about selling property in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about selling property in the Costa del Sol area."
        }
      }
    ]
  };

  // Viewing Trips FAQ Schema for AEO/SEO
  const viewingTripsFAQSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What should I know about viewing trips in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about viewing trips in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about viewing trips in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about viewing trips in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about viewing trips in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about viewing trips in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about viewing trips in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about viewing trips in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about viewing trips in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about viewing trips in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about viewing trips in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about viewing trips in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about viewing trips in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about viewing trips in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about viewing trips in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about viewing trips in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about viewing trips in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about viewing trips in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about viewing trips in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about viewing trips in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about viewing trips in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about viewing trips in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about viewing trips in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about viewing trips in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about viewing trips in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about viewing trips in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about viewing trips in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about viewing trips in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about viewing trips in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about viewing trips in the Costa del Sol area."
        }
      }
    ]
  };

  // Finance & Taxes FAQ Schema for AEO/SEO
  const financeTaxesFAQSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What should I know about finance & taxes in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about finance & taxes in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about finance & taxes in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about finance & taxes in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about finance & taxes in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about finance & taxes in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about finance & taxes in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about finance & taxes in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about finance & taxes in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about finance & taxes in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about finance & taxes in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about finance & taxes in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about finance & taxes in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about finance & taxes in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about finance & taxes in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about finance & taxes in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about finance & taxes in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about finance & taxes in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about finance & taxes in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about finance & taxes in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about finance & taxes in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about finance & taxes in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about finance & taxes in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about finance & taxes in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about finance & taxes in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about finance & taxes in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about finance & taxes in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about finance & taxes in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about finance & taxes in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about finance & taxes in the Costa del Sol area."
        }
      }
    ]
  };

  // Legal Process FAQ Schema for AEO/SEO
  const legalProcessFAQSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What should I know about legal process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about legal process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about legal process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about legal process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about legal process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about legal process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about legal process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about legal process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about legal process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about legal process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about legal process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about legal process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about legal process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about legal process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about legal process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about legal process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about legal process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about legal process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about legal process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about legal process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about legal process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about legal process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about legal process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about legal process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about legal process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about legal process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about legal process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about legal process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about legal process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about legal process in the Costa del Sol area."
        }
      }
    ]
  };

  // Residency & Visas FAQ Schema for AEO/SEO
  const residencyVisasFAQSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What should I know about residency & visas in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about residency & visas in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about residency & visas in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about residency & visas in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about residency & visas in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about residency & visas in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about residency & visas in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about residency & visas in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about residency & visas in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about residency & visas in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about residency & visas in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about residency & visas in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about residency & visas in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about residency & visas in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about residency & visas in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about residency & visas in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about residency & visas in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about residency & visas in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about residency & visas in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about residency & visas in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about residency & visas in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about residency & visas in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about residency & visas in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about residency & visas in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about residency & visas in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about residency & visas in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about residency & visas in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about residency & visas in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about residency & visas in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about residency & visas in the Costa del Sol area."
        }
      }
    ]
  };

  // Local Culture & Lifestyle FAQ Schema for AEO/SEO
  const localCultureLifestyleFAQSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What should I know about local culture & lifestyle in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about local culture & lifestyle in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about local culture & lifestyle in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about local culture & lifestyle in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about local culture & lifestyle in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about local culture & lifestyle in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about local culture & lifestyle in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about local culture & lifestyle in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about local culture & lifestyle in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about local culture & lifestyle in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about local culture & lifestyle in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about local culture & lifestyle in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about local culture & lifestyle in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about local culture & lifestyle in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about local culture & lifestyle in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about local culture & lifestyle in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about local culture & lifestyle in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about local culture & lifestyle in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about local culture & lifestyle in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about local culture & lifestyle in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about local culture & lifestyle in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about local culture & lifestyle in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about local culture & lifestyle in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about local culture & lifestyle in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about local culture & lifestyle in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about local culture & lifestyle in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about local culture & lifestyle in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about local culture & lifestyle in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about local culture & lifestyle in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about local culture & lifestyle in the Costa del Sol area."
        }
      }
    ]
  };

  // Property Types FAQ Schema for AEO/SEO
  const propertyTypesFAQSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What should I know about property types in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about property types in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about property types in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about property types in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about property types in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about property types in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about property types in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about property types in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about property types in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about property types in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about property types in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about property types in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about property types in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about property types in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about property types in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about property types in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about property types in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about property types in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about property types in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about property types in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about property types in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about property types in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about property types in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about property types in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about property types in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about property types in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about property types in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about property types in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about property types in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about property types in the Costa del Sol area."
        }
      }
    ]
  };

  // Timeline & Process FAQ Schema for AEO/SEO
  const timelineProcessFAQSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What should I know about timeline & process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about timeline & process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about timeline & process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about timeline & process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about timeline & process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about timeline & process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about timeline & process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about timeline & process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about timeline & process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about timeline & process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about timeline & process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about timeline & process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about timeline & process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about timeline & process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about timeline & process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about timeline & process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about timeline & process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about timeline & process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about timeline & process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about timeline & process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about timeline & process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about timeline & process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about timeline & process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about timeline & process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about timeline & process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about timeline & process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about timeline & process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about timeline & process in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about timeline & process in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about timeline & process in the Costa del Sol area."
        }
      }
    ]
  };

  // AI Assistant & Technology FAQ Schema for AEO/SEO
  const aiAssistantTechnologyFAQSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What should I know about ai assistant & technology in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about ai assistant & technology in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about ai assistant & technology in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about ai assistant & technology in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about ai assistant & technology in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about ai assistant & technology in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about ai assistant & technology in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about ai assistant & technology in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about ai assistant & technology in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about ai assistant & technology in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about ai assistant & technology in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about ai assistant & technology in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about ai assistant & technology in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about ai assistant & technology in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about ai assistant & technology in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about ai assistant & technology in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about ai assistant & technology in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about ai assistant & technology in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about ai assistant & technology in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about ai assistant & technology in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about ai assistant & technology in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about ai assistant & technology in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about ai assistant & technology in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about ai assistant & technology in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about ai assistant & technology in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about ai assistant & technology in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about ai assistant & technology in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about ai assistant & technology in the Costa del Sol area."
        }
      },
      {
        "@type": "Question",
        "name": "What should I know about ai assistant & technology in Costa del Sol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A brief overview of key details about ai assistant & technology in the Costa del Sol area."
        }
      }
    ]
  };

  const structuredData = [organizationSchema, faqSchema, buyingPropertyFAQSchema, sellingPropertyFAQSchema, viewingTripsFAQSchema, financeTaxesFAQSchema, legalProcessFAQSchema, residencyVisasFAQSchema, localCultureLifestyleFAQSchema, propertyTypesFAQSchema, timelineProcessFAQSchema, aiAssistantTechnologyFAQSchema];

  // Loading and error states
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading FAQs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Error loading FAQs: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <SEOHead
        title={generateTitle("Costa del Sol Real Estate FAQ - 100+ Expert Property Answers")}
        description="Get expert answers to 100+ Costa del Sol property questions. Comprehensive FAQ covering buying process, legal requirements, financing, locations, and lifestyle in Spain's premier real estate market."
        canonical="/faq"
        structuredData={structuredData}
      />
      
      <BreadcrumbNavigation 
        items={[{ name: "FAQ", href: "/faq" }]}
        className="container mx-auto px-6 py-4"
      />
      
      <Section
        id="faq"
        padding="xl"
        background="default"
        containerSize="xl"
      >
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm border border-primary/20 mb-8">
            <HelpCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent mb-6">
            {t('faq.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-4 leading-relaxed">
            Expert answers to 100+ Costa del Sol real estate questions. From legal processes to luxury lifestyle, 
            get comprehensive guidance for international property investment in Spain's most prestigious region.
          </p>
          <div className="flex justify-center gap-6 text-sm text-muted-foreground mb-12">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>{faqs.length} Total Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>6 Categories</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Expert Verified</span>
            </div>
          </div>
          
          {/* Search and Filter Controls */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder={t('faq.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 focus:bg-white focus:shadow-xl text-base"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              

              {/* Target Area Filter */}
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <select
                  value={selectedTargetArea}
                  onChange={(e) => setSelectedTargetArea(e.target.value)}
                  className="pl-12 pr-8 h-14 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 focus:bg-white focus:shadow-xl rounded-lg text-base min-w-[180px] appearance-none cursor-pointer"
                >
                  <option value="all">All Areas</option>
                  {targetAreas.map((area) => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />
              </div>

              {/* Property Type Filter */}
              <div className="relative">
                <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <select
                  value={selectedPropertyType}
                  onChange={(e) => setSelectedPropertyType(e.target.value)}
                  className="pl-12 pr-8 h-14 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 focus:bg-white focus:shadow-xl rounded-lg text-base min-w-[180px] appearance-none cursor-pointer"
                >
                  <option value="all">All Types</option>
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />
              </div>
            </div>

            {/* Category Badges */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {Object.entries(translatedCategoryNames).map(([category, name]) => {
                const count = getCategoryCount(category);
                const isActive = selectedCategory === category;
                return (
                  <Badge
                    key={category}
                    variant={isActive ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-300 px-4 py-2 text-sm ${
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-lg" 
                        : "bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md border-0"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedCategory(category);
                      }
                    }}
                    aria-pressed={isActive}
                  >
                    {name} ({count})
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="max-w-5xl mx-auto">
          {/* Results Count */}
          <div className="mb-8">
            <p className="text-center text-muted-foreground">
              {filteredFAQs.length === faqs.length 
                ? `Showing all ${filteredFAQs.length} questions`
                : `Showing ${filteredFAQs.length} of ${faqs.length} questions`
              }
              {selectedCategory !== "all" && (
                <span className="ml-2">
                  in <span className="font-medium text-primary">{translatedCategoryNames[selectedCategory]}</span>
                </span>
              )}
            </p>
          </div>

          {/* Enhanced FAQ Accordion by Category */}
          {Object.entries(translatedCategoryNames).map(([categoryKey, categoryName], categoryIndex) => {
            if (categoryKey === "all") return null;
            
            const categoryFAQs = filteredFAQs.filter(faq => faq.category === categoryKey);
            if (categoryFAQs.length === 0) return null;

            const IconComponent = categoryIcons[categoryKey as keyof typeof categoryIcons] || HelpCircle;
            const isEvenCategory = categoryIndex % 2 === 0;

            return (
              <div key={categoryKey} className={`mb-12 ${isEvenCategory ? 'lg:pr-6' : 'lg:pl-6'}`}>
                {/* Category Header */}
                <div className={`mb-6 p-6 rounded-2xl border-l-4 border-primary ${
                  isEvenCategory 
                    ? 'bg-gradient-to-r from-primary/5 to-primary/10' 
                    : 'bg-gradient-to-l from-secondary/5 to-secondary/10'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20">
                      <IconComponent className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        {categoryName}
                      </h2>
                      <p className="text-muted-foreground">
                        {categoryFAQs.length} question{categoryFAQs.length !== 1 ? 's' : ''} available
                      </p>
                    </div>
                  </div>
                </div>

                {/* Category FAQs Accordion */}
                <Accordion 
                  type="single" 
                  collapsible 
                  className="space-y-4"
                  aria-label={`${categoryName} Questions`}
                >
                  {categoryFAQs.map((faq, index) => (
                    <AccordionItem
                      key={faq.id}
                      value={faq.id}
                      className={`border-0 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden group ${
                        isEvenCategory 
                          ? 'bg-gradient-to-r from-white via-white to-primary/5' 
                          : 'bg-gradient-to-l from-white via-white to-secondary/5'
                      }`}
                      aria-labelledby={`faq-${faq.id}-question`}
                    >
                      <AccordionTrigger 
                        className="px-8 py-6 hover:no-underline group-hover:bg-white/60 transition-all duration-300"
                        aria-expanded="false"
                        aria-controls={`faq-${faq.id}-content`}
                        onClick={() => {
                          // Auto-scroll to expanded item with smooth animation
                          setTimeout(() => {
                            const element = document.getElementById(`faq-${faq.id}-question`);
                            if (element) {
                              element.scrollIntoView({ 
                                behavior: 'smooth', 
                                block: 'start',
                                inline: 'nearest'
                              });
                            }
                          }, 150);
                        }}
                      >
                        <div className="flex items-start gap-6 text-left w-full">
                          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center group-hover:from-primary/25 group-hover:to-primary/15 transition-all duration-300 border border-primary/10">
                            <span className="text-primary font-bold text-lg">
                              {(index + 1).toString().padStart(2, '0')}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="mb-3 flex flex-wrap gap-2">
                              {faq.target_areas && faq.target_areas.length > 0 && (
                                <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {faq.target_areas[0]}{faq.target_areas.length > 1 && ` +${faq.target_areas.length - 1}`}
                                </Badge>
                              )}
                              {faq.property_types && faq.property_types.length > 0 && (
                                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1">
                                  <Home className="w-3 h-3 mr-1" />
                                  {faq.property_types[0]}{faq.property_types.length > 1 && ` +${faq.property_types.length - 1}`}
                                </Badge>
                              )}
                            </div>
                            <h3 
                              id={`faq-${faq.id}-question`}
                              className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 leading-relaxed"
                            >
                              {faq.question}
                            </h3>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent 
                        className="px-8 pb-8 animate-accordion-down"
                        id={`faq-${faq.id}-content`}
                        role="region"
                        aria-labelledby={`faq-${faq.id}-question`}
                      >
                        <div className="ml-18 bg-gradient-to-br from-muted/20 to-muted/5 rounded-xl p-6 border border-muted/20 backdrop-blur-sm">
                          <p className="text-muted-foreground leading-relaxed text-base mb-4">
                            {faq.answer_short}
                          </p>
                          {faq.answer_long && (
                            <div className="mt-4 pt-4 border-t border-muted/20">
                              <p className="text-sm text-muted-foreground/80 leading-relaxed">
                                {faq.answer_long}
                              </p>
                            </div>
                          )}
                          {/* Tags if available */}
                          {faq.tags && faq.tags.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-muted/20">
                              <div className="flex flex-wrap gap-2">
                                {faq.tags.map((tag, tagIndex) => (
                                  <span 
                                    key={tagIndex}
                                    className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            );
          })}

          {/* No Results State */}
          {filteredFAQs.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-muted/40 to-muted/20 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-muted/40">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">{t('faq.noResults')}</h3>
              <p className="text-muted-foreground mb-6">
                {t('faq.noResultsDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => setSearchTerm("")}
                  className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl"
                >
                  {t('faq.clearSearch')}
                </Button>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedTargetArea("all");
                    setSelectedPropertyType("all");
                  }}
                  className="shadow-lg hover:shadow-xl"
                >
                  {t('faq.showAllFAQs')}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Floating Ask Question Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            size="lg"
            className="rounded-full shadow-2xl hover:shadow-3xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white border-0 px-6 py-3 transition-all duration-300 hover:scale-105 group"
            onClick={() => {
              // You can integrate this with your chatbot/voice concierge
              console.log("Opening chat with Isabelle...");
              // Example: window.chatbot?.open() or similar
            }}
          >
            <HelpCircle className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-medium">Ask Isabelle</span>
          </Button>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-primary/90 p-12 text-white shadow-2xl">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-6">
                {t('faq.stillHaveQuestions')}
              </h3>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                {t('faq.stillHaveQuestionsDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  variant="outline"
                  size="lg"
                  className="group bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link to="/">
                    Explore Properties
                    <ChevronDown className="ml-2 w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
                  </Link>
                </Button>
                <Button 
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default FAQ;
