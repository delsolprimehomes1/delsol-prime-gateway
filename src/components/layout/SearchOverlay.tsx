
import { useState, useEffect } from "react";
import { Search, X, MapPin, Home, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const recentSearches = [
    "Luxury villa Marbella",
    "Apartment Puerto Banús",
    "Penthouse sea view",
    "Townhouse Estepona"
  ];

  const popularSearches = [
    { icon: Home, text: "Beachfront properties" },
    { icon: MapPin, text: "Marbella Golden Mile" },
    { icon: TrendingUp, text: "Investment properties" },
    { icon: Home, text: "Golf course properties" }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md animate-fade-in">
      <div className="container mx-auto px-4 py-8 h-full">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-display">Search Properties</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Search Input */}
          <div className="relative mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by location, property type, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-16 pl-14 pr-6 bg-card border border-border rounded-xl text-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                autoFocus
              />
            </div>
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Recent Searches */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                Recent Searches
              </h3>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(search)}
                    className="w-full text-left p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200 text-muted-foreground hover:text-foreground"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Searches */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-muted-foreground" />
                Popular Searches
              </h3>
              <div className="space-y-2">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(search.text)}
                    className="w-full text-left p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200 flex items-center gap-3 text-muted-foreground hover:text-foreground group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                      <search.icon className="w-4 h-4 text-primary" />
                    </div>
                    {search.text}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search Results or Call to Action */}
          {searchQuery && (
            <div className="mt-8 p-6 bg-accent/30 rounded-xl">
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-2">Ready to search for "{searchQuery}"?</h4>
                <p className="text-muted-foreground mb-4">
                  Discover luxury properties that match your criteria
                </p>
                <Button variant="hero" size="lg" onClick={onClose}>
                  Search Properties
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
