import { useState } from "react";
import { ChevronDown, Search, HelpCircle, FileText, Home, DollarSign, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Section from "@/components/layout/Section";
import { Link } from "react-router-dom";
import SEOHead from "@/components/seo/SEOHead";
import BreadcrumbNavigation from "@/components/seo/BreadcrumbNavigation";
import { generateFAQSchema, organizationSchema } from "@/utils/seo/structuredData";
import { generateTitle, META_DESCRIPTIONS } from "@/utils/seo/metaUtils";

const featuredFAQs = [
  // Buying Process & Legal
  {
    id: "property-purchase-process",
    question: "What is the complete property purchase process in Costa del Sol?",
    answer: "Our comprehensive purchase process includes: 1) Property selection with virtual tours and market analysis, 2) Legal due diligence including property history and planning permissions, 3) Preliminary contract (10-20% deposit), 4) Mortgage arrangement (if required), 5) Final deed signing at notary (escritura), 6) Property registration and key handover. We guide you through each step with dedicated support in English and Spanish.",
    category: "legal",
    icon: FileText
  },
  {
    id: "nie-number-process",
    question: "How do I obtain an NIE number and how long does it take?",
    answer: "An NIE (Número de Identificación de Extranjero) is essential for property purchases. You can apply at Spanish consulates in your home country or in Spain at National Police stations. The process typically takes 2-4 weeks. We can assist with NIE applications and provide all necessary documentation to expedite the process.",
    category: "legal",
    icon: FileText
  },
  {
    id: "property-taxes-spain",
    question: "What taxes apply when buying property in Spain?",
    answer: "Main taxes include: Transfer Tax (ITP) 7-10% for resale properties, VAT (IVA) 10% + Stamp Duty 1.2% for new builds, Notary fees €600-1,200, Land Registry €400-800, Legal fees 1-2% of purchase price. Annual property tax (IBI) varies by location. We provide detailed tax calculations for each property.",
    category: "finance",
    icon: DollarSign
  },
  {
    id: "legal-representation",
    question: "Do I need a lawyer when buying property in Costa del Sol?",
    answer: "While not mandatory, independent legal representation is highly recommended. Our network of qualified English-speaking lawyers specializes in international property transactions. They ensure proper due diligence, review contracts, handle bank guarantees, and protect your interests throughout the purchase process.",
    category: "legal",
    icon: FileText
  },

  // Financing & Investment
  {
    id: "mortgage-international-buyers",
    question: "Can international buyers get mortgages in Spain?",
    answer: "Yes, international buyers can secure Spanish mortgages up to 70% of property value (80% for residents). We work with major banks offering competitive rates from 2.5%. Requirements include proof of income (3x mortgage payment), credit history, and 30% deposit. Our mortgage specialists handle the entire application process.",
    category: "finance",
    icon: DollarSign
  },
  {
    id: "investment-returns-costa-del-sol",
    question: "What rental yields can I expect in Costa del Sol?",
    answer: "Rental yields vary by location and property type: Marbella 4-6%, Estepona 5-7%, Benalmádena 6-8%, central Málaga 7-9%. Luxury beachfront properties generate premium short-term rental income. We provide detailed rental projections and property management services to maximize your investment returns.",
    category: "finance",
    icon: DollarSign
  },
  {
    id: "property-insurance",
    question: "What insurance do I need for my Costa del Sol property?",
    answer: "Essential insurances include: Buildings insurance (required for mortgages), Contents insurance, Public liability coverage. For rental properties, add landlord insurance and loss of rent protection. Annual costs typically range €300-800. We arrange comprehensive insurance packages through trusted providers.",
    category: "finance",
    icon: DollarSign
  },

  // Locations & Areas
  {
    id: "best-areas-marbella",
    question: "Which are the most prestigious areas in Marbella?",
    answer: "Top luxury areas include: Golden Mile (beachfront mansions), Puerto Banús (marina lifestyle), Sierra Blanca (mountain views), La Zagaleta (ultra-exclusive gated community), Guadalmina (golf course living). Each offers unique advantages from beach access to privacy and investment potential.",
    category: "locations",
    icon: MapPin
  },
  {
    id: "upcoming-developments-estepona",
    question: "What new developments are planned for Estepona?",
    answer: "Estepona is experiencing major growth with new beachfront developments, marina expansion, and the Ave high-speed train connection (2027). Key projects include luxury residential complexes near the beach, golf course communities, and the new Estepona port. These developments are driving significant capital appreciation.",
    category: "locations",
    icon: MapPin
  },
  {
    id: "transport-connections",
    question: "How well connected is Costa del Sol for travel?",
    answer: "Excellent connectivity: Málaga Airport (international hub) 30-60 minutes from most locations, High-speed AVE train to Madrid (2.5 hours), Comprehensive highway network (A7 coastal route), Gibraltar Airport nearby. The planned Costa del Sol metro expansion will further improve local transport.",
    category: "locations",
    icon: MapPin
  },
  {
    id: "climate-weather",
    question: "What is the climate like year-round in Costa del Sol?",
    answer: "Costa del Sol enjoys 320+ sunny days annually with mild winters (15-20°C) and warm summers (25-30°C). Minimal rainfall from May-September makes it perfect for year-round living. The Mediterranean climate supports outdoor activities, golf, and beach lifestyle throughout the year.",
    category: "lifestyle",
    icon: MapPin
  },

  // Property Types & Features
  {
    id: "luxury-villa-features",
    question: "What features define luxury villas in Costa del Sol?",
    answer: "Luxury villas typically include: Private pools and landscaped gardens, Sea or mountain views, Premium finishes and smart home technology, Private parking and security systems, Outdoor entertainment areas, Proximity to golf courses or beaches. Many feature contemporary architecture blending indoor-outdoor living.",
    category: "properties",
    icon: Home
  },
  {
    id: "apartment-vs-villa",
    question: "Should I buy an apartment or villa in Costa del Sol?",
    answer: "Apartments offer: Lower maintenance, security, shared amenities (pools, gyms), better rental yields in popular areas. Villas provide: Privacy, garden space, potential for extensions, prestige, typically better capital appreciation. Your choice depends on lifestyle preferences, budget, and investment goals.",
    category: "properties",
    icon: Home
  },
  {
    id: "golf-properties",
    question: "What golf course properties are available in Costa del Sol?",
    answer: "Costa del Sol features 70+ golf courses with exceptional residential communities: Valderrama (prestigious tournament venue), La Reserva (luxury development), Los Flamingos (villa resort), Finca Cortesín (championship course), Villa Padierna (multiple courses). Golf properties typically offer premium amenities and strong investment potential.",
    category: "properties",
    icon: Home
  },

  // Services & Support
  {
    id: "after-sales-services",
    question: "What after-sales services does DelSolPrimeHomes provide?",
    answer: "Comprehensive after-sales support including: Property management and rental services, Maintenance and renovation coordination, Utility connections and registrations, Tax and legal assistance, Interior design consultation, Concierge services. We ensure your property investment is properly maintained and optimized.",
    category: "services",
    icon: HelpCircle
  },
  {
    id: "property-management",
    question: "Do you offer property management for rental properties?",
    answer: "Yes, our full property management service includes: Tenant sourcing and screening, Professional photography and marketing, Maintenance coordination, Financial reporting, Legal compliance, 24/7 emergency support. We typically achieve 15-20% higher rental income than self-managed properties.",
    category: "services",
    icon: HelpCircle
  },
  {
    id: "viewing-tours",
    question: "How do property viewing tours work for international clients?",
    answer: "We offer flexible viewing options: Virtual 3D tours and video calls, Personalized itineraries for site visits, Airport transfer and accommodation assistance, Multi-day viewing programs, Expert local guidance and market insights. Virtual viewings allow initial screening before traveling to Spain.",
    category: "services",
    icon: HelpCircle
  },

  // Lifestyle & Living
  {
    id: "residency-requirements",
    question: "What are the residency requirements for living in Spain?",
    answer: "EU citizens can live freely in Spain. Non-EU residents need: Tourist visa (90 days), Non-lucrative visa (passive income €2,400/month), Investment visa (€500k+ property), Work/business visa. After 5 years legal residence, you can apply for permanent residency. We assist with visa applications and requirements.",
    category: "lifestyle",
    icon: MapPin
  },
  {
    id: "healthcare-system",
    question: "How does healthcare work for residents in Costa del Sol?",
    answer: "Spain offers excellent healthcare: Public system for residents with social security, Private insurance widely available and affordable, Top international hospitals and clinics, Many English-speaking doctors, Dental and specialist care accessible. Costa del Sol has modern medical facilities serving the international community.",
    category: "lifestyle",
    icon: MapPin
  },
  {
    id: "international-schools",
    question: "What international schools are available in Costa del Sol?",
    answer: "Excellent international education options: British curriculum schools (Swans International, Aloha College), American schools (The American School of Las Palmas), German and French schools, IB programs available, Multilingual environments. Many schools offer boarding options and university preparation programs.",
    category: "lifestyle",
    icon: MapPin
  },
  {
    id: "cost-of-living",
    question: "What is the cost of living in Costa del Sol compared to other European destinations?",
    answer: "Costa del Sol offers excellent value: 20-30% lower than UK/Germany for daily expenses, Restaurant meals €15-40, Utilities €80-150/month, Car insurance €300-600/year, Quality healthcare at reasonable costs. Luxury lifestyle is more affordable than equivalent Northern European locations.",
    category: "lifestyle",
    icon: DollarSign
  }
];

const categoryIcons = {
  legal: FileText,
  finance: DollarSign,
  locations: MapPin,
  properties: Home,
  services: HelpCircle,
  lifestyle: MapPin
};

const allFAQs = featuredFAQs;

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredFAQs = featuredFAQs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const faqSchema = generateFAQSchema(
    allFAQs.map(faq => ({
      question: faq.question,
      answer: faq.answer
    }))
  );

  const structuredData = [organizationSchema, faqSchema];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={generateTitle("Frequently Asked Questions")}
        description={META_DESCRIPTIONS.faq}
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
        background="muted"
        containerSize="lg"
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Costa del Sol Property FAQ
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Comprehensive answers to your questions about buying, investing, and living in Costa del Sol's luxury real estate market. Expert guidance for international property buyers.
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

        {/* Category Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {Object.entries(categoryIcons).map(([category, IconComponent]) => {
              const categoryFAQs = featuredFAQs.filter(faq => faq.category === category);
              const categoryCount = categoryFAQs.length;
              const categoryNames = {
                legal: 'Legal & Process',
                finance: 'Finance & Investment', 
                locations: 'Locations & Areas',
                properties: 'Property Types',
                services: 'Our Services',
                lifestyle: 'Lifestyle & Living'
              };
              
              return (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 rounded-full border-primary/20 hover:bg-primary/10 transition-all duration-300"
                  onClick={() => {
                    const firstCategoryFAQ = categoryFAQs[0];
                    if (firstCategoryFAQ) {
                      document.getElementById(firstCategoryFAQ.id)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <IconComponent className="w-4 h-4" />
                  {categoryNames[category as keyof typeof categoryNames]} ({categoryCount})
                </Button>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-premium rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Your Costa del Sol Journey?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Get personalized guidance from our expert team of Costa del Sol property specialists. We're here to make your dream property a reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                variant="outline-white"
                size="lg"
                className="group"
              >
                <Link to="/">
                  Explore Properties
                  <ChevronDown className="ml-2 w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
                </Link>
              </Button>
              <Button 
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default FAQ;
