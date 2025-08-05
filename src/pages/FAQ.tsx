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
import { generateFAQSchema, generateOrganizationSchema, generateMultilingualFAQSchema } from "@/utils/seo/structuredData";
import { generateTitle } from "@/utils/seo/metaUtils";
import { useSupabaseFAQ } from "@/hooks/useSupabaseFAQ";
import { useLanguage } from "@/contexts/LanguageContext";

const categoryIcons = {
  "buying-property": Home,
  "selling-property": DollarSign,
  "viewing-trip": MapPin,
  "taxes-fees": FileText,
  legal: FileText,
  finance: DollarSign,
  locations: MapPin,
  properties: Home,
  services: HelpCircle,
  lifestyle: MapPin,
  "lifestyle-integration": MapPin
};

const FAQ = () => {
  const { t, currentLanguage } = useLanguage();
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

  const targetAreas = getTargetAreas;
  const propertyTypes = getPropertyTypes;

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
    
    schemas.push(generateFAQSchema(currentLanguageFAQs, currentLanguage));
    
    // Organization schema for current language
    schemas.push(generateOrganizationSchema(currentLanguage));
    
    // Hreflang schema for all languages (this helps with international SEO)
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

  // Loading and error states
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t('common.loading') || 'Loading FAQs...'}</p>
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
            {t('common.retry') || 'Retry'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <SEOHead
        title={generateTitle(t('faq.title') || "Costa del Sol Real Estate FAQ - 150+ Expert Property Answers")}
        description={t('faq.subtitle') || "Get instant answers to all your Costa del Sol property questions. Expert advice on buying, selling, legal requirements, taxes, and more from DelSolPrimeHomes."}
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

      <Section
        id="faq-page"
        padding="xl"
        background="default"
        containerSize="lg"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <HelpCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6" itemProp="name">
            {t('faq.title') || 'Frequently Asked Questions'}
          </h1>
          <div className="max-w-3xl mx-auto mb-8" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
            <p className="text-xl text-muted-foreground" itemProp="text">
              {t('faq.subtitle') || 'Get expert answers to all your Costa del Sol property questions from our comprehensive database.'}
            </p>
          </div>
          
          {/* Statistics */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{faqs.length}+</div>
              <div className="text-sm text-muted-foreground">{t('faq.totalQuestions') || 'Expert Answers'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{Object.keys(categoryNames).length - 1}</div>
              <div className="text-sm text-muted-foreground">{t('faq.categories') || 'Categories'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{targetAreas.length}</div>
              <div className="text-sm text-muted-foreground">{t('faq.locations') || 'Locations'}</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-2xl p-8 mb-12">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder={t('faq.searchPlaceholder') || "Search FAQs..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-lg bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary transition-all duration-300"
            />
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">{t('faq.filterByCategory') || 'Filter by Category'}</h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(translatedCategoryNames).map(([key, name]) => {
                const IconComponent = categoryIcons[key] || HelpCircle;
                const count = getCategoryCount(key);
                const isActive = selectedCategory === key;
                
                return (
                  <Button
                    key={key}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(key)}
                    className={`flex items-center gap-2 ${isActive ? 'bg-primary text-primary-foreground' : ''}`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {name}
                    <Badge variant="secondary" className="ml-1">
                      {count}
                    </Badge>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Location and Property Type Filters */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Target Area Filter */}
            <div>
              <h4 className="text-md font-medium mb-3">{t('faq.filterByLocation') || 'Filter by Location'}</h4>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedTargetArea === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTargetArea("all")}
                >
                  {t('common.all') || 'All Areas'}
                </Button>
                {targetAreas.slice(0, 6).map((area) => (
                  <Button
                    key={area}
                    variant={selectedTargetArea === area ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTargetArea(area)}
                  >
                    {area}
                  </Button>
                ))}
              </div>
            </div>

            {/* Property Type Filter */}
            <div>
              <h4 className="text-md font-medium mb-3">{t('faq.filterByPropertyType') || 'Filter by Property Type'}</h4>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedPropertyType === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPropertyType("all")}
                >
                  {t('common.all') || 'All Types'}
                </Button>
                {propertyTypes.slice(0, 6).map((type) => (
                  <Button
                    key={type}
                    variant={selectedPropertyType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPropertyType(type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          {(searchTerm || selectedCategory !== "all" || selectedTargetArea !== "all" || selectedPropertyType !== "all") && (
            <div className="mt-6 pt-6 border-t border-border/50">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedTargetArea("all");
                  setSelectedPropertyType("all");
                }}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                {t('common.clearFilters') || 'Clear All Filters'}
              </Button>
            </div>
          )}
        </div>

        {/* FAQ Results */}
        <div className="max-w-5xl mx-auto">
          {filteredFAQs.length > 0 ? (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {t('faq.searchResults') || 'Search Results'} ({filteredFAQs.length})
                </h2>
                <p className="text-muted-foreground">
                  {searchTerm 
                    ? `Showing results for "${searchTerm}"`
                    : `Showing ${selectedCategory === "all" ? "all" : translatedCategoryNames[selectedCategory]} questions`
                  }
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {filteredFAQs.map((faq) => {
                  const IconComponent = categoryIcons[faq.category] || HelpCircle;
                  const categoryName = translatedCategoryNames[faq.category] || faq.category;
                  
                  return (
                    <AccordionItem
                      key={faq.id}
                      value={faq.id}
                      className="border border-border/50 rounded-xl bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all duration-300 hover:shadow-elegant overflow-hidden"
                      itemScope
                      itemType="https://schema.org/Question"
                      itemProp="mainEntity"
                    >
                      <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                        <div className="flex items-start gap-4 text-left w-full">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="mb-2">
                              <Badge variant="secondary" className="text-xs">
                                {categoryName}
                              </Badge>
                              {faq.location && (
                                <Badge variant="outline" className="ml-2 text-xs">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {faq.location}
                                </Badge>
                              )}
                            </div>
                            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300" itemProp="name">
                              {faq.question}
                            </h3>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                        <div className="ml-16" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                          <p className="text-muted-foreground leading-relaxed mb-4" itemProp="text">
                            {faq.answer_short}
                          </p>
                          
                          {faq.answer_long && faq.answer_long !== faq.answer_short && (
                            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                              <p className="text-sm font-medium mb-2">{t('faq.detailedAnswer') || 'Detailed Answer:'}</p>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {faq.answer_long}
                              </p>
                            </div>
                          )}
                          
                          {/* Tags */}
                          {faq.tags && faq.tags.length > 0 && (
                            <div className="mt-4">
                              <div className="flex flex-wrap gap-2">
                                {faq.tags.slice(0, 6).map((tag, i) => (
                                  <span key={i} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                {t('faq.noResults') || 'No Results Found'}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {t('faq.noResultsDescription') || 'Try adjusting your search terms or filters to find what you\'re looking for.'}
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedTargetArea("all");
                  setSelectedPropertyType("all");
                }}
                variant="outline"
              >
                {t('common.clearFilters') || 'Clear All Filters'}
              </Button>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-premium rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              {t('faq.stillHaveQuestions') || 'Still Have Questions?'}
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              {t('faq.contactDescription') || 'Our Costa Del Sol property experts are here to help with personalized guidance and answers to your specific questions.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                variant="outline-white"
                size="lg"
                className="group"
              >
                <Link to="/contact">
                  {t('common.contactUs') || 'Contact Our Experts'}
                </Link>
              </Button>
              <Button 
                asChild
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                <Link to="/">
                  {t('nav.home') || 'Explore Properties'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default FAQ;