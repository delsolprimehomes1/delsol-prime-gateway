import { useState, useMemo } from "react";
import { ChevronDown, Search, HelpCircle, FileText, Home, DollarSign, MapPin, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const categoryNames = {
    all: 'All Questions',
    legal: 'Legal & Process',
    finance: 'Finance & Investment', 
    locations: 'Locations & Areas',
    properties: 'Property Types',
    services: 'Our Services',
    lifestyle: 'Lifestyle & Living'
  };

  const filteredFAQs = useMemo(() => {
    let filtered = featuredFAQs;
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [searchTerm, selectedCategory]);

  const faqSchema = generateFAQSchema(
    allFAQs.map(faq => ({
      question: faq.question,
      answer: faq.answer
    }))
  );

  const structuredData = [organizationSchema, faqSchema];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <SEOHead
        title={generateTitle("Costa del Sol Real Estate FAQ - Expert Property Guidance")}
        description="Get expert answers to Costa del Sol property questions. Comprehensive FAQ covering buying process, legal requirements, financing, locations, and lifestyle in Spain's premier real estate market."
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
            Costa del Sol Property FAQ
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
            Expert answers to your Costa del Sol real estate questions. From legal processes to luxury lifestyle, 
            get comprehensive guidance for international property investment in Spain's most prestigious region.
          </p>
          
          {/* Search and Filter Controls */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search questions, answers, or topics..."
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
              
              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-12 pr-8 h-14 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 focus:bg-white focus:shadow-xl rounded-lg text-base min-w-[200px] appearance-none cursor-pointer"
                >
                  {Object.entries(categoryNames).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />
              </div>
            </div>

            {/* Category Badges */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {Object.entries(categoryNames).map(([category, name]) => {
                const count = category === "all" ? featuredFAQs.length : featuredFAQs.filter(faq => faq.category === category).length;
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
              {filteredFAQs.length === featuredFAQs.length 
                ? `Showing all ${filteredFAQs.length} questions`
                : `Showing ${filteredFAQs.length} of ${featuredFAQs.length} questions`
              }
              {selectedCategory !== "all" && (
                <span className="ml-2">
                  in <span className="font-medium text-primary">{categoryNames[selectedCategory as keyof typeof categoryNames]}</span>
                </span>
              )}
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-6">
            {filteredFAQs.map((faq, index) => {
              const IconComponent = categoryIcons[faq.category as keyof typeof categoryIcons];
              return (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border-0 rounded-2xl bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-500 hover:shadow-xl shadow-lg overflow-hidden group"
                >
                  <AccordionTrigger className="px-8 py-6 hover:no-underline">
                    <div className="flex items-start gap-6 text-left w-full">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 border border-primary/20">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="mb-2">
                          <Badge variant="outline" className="bg-white/80 text-xs font-medium">
                            {categoryNames[faq.category as keyof typeof categoryNames]}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 leading-relaxed">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-8">
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
              <h3 className="text-2xl font-semibold text-foreground mb-3">No Results Found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any FAQs matching your search criteria. Try adjusting your search terms or browse all categories.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => setSearchTerm("")}
                  className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl"
                >
                  Clear Search
                </Button>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="shadow-lg hover:shadow-xl"
                >
                  Show All FAQs
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
                Still Have Questions?
              </h3>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Our expert team is ready to provide personalized guidance for your Costa del Sol property journey. 
                Get in touch for tailored advice and exclusive market insights.
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
