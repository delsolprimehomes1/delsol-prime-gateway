import { MapPin, ArrowRight } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

const LocationShowcase = () => {
  const locations = [
    {
      name: "Marbella",
      description: "Luxury beachfront living",
      properties: "120+ Properties",
      priceRange: "€500K - €15M",
      image: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&h=600&fit=crop"
    },
    {
      name: "Estepona", 
      description: "Charming coastal town",
      properties: "85+ Properties",
      priceRange: "€300K - €8M",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop"
    },
    {
      name: "Mijas",
      description: "Traditional Spanish charm", 
      properties: "65+ Properties",
      priceRange: "€250K - €5M",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop"
    },
    {
      name: "Fuengirola",
      description: "Modern amenities",
      properties: "95+ Properties", 
      priceRange: "€200K - €4M",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop"
    },
    {
      name: "Benalmádena",
      description: "Entertainment hub",
      properties: "70+ Properties",
      priceRange: "€180K - €3M", 
      image: "https://images.unsplash.com/photo-1519451241324-20b4bd2bebae?w=800&h=600&fit=crop"
    }
  ];

  return (
    <Section id="locations" padding="xl">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
            FEATURED LOCATIONS
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold font-display mb-6">
            Discover the
            <span className="text-primary"> Costa del Sol</span>
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Explore our premium properties across the most sought-after locations 
            along the stunning Costa del Sol coastline.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <div
              key={location.name}
              className="group relative bg-card rounded-3xl overflow-hidden shadow-elegant hover:shadow-luxury transition-all duration-700 hover:-translate-y-4"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-overlay opacity-40 group-hover:opacity-20 transition-opacity duration-300" />
                
                {/* Location Pin */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold font-display mb-2 group-hover:text-primary transition-colors duration-300">
                  {location.name}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  {location.description}
                </p>

                {/* Quick Facts */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Available:</span>
                    <span className="font-medium">{location.properties}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price Range:</span>
                    <span className="font-medium">{location.priceRange}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  variant="outline"
                >
                  Explore Properties
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Locations */}
        <div className="text-center mt-12">
          <Button size="lg" className="font-medium">
            View All Locations
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default LocationShowcase;