
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

        {/* Compact Modern Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <AnimatedElement
                key={service.title}
                animation="fade-in-up"
                delay={index * 100}
                className="group"
              >
                <div className="relative bg-card/60 backdrop-blur-sm rounded-xl border border-border/30 p-6 hover:bg-card hover:border-primary/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  {/* Minimal accent line */}
                  <div className={`absolute top-0 left-6 right-6 h-0.5 ${service.borderColor.replace('border-l-', 'bg-')} rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Compact header with icon and title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-background to-background/80 border border-border/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ${service.bgColor}`}>
                      <IconComponent className="w-6 h-6 text-foreground group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold font-display mb-2 group-hover:text-primary transition-colors duration-300 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Compact action button */}
                  <div className="pt-2">
                    <button className="text-sm font-medium text-primary/70 hover:text-primary flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                      Learn more
                      <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                    </button>
                  </div>
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
