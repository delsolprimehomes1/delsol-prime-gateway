
import { ChevronDown, Calendar, Search, MapPin, Star } from "lucide-react";
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
      {/* Background Image with Enhanced Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury Costa del Sol property with stunning sea views"
          className="w-full h-full object-cover scale-105 animate-[zoom-out_20s_ease-out_infinite_alternate]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-16 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse hidden lg:block" />
      <div className="absolute bottom-1/3 left-16 w-24 h-24 bg-secondary/15 rounded-full blur-2xl animate-pulse hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Premium Badge */}
          <div className="animate-slide-in-down">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-2xl text-white/95 text-sm font-medium tracking-wider mb-8 border border-white/10 shadow-luxury">
              <Star className="w-4 h-4 text-primary fill-current" />
              <span>EXCLUSIVE COSTA DEL SOL COLLECTION</span>
              <Star className="w-4 h-4 text-primary fill-current" />
            </div>
          </div>

          {/* Main Heading with Enhanced Typography */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-white mb-8 leading-[0.9] animate-hero-text tracking-tight">
            DISCOVER
            <br />
            <span className="bg-gradient-premium bg-clip-text text-transparent inline-block transform hover:scale-105 transition-transform duration-700">
              LUXURY
            </span>
            <br />
            <span className="text-white/90">REDEFINED</span>
          </h1>

          {/* Enhanced Description */}
          <div className="max-w-2xl mx-auto mb-12 animate-fade-in">
            <p className="text-xl md:text-2xl text-white/95 mb-4 leading-relaxed font-light">
              Curated collection of ultra-premium properties where 
              <span className="text-primary font-medium"> sophistication meets serenity</span>
            </p>
            <div className="flex items-center justify-center gap-2 text-white/80">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm tracking-wide">Marbella • Estepona • Puerto Banús</span>
            </div>
          </div>

          {/* Premium CTA Section */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-scale-in">
            <Button 
              variant="hero" 
              size="xl" 
              className="min-w-[280px] h-16 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Calendar className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300 relative z-10" />
              <span className="relative z-10 text-lg font-semibold">Exclusive Viewing Experience</span>
            </Button>
            
            <Button 
              variant="outline-white" 
              size="xl" 
              className="min-w-[280px] h-16 group border-2 border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10"
            >
              <Search className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-lg font-medium">Explore Portfolio</span>
            </Button>
          </div>

          {/* Luxury Stats with Enhanced Design */}
          <div className="grid grid-cols-3 gap-8 md:gap-16 text-white/90 animate-fade-in max-w-3xl mx-auto">
            <div className="text-center group cursor-pointer">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">€2.5M+</div>
              <div className="text-sm md:text-base uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity duration-300">Average Value</div>
            </div>
            <div className="text-center group cursor-pointer border-x border-white/20">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">15+</div>
              <div className="text-sm md:text-base uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity duration-300">Years Excellence</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">100%</div>
              <div className="text-sm md:text-base uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity duration-300">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-fade-in">
        <button
          onClick={scrollToContent}
          className="flex flex-col items-center text-white/60 hover:text-white transition-all duration-500 group"
          aria-label="Scroll to content"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent mb-4 group-hover:via-primary transition-all duration-500" />
          <span className="text-xs uppercase tracking-widest mb-3 font-medium group-hover:tracking-wider transition-all duration-300">Discover More</span>
          <div className="relative">
            <ChevronDown className="w-5 h-5 animate-bounce group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 w-5 h-5 border border-white/20 rounded-full animate-ping" />
          </div>
        </button>
      </div>

      {/* Premium Geometric Elements */}
      <div className="absolute top-1/3 right-20 w-24 h-24 border border-white/10 rotate-45 animate-pulse hidden xl:block" />
      <div className="absolute bottom-1/3 left-20 w-20 h-20 border border-primary/20 rotate-12 animate-pulse hidden xl:block" />
      <div className="absolute top-1/2 right-32 w-2 h-2 bg-primary rounded-full animate-ping hidden xl:block" />
      <div className="absolute bottom-1/2 left-32 w-2 h-2 bg-secondary rounded-full animate-ping hidden xl:block" />
    </section>
  );
}
