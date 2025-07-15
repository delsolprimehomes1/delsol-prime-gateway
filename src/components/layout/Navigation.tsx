
import { useState, useEffect } from "react";
import { Menu, X, Globe, Search, ChevronDown, MapPin, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import SearchOverlay from "./SearchOverlay";

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = () => {
      setActiveMenu(null);
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const navigationItems = [
    { label: "Home", href: "/" },
    { 
      label: "Properties", 
      href: "/properties",
      hasDropdown: true,
      megaMenu: true
    },
    { 
      label: "Locations", 
      href: "/locations",
      hasDropdown: true
    },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const toggleLanguage = () => {
    setCurrentLang(currentLang === "EN" ? "ES" : "EN");
  };

  const handleMenuClick = (e: React.MouseEvent, itemLabel: string, hasDropdown?: boolean) => {
    if (hasDropdown) {
      e.preventDefault();
      e.stopPropagation();
      setActiveMenu(activeMenu === itemLabel ? null : itemLabel);
    }
  };

  return (
    <>
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
            {/* Logo with scroll animation */}
            <div className="flex-shrink-0">
              <a
                href="/"
                className={cn(
                  "text-2xl lg:text-3xl font-bold font-display bg-gradient-premium bg-clip-text text-transparent hover:scale-105 transition-all duration-500 ease-premium",
                  isScrolled ? "scale-95" : "scale-100"
                )}
              >
                DelSolPrimeHomes
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <div key={item.label} className="relative">
                  <a
                    href={item.href}
                    onClick={(e) => handleMenuClick(e, item.label, item.hasDropdown)}
                    className={cn(
                      "relative text-sm font-medium transition-all duration-300 ease-premium group flex items-center gap-1",
                      isScrolled ? "text-foreground" : "text-white",
                      "hover:text-primary"
                    )}
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown 
                        className={cn(
                          "w-4 h-4 transition-transform duration-300",
                          activeMenu === item.label ? "rotate-180" : "rotate-0"
                        )} 
                      />
                    )}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-premium transition-all duration-300 group-hover:w-full" />
                  </a>
                  
                  {/* Mega Menu */}
                  {item.megaMenu && activeMenu === item.label && (
                    <MegaMenu onClose={() => setActiveMenu(null)} />
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Search Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className={cn(
                  "transition-all duration-300",
                  isScrolled ? "text-foreground" : "text-white hover:bg-white/10"
                )}
              >
                <Search className="w-4 h-4" />
              </Button>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "transition-all duration-300 relative",
                  isScrolled ? "text-foreground" : "text-white hover:bg-white/10"
                )}
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
              </Button>

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

              {/* User Account */}
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "transition-all duration-300",
                  isScrolled ? "text-foreground" : "text-white hover:bg-white/10"
                )}
              >
                <User className="w-4 h-4" />
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
      </nav>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        currentLang={currentLang}
        onToggleLanguage={toggleLanguage}
        navigationItems={navigationItems}
      />

      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
