import { ChevronDown, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/hero-costa-del-sol.jpg";

interface HeroProps {
  className?: string;
}

export default function Hero({ className }: HeroProps) {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  return (
    <section
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden",
        className
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury Costa del Sol property with stunning sea views"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Subtitle */}
          <div className="animate-slide-in-down">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium tracking-wide mb-6 border border-white/20">
              COSTA DEL SOL REAL ESTATE
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display text-white mb-6 leading-tight animate-hero-text">
            FIND YOUR DREAM
            <br />
            <span className="bg-gradient-premium bg-clip-text text-transparent">
              PROPERTY IN SPAIN
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Discover luxury properties on the Costa del Sol with DelSolPrimeHomes' 
            expert guidance. From Marbella to Estepona, find comfort, luxury, 
            and investment opportunities in every property. Welcome to your new life.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-scale-in">
            <Button 
              variant="hero" 
              size="xl" 
              className="min-w-[200px] group"
            >
              <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
              Book a Free Viewing Trip
            </Button>
            
            <Button 
              variant="outline-white" 
              size="xl" 
              className="min-w-[200px] group"
            >
              <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
              Explore Properties
            </Button>
          </div>

          {/* Stats or Features */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-white/80 animate-fade-in">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">500+</div>
              <div className="text-sm uppercase tracking-wide">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">15+</div>
              <div className="text-sm uppercase tracking-wide">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">98%</div>
              <div className="text-sm uppercase tracking-wide">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-fade-in">
        <button
          onClick={scrollToContent}
          className="flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300 group"
          aria-label="Scroll to content"
        >
          <span className="text-xs uppercase tracking-wide mb-2 font-medium">Scroll</span>
          <ChevronDown className="w-6 h-6 animate-bounce group-hover:scale-110 transition-transform duration-300" />
        </button>
      </div>

      {/* Geometric Design Elements */}
      <div className="absolute top-1/4 right-10 w-20 h-20 border border-white/20 rotate-45 animate-pulse hidden lg:block" />
      <div className="absolute bottom-1/4 left-10 w-16 h-16 border border-primary/30 rotate-12 animate-pulse hidden lg:block" />
    </section>
  );
}