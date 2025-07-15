
import { Search, Scale, Users } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

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
        <div className="text-center max-w-5xl mx-auto mb-20">
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
        </div>

        {/* Modern Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.title}
                className={`group relative bg-card/80 backdrop-blur-sm rounded-3xl p-10 border-l-4 ${service.borderColor} hover:shadow-luxury transition-all duration-700 hover:-translate-y-3 hover:bg-card`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon Container */}
                <div className={`relative w-20 h-20 rounded-2xl bg-card border-2 ${service.borderColor.replace('border-l-', 'border-')} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ${service.bgColor} shadow-elegant`}>
                  <IconComponent className="w-10 h-10 text-foreground group-hover:text-primary transition-colors duration-300" />
                </div>
                
                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl font-bold font-display mb-5 group-hover:text-primary transition-colors duration-300 leading-tight">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                    {service.description}
                  </p>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="group/btn w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 font-medium"
                  >
                    Learn More
                    <div className="ml-2 w-0 group-hover/btn:w-4 transition-all duration-300 overflow-hidden">
                      →
                    </div>
                  </Button>
                </div>

                {/* Hover Indicator */}
                <div className="absolute top-8 right-8 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button size="xl" className="font-semibold">
              Schedule Consultation
            </Button>
            <Button variant="outline" size="xl" className="font-medium">
              View All Services
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ServicesSection;
