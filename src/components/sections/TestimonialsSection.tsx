
import React, { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Section from "@/components/layout/Section";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  nationality: string;
  propertyType: string;
  purchaseLocation: string;
  rating: number;
  review: string;
  purchaseDate: string;
  image: string;
  propertyValue: string;
  highlights: string[];
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah & Michael Johnson",
    location: "London, UK", 
    nationality: "British",
    propertyType: "Luxury Villa",
    purchaseLocation: "Marbella Golden Mile",
    rating: 5,
    review: "Hans and his team made our dream of owning a villa in Marbella come true. Their expertise in navigating the Spanish property market was invaluable. From our first inquiry to receiving the keys, every step was handled with professionalism and care. We couldn't be happier with our new home!",
    purchaseDate: "March 2023",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    propertyValue: "€2.8M",
    highlights: ["Legal assistance", "Financing guidance", "Post-purchase support"]
  },
  {
    id: "2", 
    name: "Erik & Ingrid van Dongen",
    location: "Amsterdam, Netherlands",
    nationality: "Dutch",
    propertyType: "Modern Apartment",
    purchaseLocation: "Estepona Marina",
    rating: 5,
    review: "As fellow Dutch citizens, Hans understood exactly what we needed. His bilingual expertise and deep knowledge of both Dutch and Spanish legal systems made the entire process seamless. The apartment exceeded our expectations, and the ongoing support has been exceptional.",
    purchaseDate: "July 2023",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    propertyValue: "€875K",
    highlights: ["Dutch-Spanish expertise", "Market analysis", "Relocation services"]
  },
  {
    id: "3",
    name: "Dr. James & Patricia Miller",
    location: "New York, USA",
    nationality: "American",
    propertyType: "Penthouse",
    purchaseLocation: "Mijas Golf Resort",
    rating: 5,
    review: "Working with DelSolPrimeHomes was an absolute pleasure. Their attention to detail, market knowledge, and commitment to client satisfaction is unmatched. They helped us find the perfect retirement property with stunning golf course views. Highly recommended!",
    purchaseDate: "September 2023",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    propertyValue: "€1.2M",
    highlights: ["Retirement planning", "Golf properties", "Investment analysis"]
  },
  {
    id: "4",
    name: "Sophie & Laurent Dubois",
    location: "Paris, France",
    nationality: "French", 
    propertyType: "Beachfront Townhouse",
    purchaseLocation: "Fuengirola",
    rating: 5,
    review: "L'équipe de DelSolPrimeHomes a été fantastique! Their multilingual service and understanding of French buyers' needs made everything smooth. The property search was efficient, and we found our perfect beachfront home quickly. The after-sales service continues to impress us.",
    purchaseDate: "November 2023",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    propertyValue: "€695K",
    highlights: ["Multilingual service", "Beachfront expertise", "French legal support"]
  },
  {
    id: "5",
    name: "Thomas & Maria Schmidt",
    location: "Munich, Germany",
    nationality: "German",
    propertyType: "Investment Portfolio",
    purchaseLocation: "Multiple Locations",
    rating: 5,
    review: "Hans helped us build a diversified property investment portfolio across Costa del Sol. His market insights and strategic approach resulted in excellent returns. The professional relationship has grown into a trusted partnership for all our Spanish real estate needs.",
    purchaseDate: "Ongoing since 2022",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    propertyValue: "€4.2M Portfolio",
    highlights: ["Investment strategy", "Portfolio management", "Market insights"]
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  // Auto-play functionality
  React.useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const testimonialSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DelSolPrimeHomes",
    "aggregateRating": {
      "@type": "AggregateRating", 
      "ratingValue": "4.9",
      "reviewCount": testimonials.length,
      "bestRating": "5",
      "worstRating": "5"
    },
    "review": testimonials.map(testimonial => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": testimonial.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": testimonial.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": testimonial.review,
      "datePublished": testimonial.purchaseDate
    }))
  };

  return (
    <Section
      id="testimonials"
      padding="xl"
      background="muted"
      containerSize="lg"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(testimonialSchema) }}
      />
      
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
          <Quote className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-4xl font-bold text-foreground mb-4">
          Client Success Stories
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Discover why international clients trust DelSolPrimeHomes for their Costa del Sol property investments
        </p>
        
        {/* Rating Summary */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
              ))}
            </div>
            <span className="font-semibold text-lg">4.9/5</span>
          </div>
          <div className="text-muted-foreground">
            Based on {testimonials.length}+ client reviews
          </div>
        </div>
      </div>

      {/* Main Testimonial Card */}
      <div className="max-w-4xl mx-auto mb-12">
        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500">
          <CardContent className="p-12">
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {/* Client Info */}
              <div className="text-center lg:text-left">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto lg:mx-0 mb-4 border-4 border-primary/20">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {currentTestimonial.name}
                </h3>
                <div className="flex items-center gap-2 justify-center lg:justify-start mb-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{currentTestimonial.location}</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start mb-4">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{currentTestimonial.purchaseDate}</span>
                </div>
                
                {/* Property Details */}
                <div className="space-y-2 mb-4">
                  <Badge variant="outline" className="text-xs">
                    {currentTestimonial.propertyType}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    {currentTestimonial.purchaseLocation}
                  </div>
                  <div className="text-sm font-medium text-primary">
                    {currentTestimonial.propertyValue}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center lg:justify-start">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
              </div>

              {/* Review Content */}
              <div className="lg:col-span-2">
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <blockquote className="text-lg text-muted-foreground leading-relaxed mb-6 italic">
                  "{currentTestimonial.review}"
                </blockquote>
                
                {/* Service Highlights */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Services Provided:</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentTestimonial.highlights.map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex justify-center items-center gap-4 mb-8">
        <Button
          variant="outline"
          size="sm"
          onClick={prevTestimonial}
          className="w-10 h-10 p-0 rounded-full"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 3000);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary w-8"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline" 
          size="sm"
          onClick={nextTestimonial}
          className="w-10 h-10 p-0 rounded-full"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Client Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">127+</div>
          <div className="text-sm text-muted-foreground">Happy Clients</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">40+</div>
          <div className="text-sm text-muted-foreground">Nationalities</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">95%</div>
          <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
          <div className="text-sm text-muted-foreground">Average Rating</div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <div className="bg-gradient-premium rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">
            Join Our Success Stories
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Experience the same exceptional service that has made our clients' property dreams come true. 
            Start your Costa del Sol journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline-white"
              size="lg"
              className="group"
            >
              Schedule Consultation
              <Calendar className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </Button>
            <Button 
              variant="secondary"
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              View Properties
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
