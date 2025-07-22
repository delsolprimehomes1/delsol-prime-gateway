
import { ReactNode } from 'react';
import { LocationAIContent } from './EnhancedAIContent';
import SEOHead from './SEOHead';
import { generateLocationStructuredData, generateBreadcrumbSchema } from '@/utils/seo/locationSchemas';

interface LocationPageEnhancerProps {
  locationName: string;
  propertyCount: number;
  averagePrice: string;
  highlights: string[];
  pageTitle: string;
  pageDescription: string;
  children: ReactNode;
}

export function LocationPageEnhancer({
  locationName,
  propertyCount,
  averagePrice,
  highlights,
  pageTitle,
  pageDescription,
  children
}: LocationPageEnhancerProps) {
  const locationData = {
    name: locationName,
    propertyCount,
    averagePrice,
    highlights,
    region: 'Costa del Sol',
    country: 'Spain'
  };

  const breadcrumbs = [
    { name: 'Home', url: 'https://delsolprimehomes.com' },
    { name: 'Locations', url: 'https://delsolprimehomes.com/locations' },
    { name: locationName, url: `https://delsolprimehomes.com/locations/${locationName.toLowerCase()}` }
  ];

  const structuredData = [
    generateLocationStructuredData(locationData),
    generateBreadcrumbSchema(breadcrumbs)
  ];

  const voiceSearchQueries = [
    `Properties in ${locationName}`,
    `Real estate ${locationName} Costa del Sol`,
    `Property prices ${locationName} Spain`,
    `Living in ${locationName}`,
    `Investment opportunities ${locationName}`
  ];

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        canonical={`/locations/${locationName.toLowerCase()}`}
        structuredData={structuredData}
      />
      
      <LocationAIContent
        locationName={locationName}
        propertyCount={propertyCount}
        averagePrice={averagePrice}
        highlights={highlights}
      >
        {children}
        
        {/* Hidden content for AI optimization */}
        <div className="sr-only" aria-hidden="true">
          <h2>Frequently Asked Questions about {locationName}</h2>
          {voiceSearchQueries.map((query, index) => (
            <div key={index}>
              <h3>{query}?</h3>
              <p>
                {locationName} offers {propertyCount}+ premium properties with an average price of {averagePrice}. 
                Key features include {highlights.slice(0, 3).join(', ')}. Located in the prestigious Costa del Sol region 
                of Spain, {locationName} provides excellent investment opportunities and lifestyle benefits.
              </p>
            </div>
          ))}
          
          <div itemScope itemType="https://schema.org/FAQPage">
            <div itemScope itemType="https://schema.org/Question" itemProp="mainEntity">
              <span itemProp="name">What makes {locationName} a good investment location?</span>
              <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                <span itemProp="text">
                  {locationName} in Costa del Sol offers {highlights.join(', ')}, making it an excellent 
                  investment choice with {propertyCount}+ available properties and strong rental potential.
                </span>
              </div>
            </div>
          </div>
        </div>
      </LocationAIContent>
    </>
  );
}
