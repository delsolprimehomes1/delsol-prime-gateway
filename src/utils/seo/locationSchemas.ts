
interface LocationData {
  name: string;
  propertyCount: number;
  averagePrice: string;
  highlights: string[];
  region: string;
  country: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateLocationStructuredData(location: LocationData) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": location.name,
    "description": `Premium location in ${location.region}, ${location.country} with ${location.propertyCount}+ properties available`,
    "address": {
      "@type": "PostalAddress",
      "addressRegion": location.region,
      "addressCountry": location.country
    },
    "amenityFeature": location.highlights.map(highlight => ({
      "@type": "LocationFeatureSpecification",
      "name": highlight
    })),
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Available Properties",
        "value": `${location.propertyCount}+`
      },
      {
        "@type": "PropertyValue", 
        "name": "Average Price",
        "value": location.averagePrice
      }
    ]
  };
}

export function generateBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}
