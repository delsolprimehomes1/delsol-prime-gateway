
import { Building, MapPin, TrendingUp, Star, Home, Building2, TreePine, Waves, Bed, Bath, Square, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MegaMenuProps {
  onClose: () => void;
}

export default function MegaMenu({ onClose }: MegaMenuProps) {
  const propertyTypes = [
    { name: "Luxury Villas", icon: Home, count: "120+", href: "/properties/villas", priceFrom: "€1.5M" },
    { name: "Apartments", icon: Building, count: "350+", href: "/properties/apartments", priceFrom: "€450K" },
    { name: "Penthouses", icon: Building2, count: "45+", href: "/properties/penthouses", priceFrom: "€2.2M" },
    { name: "Townhouses", icon: TreePine, count: "80+", href: "/properties/townhouses", priceFrom: "€850K" },
  ];

  const locations = [
    { name: "Marbella", properties: "180+", href: "/locations/marbella", type: "Luxury Resort" },
    { name: "Puerto Banús", properties: "95+", href: "/locations/puerto-banus", type: "Marina District" },
    { name: "Estepona", properties: "120+", href: "/locations/estepona", type: "Coastal Paradise" },
    { name: "Benahavís", properties: "65+", href: "/locations/benahavis", type: "Mountain Village" },
    { name: "Fuengirola", properties: "140+", href: "/locations/fuengirola", type: "Beach Destination" },
    { name: "Torremolinos", properties: "110+", href: "/locations/torremolinos", type: "Family Resort" },
  ];

  const featuredProperties = [
    {
      title: "Modern Villa in Marbella",
      price: "€2,850,000",
      image: "/assets/featured-traditional-villa.jpg",
      beds: 5,
      baths: 4,
      area: "450m²",
      location: "Golden Mile",
      type: "New Development"
    },
    {
      title: "Luxury Penthouse Puerto Banús",
      price: "€1,950,000",
      image: "/assets/featured-luxury-penthouse.jpg",
      beds: 3,
      baths: 3,
      area: "280m²",
      location: "Marina",
      type: "Sea View"
    },
  ];

  return (
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-screen max-w-7xl bg-background/98 backdrop-blur-md border border-border/50 rounded-lg shadow-luxury mt-2 overflow-hidden animate-fade-in z-50">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8">
        
        {/* Property Types */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-xl text-foreground">Property Types</h3>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {propertyTypes.map((type) => (
              <a
                key={type.name}
                href={type.href}
                onClick={onClose}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-accent/50 transition-all duration-200 group border border-transparent hover:border-primary/20"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <type.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {type.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{type.count} properties</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-primary">From {type.priceFrom}</div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-xl text-foreground">Prime Locations</h3>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary">
              Explore <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {locations.map((location) => (
              <a
                key={location.name}
                href={location.href}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200 group border border-transparent hover:border-primary/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {location.name}
                    </span>
                    <div className="text-xs text-muted-foreground">{location.type}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-foreground">{location.properties}</span>
                  <div className="text-xs text-muted-foreground">properties</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Featured Properties */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-xl text-foreground">Featured Properties</h3>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-4">
            {featuredProperties.map((property, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 rounded-lg hover:bg-accent/50 transition-colors duration-200 group cursor-pointer border border-transparent hover:border-primary/20"
                onClick={onClose}
              >
                <div className="w-28 h-20 bg-muted rounded-lg flex-shrink-0 overflow-hidden relative">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-1 left-1 bg-primary/90 text-primary-foreground text-xs">
                    {property.type}
                  </Badge>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {property.title}
                  </h4>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{property.location}</span>
                  </div>
                  <p className="text-lg font-bold text-primary mt-1">{property.price}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
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
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              Browse All Properties
            </Button>
            <Button variant="outline" className="flex-1 border-primary/20 hover:bg-primary/5">
              Advanced Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
