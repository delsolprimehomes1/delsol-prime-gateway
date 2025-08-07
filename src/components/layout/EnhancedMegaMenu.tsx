
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { InteractiveCard } from '@/components/ui/InteractiveCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Square, ArrowRight, X } from 'lucide-react';

interface EnhancedMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function EnhancedMegaMenu({ isOpen, onClose, className }: EnhancedMegaMenuProps) {
  if (!isOpen) return null;

  const propertyTypes = [
    { 
      name: 'Luxury Villas', 
      count: '120+', 
      image: '/assets/property-type-villa.jpg',
      description: 'Exclusive Mediterranean villas',
      priceFrom: '€1.5M'
    },
    { 
      name: 'Beachfront Apartments', 
      count: '85+', 
      image: '/assets/property-type-apartment.jpg',
      description: 'Modern seaside living',
      priceFrom: '€750K'
    },
    { 
      name: 'Penthouses', 
      count: '45+', 
      image: '/assets/property-type-penthouse.jpg',
      description: 'Premium sky-high living',
      priceFrom: '€2.2M'
    },
    { 
      name: 'Townhouses', 
      count: '65+', 
      image: '/assets/property-type-townhouse.jpg',
      description: 'Contemporary family homes',
      priceFrom: '€980K'
    },
  ];

  const locations = [
    { name: 'Marbella', properties: '120+', type: 'Luxury Resort Town' },
    { name: 'Estepona', properties: '85+', type: 'Coastal Paradise' },
    { name: 'Mijas', properties: '65+', type: 'Mountain Village' },
    { name: 'Fuengirola', properties: '95+', type: 'Beach Destination' },
    { name: 'Benalmádena', properties: '70+', type: 'Marina District' },
  ];

  const featuredProperties = [
    {
      title: 'Modern Villa in Golden Mile',
      price: '€2,850,000',
      image: '/assets/featured-traditional-villa.jpg',
      location: 'Marbella',
      beds: 5,
      baths: 4,
      area: '450m²',
      type: 'New Development'
    },
    {
      title: 'Luxury Penthouse Puerto Banús',
      price: '€1,950,000', 
      image: '/assets/featured-luxury-penthouse.jpg',
      location: 'Puerto Banús',
      beds: 3,
      baths: 3,
      area: '280m²',
      type: 'Sea View'
    },
  ];

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Menu content */}
      <div className={cn(
        'absolute top-full left-0 right-0 z-50 bg-background/98 backdrop-blur-xl border border-border/50 shadow-luxury rounded-b-xl',
        className
      )}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl relative">
          {/* Close button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            
            {/* Property Types */}
            <div className="lg:col-span-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-foreground bg-gradient-premium bg-clip-text text-transparent">
                  Property Types
                </h3>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="space-y-3">
                {propertyTypes.map((type, index) => (
                  <AnimatedElement key={type.name} delay={index * 100}>
                    <InteractiveCard hover="lift" className="p-0 overflow-hidden cursor-pointer group bg-card/80 backdrop-blur-sm border-border/30 hover:border-primary/30 transition-all duration-500 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-20 h-20 relative overflow-hidden bg-muted flex-shrink-0 rounded-l-lg">
                          <img 
                            src={type.image} 
                            alt={type.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                            {type.name}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {type.count}
                            </Badge>
                            <span className="text-sm font-semibold text-primary">
                              From {type.priceFrom}
                            </span>
                          </div>
                        </div>
                      </div>
                    </InteractiveCard>
                  </AnimatedElement>
                ))}
              </div>
            </div>

            {/* Locations */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-foreground bg-gradient-premium bg-clip-text text-transparent">
                  Prime Locations
                </h3>
              </div>
              <div className="space-y-3">
                {locations.map((location, index) => (
                  <AnimatedElement key={location.name} delay={index * 75}>
                    <InteractiveCard hover="scale" className="p-4 cursor-pointer group bg-card/80 backdrop-blur-sm border-border/30 hover:border-secondary/30 transition-all duration-500 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-secondary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground group-hover:text-secondary transition-colors">
                              {location.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">{location.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-semibold text-foreground">
                            {location.properties}
                          </span>
                          <p className="text-xs text-muted-foreground">properties</p>
                        </div>
                      </div>
                    </InteractiveCard>
                  </AnimatedElement>
                ))}
              </div>
            </div>

            {/* Featured Properties */}
            <div className="lg:col-span-5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-foreground bg-gradient-premium bg-clip-text text-transparent">
                  Featured Properties
                </h3>
              </div>
              <div className="space-y-4">
                {featuredProperties.map((property, index) => (
                  <AnimatedElement key={index} delay={index * 150}>
                    <InteractiveCard hover="lift" className="p-0 overflow-hidden cursor-pointer group bg-card/80 backdrop-blur-sm border-border/30 hover:border-primary/30 transition-all duration-500 rounded-lg">
                      <div className="flex gap-0">
                        <div className="w-32 h-24 relative overflow-hidden bg-muted flex-shrink-0 rounded-l-lg">
                          <img 
                            src={property.image} 
                            alt={property.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs">
                            {property.type}
                          </Badge>
                        </div>
                        <div className="flex-1 p-4">
                          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {property.title}
                          </h4>
                          <div className="flex items-center gap-1 mt-1 mb-2">
                            <MapPin className="w-3 h-3 text-secondary" />
                            <span className="text-sm text-muted-foreground">{property.location}</span>
                          </div>
                          <p className="text-lg font-bold text-primary mb-2">
                            {property.price}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Bed className="w-3 h-3" />
                              <span>{property.beds}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Bath className="w-3 h-3" />
                              <span>{property.baths}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Square className="w-3 h-3" />
                              <span>{property.area}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </InteractiveCard>
                  </AnimatedElement>
                ))}
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button className="flex-1 bg-gradient-premium text-primary-foreground">
                  Browse Properties
                </Button>
                <Button variant="outline" className="flex-1">
                  Advanced Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
