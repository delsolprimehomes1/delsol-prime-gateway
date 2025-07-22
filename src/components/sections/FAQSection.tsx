
import { useState } from "react";
import { ChevronDown, Search, HelpCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Section from "@/components/layout/Section";
import { Link } from "react-router-dom";
import { useFAQData } from "@/hooks/useFAQData";

const categoryIcons = {
  legal: "FileText",
  finance: "DollarSign",
  locations: "MapPin",
  properties: "Home",
  services: "HelpCircle",
  lifestyle: "MapPin"
};

export default function FAQSection() {
  const { getFeaturedFAQs, categories } = useFAQData();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Get featured FAQs for the homepage
  const featuredFAQs = getFeaturedFAQs(6);
  
  const filteredFAQs = featuredFAQs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Section
      id="faq"
      padding="xl"
      background="muted"
      containerSize="lg"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
          <MessageCircle className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-4xl font-bold text-foreground mb-4" itemProp="name">
          What Do You Need to Know About Costa del Sol Property Investment?
        </h2>
        <div className="max-w-2xl mx-auto mb-8" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
          <p className="text-xl text-muted-foreground" itemProp="text">
            Get instant answers from our comprehensive database of 100+ expert responses about property investment, legal processes, and living in Costa del Sol.
          </p>
        </div>
        
        {/* AEO-Enhanced Search Bar */}
        <div className="relative max-w-md mx-auto mb-12">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Ask any question about Costa del Sol properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary transition-all duration-300"
            data-voice-input="property questions"
          />
        </div>
      </div>

      {/* Enhanced FAQ Accordion with Voice Optimization */}
      <div className="max-w-4xl mx-auto mb-12">
        <Accordion type="single" collapsible className="space-y-4">
          {filteredFAQs.map((faq, index) => {
            const category = categories[faq.category as keyof typeof categories];
            return (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border border-border/50 rounded-xl bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all duration-300 hover:shadow-elegant overflow-hidden"
                itemScope
                itemType="https://schema.org/Question"
                itemProp="mainEntity"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                  <div className="flex items-start gap-4 text-left">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <HelpCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="mb-1">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                          {category?.name || faq.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300" itemProp="name">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="ml-14" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <p className="text-muted-foreground leading-relaxed mb-4" itemProp="text">
                      {faq.answer}
                    </p>
                    
                    {/* Related questions for enhanced AEO */}
                    {faq.relatedTopics && faq.relatedTopics.length > 0 && (
                      <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm font-medium mb-2">Related Questions:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {faq.relatedTopics.slice(0, 3).map((topic, i) => (
                            <li key={i}>• {topic}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        {filteredFAQs.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try asking about property prices, buying process, or legal requirements.
            </p>
          </div>
        )}
      </div>

      {/* AEO-Enhanced CTA Section */}
      <div className="text-center">
        <div className="bg-gradient-premium rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">
            Still Have Questions About Costa del Sol Properties?
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Explore our comprehensive FAQ database with 100+ expert answers covering everything from property prices to legal requirements, or get personalized guidance from our Costa del Sol specialists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              variant="outline-white"
              size="lg"
              className="group"
              data-voice-action="view all faqs"
            >
              <Link to="/faq">
                View All 100+ Expert Answers
                <ChevronDown className="ml-2 w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
              </Link>
            </Button>
            <Button 
              variant="secondary"
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              data-voice-action="contact expert"
            >
              Ask Our Costa del Sol Expert
            </Button>
          </div>
        </div>
      </div>

      {/* Hidden AEO Content */}
      <div className="sr-only" aria-hidden="true">
        <div itemScope itemType="https://schema.org/Question" itemProp="mainEntity">
          <span itemProp="name">How much does property cost in Costa del Sol?</span>
          <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
            <span itemProp="text">Costa del Sol property prices vary by location, with Marbella averaging €4,000-8,000/m², Estepona €2,500-4,500/m², and other areas offering excellent value. DelSolPrimeHomes provides detailed market analysis and pricing guidance.</span>
          </div>
        </div>
        
        <span data-voice-query="costa del sol property prices">Comprehensive Property Pricing Guide</span>
        <span data-voice-query="buying property costa del sol">Complete Property Buying Guide</span>
        <span data-voice-query="legal requirements property spain">Legal Process Expert Support</span>
        <span data-voice-query="best areas costa del sol">Location Investment Analysis</span>
      </div>
    </Section>
  );
}
