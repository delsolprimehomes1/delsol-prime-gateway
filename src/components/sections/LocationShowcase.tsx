import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { AnimatedElement } from "@/components/ui/AnimatedElement";
import { InteractiveCard } from "@/components/ui/InteractiveCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import marbellaImage from "@/assets/location-marbella-golden-mile.jpg";
import esteponaImage from "@/assets/location-estepona-old-town.jpg";
import mijasImage from "@/assets/location-mijas-pueblo.jpg";
import fuengirolaImage from "@/assets/location-fuengirola-beach.jpg";
import benalmadenaImage from "@/assets/location-benalmadena-marina.jpg";

const LocationShowcase = () => {
  const locations = [
    {
      name: "Marbella",
      description: "Luxury beachfront living",
      properties: "120+ Properties",
      priceRange: "€500K - €15M",
      image: marbellaImage,
      alt: "Luxury properties on Marbella Golden Mile",
      link: "/locations/marbella"
    },
    {
      name: "Estepona", 
      description: "Charming coastal town",
      properties: "85+ Properties",
      priceRange: "€300K - €8M",
      image: esteponaImage,
      alt: "Charming old town street in Estepona",
      link: "/locations/estepona"
    },
    {
      name: "Mijas",
      description: "Traditional Spanish charm", 
      properties: "65+ Properties",
      priceRange: "€250K - €5M",
      image: mijasImage,
      alt: "Traditional white village street in Mijas",
      link: "/locations/mijas"
    },
    {
      name: "Fuengirola",
      description: "Modern amenities",
      properties: "95+ Properties", 
      priceRange: "€200K - €4M",
      image: fuengirolaImage,
      alt: "Fuengirola beachfront promenade with people",
      link: "/locations/fuengirola"
    },
    {
      name: "Benalmádena",
      description: "Entertainment hub",
      properties: "70+ Properties",
      priceRange: "€180K - €3M", 
      image: benalmadenaImage,
      alt: "Luxury yachts and restaurants at Benalmádena Marina",
      link: "/locations/benalmadena"
    }
  ];

  return (
    <Section id="locations" padding="xl">
      <Container size="xl">
        {/* Section Header */}
        <AnimatedElement animation="fade-in-up" className="text-center max-w-3xl mx-auto mb-16">
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
        </AnimatedElement>

        {/* Locations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <AnimatedElement
              key={location.name}
              animation="fade-in-up"
              delay={index * 150}
              className="relative"
            >
              <InteractiveCard variant="luxury" hover="lift" className="group relative bg-card rounded-3xl overflow-hidden shadow-elegant hover:shadow-luxury transition-all duration-700 hover:-translate-y-4">
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={location.image}
                  alt={location.alt}
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
                <MagneticButton 
                  asChild
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  variant="outline"
                >
                  <Link to={location.link}>
                    Explore Properties
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </MagneticButton>
              </div>
            </InteractiveCard>
          </AnimatedElement>
          ))}
        </div>

        {/* View All Locations */}
        <AnimatedElement animation="fade-in-up" delay={600} className="text-center mt-12">
          <MagneticButton size="lg" className="font-medium">
            View All Locations
            <ArrowRight className="w-5 h-5 ml-2" />
          </MagneticButton>
        </AnimatedElement>
      </Container>
    </Section>
  );
};

export default LocationShowcase;