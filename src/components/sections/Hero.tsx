
import { ChevronDown, Calendar, Search, MapPin, Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ParallaxSection } from "@/components/ui/ParallaxSection";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { RippleEffect } from "@/components/ui/RippleEffect";
import heroImage from "@/assets/hero-costa-del-sol-luxury.jpg";

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
      {/* Modern Background with Clean Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury villa with infinity pool overlooking the Mediterranean Sea on Costa del Sol"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Simplified, more professional overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Subtle Background Elements */}
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse opacity-60 hidden lg:block" />
      <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-secondary/5 rounded-full blur-2xl animate-pulse opacity-40 hidden lg:block" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
        <div className="max-w-6xl mx-auto">
          
          {/* Modern Badge */}
          <div className="animate-fade-in mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm font-medium tracking-wide border border-white/20">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>PREMIUM COSTA DEL SOL PROPERTIES</span>
            </div>
          </div>

          {/* Clean, Modern Typography */}
          <div className="space-y-6 mb-12">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.82] tracking-[-0.02em] animate-hero-text">
              Luxury Living
              <br />
              <span className="bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent font-black">
                Redefined
              </span>
            </h1>
            
            <div className="max-w-2xl mx-auto space-y-4 animate-fade-in">
              <p className="font-body text-xl md:text-2xl text-white/90 font-light leading-relaxed">
                Discover exceptional properties where Mediterranean elegance meets modern sophistication
              </p>
              <div className="flex items-center justify-center gap-2 text-white/70">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-body text-sm font-medium tracking-wider">MARBELLA • ESTEPONA • PUERTO BANÚS</span>
              </div>
            </div>
          </div>

          {/* Modern CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-scale-in">
            <RippleEffect>
              <MagneticButton 
                variant="hero" 
                size="xl" 
                className="group relative overflow-hidden min-w-[260px] h-14 rounded-lg font-body font-semibold"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Calendar className="w-5 h-5 mr-3 relative z-10" />
                <span className="relative z-10 font-semibold">Schedule Private Viewing</span>
              </MagneticButton>
            </RippleEffect>
            
            <RippleEffect>
              <MagneticButton 
                variant="outline-white" 
                size="xl" 
                className="group min-w-[260px] h-14 rounded-lg border-2 border-white/30 bg-white/10 hover:bg-white/20 hover:border-white/50 font-body"
              >
                <Play className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">Watch Virtual Tour</span>
              </MagneticButton>
            </RippleEffect>
          </div>

          {/* Professional Stats Section */}
          <div className="grid grid-cols-3 gap-8 md:gap-16 max-w-4xl mx-auto animate-fade-in">
            <div className="group text-center">
              <div className="space-y-2">
                <div className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-white group-hover:text-primary transition-colors duration-300">€2.5M+</div>
                <div className="font-body text-sm md:text-base text-white/70 uppercase tracking-widest font-medium">Average Value</div>
              </div>
            </div>
            
            <div className="group text-center border-x border-white/20">
              <div className="space-y-2">
                <div className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-white group-hover:text-primary transition-colors duration-300">15+</div>
                <div className="font-body text-sm md:text-base text-white/70 uppercase tracking-widest font-medium">Years Excellence</div>
              </div>
            </div>
            
            <div className="group text-center">
              <div className="space-y-2">
                <div className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-white group-hover:text-primary transition-colors duration-300">100%</div>
                <div className="font-body text-sm md:text-base text-white/70 uppercase tracking-widest font-medium">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-fade-in">
        <button
          onClick={scrollToContent}
          className="flex flex-col items-center text-white/60 hover:text-white transition-all duration-300 group font-body"
          aria-label="Scroll to explore properties"
        >
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/50 to-transparent mb-2" />
          <span className="text-xs uppercase tracking-widest font-medium mb-2">Explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce group-hover:translate-y-1 transition-transform duration-300" />
        </button>
      </div>

      {/* Minimal Geometric Accents */}
      <div className="absolute top-1/4 right-16 w-16 h-16 border border-white/10 rotate-45 hidden xl:block" />
      <div className="absolute bottom-1/4 left-16 w-12 h-12 border border-primary/30 rotate-12 hidden xl:block" />
    </section>
  );
}
