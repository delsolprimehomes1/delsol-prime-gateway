
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
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-screen max-w-7xl bg-gradient-to-br from-background/95 via-background/98 to-background/95 backdrop-blur-xl border border-border/30 rounded-xl shadow-luxury shadow-elegant mt-2 overflow-hidden animate-fade-in z-50">
      {/* Modern glass morphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-xl" />
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10 p-6 md:p-8 lg:p-10">
        
        {/* Property Types */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-xl md:text-2xl text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Property Types
            </h3>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300 ease-luxury">
              View All <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <div className="space-y-3">
            {propertyTypes.map((type) => (
              <a
                key={type.name}
                href={type.href}
                onClick={onClose}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-card/50 hover:backdrop-blur-sm transition-all duration-500 ease-luxury group border border-border/30 hover:border-primary/30 hover:shadow-glow"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                  <type.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-foreground group-hover:text-primary transition-colors">
                        {type.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{type.count} properties</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        From {type.priceFrom}
                      </div>
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
            <h3 className="font-bold text-xl md:text-2xl text-foreground bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              Prime Locations
            </h3>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300 ease-luxury">
              Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <div className="space-y-3">
            {locations.map((location) => (
              <a
                key={location.name}
                href={location.href}
                onClick={onClose}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-card/50 hover:backdrop-blur-sm transition-all duration-500 ease-luxury group border border-border/30 hover:border-secondary/30 hover:shadow-elegant"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-secondary/20 to-primary/20 flex items-center justify-center group-hover:from-secondary/30 group-hover:to-primary/30 transition-all duration-300">
                    <MapPin className="w-5 h-5 text-secondary group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <span className="font-bold text-foreground group-hover:text-secondary transition-colors">
                      {location.name}
                    </span>
                    <div className="text-xs text-muted-foreground leading-relaxed">{location.type}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-foreground bg-accent/50 px-2 py-1 rounded-lg group-hover:bg-secondary/10 group-hover:text-secondary transition-all duration-300">
                    {location.properties}
                  </span>
                  <div className="text-xs text-muted-foreground mt-1">properties</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Featured Properties */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-xl md:text-2xl text-foreground bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Featured Properties
            </h3>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300 ease-luxury">
              View All <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <div className="space-y-4">
            {featuredProperties.map((property, index) => (
              <div
                key={index}
                className="flex gap-0 p-0 rounded-xl hover:bg-card/50 hover:backdrop-blur-sm transition-all duration-500 ease-luxury group cursor-pointer border border-border/30 hover:border-primary/30 hover:shadow-luxury overflow-hidden"
                onClick={onClose}
              >
                <div className="w-32 h-24 bg-muted rounded-l-xl flex-shrink-0 overflow-hidden relative">
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
                <div className="flex-1 p-4">
                  <h4 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1 text-lg">
                    {property.title}
                  </h4>
                  <div className="flex items-center gap-1 mt-1 mb-2">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <span className="text-sm text-muted-foreground">{property.location}</span>
                  </div>
                  <p className="text-lg font-bold text-primary mb-2 bg-primary/10 px-3 py-1 rounded-lg inline-block">
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
    </div>
  );
}
