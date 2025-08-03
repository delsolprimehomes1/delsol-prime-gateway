
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
import { useFAQData } from "@/hooks/useFAQData";
import { useLanguage } from "@/contexts/LanguageContext";

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
    getPropertyTypes
  } = useFAQData();

  const targetAreas = getTargetAreas();
  const propertyTypes = getPropertyTypes();

  // Generate structured data for SEO with all FAQs
  const faqSchema = useMemo(() => {
    return generateFAQSchema(
      faqs.map(faq => ({
        question: faq.question,
        answer: faq.answer
      }))
    );
  }, [faqs]);

  const structuredData = [organizationSchema, faqSchema];

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
              {Object.entries(categoryNames).map(([category, name]) => {
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
                  in <span className="font-medium text-primary">{categoryNames[selectedCategory as keyof typeof categoryNames]}</span>
                </span>
              )}
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion 
            type="single" 
            collapsible 
            className="space-y-6"
            aria-label="Frequently Asked Questions"
          >
            {filteredFAQs.map((faq, index) => {
                      const IconComponent = categoryIcons[faq.category as keyof typeof categoryIcons];
                      return (
                        <AccordionItem
                          key={faq.id}
                          value={faq.id}
                          className="border-0 rounded-2xl bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-500 hover:shadow-xl shadow-lg overflow-hidden group"
                          aria-labelledby={`faq-${faq.id}-question`}
                        >
                          <AccordionTrigger 
                            className="px-8 py-6 hover:no-underline"
                            aria-expanded="false"
                            aria-controls={`faq-${faq.id}-content`}
                          >
                            <div className="flex items-start gap-6 text-left w-full">
                              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 border border-primary/20">
                                <IconComponent className="w-6 h-6 text-primary" aria-hidden="true" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="mb-2 flex flex-wrap gap-2">
                                  <Badge variant="outline" className="bg-white/80 text-xs font-medium">
                                    {categoryNames[faq.category as keyof typeof categoryNames]}
                                  </Badge>
                                  {faq.targetAreas && faq.targetAreas.length > 0 && (
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                                      {faq.targetAreas[0]}{faq.targetAreas.length > 1 && ` +${faq.targetAreas.length - 1}`}
                                    </Badge>
                                  )}
                                  {faq.propertyTypes && faq.propertyTypes.length > 0 && (
                                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                      {faq.propertyTypes[0]}{faq.propertyTypes.length > 1 && ` +${faq.propertyTypes.length - 1}`}
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
                            className="px-8 pb-8"
                            id={`faq-${faq.id}-content`}
                            role="region"
                            aria-labelledby={`faq-${faq.id}-question`}
                          >
                            <div className="ml-18 bg-gradient-to-br from-muted/30 to-muted/20 rounded-xl p-6 border border-muted/40">
                              <p className="text-muted-foreground leading-relaxed text-base">
                                {faq.answer}
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>

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
