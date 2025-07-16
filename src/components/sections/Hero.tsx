
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ArrowRight, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RippleEffect } from "@/components/ui/RippleEffect";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsVisible = useIntersectionObserver(statsRef, { threshold: 0.3 });
  
  const propertiesCount = useAnimatedCounter(250, isStatsVisible, 2000);
  const yearsExperience = useAnimatedCounter(15, isStatsVisible, 1500);
  const clientsSatisfied = useAnimatedCounter(500, isStatsVisible, 2500);

  const handleScheduleViewing = () => {
    navigate('/calendar');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Background with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/src/assets/hero-costa-del-sol-luxury.jpg')",
          transform: "translateZ(0)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-float" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-float-delayed" />
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-float" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-8 animate-fade-in">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            <span className="block animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
              {t('hero.title')}
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed animate-slide-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <RippleEffect>
              <MagneticButton
                onClick={handleScheduleViewing}
                variant="hero"
                size="xl"
                className="group bg-gradient-premium hover:shadow-luxury hover:scale-105 transition-all duration-500 text-lg px-8 py-4"
              >
                {t('hero.cta')}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </MagneticButton>
            </RippleEffect>
          </div>

          {/* SEO Dashboard Access - Only for authenticated users */}
          {user && (
            <div className="flex justify-center mb-16 animate-fade-in">
              <Button 
                asChild
                variant="ghost" 
                size="sm"
                className="text-white/70 hover:text-primary border border-white/20 hover:border-primary/50 bg-white/5 hover:bg-primary/10 transition-all duration-300"
              >
                <Link to="/seo-dashboard" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm font-medium">SEO Dashboard</span>
                </Link>
              </Button>
            </div>
          )}

          {/* Professional Stats Section */}
          <div ref={statsRef} className="grid grid-cols-3 gap-8 md:gap-16 max-w-4xl mx-auto animate-fade-in">
            <div className="text-center group">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                {propertiesCount}+
              </div>
              <div className="text-sm md:text-base text-gray-300 uppercase tracking-wider">
                Luxury Properties
              </div>
            </div>
            
            <div className="text-center group border-x border-white/20">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                {yearsExperience}+
              </div>
              <div className="text-sm md:text-base text-gray-300 uppercase tracking-wider">
                Years Experience
              </div>
            </div>
            
            <div className="text-center group">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                {clientsSatisfied}+
              </div>
              <div className="text-sm md:text-base text-gray-300 uppercase tracking-wider">
                Satisfied Clients
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
