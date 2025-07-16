
import { Search, Scale, Users } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { AnimatedElement } from "@/components/ui/AnimatedElement";
import { InteractiveCard } from "@/components/ui/InteractiveCard";
import { MagneticButton } from "@/components/ui/MagneticButton";

const ServicesSection = () => {
  const services = [
    {
      icon: Search,
      title: "Property Search & Selection",
      description: "Expert property matching with local market knowledge and personalized consultation services",
      borderColor: "border-l-emerald-500",
      bgColor: "group-hover:bg-emerald-50/50 dark:group-hover:bg-emerald-950/10"
    },
    {
      icon: Scale,
      title: "Legal & Financial Guidance", 
      description: "Comprehensive legal support, financing assistance, and transparent transaction management",
      borderColor: "border-l-rose-500",
      bgColor: "group-hover:bg-rose-50/50 dark:group-hover:bg-rose-950/10"
    },
    {
      icon: Users,
      title: "Lifestyle Integration",
      description: "Community integration services and comprehensive lifestyle planning for seamless relocation", 
      borderColor: "border-l-blue-500",
      bgColor: "group-hover:bg-blue-50/50 dark:group-hover:bg-blue-950/10"
    }
  ];

  return (
    <Section id="services" padding="xl" background="muted">
      <Container size="xl">
        {/* Modern Header Section */}
        <AnimatedElement animation="fade-in-up" className="text-center max-w-5xl mx-auto mb-20">
          <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wider mb-8 backdrop-blur-sm">
            PREMIUM SERVICES
          </div>
          
          <h2 className="text-5xl lg:text-7xl font-bold font-display mb-8 leading-[0.9] tracking-tight">
            <span className="text-foreground">DELSOL</span>
            <span className="text-primary">PRIME</span>
            <span className="text-foreground">HOMES</span>
            <br />
            <span className="bg-gradient-premium bg-clip-text text-transparent">
              EXCELLENCE
            </span>
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light">
              Unlock your dream property with our comprehensive real estate solutions, 
              tailored to match your vision and exceed your expectations.
            </p>
            <p className="text-lg text-muted-foreground/80 leading-relaxed">
              Experience seamless transactions and unparalleled expertise in the Costa del Sol's 
              most prestigious properties.
            </p>
          </div>
        </AnimatedElement>

        {/* Modern Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <AnimatedElement
                key={service.title}
                animation="fade-in-up"
                delay={index * 150}
                className="relative group"
              >
                <div className="relative h-full">
                  <InteractiveCard 
                    variant="luxury" 
                    hover="lift" 
                    className={`group/card relative bg-card/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-border/50 hover:border-primary/30 hover:shadow-luxury transition-all duration-700 hover:-translate-y-2 hover:bg-card h-full flex flex-col`}
                  >
                    {/* Modern Background Gradient */}
                    <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/[0.03] via-transparent to-secondary/[0.02] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                    
                    {/* Accent Border */}
                    <div className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl sm:rounded-t-3xl ${service.borderColor.replace('border-l-', 'bg-')} opacity-60 group-hover/card:opacity-100 transition-opacity duration-300`} />
                    
                    {/* Icon Container */}
                    <div className="relative flex-shrink-0 mb-6 sm:mb-8">
                      <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-card to-card/80 border border-border/50 flex items-center justify-center group-hover/card:scale-105 group-hover/card:rotate-2 transition-all duration-500 shadow-sm ${service.bgColor}`}>
                        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                        <IconComponent className="relative w-8 h-8 sm:w-10 sm:h-10 text-foreground group-hover/card:text-primary transition-colors duration-300" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative flex-grow flex flex-col">
                      <h3 className="text-xl sm:text-2xl font-bold font-display mb-4 sm:mb-5 group-hover/card:text-primary transition-colors duration-300 leading-tight">
                        {service.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6 sm:mb-8 text-base sm:text-lg flex-grow">
                        {service.description}
                      </p>
                      
                      <div className="mt-auto">
                        <MagneticButton 
                          variant="outline" 
                          size="lg"
                          className="group/btn w-full bg-card/50 hover:bg-primary hover:text-primary-foreground border-border/50 hover:border-primary transition-all duration-300 font-medium text-sm sm:text-base py-2.5 sm:py-3"
                        >
                          <span className="relative">Learn More</span>
                          <div className="ml-2 w-0 group-hover/btn:w-4 transition-all duration-300 overflow-hidden">
                            →
                          </div>
                        </MagneticButton>
                      </div>
                    </div>

                    {/* Modern Status Indicator */}
                    <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
                      <div className="w-2 h-2 bg-primary/60 rounded-full opacity-0 group-hover/card:opacity-100 transition-all duration-300 animate-pulse" />
                    </div>
                  </InteractiveCard>
                </div>
              </AnimatedElement>
            );
          })}
        </div>

        {/* Call to Action */}
        <AnimatedElement animation="fade-in-up" delay={600} className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <MagneticButton size="xl" className="font-semibold">
              Schedule Consultation
            </MagneticButton>
            <MagneticButton variant="outline" size="xl" className="font-medium">
              View All Services
            </MagneticButton>
          </div>
        </AnimatedElement>
      </Container>
    </Section>
  );
};

export default ServicesSection;
