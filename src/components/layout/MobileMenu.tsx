
import { useState } from "react";
import { Globe, Search, User, Bell, ChevronRight, ChevronDown, MapPin, Home, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  megaMenu?: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: string;
  onToggleLanguage: () => void;
  navigationItems: NavigationItem[];
}

export default function MobileMenu({ 
  isOpen, 
  onClose, 
  currentLang, 
  onToggleLanguage, 
  navigationItems 
}: MobileMenuProps) {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const propertyTypes = [
    { name: "Luxury Villas", icon: Home, href: "/properties/villas" },
    { name: "Apartments", icon: Building, href: "/properties/apartments" },
    { name: "Penthouses", icon: Building, href: "/properties/penthouses" },
    { name: "Townhouses", icon: Home, href: "/properties/townhouses" },
  ];

  const locations = [
    { name: "Marbella", href: "/locations/marbella" },
    { name: "Puerto Banús", href: "/locations/puerto-banus" },
    { name: "Estepona", href: "/locations/estepona" },
    { name: "Benahavís", href: "/locations/benahavis" },
  ];

  const handleSubmenuToggle = (itemLabel: string) => {
    setActiveSubmenu(activeSubmenu === itemLabel ? null : itemLabel);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed top-0 right-0 h-full w-80 bg-background/95 backdrop-blur-md border-l border-border/50 z-50 transition-all duration-500 ease-premium overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="border-b border-border/50 pb-6">
            <div className="text-2xl font-bold font-display bg-gradient-premium bg-clip-text text-transparent">
              DelSolPrimeHomes
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm" className="justify-start gap-2">
              <Search className="w-4 h-4" />
              Search
            </Button>
            <Button variant="outline" size="sm" className="justify-start gap-2">
              <User className="w-4 h-4" />
              Account
            </Button>
          </div>

          {/* Navigation Items */}
          <div className="space-y-2">
            {navigationItems.map((item, index) => (
              <div key={item.label}>
                <div
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-all duration-200 cursor-pointer",
                    "animate-slide-in-right"
                  )}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "both"
                  }}
                  onClick={() => {
                    if (item.hasDropdown) {
                      handleSubmenuToggle(item.label);
                    } else {
                      onClose();
                    }
                  }}
                >
                  <a
                    href={item.href}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors flex-1"
                    onClick={(e) => {
                      if (item.hasDropdown) {
                        e.preventDefault();
                      }
                    }}
                  >
                    {item.label}
                  </a>
                  {item.hasDropdown && (
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-muted-foreground transition-transform duration-200",
                        activeSubmenu === item.label ? "rotate-180" : "rotate-0"
                      )}
                    />
                  )}
                </div>

                {/* Submenu for Properties */}
                {item.label === "Properties" && activeSubmenu === item.label && (
                  <div className="ml-4 mt-2 space-y-2 animate-fade-in">
                    <div className="text-sm font-semibold text-muted-foreground mb-3">Property Types</div>
                    {propertyTypes.map((type) => (
                      <a
                        key={type.name}
                        href={type.href}
                        onClick={onClose}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/30 transition-colors"
                      >
                        <type.icon className="w-4 h-4 text-primary" />
                        <span className="text-foreground">{type.name}</span>
                      </a>
                    ))}
                  </div>
                )}

                {/* Submenu for Locations */}
                {item.label === "Locations" && activeSubmenu === item.label && (
                  <div className="ml-4 mt-2 space-y-2 animate-fade-in">
                    <div className="text-sm font-semibold text-muted-foreground mb-3">Popular Areas</div>
                    {locations.map((location) => (
                      <a
                        key={location.name}
                        href={location.href}
                        onClick={onClose}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/30 transition-colors"
                      >
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-foreground">{location.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="border-t border-border/50 pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleLanguage}
                className="justify-start gap-2"
              >
                <Globe className="w-4 h-4" />
                Language: {currentLang}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
              </Button>
            </div>
            
            <Button variant="hero" size="lg" className="w-full">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
