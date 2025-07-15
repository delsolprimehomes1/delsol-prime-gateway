
import { ChevronDown, Calendar, Search, MapPin, Star, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/hero-costa-del-sol.jpg";
import { ParallaxSection, FloatingElement, MagneticButton, PulsingOrb, TypewriterText, RevealOnScroll } from "@/components/ui/ModernAnimations";
import { TiltCard, RippleButton, MorphingElement } from "@/components/ui/InteractiveElements";

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
      {/* Enhanced Background with Parallax */}
      <ParallaxSection speed={0.3} className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury Costa del Sol property with stunning sea views"
          className="w-full h-full object-cover scale-110"
          loading="eager"
        />
        {/* Dynamic overlay with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40 animate-pulse-glow" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </ParallaxSection>

      {/* Animated Background Elements */}
      <FloatingElement delay={0} duration={4} className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-60 hidden lg:block">
        <div />
      </FloatingElement>
      <FloatingElement delay={2} duration={5} className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-2xl opacity-40 hidden lg:block">
        <div />
      </FloatingElement>
      
      {/* Floating orbs */}
      <FloatingElement delay={1} duration={6} className="absolute top-1/3 left-1/3 hidden xl:block">
        <PulsingOrb className="w-4 h-4" />
      </FloatingElement>
      <FloatingElement delay={3} duration={4} className="absolute bottom-1/4 right-1/3 hidden xl:block">
        <PulsingOrb className="w-3 h-3" />
      </FloatingElement>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
        <div className="max-w-6xl mx-auto">
          
          {/* Enhanced Modern Badge */}
          <RevealOnScroll delay={200} className="mb-8">
            <TiltCard maxTilt={5} className="inline-block">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/40 to-secondary/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                <div className="relative inline-flex items-center gap-3 px-6 py-3 bg-white/15 backdrop-blur-xl rounded-full text-white/95 text-sm font-medium tracking-wide border border-white/30 hover:border-white/50 transition-all duration-300 group">
                  <div className="flex items-center gap-2">
                    <PulsingOrb className="w-2 h-2" />
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  </div>
                  <TypewriterText text="PREMIUM COSTA DEL SOL PROPERTIES" speed={80} />
                </div>
              </div>
            </TiltCard>
          </RevealOnScroll>

          {/* Enhanced Typography with Staggered Animation */}
          <div className="space-y-8 mb-16">
            <RevealOnScroll delay={400} className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.85] tracking-tight">
                <MorphingElement
                  children={<span>Luxury Living</span>}
                  hoverChildren={<span className="bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">Luxury Living</span>}
                />
                <br />
                <span className="relative inline-block">
                  <span className="bg-gradient-premium bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                    Redefined
                  </span>
                  <div className="absolute -inset-1 bg-gradient-premium opacity-20 blur-lg rounded-lg animate-pulse" />
                </span>
              </h1>
            </RevealOnScroll>
            
            <RevealOnScroll delay={600} className="max-w-2xl mx-auto space-y-6">
              <p className="text-xl md:text-2xl text-white/95 font-light leading-relaxed">
                Discover exceptional properties where Mediterranean elegance meets modern sophistication
              </p>
              <div className="flex items-center justify-center gap-3 text-white/80 group">
                <MapPin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium tracking-wider bg-gradient-to-r from-white/80 to-white/60 bg-clip-text">
                  MARBELLA • ESTEPONA • PUERTO BANÚS
                </span>
              </div>
            </RevealOnScroll>
          </div>

          {/* Enhanced CTA Section */}
          <RevealOnScroll delay={800} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <MagneticButton strength={0.2}>
              <RippleButton className="group relative overflow-hidden min-w-[280px] h-16 rounded-xl bg-gradient-premium text-primary-foreground hover:shadow-glow hover:scale-105 border-2 border-primary-glow/20 transition-all duration-300">
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-semibold tracking-wide">Schedule Private Viewing</span>
                </div>
              </RippleButton>
            </MagneticButton>
            
            <MagneticButton strength={0.15}>
              <Button 
                variant="outline-white" 
                size="xl" 
                className="group min-w-[280px] h-16 rounded-xl border-2 border-white/40 bg-white/15 hover:bg-white/25 hover:border-white/60 backdrop-blur-xl transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-3 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                <span className="font-medium">Watch Virtual Tour</span>
              </Button>
            </MagneticButton>
          </RevealOnScroll>

          {/* Enhanced Stats Section */}
          <RevealOnScroll delay={1000} className="grid grid-cols-3 gap-8 md:gap-16 max-w-5xl mx-auto">
            {[
              { value: "€2.5M+", label: "Average Value", delay: 0 },
              { value: "15+", label: "Years Excellence", delay: 200 },
              { value: "100%", label: "Client Satisfaction", delay: 400 }
            ].map((stat, index) => (
              <RevealOnScroll key={stat.label} delay={1000 + stat.delay}>
                <TiltCard maxTilt={8} className="group text-center">
                  <div className="relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10">
                    <div className="space-y-3">
                      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white group-hover:text-primary transition-all duration-500 transform group-hover:scale-110">
                        {stat.value}
                      </div>
                      <div className="text-sm md:text-base text-white/80 uppercase tracking-widest font-medium">
                        {stat.label}
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </TiltCard>
              </RevealOnScroll>
            ))}
          </RevealOnScroll>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <RevealOnScroll delay={1200} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <MagneticButton strength={0.1}>
          <button
            onClick={scrollToContent}
            className="flex flex-col items-center text-white/70 hover:text-white transition-all duration-500 group"
            aria-label="Scroll to explore properties"
          >
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/60 to-transparent mb-3 group-hover:via-primary transition-colors duration-300" />
            <span className="text-xs uppercase tracking-widest font-medium mb-3 group-hover:text-primary transition-colors duration-300">Explore</span>
            <div className="relative">
              <ChevronDown className="w-5 h-5 animate-bounce group-hover:translate-y-1 transition-transform duration-300" />
              <div className="absolute inset-0 w-5 h-5 bg-primary/20 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </button>
        </MagneticButton>
      </RevealOnScroll>

      {/* Enhanced Geometric Accents */}
      <FloatingElement delay={2} duration={8} className="absolute top-1/4 right-16 w-20 h-20 border-2 border-white/20 rotate-45 hidden xl:block hover:border-primary transition-colors duration-500">
        <div />
      </FloatingElement>
      <FloatingElement delay={4} duration={6} className="absolute bottom-1/4 left-16 w-16 h-16 border-2 border-primary/40 rotate-12 hidden xl:block hover:border-primary transition-colors duration-500">
        <div />
      </FloatingElement>
      
      {/* Additional floating elements */}
      <FloatingElement delay={1} duration={10} className="absolute top-1/2 right-8 w-2 h-2 bg-primary rounded-full opacity-60 hidden lg:block">
        <div />
      </FloatingElement>
      <FloatingElement delay={3} duration={7} className="absolute top-3/4 left-8 w-1 h-1 bg-secondary rounded-full opacity-40 hidden lg:block">
        <div />
      </FloatingElement>
    </section>
  );
}
