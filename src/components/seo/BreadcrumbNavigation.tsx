
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { generateBreadcrumbSchema } from "@/utils/seo/structuredData";
import SEOHead from "./SEOHead";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function BreadcrumbNavigation({ items, className = "" }: BreadcrumbNavigationProps) {
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    ...items.map(item => ({ name: item.name, url: item.href }))
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <SEOHead structuredData={[breadcrumbSchema]} />
      <nav className={`flex items-center space-x-2 text-sm text-muted-foreground ${className}`} aria-label="Breadcrumb">
        <Link 
          to="/" 
          className="flex items-center hover:text-primary transition-colors duration-200"
          aria-label="Go to homepage"
        >
          <Home className="w-4 h-4" />
          <span className="sr-only">Home</span>
        </Link>
        
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            {index === items.length - 1 ? (
              <span className="text-foreground font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link 
                to={item.href} 
                className="hover:text-primary transition-colors duration-200"
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
