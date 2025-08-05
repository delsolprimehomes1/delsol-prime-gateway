import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calculator, TrendingUp, Building, Home, Clock, Euro, CheckCircle, XCircle, BookOpen, Download, Share2, MessageCircle, ArrowRight, BarChart3 } from 'lucide-react';
import BreadcrumbNavigation from '@/components/seo/BreadcrumbNavigation';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { InteractiveCard } from '@/components/ui/InteractiveCard';
import { StaggeredContainer } from '@/components/ui/StaggeredContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import AdvancedROICalculator from '@/components/tools/AdvancedROICalculator';
import { generateArticleSchema } from '@/utils/seo/structuredData';

interface StrategyComparison {
  feature: string;
  fixFlip: string;
  buyHold: string;
  fixFlipScore: number;
  buyHoldScore: number;
}

interface FAQ {
  question: string;
  answer: string;
  category: 'fix-flip' | 'buy-hold' | 'general';
}

const FixFlipBuyHoldGuide = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<'fix-flip' | 'buy-hold' | 'comparison'>('comparison');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const breadcrumbItems = [
    { name: 'Costa Del Sol Guides', href: '/guides' },
    { name: 'Fix & Flip vs Buy & Hold', href: '/guide/fix-flip-vs-buy-hold' }
  ];

  const strategyComparisons: StrategyComparison[] = [
    {
      feature: "Investment Timeline",
      fixFlip: "6-18 months",
      buyHold: "5-20+ years",
      fixFlipScore: 8,
      buyHoldScore: 6
    },
    {
      feature: "Initial Capital Required",
      fixFlip: "€100k - €500k+",
      buyHold: "€50k - €200k",
      fixFlipScore: 4,
      buyHoldScore: 8
    },
    {
      feature: "Active Management",
      fixFlip: "High involvement",
      buyHold: "Low to moderate",
      fixFlipScore: 3,
      buyHoldScore: 9
    },
    {
      feature: "Profit Potential",
      fixFlip: "€50k - €200k per project",
      buyHold: "€5k - €15k annually",
      fixFlipScore: 9,
      buyHoldScore: 6
    },
    {
      feature: "Risk Level",
      fixFlip: "High",
      buyHold: "Moderate",
      fixFlipScore: 4,
      buyHoldScore: 7
    },
    {
      feature: "Market Dependence",
      fixFlip: "Very high",
      buyHold: "Moderate",
      fixFlipScore: 3,
      buyHoldScore: 7
    },
    {
      feature: "Tax Benefits",
      fixFlip: "Business expenses",
      buyHold: "Depreciation + rental deductions",
      fixFlipScore: 6,
      buyHoldScore: 8
    },
    {
      feature: "Passive Income",
      fixFlip: "None",
      buyHold: "Monthly rental income",
      fixFlipScore: 1,
      buyHoldScore: 10
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "What are the main differences between fix & flip and buy & hold strategies in Costa Del Sol?",
      answer: "Fix & flip involves purchasing undervalued properties, renovating them, and selling for profit within 6-18 months. Buy & hold focuses on acquiring rental properties for long-term appreciation and monthly income. In Costa Del Sol, fix & flip targets tourist areas like Marbella for quick sales, while buy & hold works well in established neighborhoods with rental demand.",
      category: "general"
    },
    {
      question: "How much capital do I need to start fix & flip properties in Marbella?",
      answer: "For fix & flip in Marbella, you typically need €100,000-€500,000+ depending on the property. This includes purchase price (often 70-80% of ARV), renovation costs (€200-€800 per m²), holding costs, and a 20-30% contingency buffer. Prime locations like Golden Mile require higher capital but offer greater profit potential.",
      category: "fix-flip"
    },
    {
      question: "What rental yields can I expect from buy & hold properties in Costa Del Sol?",
      answer: "Buy & hold properties in Costa Del Sol typically yield 4-7% annually. Marbella averages 4-5%, Estepona 5-6%, and Fuengirola/Benalmádena can reach 6-7%. Vacation rentals often achieve higher yields but require more management. Long-term rentals provide stable income with less seasonality.",
      category: "buy-hold"
    },
    {
      question: "What are the tax implications for each strategy in Spain?",
      answer: "Fix & flip profits are taxed as business income (up to 47% for non-residents). Buy & hold rental income is taxed at 24% for non-residents after deductions. Spanish residents get progressive rates. Buy & hold offers better tax benefits through depreciation and expense deductions. Consider forming a Spanish company for multiple transactions.",
      category: "general"
    },
    {
      question: "Which areas in Costa Del Sol are best for fix & flip projects?",
      answer: "Best fix & flip areas: Marbella Old Town (high-end buyers), Estepona center (emerging market), Fuengirola beachfront (international demand). Look for properties 20-30% below market value, good bones, and desirable locations. Avoid rural areas and properties with structural issues.",
      category: "fix-flip"
    },
    {
      question: "How do I find reliable contractors for renovation projects?",
      answer: "Source contractors through local property management companies, architect recommendations, and established expat networks. Always verify licenses, insurance, and recent project references. Budget 20-30% extra for delays and cost overruns. Consider hiring a project manager for complex renovations.",
      category: "fix-flip"
    },
    {
      question: "What financing options are available for investment properties?",
      answer: "Spanish banks offer 60-70% LTV for non-residents on investment properties at 3.5-5% interest. Consider private lenders for fix & flip (higher rates but faster approval). Cash purchases are common for fix & flip. Buy & hold works well with traditional mortgages for leveraged returns.",
      category: "general"
    },
    {
      question: "How long does the buying process take in Spain?",
      answer: "Spanish property purchases typically take 6-12 weeks. This includes property inspection, mortgage approval (if needed), legal checks, and notary signing. Fix & flip requires faster closings - consider cash offers or pre-approved financing. Factor timing into your investment timeline.",
      category: "general"
    },
    {
      question: "What are the ongoing costs for rental properties?",
      answer: "Annual costs for buy & hold properties include: property tax (0.4-1.1%), community fees (€50-€300/month), insurance (€300-€800), maintenance (1-2% of value), management fees (8-12% if using agents), and income tax on rental profits. Budget 25-35% of rental income for expenses.",
      category: "buy-hold"
    },
    {
      question: "Should I focus on vacation rentals or long-term rentals?",
      answer: "Vacation rentals yield higher income (€80-€300/night) but have seasonal volatility and higher management costs. Long-term rentals provide stable income (€800-€2,500/month) with lower management. Consider your involvement level, location, and local regulations when choosing.",
      category: "buy-hold"
    }
  ];

  const articleSchema = generateArticleSchema({
    headline: "Fix & Flip vs Buy & Hold: Complete Costa Del Sol Investment Guide",
    description: "Comprehensive comparison of fix & flip and buy & hold real estate strategies for Costa Del Sol properties. Includes ROI analysis, market insights, and expert recommendations.",
    author: "DelSolPrimeHomes Investment Team",
    datePublished: "2024-01-15",
    image: "/assets/og-delsolprimehomes-main.jpg",
    url: "/guide/fix-flip-vs-buy-hold"
  });

  return (
    <>
      <Helmet>
        <title>Fix & Flip vs Buy & Hold: Costa Del Sol Investment Guide | DelSolPrimeHomes</title>
        <meta name="description" content="Complete guide comparing fix & flip and buy & hold strategies for Costa Del Sol real estate investment. ROI analysis, market insights, and expert recommendations for Marbella, Estepona, and surrounding areas." />
        <meta name="keywords" content="fix flip vs buy hold, Costa Del Sol investment, Marbella property investment, real estate strategy Spain, property flipping Costa Del Sol, rental property investment" />
        <link rel="canonical" href="https://delsolprimehomes.com/guide/fix-flip-vs-buy-hold" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Fix & Flip vs Buy & Hold: Costa Del Sol Investment Guide" />
        <meta property="og:description" content="Expert comparison of real estate investment strategies for Costa Del Sol properties with ROI analysis and market insights." />
        <meta property="og:image" content="https://delsolprimehomes.com/assets/og-delsolprimehomes-main.jpg" />
        <meta property="og:url" content="https://delsolprimehomes.com/guide/fix-flip-vs-buy-hold" />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fix & Flip vs Buy & Hold: Costa Del Sol Investment Guide" />
        <meta name="twitter:description" content="Expert comparison of real estate investment strategies for Costa Del Sol properties with ROI analysis and market insights." />
        <meta name="twitter:image" content="https://delsolprimehomes.com/assets/og-delsolprimehomes-main.jpg" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="bg-muted/30 py-4">
          <div className="container mx-auto px-4">
            <BreadcrumbNavigation items={breadcrumbItems} />
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-gradient-hero overflow-hidden">
          <div className="absolute inset-0 bg-gradient-overlay" />
          <div className="container mx-auto px-4 relative z-10">
            <AnimatedElement animation="fade-in-up" className="text-center space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium">
                <BookOpen className="w-4 h-4 mr-2" />
                INVESTMENT STRATEGY GUIDE
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground max-w-4xl mx-auto">
                Fix & Flip vs Buy & Hold
                <span className="block text-3xl lg:text-5xl mt-2 text-primary-glow">
                  Costa Del Sol Investment Guide
                </span>
              </h1>
              
              <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
                Make informed investment decisions with our comprehensive comparison of real estate strategies for Marbella, Estepona, and surrounding Costa Del Sol markets.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary-glow">
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Returns
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Download className="w-5 h-5 mr-2" />
                  Download Guide
                </Button>
              </div>
            </AnimatedElement>
          </div>
        </section>

        {/* Short Answer Section */}
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4">
            <AnimatedElement animation="fade-in-up">
              <Card className="max-w-4xl mx-auto border-primary/20">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4 text-center">Quick Answer</h2>
                  <p className="text-lg text-muted-foreground text-center">
                    <strong>Fix & flip</strong> suits active investors seeking quick profits (6-18 months) with higher capital and risk. 
                    <strong> Buy & hold</strong> works for passive income seekers wanting long-term wealth building with lower initial investment and steady cash flow.
                  </p>
                </CardContent>
              </Card>
            </AnimatedElement>
          </div>
        </section>

        {/* Strategy Selector */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <AnimatedElement animation="fade-in-up">
              <Tabs value={selectedStrategy} onValueChange={(value: any) => setSelectedStrategy(value)} className="max-w-6xl mx-auto">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="fix-flip" className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Fix & Flip
                  </TabsTrigger>
                  <TabsTrigger value="comparison" className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Comparison
                  </TabsTrigger>
                  <TabsTrigger value="buy-hold" className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Buy & Hold
                  </TabsTrigger>
                </TabsList>

                {/* Fix & Flip Content */}
                <TabsContent value="fix-flip" className="mt-8">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <InteractiveCard variant="luxury" hover="lift" className="p-6">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <div className="p-3 rounded-full bg-primary/10">
                            <Building className="w-6 h-6 text-primary" />
                          </div>
                          Fix & Flip Strategy
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                          Short-term investment strategy focused on purchasing undervalued properties, renovating them, and selling for profit within 6-18 months.
                        </p>
                        
                        <div className="space-y-3">
                          <h4 className="font-semibold text-green-600 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Advantages
                          </h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Quick profit realization (6-18 months)</li>
                            <li>• High profit potential (20-40% returns)</li>
                            <li>• No ongoing tenant management</li>
                            <li>• Active control over investment outcome</li>
                            <li>• Market timing flexibility</li>
                          </ul>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-red-600 flex items-center gap-2">
                            <XCircle className="w-4 h-4" />
                            Disadvantages
                          </h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• High capital requirements</li>
                            <li>• Active management intensive</li>
                            <li>• Market dependent risks</li>
                            <li>• No passive income during project</li>
                            <li>• Higher tax rates on profits</li>
                          </ul>
                        </div>

                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h5 className="font-semibold mb-2">Best For:</h5>
                          <p className="text-sm text-muted-foreground">
                            Experienced investors with construction knowledge, significant capital, and time to actively manage projects. Ideal for those seeking quick returns and comfortable with higher risks.
                          </p>
                        </div>
                      </CardContent>
                    </InteractiveCard>

                    <InteractiveCard variant="luxury" hover="lift" className="p-6">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <Clock className="w-6 h-6 text-secondary" />
                          Typical Timeline
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          {[
                            { phase: "Property Search & Analysis", duration: "1-3 months", description: "Finding undervalued properties with renovation potential" },
                            { phase: "Purchase & Financing", duration: "1-2 months", description: "Negotiation, due diligence, and closing process" },
                            { phase: "Renovation & Construction", duration: "3-6 months", description: "Property improvements and value additions" },
                            { phase: "Marketing & Sale", duration: "1-6 months", description: "Listing, showings, and closing with buyer" }
                          ].map((item, index) => (
                            <div key={index} className="flex gap-4">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold">{item.phase}</h4>
                                <p className="text-sm text-secondary font-medium">{item.duration}</p>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </InteractiveCard>
                  </div>
                </TabsContent>

                {/* Comparison Content */}
                <TabsContent value="comparison" className="mt-8">
                  <InteractiveCard variant="luxury" hover="lift" className="p-6">
                    <CardHeader>
                      <CardTitle className="text-center">Strategy Comparison Matrix</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-4 font-semibold">Feature</th>
                              <th className="text-center py-4 font-semibold text-primary">Fix & Flip</th>
                              <th className="text-center py-4 font-semibold text-secondary">Buy & Hold</th>
                              <th className="text-center py-4 font-semibold">Winner</th>
                            </tr>
                          </thead>
                          <tbody>
                            {strategyComparisons.map((item, index) => (
                              <tr key={index} className="border-b border-border hover:bg-muted/30 transition-colors">
                                <td className="py-4 font-medium">{item.feature}</td>
                                <td className="py-4 text-center text-sm">{item.fixFlip}</td>
                                <td className="py-4 text-center text-sm">{item.buyHold}</td>
                                <td className="py-4 text-center">
                                  {item.fixFlipScore > item.buyHoldScore ? (
                                    <Badge variant="outline" className="border-primary text-primary">Fix & Flip</Badge>
                                  ) : item.buyHoldScore > item.fixFlipScore ? (
                                    <Badge variant="outline" className="border-secondary text-secondary">Buy & Hold</Badge>
                                  ) : (
                                    <Badge variant="outline">Tie</Badge>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </InteractiveCard>
                </TabsContent>

                {/* Buy & Hold Content */}
                <TabsContent value="buy-hold" className="mt-8">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <InteractiveCard variant="luxury" hover="lift" className="p-6">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <div className="p-3 rounded-full bg-secondary/10">
                            <Home className="w-6 h-6 text-secondary" />
                          </div>
                          Buy & Hold Strategy
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                          Long-term investment strategy focused on acquiring rental properties for monthly cash flow and appreciation over 5-20+ years.
                        </p>
                        
                        <div className="space-y-3">
                          <h4 className="font-semibold text-green-600 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Advantages
                          </h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Passive monthly income</li>
                            <li>• Long-term appreciation benefits</li>
                            <li>• Tax advantages and deductions</li>
                            <li>• Lower initial capital requirements</li>
                            <li>• Wealth building through leverage</li>
                          </ul>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-red-600 flex items-center gap-2">
                            <XCircle className="w-4 h-4" />
                            Disadvantages
                          </h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Ongoing tenant management</li>
                            <li>• Maintenance and repair costs</li>
                            <li>• Vacancy periods</li>
                            <li>• Market cycles affect returns</li>
                            <li>• Less liquidity than stocks</li>
                          </ul>
                        </div>

                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h5 className="font-semibold mb-2">Best For:</h5>
                          <p className="text-sm text-muted-foreground">
                            Investors seeking passive income, long-term wealth building, and portfolio diversification. Suitable for those with modest capital who prefer steady returns over quick profits.
                          </p>
                        </div>
                      </CardContent>
                    </InteractiveCard>

                    <InteractiveCard variant="luxury" hover="lift" className="p-6">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <Euro className="w-6 h-6 text-green-600" />
                          Cash Flow Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                            <h4 className="font-semibold text-green-800 dark:text-green-400 mb-2">Monthly Income</h4>
                            <ul className="text-sm space-y-1 text-green-700 dark:text-green-300">
                              <li>• Long-term rental: €800-€2,500/month</li>
                              <li>• Vacation rental: €2,000-€8,000/month (seasonal)</li>
                              <li>• Corporate housing: €1,500-€4,000/month</li>
                            </ul>
                          </div>

                          <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                            <h4 className="font-semibold text-red-800 dark:text-red-400 mb-2">Monthly Expenses</h4>
                            <ul className="text-sm space-y-1 text-red-700 dark:text-red-300">
                              <li>• Mortgage payment: €1,000-€3,000</li>
                              <li>• Property management: 8-12% of rent</li>
                              <li>• Insurance: €25-€70/month</li>
                              <li>• Maintenance reserve: 1-2% of value annually</li>
                            </ul>
                          </div>

                          <div className="bg-primary/10 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Net Cash Flow</h4>
                            <p className="text-sm text-muted-foreground">
                              Typical net cash flow ranges from €200-€800/month after all expenses. Properties in prime locations with strong rental demand achieve higher cash flows.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </InteractiveCard>
                  </div>
                </TabsContent>
              </Tabs>
            </AnimatedElement>
          </div>
        </section>

        {/* ROI Calculator Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedElement animation="fade-in-up" className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Calculate Your Investment Returns</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Use our advanced calculator to analyze potential returns for both fix & flip and buy & hold strategies in Costa Del Sol.
              </p>
            </AnimatedElement>
            
            <AdvancedROICalculator />
          </div>
        </section>

        {/* Market Analysis Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <AnimatedElement animation="fade-in-up" className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Costa Del Sol Market Insights</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Location-specific analysis for the top investment areas along the Costa Del Sol coastline.
              </p>
            </AnimatedElement>

            <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  location: "Marbella",
                  fixFlipROI: "25-40%",
                  buyHoldYield: "4-5%",
                  avgPrice: "€650k",
                  bestFor: "Luxury fix & flip, premium rentals",
                  highlights: ["Golden Mile premium market", "High-end international buyers", "Year-round rental demand"]
                },
                {
                  location: "Estepona",
                  fixFlipROI: "20-35%",
                  buyHoldYield: "5-6%",
                  avgPrice: "€380k",
                  bestFor: "Balanced strategy, emerging market",
                  highlights: ["Growing expat community", "New developments", "Strong appreciation potential"]
                },
                {
                  location: "Fuengirola",
                  fixFlipROI: "15-30%",
                  buyHoldYield: "6-7%",
                  avgPrice: "€280k",
                  bestFor: "Entry-level buy & hold",
                  highlights: ["Excellent transport links", "Established rental market", "Good value for money"]
                }
              ].map((area, index) => (
                <InteractiveCard key={index} variant="luxury" hover="lift" className="p-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      {area.location}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">Fix & Flip ROI</p>
                        <p className="font-bold text-primary">{area.fixFlipROI}</p>
                      </div>
                      <div className="bg-secondary/10 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">Buy & Hold Yield</p>
                        <p className="font-bold text-secondary">{area.buyHoldYield}</p>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Average Price</p>
                      <p className="text-xl font-bold">{area.avgPrice}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">Best Strategy:</p>
                      <p className="text-sm text-muted-foreground">{area.bestFor}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">Key Highlights:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {area.highlights.map((highlight, i) => (
                          <li key={i}>• {highlight}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </InteractiveCard>
              ))}
            </StaggeredContainer>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedElement animation="fade-in-up" className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Expert answers to common questions about fix & flip and buy & hold strategies in Costa Del Sol.
              </p>
            </AnimatedElement>

            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <Collapsible 
                  key={index} 
                  open={expandedFAQ === index} 
                  onOpenChange={(open) => setExpandedFAQ(open ? index : null)}
                >
                  <CollapsibleTrigger asChild>
                    <InteractiveCard 
                      variant="default" 
                      hover="lift" 
                      className="p-6 cursor-pointer transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-left pr-4">{faq.question}</h3>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={
                              faq.category === 'fix-flip' ? 'border-primary text-primary' :
                              faq.category === 'buy-hold' ? 'border-secondary text-secondary' :
                              'border-muted-foreground text-muted-foreground'
                            }
                          >
                            {faq.category === 'fix-flip' ? 'Fix & Flip' :
                             faq.category === 'buy-hold' ? 'Buy & Hold' : 'General'}
                          </Badge>
                          <ArrowRight 
                            className={`w-5 h-5 text-muted-foreground transition-transform ${
                              expandedFAQ === index ? 'rotate-90' : ''
                            }`} 
                          />
                        </div>
                      </div>
                    </InteractiveCard>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <Card className="mt-2 border-t-0 rounded-t-none">
                      <CardContent className="p-6 pt-0">
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-premium text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <AnimatedElement animation="fade-in-up" className="space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold">Ready to Start Your Investment Journey?</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Get personalized guidance from our Costa Del Sol investment experts and access exclusive market opportunities.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Schedule Consultation
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Download className="w-5 h-5 mr-2" />
                  Download Full Guide
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share Guide
                </Button>
              </div>
            </AnimatedElement>
          </div>
        </section>
      </div>
    </>
  );
};

export default FixFlipBuyHoldGuide;