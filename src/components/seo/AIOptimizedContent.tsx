
// AI Engine Optimization (AEO) and Generative Engine Optimization (GEO) components
import { ReactNode } from 'react';

interface AIOptimizedContentProps {
  children: ReactNode;
  entityType?: 'Organization' | 'Person' | 'Place' | 'Product' | 'Service';
  keywords?: string[];
  context?: string;
  className?: string;
}

// Component for AI-optimized content structure
export function AIOptimizedContent({ 
  children, 
  entityType = 'Organization',
  keywords = [],
  context,
  className = ""
}: AIOptimizedContentProps) {
  return (
    <div 
      className={className}
      data-entity-type={entityType}
      data-keywords={keywords.join(', ')}
      data-context={context}
      itemScope
      itemType={`https://schema.org/${entityType}`}
    >
      {children}
    </div>
  );
}

// Voice search optimized FAQ component
interface VoiceSearchFAQProps {
  question: string;
  answer: string;
  category: string;
  relatedQuestions?: string[];
}

export function VoiceSearchFAQ({ question, answer, category, relatedQuestions = [] }: VoiceSearchFAQProps) {
  return (
    <div 
      itemScope 
      itemType="https://schema.org/Question"
      data-voice-query={question.toLowerCase()}
      data-category={category}
    >
      <h3 itemProp="name" className="font-semibold mb-2">{question}</h3>
      <div 
        itemScope 
        itemType="https://schema.org/Answer"
        itemProp="acceptedAnswer"
      >
        <p itemProp="text" className="text-muted-foreground">{answer}</p>
      </div>
      {relatedQuestions.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Related Questions:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {relatedQuestions.map((q, index) => (
              <li key={index}>• {q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Featured snippet optimized content
interface FeaturedSnippetProps {
  title: string;
  content: string;
  type: 'definition' | 'list' | 'table' | 'paragraph';
  source?: string;
}

export function FeaturedSnippet({ title, content, type, source }: FeaturedSnippetProps) {
  const renderContent = () => {
    switch (type) {
      case 'list':
        const items = content.split('\n').filter(item => item.trim());
        return (
          <ol className="list-decimal list-inside space-y-1">
            {items.map((item, index) => (
              <li key={index} className="text-muted-foreground">{item}</li>
            ))}
          </ol>
        );
      case 'definition':
        return <p className="text-muted-foreground font-medium">{content}</p>;
      default:
        return <p className="text-muted-foreground">{content}</p>;
    }
  };

  return (
    <div 
      className="border border-border/50 rounded-lg p-4 bg-background/60 backdrop-blur-sm"
      data-snippet-type={type}
      itemScope
      itemType="https://schema.org/DefinedTerm"
    >
      <h3 itemProp="name" className="font-semibold mb-3 text-foreground">{title}</h3>
      <div itemProp="description">
        {renderContent()}
      </div>
      {source && (
        <div className="mt-3 text-xs text-muted-foreground">
          Source: {source}
        </div>
      )}
    </div>
  );
}

// Entity-rich content for knowledge graphs
interface EntityContentProps {
  entities: Array<{
    name: string;
    type: string;
    description?: string;
    url?: string;
  }>;
  children: ReactNode;
}

export function EntityContent({ entities, children }: EntityContentProps) {
  return (
    <div className="relative">
      {/* Hidden entity markup for AI consumption */}
      <div className="sr-only">
        {entities.map((entity, index) => (
          <span
            key={index}
            itemScope
            itemType={`https://schema.org/${entity.type}`}
            itemProp="mentions"
          >
            <span itemProp="name">{entity.name}</span>
            {entity.description && (
              <span itemProp="description">{entity.description}</span>
            )}
            {entity.url && (
              <link itemProp="url" href={entity.url} />
            )}
          </span>
        ))}
      </div>
      {children}
    </div>
  );
}

// AI-friendly structured content
interface StructuredContentProps {
  title: string;
  summary: string;
  mainPoints: string[];
  keyFacts: Record<string, string>;
  children?: ReactNode;
}

export function StructuredContent({ 
  title, 
  summary, 
  mainPoints, 
  keyFacts, 
  children 
}: StructuredContentProps) {
  return (
    <article 
      itemScope 
      itemType="https://schema.org/Article"
      className="space-y-6"
    >
      <header>
        <h1 itemProp="headline" className="text-3xl font-bold mb-4">{title}</h1>
        <p itemProp="description" className="text-lg text-muted-foreground">{summary}</p>
      </header>
      
      <div itemProp="articleBody">
        {/* Main points for featured snippets */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Key Points</h2>
          <ul className="space-y-2">
            {mainPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center mt-0.5 flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-muted-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Key facts for AI consumption */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Quick Facts</h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(keyFacts).map(([key, value]) => (
              <div key={key} className="border border-border/50 rounded-lg p-3">
                <dt className="font-medium text-foreground">{key}</dt>
                <dd className="text-muted-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {children}
      </div>
    </article>
  );
}
