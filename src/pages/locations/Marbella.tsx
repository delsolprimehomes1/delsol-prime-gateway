import { ArrowLeft, MapPin, Users, TrendingUp, Sun, Utensils, Waves, ShoppingBag, Car, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedElement } from "@/components/ui/AnimatedElement";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import SEOHead from "@/components/seo/SEOHead";
import marbellaHero from "@/assets/location-marbella-golden-mile.jpg";

const Marbella = () => {
  const { elementRef: statsRef, isVisible: statsVisible } = useIntersectionObserver({ threshold: 0.3 });
  
  const properties = useAnimatedCounter({ target: 120, isVisible: statsVisible, suffix: "+", duration: 2000 });
  const avgPrice = useAnimatedCounter({ target: 3.2, isVisible: statsVisible, prefix: "€", suffix: "M", duration: 2500 });
  const satisfaction = useAnimatedCounter({ target: 98, isVisible: statsVisible, suffix: "%", duration: 2200 });

  const highlights = [
    { icon: Sun, title: "320+ Sunny Days", description: "Year-round Mediterranean climate" },
    { icon: Waves, title: "Golden Mile", description: "Prestigious beachfront location" },
    { icon: ShoppingBag, title: "Puerto Banús", description: "Luxury shopping & dining" },
    { icon: Users, title: "Elite Community", description: "International residents" }
  ];

  const amenities = [
    "Beach Clubs & Marinas",
    "Golf Courses (10+ within 20km)",
    "Michelin Star Restaurants", 
    "International Schools",
    "Private Healthcare",
    "Luxury Shopping",
    "Nightlife & Entertainment",
    "Art Galleries & Culture"
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Luxury Properties in Marbella | Costa del Sol Real Estate"
        description="Discover exclusive luxury properties in Marbella, Costa del Sol. Premium beachfront villas, penthouses and apartments from €500K to €15M."
        canonical="/locations/marbella"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={marbellaHero}
            alt="Luxury Marbella Golden Mile properties"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/30" />
        </div>

        <Container className="relative z-10 text-center text-white">
          <AnimatedElement animation="fade-in-up">
            <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Locations
            </Link>
          </AnimatedElement>

          <AnimatedElement animation="fade-in-up" delay={150}>
            <Badge variant="outline" className="mb-6 border-white/30 text-white bg-white/10 backdrop-blur">
              <MapPin className="w-3 h-3 mr-1" />
              Marbella, Costa del Sol
            </Badge>
          </AnimatedElement>

          <AnimatedElement animation="fade-in-up" delay={300}>
            <h1 className="text-5xl md:text-7xl font-black font-display mb-6 leading-tight">
              Marbella
              <br />
              <span className="bg-gradient-premium bg-clip-text text-transparent">
                Luxury Living
              </span>
            </h1>
          </AnimatedElement>

          <AnimatedElement animation="fade-in-up" delay={450}>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Experience the epitome of Mediterranean luxury on the world-famous Golden Mile
            </p>
          </AnimatedElement>

          <AnimatedElement animation="fade-in-up" delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton size="xl" className="bg-primary hover:bg-primary/90">
                <Phone className="w-5 h-5 mr-2" />
                Schedule Viewing
              </MagneticButton>
              <MagneticButton variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
                <Mail className="w-5 h-5 mr-2" />
                Get Brochure
              </MagneticButton>
            </div>
          </AnimatedElement>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <Container>
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedElement animation="fade-in-up" className="text-center">
              <div className="text-4xl md:text-5xl font-black text-primary mb-2">{properties}</div>
              <div className="text-muted-foreground uppercase tracking-wide font-medium">Available Properties</div>
            </AnimatedElement>
            <AnimatedElement animation="fade-in-up" delay={150} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-primary mb-2">{avgPrice}</div>
              <div className="text-muted-foreground uppercase tracking-wide font-medium">Average Price</div>
            </AnimatedElement>
            <AnimatedElement animation="fade-in-up" delay={300} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-primary mb-2">{satisfaction}</div>
              <div className="text-muted-foreground uppercase tracking-wide font-medium">Client Satisfaction</div>
            </AnimatedElement>
          </div>
        </Container>
      </section>

      {/* Highlights */}
      <section className="py-20">
        <Container>
          <AnimatedElement animation="fade-in-up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              Why Choose <span className="text-primary">Marbella</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover what makes Marbella the most prestigious destination on the Costa del Sol
            </p>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <AnimatedElement key={highlight.title} animation="fade-in-up" delay={index * 150}>
                  <div className="group text-center p-6 rounded-2xl border border-border/50 hover:border-primary/30 hover:bg-card/50 transition-all duration-300">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {highlight.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {highlight.description}
                    </p>
                  </div>
                </AnimatedElement>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Amenities */}
      <section className="py-20 bg-muted/30">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedElement animation="fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
                Premium <span className="text-primary">Amenities</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Marbella offers world-class amenities and services that define luxury Mediterranean living.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {amenities.map((amenity, index) => (
                  <AnimatedElement key={amenity} animation="fade-in-up" delay={index * 100}>
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-card/50 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-medium">{amenity}</span>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-in-up" delay={300}>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Premium Investment</h3>
                    <p className="text-muted-foreground">
                      Marbella properties have shown consistent appreciation over the past decade
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <AnimatedElement animation="fade-in-up" className="text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
                Ready to Explore <span className="text-primary">Marbella</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Our local experts are ready to help you find your perfect property in Marbella. 
                Schedule a private consultation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MagneticButton size="xl">
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Expert
                </MagneticButton>
                <MagneticButton variant="outline" size="xl">
                  <Clock className="w-5 h-5 mr-2" />
                  Book Viewing
                </MagneticButton>
              </div>
            </div>
          </AnimatedElement>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default Marbella;