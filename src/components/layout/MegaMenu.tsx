
import { Building, MapPin, TrendingUp, Star, Home, Building2, TreePine, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MegaMenuProps {
  onClose: () => void;
}

export default function MegaMenu({ onClose }: MegaMenuProps) {
  const propertyTypes = [
    { name: "Luxury Villas", icon: Home, count: "120+", href: "/properties/villas" },
    { name: "Apartments", icon: Building, count: "350+", href: "/properties/apartments" },
    { name: "Penthouses", icon: Building2, count: "45+", href: "/properties/penthouses" },
    { name: "Townhouses", icon: TreePine, count: "80+", href: "/properties/townhouses" },
  ];

  const locations = [
    { name: "Marbella", properties: "180+", href: "/locations/marbella" },
    { name: "Puerto Banús", properties: "95+", href: "/locations/puerto-banus" },
    { name: "Estepona", properties: "120+", href: "/locations/estepona" },
    { name: "Benahavís", properties: "65+", href: "/locations/benahavis" },
    { name: "Fuengirola", properties: "140+", href: "/locations/fuengirola" },
    { name: "Torremolinos", properties: "110+", href: "/locations/torremolinos" },
  ];

  const featuredProperties = [
    {
      title: "Modern Villa in Marbella",
      price: "€2,850,000",
      image: "/placeholder.svg",
      beds: 5,
      baths: 4,
      area: "450m²"
    },
    {
      title: "Luxury Penthouse Puerto Banús",
      price: "€1,950,000",
      image: "/placeholder.svg",
      beds: 3,
      baths: 3,
      area: "280m²"
    },
  ];

  return (
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-screen max-w-6xl bg-background/95 backdrop-blur-md border border-border/50 rounded-lg shadow-elegant mt-2 overflow-hidden animate-fade-in">
      <div className="grid grid-cols-4 gap-8 p-8">
        {/* Property Types */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-foreground mb-4">Property Types</h3>
          <div className="space-y-3">
            {propertyTypes.map((type) => (
              <a
                key={type.name}
                href={type.href}
                onClick={onClose}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <type.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {type.name}
                  </div>
                  <div className="text-sm text-muted-foreground">{type.count} properties</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-foreground mb-4">Popular Locations</h3>
          <div className="space-y-3">
            {locations.map((location) => (
              <a
                key={location.name}
                href={location.href}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {location.name}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">{location.properties}</span>
              </a>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full mt-4">
            View All Locations
          </Button>
        </div>

        {/* Featured Properties */}
        <div className="col-span-2 space-y-4">
          <h3 className="font-semibold text-lg text-foreground mb-4">Featured Properties</h3>
          <div className="space-y-4">
            {featuredProperties.map((property, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 rounded-lg hover:bg-accent/50 transition-colors duration-200 group cursor-pointer"
                onClick={onClose}
              >
                <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {property.title}
                  </h4>
                  <p className="text-lg font-semibold text-primary mt-1">{property.price}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                    <span>{property.beds} beds</span>
                    <span>{property.baths} baths</span>
                    <span>{property.area}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <Button variant="hero" size="sm" className="flex-1">
              View All Properties
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Advanced Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
