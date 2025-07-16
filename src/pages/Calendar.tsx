
import { useState } from "react";
import { Calendar as CalendarIcon, Clock, MapPin, Star, Phone, Mail, ArrowLeft, Check } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SEOHead from "@/components/seo/SEOHead";
import { generateTitle } from "@/utils/seo/metaUtils";

const Calendar = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: "private-viewing",
      title: "Private Property Viewing",
      description: "Exclusive one-on-one property tours with our expert agents",
      duration: "90 minutes",
      features: ["Personalized consultation", "Detailed property insights", "Market analysis", "Investment advice"],
      popular: true
    },
    {
      id: "virtual-consultation",
      title: "Virtual Consultation",
      description: "Professional consultation via video call from anywhere",
      duration: "45 minutes",
      features: ["Property portfolio review", "Market overview", "Remote assistance", "Digital documentation"],
      popular: false
    },
    {
      id: "investment-strategy",
      title: "Investment Strategy Session",
      description: "Comprehensive investment planning and market analysis",
      duration: "120 minutes",
      features: ["ROI calculations", "Market trends", "Portfolio diversification", "Tax implications"],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={generateTitle("Schedule Appointment")}
        description="Schedule your private property viewing or consultation with our Costa del Sol real estate experts. Book online for personalized service."
        canonical="/calendar"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.1)_0%,transparent_50%)]" />
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Back Button */}
            <div className="flex justify-start mb-8">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="group hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300"
              >
                <a href="/" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span>Back to Home</span>
                </a>
              </Button>
            </div>

            {/* Header */}
            <div className="space-y-6 mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                <CalendarIcon className="w-4 h-4" />
                <span>BOOK YOUR APPOINTMENT</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-foreground leading-tight">
                Schedule Your
                <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Exclusive Viewing
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Choose your preferred service and book a convenient time with our Costa del Sol property experts
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Available Today</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span>5-Star Rated Service</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-500" />
                <span>Instant Confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Selection */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Choose Your Service
              </h2>
              <p className="text-muted-foreground text-lg">
                Select the type of consultation that best fits your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {services.map((service) => (
                <Card
                  key={service.id}
                  className={`relative cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-2 ${
                    selectedService === service.id
                      ? "ring-2 ring-primary shadow-lg scale-105"
                      : "hover:shadow-elegant"
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-3 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-foreground">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-foreground">Includes:</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Calendar Embed Section */}
            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-luxury bg-gradient-to-br from-card via-card to-card/50">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-foreground mb-2">
                    {selectedService 
                      ? `Book Your ${services.find(s => s.id === selectedService)?.title}`
                      : "Select a Service Above to Continue"
                    }
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {selectedService
                      ? "Choose your preferred date and time from the calendar below"
                      : "Please select a service type to access the booking calendar"
                    }
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  {selectedService ? (
                    <div className="space-y-8">
                      {/* Placeholder for GHL Calendar */}
                      <div className="bg-muted/30 rounded-lg p-12 text-center border-2 border-dashed border-muted-foreground/20">
                        <CalendarIcon className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          Calendar Integration Ready
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Your GHL calendar will be embedded here. This placeholder shows where your booking calendar will appear.
                        </p>
                        <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4 max-w-md mx-auto">
                          <strong>Instructions:</strong> Replace this section with your GoHighLevel calendar embed code to enable online booking.
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-muted-foreground/10">
                        <div className="text-center">
                          <Phone className="w-6 h-6 text-primary mx-auto mb-2" />
                          <h4 className="font-semibold text-foreground mb-1">Call Direct</h4>
                          <p className="text-muted-foreground text-sm">+34 952 123 456</p>
                        </div>
                        <div className="text-center">
                          <Mail className="w-6 h-6 text-primary mx-auto mb-2" />
                          <h4 className="font-semibold text-foreground mb-1">Email Us</h4>
                          <p className="text-muted-foreground text-sm">bookings@delsolprimehomes.com</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <CalendarIcon className="w-20 h-20 text-muted-foreground/30 mx-auto mb-6" />
                      <p className="text-muted-foreground text-lg">
                        Select a service above to access the booking calendar
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Visit Our Office</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Located in the heart of Marbella's Golden Mile, our modern office provides the perfect setting for your property consultation.
            </p>
            <div className="bg-card rounded-lg p-6 shadow-sm max-w-md mx-auto">
              <p className="font-medium text-foreground mb-2">Costa del Sol Prime Homes</p>
              <p className="text-sm text-muted-foreground">
                Avenida del Mar, 123<br />
                29600 Marbella, Málaga<br />
                Spain
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Calendar;
