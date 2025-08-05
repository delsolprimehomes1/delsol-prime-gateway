
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { AnimatedElement } from "@/components/ui/AnimatedElement";
import { InteractiveCard } from "@/components/ui/InteractiveCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useLanguage } from "@/contexts/LanguageContext";
import marbellaImage from "@/assets/location-marbella-golden-mile.jpg";
import esteponaImage from "@/assets/location-estepona-old-town.jpg";
import mijasImage from "@/assets/location-mijas-pueblo.jpg";
import fuengirolaImage from "@/assets/location-fuengirola-beach.jpg";
import benalmadenaImage from "@/assets/location-benalmadena-marina.jpg";

const LocationShowcase = () => {
  const { t } = useLanguage();
  
  const locations = [
    {
      name: "Marbella",
      description: t('locations.descriptions.marbella'),
      properties: "120+ Properties",
      priceRange: "€500K - €15M",
      image: marbellaImage,
      alt: "Luxury properties on Marbella Golden Mile",
      link: "/locations/marbella"
    },
    {
      name: "Estepona", 
      description: t('locations.descriptions.estepona'),
      properties: "85+ Properties",
      priceRange: "€300K - €8M",
      image: esteponaImage,
      alt: "Charming old town street in Estepona",
      link: "/locations/estepona"
    },
    {
      name: "Mijas",
      description: t('locations.descriptions.mijas'), 
      properties: "65+ Properties",
      priceRange: "€250K - €5M",
      image: mijasImage,
      alt: "Traditional white village street in Mijas",
      link: "/locations/mijas"
    },
    {
      name: "Fuengirola",
      description: t('locations.descriptions.fuengirola'),
      properties: "95+ Properties", 
      priceRange: "€200K - €4M",
      image: fuengirolaImage,
      alt: "Fuengirola beachfront promenade with people",
      link: "/locations/fuengirola"
    },
    {
      name: "Benalmádena",
      description: t('locations.descriptions.benalmadena'),
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
            {t('locations.badge')}
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold font-display mb-6">
            {t('locations.title')}
            <span className="text-primary"> {t('locations.titleHighlight')}</span>
          </h2>
          
          <p className="text-lg text-muted-foreground">
            {t('locations.subtitle')}
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
                <picture>
                  <source 
                    srcSet={location.image.replace(/\.(jpg|jpeg|png)$/i, '-640w.webp') + ' 640w, ' + location.image.replace(/\.(jpg|jpeg|png)$/i, '-480w.webp') + ' 480w'} 
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    type="image/webp" 
                  />
                  <img
                    src={location.image}
                    alt={`Luxury properties ${location.name} Costa del Sol coastal views`}
                    width={640}
                    height={256}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </picture>
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
                    <span className="text-muted-foreground">{t('locations.available')}</span>
                    <span className="font-medium">{location.properties}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('locations.priceRange')}</span>
                    <span className="font-medium">{location.priceRange}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link to={location.link} className="block">
                  <MagneticButton 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                    variant="outline"
                  >
                    {t('locations.exploreProperties')}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </MagneticButton>
                </Link>
              </div>
            </InteractiveCard>
          </AnimatedElement>
          ))}
        </div>

        {/* View All Locations */}
        <AnimatedElement animation="fade-in-up" delay={600} className="text-center mt-12">
          <MagneticButton size="lg" className="font-medium">
            {t('locations.viewAllLocations')}
            <ArrowRight className="w-5 h-5 ml-2" />
          </MagneticButton>
        </AnimatedElement>
      </Container>
    </Section>
  );
};

export default LocationShowcase;
