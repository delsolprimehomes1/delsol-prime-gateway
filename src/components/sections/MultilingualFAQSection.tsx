import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSupabaseFAQ } from '@/hooks/useSupabaseFAQ';
import { useVoiceOptimizedFAQ } from '@/hooks/useVoiceOptimizedFAQ';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, MessageCircle, ArrowRight, Star, TrendingUp, Home, Scale, CreditCard, Building, MapPin, PiggyBank, Users, Smartphone, Sun, Brain, Mic, Globe } from 'lucide-react';
import { generateAEOFAQSchema } from '@/utils/seo/enhancedStructuredData';
import { generateBreadcrumbSchema, organizationSchema } from '@/utils/seo/structuredData';
import { useToast } from '@/hooks/use-toast';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { AIOptimizedFAQ, FeaturedSnippet } from '@/components/seo/EnhancedAIContent';

// Category icons mapping
const categoryIcons = {
  'buying-process': Home,
  'legal-aspects': Scale,
  'market-trends': TrendingUp,
  'financing': CreditCard,
  'property-types': Building,
  'locations': MapPin,
  'investment': PiggyBank,
  'services': Users,
  'technology': Smartphone,
  'lifestyle': Sun,
};

// Generate multilingual JSON-LD schema for all supported languages
const generateMultilingualFAQSchema = (faqs: any[], currentLanguage: string) => {
  // Supported languages for schema generation
  const supportedLanguages = ['en', 'es', 'fr', 'de', 'pl', 'dk', 'se', 'nl'];
  
  // Base URL for language-specific FAQ pages
  const baseUrl = 'https://delsolprimehomes.com';
  
  // Generate main FAQ schema for current language
  const mainFAQSchema = generateAEOFAQSchema(faqs);
  
  // Generate hreflang alternates for multilingual SEO
  const hreflangs = supportedLanguages.map(lang => ({
    "@type": "WebPage",
    "@id": `${baseUrl}/${lang === 'en' ? '' : lang + '/'}faq`,
    "inLanguage": lang,
    "url": `${baseUrl}/${lang === 'en' ? '' : lang + '/'}faq`,
    "name": `Costa del Sol Real Estate FAQ - ${lang.toUpperCase()}`,
    "description": `Frequently asked questions about Costa del Sol real estate in ${lang.toUpperCase()}`,
  }));
  
  // Organization schema with multilingual support
  const multilingualOrganizationSchema = {
    ...organizationSchema,
    "@id": `${baseUrl}/#organization`,
    "alternateName": [
      "DelSolPrimeHomes",
      "Del Sol Prime Homes",
      "Costa del Sol Properties",
      "Marbella Real Estate"
    ],
    "knowsLanguage": supportedLanguages,
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 36.5108,
        "longitude": -4.8844
      },
      "geoRadius": "50000"
    }
  };
  
  // Website schema with language-specific content
  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": "DelSolPrimeHomes - Costa del Sol Real Estate",
    "description": "Luxury real estate on Costa del Sol. Properties in Marbella, Estepona, Fuengirola, and more.",
    "publisher": {
      "@id": `${baseUrl}/#organization`
    },
    "inLanguage": supportedLanguages,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
  
  // Breadcrumb schema for FAQ page
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "FAQ", url: `${baseUrl}/${currentLanguage === 'en' ? '' : currentLanguage + '/'}faq` }
  ]);
  
  return {
    "@context": "https://schema.org",
    "@graph": [
      mainFAQSchema,
      multilingualOrganizationSchema,
      websiteSchema,
      breadcrumbSchema,
      ...hreflangs
    ]
  };
};

export default function MultilingualFAQSection() {
  const { currentLanguage, t } = useLanguage();
  const { 
    faqs, 
    categories, 
    loading, 
    error, 
    searchTerm, 
    setSearchTerm,
    selectedCategory, 
    setSelectedCategory,
    filteredFAQs,
    categoryNames,
    getFeaturedFAQs,
    getVoiceSearchFAQs
  } = useSupabaseFAQ();
  
  const { 
    voiceOptimizedFAQs, 
    getFeaturedSnippetFAQs, 
    getVoiceSearchOptimizedFAQs 
  } = useVoiceOptimizedFAQ();

  const [showAllFAQs, setShowAllFAQs] = useState(false);
  const { toast } = useToast();

  // Featured FAQs for quick answers
  const featuredFAQs = getFeaturedSnippetFAQs(3);
  const voiceSearchFAQs = getVoiceSearchFAQs();
  
  // Display FAQs with pagination
  const displayFAQs = showAllFAQs ? filteredFAQs : filteredFAQs.slice(0, 12);
  
  // Generate multilingual schema
  const multilingualSchema = useMemo(() => {
    if (filteredFAQs.length > 0) {
      return generateMultilingualFAQSchema(filteredFAQs, currentLanguage);
    }
    return null;
  }, [filteredFAQs, currentLanguage]);

  if (loading) {
    return (
      <Section className="py-20">
        <Container>
          <div className="flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        </Container>
      </Section>
    );
  }

  if (error) {
    return (
      <Section className="py-20">
        <Container>
          <div className="text-center">
            <p className="text-destructive">{t('common.error')}: {error}</p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="mt-4"
            >
              {t('common.retry')}
            </Button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <>
      {/* Multilingual JSON-LD Schema */}
      {multilingualSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(multilingualSchema) }}
        />
      )}
      
      <Section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <Container>
          {/* Header with multilingual indicators */}
          <AnimatedElement animation="fade-in-up" className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge variant="outline" className="bg-primary/10">
                <Brain className="w-3 h-3 mr-1" />
                AI Optimized
              </Badge>
              <Badge variant="outline" className="bg-secondary/10">
                <Mic className="w-3 h-3 mr-1" />
                Voice Search Ready
              </Badge>
              <Badge variant="outline" className="bg-accent/10">
                <Globe className="w-3 h-3 mr-1" />
                7 Languages
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
              {t('faq.title') || 'Frequently Asked'} <span className="text-primary">Questions</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {t('faq.subtitle') || 'Get instant answers to your Costa Del Sol property questions. Optimized for voice search, AI assistants, and traditional search engines in multiple languages.'}
            </p>
          </AnimatedElement>

          {/* Search Bar */}
          <AnimatedElement animation="fade-in-up" delay={100} className="mb-12">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder={t('faq.searchPlaceholder') || 'Search FAQ questions...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-6 text-lg rounded-xl border-2"
                />
              </div>
            </div>
          </AnimatedElement>

          {/* Featured Snippets Section */}
          {featuredFAQs.length > 0 && (
            <AnimatedElement animation="fade-in-up" delay={150} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-primary" />
                Answers
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {featuredFAQs.map((faq, index) => (
                  <AnimatedElement key={faq.id} animation="fade-in-up" delay={index * 100}>
                    <FeaturedSnippet
                      title={faq.question}
                      content={faq.conversationalAnswer}
                      type="paragraph"
                      source="DelSolPrimeHomes Expert Team"
                    />
                  </AnimatedElement>
                ))}
              </div>
            </AnimatedElement>
          )}

          {/* Category Filter */}
          <AnimatedElement animation="fade-in-up" delay={200} className="mb-8">
            <div className="flex flex-wrap justify-center gap-3">
              <MagneticButton
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="text-sm"
              >
                {t('common.all') || 'All'}
              </MagneticButton>
              {Array.isArray(categories) && categories.map((category) => {
                const IconComponent = categoryIcons[category.key as keyof typeof categoryIcons] || Building;
                return (
                  <MagneticButton
                    key={category.key}
                    variant={selectedCategory === category.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.key)}
                    className="text-sm flex items-center gap-1"
                  >
                    <IconComponent className="w-3 h-3" />
                    {category.name}
                  </MagneticButton>
                );
              })}
            </div>
          </AnimatedElement>

          {/* FAQ Results Count */}
          <AnimatedElement animation="fade-in-up" delay={250} className="mb-6">
            <p className="text-center text-muted-foreground">
              {filteredFAQs.length === 0 
                ? 'No results found'
                : `${filteredFAQs.length} Questions Found`
              }
            </p>
          </AnimatedElement>

          {/* FAQ List */}
          {filteredFAQs.length > 0 ? (
            <AnimatedElement animation="fade-in-up" delay={300}>
              <Accordion type="single" collapsible className="space-y-4">
                {displayFAQs.map((faq, index) => {
                  const IconComponent = categoryIcons[faq.category as keyof typeof categoryIcons] || Building;
                  const isVoiceOptimized = faq.voice_queries && faq.voice_queries.length > 0;
                  
                  return (
                    <AccordionItem 
                      key={faq.id} 
                      value={faq.id}
                      className="border border-border/50 rounded-xl px-6 hover:border-primary/30 transition-all duration-300 hover:shadow-md"
                    >
                      <AccordionTrigger className="text-left py-6 hover:no-underline">
                        <div className="flex items-start justify-between w-full pr-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2 text-foreground">
                              {faq.question}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                              <Badge variant="secondary" className="text-xs flex items-center gap-1">
                                <IconComponent className="w-3 h-3" />
                                {categoryNames[faq.category] || faq.category}
                              </Badge>
                              {isVoiceOptimized && (
                                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300">
                                  <Mic className="w-3 h-3 mr-1" />
                                  Voice Ready
                                </Badge>
                              )}
                              {faq.is_featured && (
                                <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300">
                                  <Star className="w-3 h-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                              {faq.answer_short}
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      
                      <AccordionContent className="pb-6">
                        <div className="space-y-4">
                          <div className="prose prose-sm max-w-none dark:prose-invert">
                            <p className="text-foreground leading-relaxed">
                              {faq.answer_long || faq.answer_short}
                            </p>
                          </div>
                          
                          {/* Voice Search Keywords */}
                          {faq.voice_queries && faq.voice_queries.length > 0 && (
                            <div className="p-4 bg-muted/30 rounded-lg">
                              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                                <Mic className="w-4 h-4 text-primary" />
                                Voice Search Optimized For:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {faq.voice_queries.slice(0, 5).map((query: string, i: number) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    "{query}"
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Keywords */}
                          {faq.keywords && faq.keywords.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {faq.keywords.slice(0, 8).map((keyword: string, i: number) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
              
              {/* Show More Button */}
              {!showAllFAQs && filteredFAQs.length > 12 && (
                <div className="text-center mt-8">
                  <MagneticButton 
                    variant="outline" 
                    onClick={() => setShowAllFAQs(true)}
                    className="px-8"
                  >
                    Show More ({filteredFAQs.length - 12} remaining)
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </MagneticButton>
                </div>
              )}
            </AnimatedElement>
          ) : (
            <AnimatedElement animation="fade-in-up" delay={300} className="text-center py-12">
              <div className="max-w-md mx-auto">
                <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t('faq.noResults') || 'No results found'}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('faq.tryDifferentSearch') || 'Try a different search term or browse all categories.'}
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory(null);
                  }}
                >
                  {t('faq.clearFilters') || 'Clear Filters'}
                </Button>
              </div>
            </AnimatedElement>
          )}

          {/* Call to Action */}
          <AnimatedElement animation="fade-in-up" delay={400} className="mt-16">
            <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-none">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  {t('faq.stillHaveQuestions') || 'Still have questions?'}
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  {t('faq.contactExpert') || 'Our Costa del Sol property experts are here to help. Get personalized answers and guidance for your real estate journey.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <MagneticButton size="lg">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Ask Our Costa Del Sol Expert
                  </MagneticButton>
                  <MagneticButton variant="outline" size="lg">
                    All Answers
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </MagneticButton>
                </div>
              </CardContent>
            </Card>
          </AnimatedElement>
        </Container>
      </Section>
      
      {/* Hidden AEO Content for Voice Search */}
      <div className="sr-only" aria-hidden="true">
        {filteredFAQs.slice(0, 10).map((faq) => (
          <div key={`aeo-${faq.id}`}>
            <h4 itemProp="name">{faq.question}</h4>
            <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
              <div itemProp="text">{faq.answer_short}</div>
            </div>
            {faq.voice_queries?.map((query, index) => (
              <span key={index} data-voice-query={query} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}