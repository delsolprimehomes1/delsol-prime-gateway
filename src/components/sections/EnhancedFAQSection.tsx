
import { MessageCircle, Search, Mic, Brain } from "lucide-react";
import Container from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedElement } from "@/components/ui/AnimatedElement";
import { useVoiceOptimizedFAQ } from "@/hooks/useVoiceOptimizedFAQ";
import { AIOptimizedFAQ, FeaturedSnippet } from "@/components/seo/EnhancedAIContent";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function EnhancedFAQSection() {
  const { 
    voiceOptimizedFAQs, 
    getFeaturedSnippetFAQs, 
    categoryNames, 
    selectedCategory, 
    setSelectedCategory 
  } = useVoiceOptimizedFAQ();

  const featuredFAQs = getFeaturedSnippetFAQs(3);
  const displayFAQs = voiceOptimizedFAQs.slice(0, 12);

  return (
    <section className="py-20 bg-background">
      <Container>
        {/* Header with AI optimization indicators */}
        <AnimatedElement animation="fade-in-up" className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="outline" className="bg-primary/10">
              <Brain className="w-3 h-3 mr-1" />
              AI Optimized
            </Badge>
            <Badge variant="outline" className="bg-secondary/10">
              <Mic className="w-3 h-3 mr-1" />
              Voice Search Ready
            </Badge>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Get instant answers to your Costa del Sol property questions. Optimized for voice search, 
            AI assistants, and traditional search engines.
          </p>
        </AnimatedElement>

        {/* Featured Snippets Section */}
        <AnimatedElement animation="fade-in-up" delay={150} className="mb-12">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Search className="w-6 h-6 text-primary" />
            Quick Answers
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredFAQs.map((faq, index) => (
              <AnimatedElement key={faq.id} animation="fade-in-up" delay={index * 100}>
                <FeaturedSnippet
                  title={faq.question}
                  content={faq.conversationalAnswer}
                  type="paragraph"
                  source="DelSolPrimeHomes Expert Team"
                />
              </AnimatedElement>
            ))}
          </div>
        </AnimatedElement>

        {/* Category Filter */}
        <AnimatedElement animation="fade-in-up" delay={300} className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(categoryNames).map(([key, name]) => (
              <MagneticButton
                key={key}
                variant={selectedCategory === key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(key)}
                className="text-sm"
              >
                {name}
              </MagneticButton>
            ))}
          </div>
        </AnimatedElement>

        {/* Enhanced FAQ List */}
        <AnimatedElement animation="fade-in-up" delay={450}>
          <Accordion type="single" collapsible className="space-y-4">
            {displayFAQs.map((faq, index) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id}
                className="border border-border/50 rounded-lg px-6 hover:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left py-6 hover:no-underline">
                  <div className="flex items-start justify-between w-full pr-4">
                    <div>
                      <h4 className="font-semibold text-lg mb-2">{faq.question}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="secondary" className="text-xs">
                          {faq.category}
                        </Badge>
                        {faq.responseLength === 'short' && (
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                            <Mic className="w-3 h-3 mr-1" />
                            Voice Ready
                          </Badge>
                        )}
                        <span className="text-xs">
                          Confidence: {faq.confidenceScore}%
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="pb-6">
                  <AIOptimizedFAQ
                    question={faq.question}
                    answer={faq.answer}
                    conversationalAnswer={faq.conversationalAnswer}
                    category={faq.category}
                    keywords={faq.keywords}
                    voiceQueries={faq.voiceQueries}
                    relatedQuestions={faq.relatedTopics}
                    confidenceScore={faq.confidenceScore}
                  />
                  
                  {faq.voiceSearchKeywords.length > 0 && (
                    <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm font-medium mb-2">Voice Search Optimized For:</p>
                      <div className="flex flex-wrap gap-1">
                        {faq.voiceSearchKeywords.slice(0, 5).map((keyword, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedElement>

        {/* Voice Search Optimization Notice */}
        <AnimatedElement animation="fade-in-up" delay={600} className="mt-12 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MessageCircle className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold">Ask Our AI Assistant</h3>
            </div>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our content is optimized for voice assistants, AI search engines, and chatbots. 
              Try asking questions naturally about Costa del Sol properties.
            </p>
            <MagneticButton size="lg">
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Our Expert Team
            </MagneticButton>
          </div>
        </AnimatedElement>
      </Container>
    </section>
  );
}
