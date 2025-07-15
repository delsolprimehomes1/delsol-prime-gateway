
import { useState } from "react";
import { ChevronDown, Search, HelpCircle, FileText, Home, DollarSign, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Section from "@/components/layout/Section";
import { Link } from "react-router-dom";

const featuredFAQs = [
  {
    id: "property-purchase-process",
    question: "What is the property purchase process in Spain?",
    answer: "The property purchase process in Spain typically involves several key steps: property search, initial offer, due diligence, signing the private contract with deposit (10-20%), mortgage application (if needed), and final signing at the notary. The entire process usually takes 6-12 weeks from offer acceptance.",
    category: "legal",
    icon: FileText
  },
  {
    id: "financing-options",
    question: "What financing options are available for international buyers?",
    answer: "International buyers can access Spanish mortgages up to 70% of property value. We work with leading banks offering competitive rates. Alternative financing includes developer financing, private lending, and payment plans. Our financial advisors help structure the optimal solution for your situation.",
    category: "finance",
    icon: DollarSign
  },
  {
    id: "best-locations",
    question: "Which are the best locations to invest in Costa del Sol?",
    answer: "Top investment locations include Marbella for luxury properties, Estepona for new developments, Málaga for rental yields, and Benalmádena for tourism potential. Each area offers unique advantages depending on your investment goals and lifestyle preferences.",
    category: "locations",
    icon: MapPin
  },
  {
    id: "property-types",
    question: "What types of properties are available?",
    answer: "We offer a comprehensive range including luxury villas, modern apartments, penthouses, townhouses, and commercial properties. From beachfront locations to golf course communities, mountain retreats to city centers - all carefully selected for quality and investment potential.",
    category: "properties",
    icon: Home
  },
  {
    id: "legal-requirements",
    question: "What legal requirements must international buyers meet?",
    answer: "International buyers need an NIE number (tax identification), Spanish bank account, and legal representation. EU citizens have the same rights as Spanish nationals. Non-EU buyers can purchase freely but should consider tax implications and residency requirements.",
    category: "legal",
    icon: FileText
  }
];

const categoryIcons = {
  legal: FileText,
  finance: DollarSign,
  locations: MapPin,
  properties: Home
};

export default function FAQSection() {
  const [searchTerm, setSearchTerm] = useState("");
  
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
          Get instant answers to common questions about property investment, legal processes, and living in Costa del Sol.
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
            const IconComponent = categoryIcons[faq.category as keyof typeof categoryIcons];
            return (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border border-border/50 rounded-xl bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all duration-300 hover:shadow-elegant overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                  <div className="flex items-start gap-4 text-left">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
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
            Explore our comprehensive FAQ database or get personalized answers from our expert team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              variant="outline-white"
              size="lg"
              className="group"
            >
              <Link to="/faq">
                View All FAQs
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
