
import { useState, useEffect } from "react";
import { Menu, X, Search, ChevronDown, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { cn } from "@/lib/utils";
import { EnhancedMegaMenu } from "./EnhancedMegaMenu";
import MobileMenu from "./MobileMenu";
import SearchOverlay from "./SearchOverlay";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className }: NavigationProps) {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
    { label: t('nav.home'), href: "/" },
    { 
      label: t('nav.properties'), 
      href: "/properties",
      hasDropdown: true,
      megaMenu: true
    },
    { 
      label: t('nav.locations'), 
      href: "/locations",
      hasDropdown: true
    },
    { label: t('nav.about'), href: "/about" },
    { label: "Investment Guide", href: "/guide/fix-flip-vs-buy-hold" },
    { label: t('nav.blog'), href: "/blog" },
  ];

  const handleMenuClick = (e: React.MouseEvent, itemLabel: string, hasDropdown?: boolean) => {
    if (hasDropdown) {
      e.preventDefault();
      e.stopPropagation();
      setActiveMenu(activeMenu === itemLabel ? null : itemLabel);
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
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
              <Link
                to="/"
                className={cn(
                  "text-2xl lg:text-3xl font-bold font-display bg-gradient-premium bg-clip-text text-transparent hover:scale-105 transition-all duration-500 ease-premium",
                  isScrolled ? "scale-95" : "scale-100"
                )}
              >
                DelSolPrimeHomes
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <div key={item.label} className="relative">
                  <Link
                    to={item.href}
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
                  </Link>
                  
                  {/* Enhanced Mega Menu */}
                  {item.megaMenu && activeMenu === item.label && (
                    <EnhancedMegaMenu 
                      isOpen={true} 
                      onClose={() => setActiveMenu(null)} 
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Language Selector */}
              <LanguageSelector 
                variant="navigation" 
                className={cn(
                  "transition-all duration-300",
                  isScrolled ? "text-foreground" : "text-white hover:bg-white/10"
                )}
              />

              {/* User Account */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
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
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-md border border-border/50">
                    <DropdownMenuItem className="font-medium">
                      {user.email}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      {t('common.signOut')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className={cn(
                    "transition-all duration-300",
                    isScrolled ? "text-foreground" : "text-white hover:bg-white/10"
                  )}
                >
                  <Link to="/auth">
                    <User className="w-4 h-4" />
                  </Link>
                </Button>
              )}
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
