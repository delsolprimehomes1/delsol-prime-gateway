import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Section from "@/components/layout/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SEOHead from "@/components/seo/SEOHead";
import BreadcrumbNavigation from "@/components/seo/BreadcrumbNavigation";
import { StructuredDataProvider } from "@/components/seo/StructuredDataProvider";
import { Search, BookOpen, MapPin, Scale, DollarSign, Home } from "lucide-react";
import glossaryData from "@/data/glossaryData.json";
import { PAGE_METADATA } from "@/utils/seo/contentMetadata";

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
  relatedTerms: string[];
  seoKeywords: string[];
}

const Glossary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(glossaryData.map(term => term.category)));
    return ['All', ...cats];
  }, []);

  const filteredTerms = useMemo(() => {
    let filtered = glossaryData as GlossaryTerm[];
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(term => term.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(term =>
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.seoKeywords.some(keyword => 
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    return filtered.sort((a, b) => a.term.localeCompare(b.term));
  }, [searchTerm, selectedCategory]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Location': return <MapPin className="w-4 h-4" />;
      case 'Legal': return <Scale className="w-4 h-4" />;
      case 'Financial': return <DollarSign className="w-4 h-4" />;
      default: return <Home className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Location': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Legal': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Financial': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Generate FAQ schema for glossary terms
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": filteredTerms.map(term => ({
      "@type": "Question",
      "name": `What is ${term.term}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": term.definition
      }
    }))
  };

  // Generate Glossary schema
  const glossarySchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": "Costa del Sol Real Estate Glossary",
    "description": "Comprehensive glossary of real estate terms for property buyers in Costa del Sol, Spain",
    "url": "https://delsolprimehomes.com/glossary",
    "hasDefinedTerm": filteredTerms.map(term => ({
      "@type": "DefinedTerm",
      "name": term.term,
      "description": term.definition,
      "termCode": term.id,
      "inDefinedTermSet": {
        "@type": "DefinedTermSet",
        "name": term.category
      }
    }))
  };

  const structuredData = [faqSchema, glossarySchema];

  return (
    <StructuredDataProvider
      pageType="faq"
      pageData={{
        title: "Costa del Sol Real Estate Glossary - Property Terms Guide",
        description: "Comprehensive glossary of real estate terms for property buyers in Costa del Sol, Spain. Understand key legal, financial, and location terms.",
        breadcrumbs: [
          { name: "Home", url: "https://delsolprimehomes.com" },
          { name: "Glossary", url: "https://delsolprimehomes.com/glossary" }
        ]
      }}
    >
      <div className="min-h-screen bg-background">
        <SEOHead
          title="Costa del Sol Real Estate Glossary - Property Terms Guide"
          description="Comprehensive glossary of real estate terms for property buyers in Costa del Sol, Spain. Understand key legal, financial, and location terms before buying property."
          canonical="https://delsolprimehomes.com/glossary"
          ogImage="https://delsolprimehomes.com/og-glossary.jpg"
          ogType="website"
          twitterCard="summary_large_image"
          keywords={[
            'Costa del Sol real estate glossary',
            'Spanish property terms',
            'real estate definitions Spain',
            'property buying guide Spain',
            'Spanish property law terms',
            'NIE number Spain',
            'ITP tax definition',
            'Spanish property taxes'
          ]}
          structuredData={structuredData}
        />

        <BreadcrumbNavigation 
          items={[{ name: "Glossary", href: "/glossary" }]}
          className="container mx-auto px-6 py-4"
        />

        <Navigation />

        {/* Hero Section */}
        <Section
          id="glossary-hero"
          padding="xl"
          background="default"
          containerSize="lg"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm border border-primary/20 mb-8">
              <BookOpen className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent mb-6">
              Real Estate Glossary
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Master the essential terms and concepts for buying property in Costa del Sol. 
              From legal requirements to financial terms, we've got you covered.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search terms, definitions, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-base"
              />
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === selectedCategory ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="flex items-center gap-2"
                >
                  {category !== 'All' && getCategoryIcon(category)}
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-muted-foreground">
              Showing {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
        </Section>

        {/* Glossary Terms */}
        <Section
          id="glossary-terms"
          padding="xl"
          background="muted"
          containerSize="lg"
        >
          <div className="grid gap-6">
            {filteredTerms.map((term) => (
              <Card key={term.id} className="hover:shadow-lg transition-all duration-300 border-0 bg-background">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-2xl font-semibold text-foreground">
                      {term.term}
                    </CardTitle>
                    <Badge 
                      variant="outline" 
                      className={`flex items-center gap-1 ${getCategoryColor(term.category)}`}
                    >
                      {getCategoryIcon(term.category)}
                      {term.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {term.definition}
                  </p>
                  
                  {term.relatedTerms.length > 0 && (
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Related Terms:</h4>
                      <div className="flex flex-wrap gap-2">
                        {term.relatedTerms.map((relatedTerm, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {relatedTerm}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {term.seoKeywords.length > 0 && (
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Common Searches:</h4>
                      <div className="flex flex-wrap gap-2">
                        {term.seoKeywords.slice(0, 3).map((keyword, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTerms.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No terms found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or selecting a different category.
              </p>
            </div>
          )}
        </Section>

        {/* CTA Section */}
        <Section
          id="glossary-cta"
          padding="xl"
          background="default"
          containerSize="lg"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Need More Help Understanding Spanish Property Law?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our expert team can guide you through every aspect of buying property in Costa del Sol.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Schedule Free Consultation
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                Download Property Guide
              </Button>
            </div>
          </div>
        </Section>

        <Footer />
      </div>
    </StructuredDataProvider>
  );
};

export default Glossary;