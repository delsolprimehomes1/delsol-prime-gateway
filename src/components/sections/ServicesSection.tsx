import { Search, Scale, Users } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

const ServicesSection = () => {
  const services = [
    {
      icon: Search,
      title: "Property Search & Selection",
      description: "Expert property matching with local market knowledge",
      borderColor: "border-l-green-500",
      bgColor: "group-hover:bg-green-50 dark:group-hover:bg-green-950/20"
    },
    {
      icon: Scale,
      title: "Legal & Financial Guidance", 
      description: "Complete legal support and financing assistance",
      borderColor: "border-l-red-500",
      bgColor: "group-hover:bg-red-50 dark:group-hover:bg-red-950/20"
    },
    {
      icon: Users,
      title: "Lifestyle Integration",
      description: "Community integration and lifestyle planning services", 
      borderColor: "border-l-blue-500",
      bgColor: "group-hover:bg-blue-50 dark:group-hover:bg-blue-950/20"
    }
  ];

  return (
    <Section id="services" padding="xl" background="muted">
      <Container size="xl">
        {/* Main Heading Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            BEST SOLUTIONS
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold font-display mb-6 leading-tight">
            LUXURY COSTA DEL SOL
            <br />
            <span className="text-primary">PROPERTIES</span>
          </h2>
          
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
            Unlock your dream property with our comprehensive real estate 
            solutions, tailored to match your needs, preferences, and 
            aspirations. Experience seamless transactions and unparalleled 
            expertise in the Costa del Sol market.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.title}
                className={`group bg-card rounded-2xl p-8 border-l-4 ${service.borderColor} hover:shadow-luxury transition-all duration-500 hover:-translate-y-2`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-card border-2 ${service.borderColor.replace('border-l-', 'border-')} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${service.bgColor}`}>
                  <IconComponent className="w-8 h-8 text-foreground" />
                </div>
                
                <h3 className="text-xl font-bold font-display mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>
                
                <Button 
                  variant="outline" 
                  className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                >
                  Learn More
                </Button>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};

export default ServicesSection;