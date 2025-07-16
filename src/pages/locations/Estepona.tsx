import { ArrowLeft, MapPin, Users, TrendingUp, Sun, Utensils, Palette, TreePine, Car, Phone, Mail, Clock } from "lucide-react";
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
import esteponaHero from "@/assets/location-estepona-old-town.jpg";

const Estepona = () => {
  const { elementRef: statsRef, isVisible: statsVisible } = useIntersectionObserver({ threshold: 0.3 });
  
  const properties = useAnimatedCounter({ target: 85, isVisible: statsVisible, suffix: "+", duration: 2000 });
  const avgPrice = useAnimatedCounter({ target: 1.8, isVisible: statsVisible, prefix: "€", suffix: "M", duration: 2500 });
  const satisfaction = useAnimatedCounter({ target: 96, isVisible: statsVisible, suffix: "%", duration: 2200 });

  const highlights = [
    { icon: Palette, title: "Art & Culture", description: "Vibrant street art and galleries" },
    { icon: TreePine, title: "Natural Beauty", description: "Mountains meet the sea" },
    { icon: Utensils, title: "Authentic Cuisine", description: "Traditional Spanish dining" },
    { icon: Users, title: "Local Charm", description: "Genuine community spirit" }
  ];

  const amenities = [
    "Historic Old Town",
    "Beautiful Beaches",
    "Traditional Markets", 
    "Local Schools",
    "Medical Centers",
    "Authentic Restaurants",
    "Cultural Events",
    "Nature Walks"
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Properties in Estepona | Charming Costa del Sol Town"
        description="Discover charming properties in Estepona, Costa del Sol. Authentic Spanish coastal living from €300K to €8M in this picturesque town."
        canonical="/locations/estepona"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={esteponaHero}
            alt="Charming Estepona old town street"
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
              Estepona, Costa del Sol
            </Badge>
          </AnimatedElement>

          <AnimatedElement animation="fade-in-up" delay={300}>
            <h1 className="text-5xl md:text-7xl font-black font-display mb-6 leading-tight">
              Estepona
              <br />
              <span className="bg-gradient-premium bg-clip-text text-transparent">
                Authentic Charm
              </span>
            </h1>
          </AnimatedElement>

          <AnimatedElement animation="fade-in-up" delay={450}>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Discover genuine Spanish coastal living in this charming whitewashed town
            </p>
          </AnimatedElement>

          <AnimatedElement animation="fade-in-up" delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton size="xl" className="bg-primary hover:bg-primary/90">
                <Phone className="w-5 h-5 mr-2" />
                Schedule Viewing
              </MagneticButton>
              <MagneticButton variant="outline-white" size="xl">
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
              Why Choose <span className="text-primary">Estepona</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience authentic Spanish coastal living with modern comforts and timeless charm
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
                Local <span className="text-primary">Amenities</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Estepona offers authentic Spanish living with all the amenities you need for comfortable coastal life.
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
                    <h3 className="text-2xl font-bold mb-2">Growing Value</h3>
                    <p className="text-muted-foreground">
                      Estepona is experiencing steady growth while maintaining its authentic character
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
                Ready to Explore <span className="text-primary">Estepona</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Our local experts know Estepona inside and out. Let us help you find your perfect 
                home in this charming coastal town.
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

export default Estepona;
