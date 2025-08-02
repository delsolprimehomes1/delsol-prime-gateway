import { ReactNode } from 'react';
import { AIOptimizedContent, VoiceSearchFAQ, FeaturedSnippet, EntityContent, StructuredContent } from './AIOptimizedContent';

interface EnhancedAIContentProps {
  children: ReactNode;
  pageType: 'homepage' | 'location' | 'property' | 'blog' | 'faq';
  primaryTopic: string;
  entities: Array<{
    name: string;
    type: string;
    description?: string;
    url?: string;
  }>;
  voiceQueries?: string[];
  className?: string;
}

export function EnhancedAIContent({
  children,
  pageType,
  primaryTopic,
  entities,
  voiceQueries = [],
  className = ""
}: EnhancedAIContentProps) {
  const getEntityType = () => {
    switch (pageType) {
      case 'homepage': return 'Organization';
      case 'location': return 'Place';
      case 'property': return 'Product';
      case 'blog': return 'Article';
      default: return 'Thing';
    }
  };

  const getOptimizationContext = () => {
    return `${pageType}-${primaryTopic}-costa-del-sol-real-estate`;
  };

  return (
    <AIOptimizedContent
      entityType={getEntityType() as any}
      keywords={[primaryTopic, 'Costa Del Sol', 'real estate', 'property']}
      context={getOptimizationContext()}
      className={className}
    >
      <EntityContent entities={entities}>
        {children}
      </EntityContent>
      
      {/* Hidden voice search optimization markers */}
      <div className="sr-only" aria-hidden="true">
        {voiceQueries.map((query, index) => (
          <span key={index} data-voice-query={query.toLowerCase()}>
            {query}
          </span>
        ))}
        <span data-optimization-type="aeo-geo-veo-aio" />
        <span data-primary-topic={primaryTopic} />
        <span data-location="costa-del-sol-spain" />
      </div>
    </AIOptimizedContent>
  );
}

// Enhanced FAQ component with voice and AI optimization
interface AIOptimizedFAQProps {
  question: string;
  answer: string;
  conversationalAnswer?: string;
  category: string;
  keywords: string[];
  voiceQueries?: string[];
  relatedQuestions?: string[];
  confidenceScore?: number;
}

export function AIOptimizedFAQ({
  question,
  answer,
  conversationalAnswer,
  category,
  keywords,
  voiceQueries = [],
  relatedQuestions = [],
  confidenceScore = 75
}: AIOptimizedFAQProps) {
  const effectiveAnswer = conversationalAnswer || answer;
  
  return (
    <VoiceSearchFAQ
      question={question}
      answer={effectiveAnswer}
      category={category}
      relatedQuestions={relatedQuestions}
    >
      {/* Enhanced metadata for AI consumption */}
      <div className="sr-only">
        <span data-keywords={keywords.join(', ')} />
        <span data-voice-queries={voiceQueries.join(', ')} />
        <span data-confidence-score={confidenceScore} />
        <span data-optimization="aeo-featured-snippet" />
      </div>
    </VoiceSearchFAQ>
  );
}

// Property-specific AI optimization component
interface PropertyAIContentProps {
  propertyName: string;
  location: string;
  priceRange: string;
  propertyType: string;
  features: string[];
  children: ReactNode;
}

export function PropertyAIContent({
  propertyName,
  location,
  priceRange,
  propertyType,
  features,
  children
}: PropertyAIContentProps) {
  const entities = [
    {
      name: propertyName,
      type: 'Product',
      description: `${propertyType} in ${location}, Costa Del Sol`,
      url: window.location.href
    },
    {
      name: location,
      type: 'Place',
      description: `Premium location in Costa Del Sol, Spain`
    },
    {
      name: 'DelSolPrimeHomes',
      type: 'Organization',
      description: 'Premier luxury real estate agency in Costa Del Sol'
    }
  ];

  const voiceQueries = [
    `How much does a ${propertyType} cost in ${location}?`,
    `What are the best ${propertyType} properties in ${location}?`,
    `Properties for sale in ${location} Costa Del Sol`,
    `${propertyType} features in ${location}`
  ];

  return (
    <EnhancedAIContent
      pageType="property"
      primaryTopic={`${propertyType} ${location}`}
      entities={entities}
      voiceQueries={voiceQueries}
    >
      <StructuredContent
        title={`${propertyName} - ${propertyType} in ${location}`}
        summary={`Premium ${propertyType} property in ${location}, Costa del Sol. ${priceRange}.`}
        mainPoints={features}
        keyFacts={{
          'Location': location,
          'Property Type': propertyType,
          'Price Range': priceRange,
          'Region': 'Costa Del Sol, Spain',
          'Agency': 'DelSolPrimeHomes'
        }}
      >
        {children}
      </StructuredContent>
    </EnhancedAIContent>
  );
}

// Location-specific AI optimization component
interface LocationAIContentProps {
  locationName: string;
  propertyCount: number;
  averagePrice: string;
  highlights: string[];
  children: ReactNode;
}

export function LocationAIContent({
  locationName,
  propertyCount,
  averagePrice,
  highlights,
  children
}: LocationAIContentProps) {
  const entities = [
    {
      name: locationName,
      type: 'Place',
      description: `Premium location in Costa Del Sol, Spain with ${propertyCount}+ properties available`,
      url: window.location.href
    },
    {
      name: 'Costa Del Sol',
      type: 'Place',
      description: 'Premier Mediterranean coastal region in southern Spain'
    }
  ];

  const voiceQueries = [
    `What is ${locationName} like for property investment?`,
    `Properties for sale in ${locationName} Costa Del Sol`,
    `Cost of living in ${locationName} Spain`,
    `Best areas to buy property in ${locationName}`,
    `${locationName} real estate market prices`
  ];

  return (
    <EnhancedAIContent
      pageType="location"
      primaryTopic={`${locationName} Properties`}
      entities={entities}
      voiceQueries={voiceQueries}
    >
      <StructuredContent
        title={`${locationName} - Premium Costa Del Sol Location`}
        summary={`Discover ${locationName}, one of Costa Del Sol's most desirable locations with ${propertyCount}+ premium properties available. Average price: ${averagePrice}.`}
        mainPoints={highlights}
        keyFacts={{
          'Location': `${locationName}, Costa Del Sol`,
          'Available Properties': `${propertyCount}+`,
          'Average Price': averagePrice,
          'Region': 'Andalusia, Spain',
          'Climate': '320+ sunny days per year'
        }}
      >
        {children}
      </StructuredContent>
    </EnhancedAIContent>
  );
}

// Export FeaturedSnippet so it can be imported by other components
export { FeaturedSnippet };
