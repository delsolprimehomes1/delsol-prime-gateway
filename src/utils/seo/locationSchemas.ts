
export const generateLocationStructuredData = (location: {
  name: string;
  propertyCount: number;
  averagePrice: string;
  highlights: string[];
  region: string;
  country: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Place",
  "name": location.name,
  "address": {
    "@type": "PostalAddress",
    "addressLocality": location.name,
    "addressRegion": location.region,
    "addressCountry": location.country
  },
  "geo": getLocationCoordinates(location.name),
  "description": `Premium location in ${location.region} with ${location.propertyCount}+ luxury properties available. ${location.highlights.join(', ')}.`,
  "touristType": ["Business Traveler", "Leisure Traveler", "Property Investor"],
  "amenityFeature": location.highlights.map(highlight => ({
    "@type": "LocationFeatureSpecification",
    "name": highlight,
    "value": true
  })),
  "containedInPlace": {
    "@type": "Place",
    "name": location.region,
    "addressCountry": location.country
  },
  "realEstateAgent": {
    "@type": "RealEstateAgent",
    "name": "DelSolPrimeHomes",
    "url": "https://delsolprimehomes.com",
    "priceRange": location.averagePrice,
    "areaServed": location.name
  }
});

export const generatePropertyListingSchema = (properties: Array<{
  name: string;
  price: string;
  type: string;
  bedrooms?: number;
  bathrooms?: number;
  size?: string;
}>) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Premium Properties Costa del Sol",
  "description": "Luxury real estate listings in Costa del Sol by DelSolPrimeHomes",
  "numberOfItems": properties.length,
  "itemListElement": properties.map((property, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Product",
      "name": property.name,
      "category": property.type,
      "offers": {
        "@type": "Offer",
        "price": property.price,
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "DelSolPrimeHomes"
        }
      },
      "additionalProperty": [
        ...(property.bedrooms ? [{
          "@type": "PropertyValue",
          "name": "Number of bedrooms",
          "value": property.bedrooms
        }] : []),
        ...(property.bathrooms ? [{
          "@type": "PropertyValue",
          "name": "Number of bathrooms", 
          "value": property.bathrooms
        }] : []),
        ...(property.size ? [{
          "@type": "PropertyValue",
          "name": "Floor size",
          "value": property.size
        }] : [])
      ]
    }
  }))
});

function getLocationCoordinates(locationName: string) {
  const coordinates: Record<string, { latitude: string; longitude: string }> = {
    'Marbella': { latitude: "36.5108", longitude: "-4.8852" },
    'Estepona': { latitude: "36.4285", longitude: "-5.1453" },
    'Mijas': { latitude: "36.5947", longitude: "-4.6361" },
    'Fuengirola': { latitude: "36.5470", longitude: "-4.6214" },
    'Benalmadena': { latitude: "36.5988", longitude: "-4.5160" }
  };

  const coords = coordinates[locationName];
  if (!coords) {
    return {
      "@type": "GeoCoordinates",
      "latitude": "36.5000",
      "longitude": "-4.8000"
    };
  }

  return {
    "@type": "GeoCoordinates",
    "latitude": coords.latitude,
    "longitude": coords.longitude
  };
}

export { generateBreadcrumbSchema } from './structuredData';
