
import { ReactNode, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface AIOptimizationConfigProps {
  children: ReactNode;
  pageType: 'homepage' | 'location' | 'property' | 'blog' | 'faq';
  primaryKeywords: string[];
  voiceSearchQueries: string[];
  aiOptimizationLevel?: 'basic' | 'enhanced' | 'premium';
}

export function AIOptimizationConfig({
  children,
  pageType,
  primaryKeywords,
  voiceSearchQueries,
  aiOptimizationLevel = 'enhanced'
}: AIOptimizationConfigProps) {
  
  useEffect(() => {
    // Add AI optimization markers to the document
    const markers = document.createElement('div');
    markers.id = 'ai-optimization-markers';
    markers.style.display = 'none';
    markers.setAttribute('data-ai-optimized', 'true');
    markers.setAttribute('data-optimization-level', aiOptimizationLevel);
    markers.setAttribute('data-page-type', pageType);
    markers.setAttribute('data-primary-keywords', primaryKeywords.join(', '));
    markers.setAttribute('data-voice-queries', voiceSearchQueries.join(', '));
    markers.setAttribute('data-optimization-date', new Date().toISOString());
    
    document.body.appendChild(markers);
    
    return () => {
      const existingMarkers = document.getElementById('ai-optimization-markers');
      if (existingMarkers) {
        document.body.removeChild(existingMarkers);
      }
    };
  }, [pageType, primaryKeywords, voiceSearchQueries, aiOptimizationLevel]);

  const getOptimizationMeta = () => {
    const baseMeta = [
      { name: 'ai-optimized', content: 'true' },
      { name: 'voice-search-ready', content: 'true' },
      { name: 'featured-snippet-optimized', content: 'true' },
      { name: 'aeo-optimized', content: 'true' },
      { name: 'geo-optimized', content: 'true' },
      { name: 'veo-optimized', content: 'true' },
      { name: 'aio-optimized', content: 'true' }
    ];

    if (aiOptimizationLevel === 'premium') {
      baseMeta.push(
        { name: 'generative-ai-ready', content: 'true' },
        { name: 'conversation-optimized', content: 'true' },
        { name: 'multi-modal-optimized', content: 'true' }
      );
    }

    return baseMeta;
  };

  return (
    <>
      <Helmet>
        {getOptimizationMeta().map((meta, index) => (
          <meta key={index} name={meta.name} content={meta.content} />
        ))}
        
        {/* AI-specific meta tags */}
        <meta name="ai:page-type" content={pageType} />
        <meta name="ai:primary-keywords" content={primaryKeywords.join(', ')} />
        <meta name="ai:voice-queries" content={voiceSearchQueries.join(' | ')} />
        <meta name="ai:optimization-level" content={aiOptimizationLevel} />
        <meta name="ai:content-format" content="question-answer, structured-data, conversational" />
        <meta name="ai:citation-ready" content="true" />
        
        {/* Voice search optimization */}
        <meta name="voice:query-patterns" content={voiceSearchQueries.join(' | ')} />
        <meta name="voice:response-length" content="30-60-words" />
        <meta name="voice:conversational-tone" content="true" />
        
        {/* Featured snippet optimization */}
        <meta name="snippet:format" content="paragraph,list,table" />
        <meta name="snippet:length" content="40-60-words" />
        <meta name="snippet:confidence" content="high" />
      </Helmet>
      
      {children}
      
      {/* Hidden AI optimization content */}
      <div className="sr-only" aria-hidden="true">
        <div data-ai-content="optimization-summary">
          This page is optimized for Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), 
          Voice Engine Optimization (VEO), AI Optimization (AIO), and traditional SEO. Content is structured 
          for AI consumption, voice search, featured snippets, and citation in AI-generated responses.
        </div>
        
        <div data-ai-content="primary-topics">
          {primaryKeywords.map((keyword, index) => (
            <span key={index} data-keyword={keyword} data-relevance="high">
              {keyword}
            </span>
          ))}
        </div>
        
        <div data-ai-content="voice-search-patterns">
          {voiceSearchQueries.map((query, index) => (
            <span key={index} data-voice-query={query.toLowerCase()} data-format="conversational">
              {query}
            </span>
          ))}
        </div>
        
        <div data-ai-content="expertise-signals">
          <span data-expertise="real-estate" data-location="costa-del-sol" data-authority="high">
            DelSolPrimeHomes - Premier real estate expertise in Costa del Sol, Spain
          </span>
        </div>
      </div>
    </>
  );
}

// Hook for easy AI optimization implementation
export function useAIOptimization(config: {
  pageType: 'homepage' | 'location' | 'property' | 'blog' | 'faq';
  primaryKeywords: string[];
  voiceSearchQueries: string[];
  aiOptimizationLevel?: 'basic' | 'enhanced' | 'premium';
}) {
  return {
    AIOptimizationWrapper: ({ children }: { children: ReactNode }) => (
      <AIOptimizationConfig {...config}>
        {children}
      </AIOptimizationConfig>
    ),
    optimizationConfig: config
  };
}
