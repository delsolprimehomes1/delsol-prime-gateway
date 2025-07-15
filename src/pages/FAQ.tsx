
import { useState, useMemo } from "react";
import { Search, Filter, ThumbsUp, ThumbsDown, ChevronDown, FileText, Home, DollarSign, MapPin, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import Section from "@/components/layout/Section";
import Navigation from "@/components/layout/Navigation";

const categories = [
  { id: "all", name: "All Categories", icon: Filter },
  { id: "legal", name: "Legal & Documentation", icon: FileText },
  { id: "properties", name: "Property Search", icon: Home },
  { id: "lifestyle", name: "Lifestyle & Living", icon: Heart },
  { id: "finance", name: "Investment & Finance", icon: DollarSign },
  { id: "locations", name: "Locations", icon: MapPin },
  { id: "process", name: "Process", icon: Users }
];

const allFAQs = [
  {
    id: "property-purchase-process",
    question: "What is the property purchase process in Spain?",
    answer: "The property purchase process in Spain involves several key steps that typically take 6-12 weeks to complete. First, you'll search for properties and make an initial offer. Once accepted, due diligence is conducted including property inspections, legal checks, and verification of documentation. Next, you'll sign a private purchase contract (contrato de arras) with a deposit of 10-20% of the property value. If financing is needed, mortgage applications are processed during this period. Finally, the sale is completed at a notary office where the final contract is signed, remaining balance is paid, and ownership is officially transferred. Throughout this process, having qualified legal representation is essential to protect your interests.",
    category: "legal",
    priority: 1,
    featured: true,
    votes: { helpful: 45, unhelpful: 2 }
  },
  {
    id: "financing-options",
    question: "What financing options are available for international buyers?",
    answer: "International buyers have several financing options available in Spain. Spanish banks typically offer mortgages up to 70% of the property value for non-residents, with competitive interest rates. We maintain relationships with leading financial institutions to secure the best terms for our clients. Alternative financing includes developer financing programs, private lending solutions, and flexible payment plans. Some developers offer attractive financing packages with lower down payments and extended payment terms. Our financial advisors work closely with you to structure the optimal financing solution based on your specific situation, ensuring you maximize your purchasing power while minimizing financial risk.",
    category: "finance",
    priority: 2,
    featured: true,
    votes: { helpful: 38, unhelpful: 1 }
  },
  {
    id: "best-investment-locations",
    question: "Which are the best locations to invest in Costa del Sol?",
    answer: "Costa del Sol offers diverse investment opportunities across different municipalities. Marbella remains the premier luxury destination with the highest property values and strongest rental demand. Estepona is experiencing rapid growth with new developments and infrastructure improvements. Málaga city offers excellent rental yields due to its airport proximity and cultural attractions. Benalmádena provides strong tourism potential with theme parks and marinas. Fuengirola and Torremolinos offer more affordable entry points with solid rental markets. Each location has unique characteristics - beachfront properties command premium prices, golf course communities attract international buyers, and city centers provide steady rental income. Our market analysis team provides detailed location-specific investment recommendations based on your budget and objectives.",
    category: "locations",
    priority: 3,
    featured: true,
    votes: { helpful: 42, unhelpful: 3 }
  },
  {
    id: "property-types-available",
    question: "What types of properties are available?",
    answer: "We offer a comprehensive portfolio of properties to meet diverse needs and budgets. Luxury villas feature private pools, gardens, and premium finishes in exclusive communities. Modern apartments range from studio units to spacious family homes with sea or mountain views. Penthouses offer the ultimate in luxury living with private terraces and panoramic vistas. Townhouses provide family-friendly living with private gardens and community amenities. Commercial properties include retail spaces, restaurants, and office buildings for business investors. New developments offer the latest in modern design and technology with attractive payment plans. Resale properties provide immediate availability and established communities. All properties are carefully selected for quality, location, and investment potential, ensuring you receive maximum value for your investment.",
    category: "properties",
    priority: 4,
    featured: true,
    votes: { helpful: 33, unhelpful: 1 }
  },
  {
    id: "legal-requirements-international",
    question: "What legal requirements must international buyers meet?",
    answer: "International buyers must meet specific legal requirements to purchase property in Spain. All buyers need an NIE number (Número de Identificación de Extranjero), which is a tax identification number obtained from Spanish police or consulates. A Spanish bank account is required for property transactions and ongoing payments. Legal representation by a qualified Spanish lawyer is highly recommended to review contracts and ensure compliance. EU citizens enjoy the same property rights as Spanish nationals with no restrictions. Non-EU buyers can purchase freely but should consider tax implications including non-resident taxes and potential double taxation treaties. Some properties in certain areas may have restrictions for non-EU buyers. Our legal team guides you through all requirements and ensures full compliance with Spanish property law.",
    category: "legal",
    priority: 5,
    featured: true,
    votes: { helpful: 51, unhelpful: 2 }
  },
  {
    id: "cost-of-living-spain",
    question: "What is the cost of living in Costa del Sol?",
    answer: "Costa del Sol offers an attractive cost of living compared to other European destinations. Housing costs vary significantly by location - Marbella and Puerto Banús command premium prices while inland towns offer more affordable options. Utilities including electricity, water, and internet typically cost €100-200 monthly for an average home. Groceries are generally 20-30% less expensive than Northern European countries, with excellent local markets and supermarkets. Dining out ranges from €15-25 for a good meal to €50+ for fine dining. Healthcare costs are reasonable with excellent public and private options available. Transportation is affordable with good public transport and reasonable fuel costs. Overall, many expatriates find their money goes further while enjoying a superior quality of life with year-round sunshine and excellent amenities.",
    category: "lifestyle",
    priority: 6,
    featured: false,
    votes: { helpful: 29, unhelpful: 4 }
  },
  {
    id: "tax-implications-purchase",
    question: "What are the tax implications of buying property in Spain?",
    answer: "Property purchases in Spain involve several taxes and fees that buyers should understand. Transfer tax (ITP) is typically 8-10% of purchase price for resale properties, while new properties incur VAT (IVA) at 10% plus stamp duty at 1.2%. Legal fees, notary costs, and registration fees add approximately 2-3% to total costs. Annual property taxes (IBI) are relatively low, usually 0.4-1.1% of cadastral value. Non-resident owners pay income tax at 24% on deemed rental income, even if not rented. Capital gains tax applies when selling, with rates varying based on residency status and ownership duration. EU tax treaties may provide relief from double taxation. Our tax advisors provide comprehensive guidance to optimize your tax position and ensure compliance with both Spanish and home country obligations.",
    category: "legal",
    priority: 7,
    featured: false,
    votes: { helpful: 36, unhelpful: 3 }
  },
  {
    id: "viewing-arrangements",
    question: "How do property viewings work?",
    answer: "We offer flexible viewing arrangements to accommodate international buyers. Virtual tours and video calls provide initial property overviews from anywhere in the world. In-person viewings can be scheduled individually or as part of comprehensive property tours covering multiple locations. Our viewing coordinators arrange transportation, accommodation recommendations, and structured itineraries maximizing your time. Weekend and evening viewings are available to suit your schedule. We provide detailed property information packages before viewings including floor plans, legal documentation, and area information. Follow-up support includes additional viewings, technical inspections, and answers to any questions. Our goal is to make the viewing process efficient and informative, helping you make confident decisions about your property investment.",
    category: "process",
    priority: 8,
    featured: false,
    votes: { helpful: 22, unhelpful: 1 }
  }
];

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, 'helpful' | 'unhelpful' | null>>({});

  const filteredFAQs = useMemo(() => {
    return allFAQs.filter(faq => {
      const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => a.priority - b.priority);
  }, [searchTerm, selectedCategory]);

  const handleVote = (faqId: string, voteType: 'helpful' | 'unhelpful') => {
    setHelpfulVotes(prev => ({
      ...prev,
      [faqId]: prev[faqId] === voteType ? null : voteType
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <Section padding="xl" background="gradient" containerSize="lg">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Find comprehensive answers to all your questions about property investment, legal processes, and living in Costa del Sol.
          </p>
          
          {/* Enhanced Search */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-6 h-6" />
            <Input
              type="text"
              placeholder="Search all frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:border-white/40 text-lg"
            />
          </div>
        </div>
      </Section>

      {/* Main Content */}
      <Section padding="xl" containerSize="xl">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    const isActive = selectedCategory === category.id;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                          isActive 
                            ? 'bg-primary text-primary-foreground shadow-sm' 
                            : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <IconComponent className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm font-medium">{category.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* FAQ Stats */}
                <div className="mt-8 pt-6 border-t">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-3">Quick Stats</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total FAQs</span>
                      <span className="font-medium">{allFAQs.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Categories</span>
                      <span className="font-medium">{categories.length - 1}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Results</span>
                      <span className="font-medium">{filteredFAQs.length}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            {filteredFAQs.length > 0 ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {selectedCategory === "all" ? "All Questions" : categories.find(c => c.id === selectedCategory)?.name}
                  </h2>
                  <span className="text-muted-foreground">
                    {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFAQs.map((faq) => {
                    const categoryIcon = categories.find(c => c.id === faq.category)?.icon || FileText;
                    const IconComponent = categoryIcon;
                    const userVote = helpfulVotes[faq.id];

                    return (
                      <AccordionItem
                        key={faq.id}
                        value={faq.id}
                        className="border border-border/50 rounded-xl bg-card hover:shadow-elegant transition-all duration-300 overflow-hidden"
                      >
                        <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                          <div className="flex items-start gap-4 text-left w-full">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                              <IconComponent className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 text-left">
                                {faq.question}
                              </h3>
                              {faq.featured && (
                                <span className="inline-block mt-2 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                  Popular
                                </span>
                              )}
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                          <div className="ml-14 space-y-4">
                            <p className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                            
                            {/* Voting System */}
                            <div className="flex items-center justify-between pt-4 border-t">
                              <div className="flex items-center gap-4">
                                <span className="text-sm text-muted-foreground">Was this helpful?</span>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleVote(faq.id, 'helpful')}
                                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                                      userVote === 'helpful'
                                        ? 'bg-green-100 text-green-700 border border-green-200'
                                        : 'hover:bg-muted text-muted-foreground'
                                    }`}
                                  >
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>{faq.votes.helpful}</span>
                                  </button>
                                  <button
                                    onClick={() => handleVote(faq.id, 'unhelpful')}
                                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                                      userVote === 'unhelpful'
                                        ? 'bg-red-100 text-red-700 border border-red-200'
                                        : 'hover:bg-muted text-muted-foreground'
                                    }`}
                                  >
                                    <ThumbsDown className="w-4 h-4" />
                                    <span>{faq.votes.unhelpful}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">No results found</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  We couldn't find any FAQs matching your search. Try adjusting your search terms or browse by category.
                </p>
                <Button onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Contact CTA */}
      <Section background="muted" padding="lg">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our expert team is here to provide personalized answers to all your property investment questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              Contact Our Experts
              <ChevronDown className="ml-2 w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
            </Button>
            <Button variant="outline" size="lg">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
