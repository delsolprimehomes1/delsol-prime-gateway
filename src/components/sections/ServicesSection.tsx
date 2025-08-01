
import { Search, Scale, Users, CheckCircle } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { AnimatedElement } from "@/components/ui/AnimatedElement";
import { InteractiveCard } from "@/components/ui/InteractiveCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useLanguage } from "@/contexts/LanguageContext";

const ServicesSection = () => {
  const { t } = useLanguage();
  const services = [
    {
      icon: Search,
      question: "How Do We Help You Find the Perfect Property?",
      answer: "Our expert property matching service combines local market knowledge with personalized consultation to identify properties that meet your exact requirements and investment goals.",
      features: [
        "Personalized property matching",
        "Local market expertise",
        "Investment analysis",
        "Property portfolio review"
      ],
      borderColor: "border-l-emerald-500",
      bgColor: "group-hover:bg-emerald-50/50 dark:group-hover:bg-emerald-950/10"
    },
    {
      icon: Scale,
      question: "What Legal and Financial Support Do We Provide?", 
      answer: "We offer comprehensive legal guidance, financing assistance, and transparent transaction management to ensure your Costa del Sol property purchase is secure and straightforward.",
      features: [
        "Legal documentation assistance",
        "Mortgage and financing support",
        "Tax optimization guidance",
        "Transaction management"
      ],
      borderColor: "border-l-rose-500",
      bgColor: "group-hover:bg-rose-50/50 dark:group-hover:bg-rose-950/10"
    },
    {
      icon: Users,
      question: "How Do We Support Your Lifestyle Integration?",
      answer: "Our comprehensive lifestyle integration services include community introduction, local services connection, and ongoing support to make your Costa del Sol transition seamless.",
      features: [
        "Community integration support",
        "Local services network",
        "Ongoing lifestyle assistance",
        "Cultural adaptation guidance"
      ],
      borderColor: "border-l-blue-500",
      bgColor: "group-hover:bg-blue-50/50 dark:group-hover:bg-blue-950/10"
    }
  ];

  return (
    <Section id="services" padding="xl" background="muted" itemScope itemType="https://schema.org/FAQPage">
      <Container size="xl">
        {/* AEO-Optimized Header */}
        <AnimatedElement animation="fade-in-up" className="text-center max-w-5xl mx-auto mb-20">
          <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wider mb-8 backdrop-blur-sm">
            WHAT SERVICES DO WE OFFER?
          </div>
          
          <h2 className="text-5xl lg:text-7xl font-bold font-display mb-8 leading-[0.9] tracking-tight" itemProp="name">
            {t('services.title')}
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light" itemProp="text">
              {t('services.subtitle')}
            </p>
          </div>
        </AnimatedElement>

        {/* AEO-Enhanced Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <AnimatedElement
                key={service.question}
                animation="fade-in-up"
                delay={index * 100}
                className="group"
              >
                <div 
                  className="relative bg-card/60 backdrop-blur-sm rounded-xl border border-border/30 p-8 hover:bg-card hover:border-primary/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full"
                  itemScope 
                  itemType="https://schema.org/Question"
                  itemProp="mainEntity"
                >
                  {/* Question-based header */}
                  <div className="mb-6">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-background to-background/80 border border-border/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ${service.bgColor} mb-4`}>
                      <IconComponent className="w-8 h-8 text-foreground group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold font-display mb-3 group-hover:text-primary transition-colors duration-300 leading-tight" itemProp="name">
                      {service.question}
                    </h3>
                  </div>
                  
                  {/* Answer content */}
                  <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <p className="text-muted-foreground leading-relaxed mb-6" itemProp="text">
                      {service.answer}
                    </p>
                    
                    {/* Features list for enhanced snippets */}
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Voice search optimization */}
                  <div className="mt-6 pt-4 border-t border-border/20">
                    <button className="text-sm font-medium text-primary/70 hover:text-primary flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                      Learn more about this service
                      <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                    </button>
                  </div>
                  
                  {/* Accent line */}
                  <div className={`absolute top-0 left-8 right-8 h-0.5 ${service.borderColor.replace('border-l-', 'bg-')} rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
                </div>
              </AnimatedElement>
            );
          })}
        </div>

        {/* AEO-Enhanced FAQ Section */}
        <AnimatedElement animation="fade-in-up" delay={400} className="mb-12">
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions About Our Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div itemScope itemType="https://schema.org/Question" itemProp="mainEntity">
                  <h4 className="font-semibold mb-2" itemProp="name">How long does the property buying process take in Costa del Sol?</h4>
                  <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <p className="text-sm text-muted-foreground" itemProp="text">
                      Typically 60-90 days from offer acceptance to completion, with our expert guidance ensuring all legal and financial requirements are met efficiently.
                    </p>
                  </div>
                </div>
                <div itemScope itemType="https://schema.org/Question" itemProp="mainEntity">
                  <h4 className="font-semibold mb-2" itemProp="name">What are the costs involved in buying property in Spain?</h4>
                  <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <p className="text-sm text-muted-foreground" itemProp="text">
                      Total costs typically range from 10-15% of property value, including taxes, legal fees, and registration costs. We provide detailed cost breakdowns upfront.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedElement>

        {/* Call to Action */}
        <AnimatedElement animation="fade-in-up" delay={600} className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <MagneticButton size="xl" className="font-semibold" data-voice-action="schedule consultation">
              Schedule Expert Consultation
            </MagneticButton>
            <MagneticButton variant="outline" size="xl" className="font-medium" data-voice-action="view all services">
              View All Services
            </MagneticButton>
          </div>
        </AnimatedElement>
      </Container>

      {/* Hidden AEO Content */}
      <div className="sr-only" aria-hidden="true">
        <span data-voice-query="real estate services costa del sol">DelSolPrimeHomes Services</span>
        <span data-voice-query="property buying process spain">Expert Property Assistance</span>
        <span data-voice-query="legal help buying property spain">Legal and Financial Support</span>
        <span data-voice-query="real estate agent costa del sol services">Comprehensive Property Services</span>
      </div>
    </Section>
  );
};

export default ServicesSection;
