import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

interface EnhancedMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function EnhancedMegaMenu({ isOpen, onClose, className }: EnhancedMegaMenuProps) {
  if (!isOpen) return null;

  const propertyTypes = [
    { name: 'Luxury Villas', count: '120+', image: '/api/placeholder/300/200' },
    { name: 'Beachfront Apartments', count: '85+', image: '/api/placeholder/300/200' },
    { name: 'Penthouses', count: '45+', image: '/api/placeholder/300/200' },
    { name: 'Townhouses', count: '65+', image: '/api/placeholder/300/200' },
  ];

  const locations = [
    { name: 'Marbella', properties: '120+' },
    { name: 'Estepona', properties: '85+' },
    { name: 'Mijas', properties: '65+' },
    { name: 'Fuengirola', properties: '95+' },
    { name: 'Benalmádena', properties: '70+' },
  ];

  return (
    <div className={cn(
      'absolute top-full left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border shadow-luxury z-50 transition-all duration-300',
      className
    )}>
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Property Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Property Types</h3>
            <div className="space-y-3">
              {propertyTypes.map((type, index) => (
                <AnimatedElement key={type.name} delay={index * 50}>
                  <InteractiveCard hover="scale" className="p-4 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{type.name}</h4>
                        <p className="text-sm text-muted-foreground">{type.count} available</p>
                      </div>
                    </div>
                  </InteractiveCard>
                </AnimatedElement>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Locations</h3>
            <div className="space-y-3">
              {locations.map((location, index) => (
                <AnimatedElement key={location.name} delay={index * 50}>
                  <InteractiveCard hover="scale" className="p-4 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{location.name}</h4>
                      <p className="text-sm text-muted-foreground">{location.properties}</p>
                    </div>
                  </InteractiveCard>
                </AnimatedElement>
              ))}
            </div>
          </div>

          {/* Featured */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Featured</h3>
            <div className="space-y-4">
              <InteractiveCard hover="lift" className="p-4">
                <h4 className="font-medium mb-2">New Listings</h4>
                <p className="text-sm text-muted-foreground">Discover the latest luxury properties</p>
              </InteractiveCard>
              <InteractiveCard hover="lift" className="p-4">
                <h4 className="font-medium mb-2">Investment Guide</h4>
                <p className="text-sm text-muted-foreground">Learn about Costa del Sol investments</p>
              </InteractiveCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}