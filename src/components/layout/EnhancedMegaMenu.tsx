
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { InteractiveCard } from '@/components/ui/InteractiveCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Square, ArrowRight } from 'lucide-react';

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
      image: '/assets/featured-traditional-villa.jpg',
      description: 'Exclusive Mediterranean villas',
      priceFrom: '€1.5M'
    },
    { 
      name: 'Beachfront Apartments', 
      count: '85+', 
      image: '/assets/featured-modern-apartment.jpg',
      description: 'Modern seaside living',
      priceFrom: '€750K'
    },
    { 
      name: 'Penthouses', 
      count: '45+', 
      image: '/assets/featured-luxury-penthouse.jpg',
      description: 'Premium sky-high living',
      priceFrom: '€2.2M'
    },
    { 
      name: 'Townhouses', 
      count: '65+', 
      image: '/assets/featured-contemporary-kitchen.jpg',
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
    <div className={cn(
      'fixed inset-0 z-50 bg-background/60 backdrop-blur-sm',
      className
    )}>
      <div className="absolute top-[72px] left-0 right-0 bg-gradient-to-br from-background/95 via-background/98 to-background/95 backdrop-blur-xl border-t border-border/30 shadow-luxury shadow-elegant">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 md:py-8 lg:py-10 max-w-4xl md:max-w-6xl xl:max-w-7xl relative">
          {/* Modern glass morphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-lg" />
          
          {/* Content wrapper with enhanced spacing */}
          <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10">
            
            {/* Property Types */}
            <div className="lg:col-span-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Property Types
                </h3>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300 ease-luxury">
                  View All <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="space-y-3">
                {propertyTypes.map((type, index) => (
                  <AnimatedElement key={type.name} delay={index * 100}>
                    <InteractiveCard hover="lift" className="p-0 overflow-hidden cursor-pointer group bg-card/50 backdrop-blur-sm border-border/30 hover:border-primary/30 hover:shadow-glow transition-all duration-500 ease-luxury rounded-xl">
                      <div className="flex items-center">
                        <div className="w-24 h-24 relative overflow-hidden bg-muted flex-shrink-0 rounded-l-xl">
                          <img 
                            src={type.image} 
                            alt={type.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-luxury"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary/10 group-hover:to-primary/20 transition-all duration-500" />
                        </div>
                        <div className="flex-1 p-5">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-bold text-foreground group-hover:text-primary transition-colors duration-300 text-lg">
                                {type.name}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{type.description}</p>
                              <div className="flex items-center gap-3 mt-3">
                                <Badge variant="secondary" className="text-xs px-3 py-1 bg-secondary/10 text-secondary border-secondary/20">
                                  {type.count} available
                                </Badge>
                                <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                  From {type.priceFrom}
                                </span>
                              </div>
                            </div>
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
                <h3 className="text-xl md:text-2xl font-bold text-foreground bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  Prime Locations
                </h3>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300 ease-luxury">
                  Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="space-y-3">
                {locations.map((location, index) => (
                  <AnimatedElement key={location.name} delay={index * 75}>
                    <InteractiveCard hover="scale" className="p-4 cursor-pointer group bg-card/50 backdrop-blur-sm border-border/30 hover:border-secondary/30 hover:shadow-elegant transition-all duration-500 ease-luxury rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-secondary/20 to-primary/20 flex items-center justify-center group-hover:from-secondary/30 group-hover:to-primary/30 transition-all duration-300">
                            <MapPin className="w-5 h-5 text-secondary group-hover:text-primary transition-colors" />
                          </div>
                          <div>
                            <h4 className="font-bold text-foreground group-hover:text-secondary transition-colors duration-300">
                              {location.name}
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">{location.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-foreground bg-accent/50 px-2 py-1 rounded-lg group-hover:bg-secondary/10 group-hover:text-secondary transition-all duration-300">
                            {location.properties}
                          </span>
                          <p className="text-xs text-muted-foreground mt-1">properties</p>
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
                <h3 className="text-xl md:text-2xl font-bold text-foreground bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  Featured Properties
                </h3>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300 ease-luxury">
                  View All <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="space-y-4">
                {featuredProperties.map((property, index) => (
                  <AnimatedElement key={index} delay={index * 150}>
                    <InteractiveCard hover="lift" className="p-0 overflow-hidden cursor-pointer group bg-card/50 backdrop-blur-sm border-border/30 hover:border-primary/30 hover:shadow-luxury transition-all duration-500 ease-luxury rounded-xl">
                      <div className="flex gap-0">
                        <div className="w-36 h-28 relative overflow-hidden bg-muted flex-shrink-0 rounded-l-xl">
                          <img 
                            src={property.image} 
                            alt={property.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-luxury"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary/10 group-hover:to-primary/20 transition-all duration-500" />
                          <Badge className="absolute top-2 left-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground text-xs px-2 py-1 rounded-full border-0 shadow-lg">
                            {property.type}
                          </Badge>
                        </div>
                        <div className="flex-1 p-5">
                          <h4 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1 text-lg">
                            {property.title}
                          </h4>
                          <div className="flex items-center gap-1 mt-1 mb-3">
                            <MapPin className="w-4 h-4 text-secondary" />
                            <span className="text-sm text-muted-foreground">{property.location}</span>
                          </div>
                          <p className="text-xl font-bold text-primary mb-3 bg-primary/10 px-3 py-1 rounded-lg inline-block">
                            {property.price}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5 bg-accent/30 px-2 py-1 rounded-lg">
                              <Bed className="w-4 h-4" />
                              <span>{property.beds}</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-accent/30 px-2 py-1 rounded-lg">
                              <Bath className="w-4 h-4" />
                              <span>{property.baths}</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-accent/30 px-2 py-1 rounded-lg">
                              <Square className="w-4 h-4" />
                              <span>{property.area}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </InteractiveCard>
                  </AnimatedElement>
                ))}
              </div>
              
              <div className="flex gap-3 mt-8">
                <Button className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground shadow-luxury transition-all duration-300 ease-luxury rounded-xl py-6 font-bold">
                  Browse All Properties
                </Button>
                <Button variant="outline" className="flex-1 border-primary/30 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:border-primary/50 transition-all duration-300 ease-luxury rounded-xl py-6 font-semibold">
                  Advanced Search
                </Button>
              </div>
            </div>
          </div>
          
          {/* Close button */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground z-20"
          >
            ×
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
