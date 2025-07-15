import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];

  const toggleLanguage = () => {
    setCurrentLang(currentLang === "EN" ? "NL" : "EN");
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-premium",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-elegant border-b border-border/50"
          : "bg-transparent",
        className
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-2xl lg:text-3xl font-bold font-display bg-gradient-premium bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
            >
              DelSolPrimeHomes
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium transition-all duration-300 ease-premium group",
                  isScrolled ? "text-foreground" : "text-white"
                )}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-premium transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className={cn(
                "transition-all duration-300",
                isScrolled ? "text-foreground" : "text-white hover:bg-white/10"
              )}
            >
              <Globe className="w-4 h-4 mr-2" />
              {currentLang}
            </Button>

            {/* Contact Button */}
            <Button
              variant={isScrolled ? "hero" : "outline-white"}
              size="sm"
              className="font-semibold"
            >
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "transition-all duration-300",
                isScrolled ? "text-foreground" : "text-white hover:bg-white/10"
              )}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-16 bg-background/95 backdrop-blur-md border-b border-border/50 transition-all duration-300 ease-premium",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col space-y-4">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-lg font-medium text-foreground hover:text-primary transition-colors duration-300 py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="text-foreground"
              >
                <Globe className="w-4 h-4 mr-2" />
                {currentLang}
              </Button>
              
              <Button variant="hero" size="sm">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}