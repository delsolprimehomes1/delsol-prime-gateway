
import { useState } from "react";
import { ChevronDown, Search, HelpCircle } from "lucide-react";
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
    >
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
          <HelpCircle className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-4xl font-bold text-foreground mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Get instant answers from our comprehensive database of 100+ questions about property investment, legal processes, and living in Costa del Sol.
        </p>
        
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-12">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search frequently asked questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary transition-all duration-300"
          />
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-4xl mx-auto mb-12">
        <Accordion type="single" collapsible className="space-y-4">
          {filteredFAQs.map((faq, index) => {
            const category = categories[faq.category as keyof typeof categories];
            return (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border border-border/50 rounded-xl bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all duration-300 hover:shadow-elegant overflow-hidden"
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
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="ml-14">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
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
              Try adjusting your search terms or browse all FAQs.
            </p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <div className="bg-gradient-premium rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">
            Need More Information?
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Explore our comprehensive FAQ database with 100+ expert answers or get personalized guidance from our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              variant="outline-white"
              size="lg"
              className="group"
            >
              <Link to="/faq">
                View All 100+ FAQs
                <ChevronDown className="ml-2 w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
              </Link>
            </Button>
            <Button 
              variant="secondary"
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              Contact Expert
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
