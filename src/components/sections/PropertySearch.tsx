import { useState } from "react";
import { Search, MapPin, Home, Euro, Bed, Bath, Filter } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

const PropertySearch = () => {
  const [priceRange, setPriceRange] = useState([500000]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const locations = [
    "All Locations", "Marbella", "Estepona", "Mijas", "Fuengirola", "Benalmádena", "Nerja", "Torrox"
  ];

  const propertyTypes = [
    "All Types", "Apartment", "Villa", "Penthouse", "Townhouse", "Plot", "Commercial"
  ];

  const bedrooms = ["Any", "1+", "2+", "3+", "4+", "5+"];
  const bathrooms = ["Any", "1+", "2+", "3+", "4+", "5+"];

  const specialFeatures = [
    { id: "pool", label: "Swimming Pool", color: "border-l-blue-500" },
    { id: "seaview", label: "Sea View", color: "border-l-cyan-500" },
    { id: "garden", label: "Private Garden", color: "border-l-green-500" },
    { id: "garage", label: "Garage", color: "border-l-gray-500" },
    { id: "terrace", label: "Terrace", color: "border-l-orange-500" },
    { id: "aircon", label: "Air Conditioning", color: "border-l-purple-500" }
  ];

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  return (
    <Section id="property-search" padding="xl" background="gradient">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
            PROPERTY SEARCH
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold font-display mb-6 text-white">
            Find Your Perfect
            <br />
            <span className="text-white/90">Costa del Sol Home</span>
          </h2>
          
          <p className="text-lg text-white/80">
            Use our advanced search to discover properties that match your exact requirements.
          </p>
        </div>

        {/* Search Interface */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-luxury">
          {/* Main Search Fields */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                Location
              </label>
              <Select>
                <SelectTrigger className="border-l-4 border-l-primary">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location.toLowerCase()}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center">
                <Home className="w-4 h-4 mr-2 text-secondary" />
                Property Type
              </label>
              <Select>
                <SelectTrigger className="border-l-4 border-l-secondary">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map(type => (
                    <SelectItem key={type} value={type.toLowerCase()}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Bedrooms */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center">
                <Bed className="w-4 h-4 mr-2 text-green-500" />
                Bedrooms
              </label>
              <Select>
                <SelectTrigger className="border-l-4 border-l-green-500">
                  <SelectValue placeholder="Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  {bedrooms.map(bed => (
                    <SelectItem key={bed} value={bed.toLowerCase()}>
                      {bed}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Bathrooms */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center">
                <Bath className="w-4 h-4 mr-2 text-blue-500" />
                Bathrooms
              </label>
              <Select>
                <SelectTrigger className="border-l-4 border-l-blue-500">
                  <SelectValue placeholder="Bathrooms" />
                </SelectTrigger>
                <SelectContent>
                  {bathrooms.map(bath => (
                    <SelectItem key={bath} value={bath.toLowerCase()}>
                      {bath}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <label className="text-sm font-medium text-muted-foreground flex items-center mb-4">
              <Euro className="w-4 h-4 mr-2 text-primary" />
              Price Range: €{priceRange[0].toLocaleString()}+
            </label>
            <div className="px-4">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={5000000}
                min={100000}
                step={50000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>€100K</span>
                <span>€5M+</span>
              </div>
            </div>
          </div>

          {/* Special Features */}
          <div className="mb-8">
            <label className="text-sm font-medium text-muted-foreground flex items-center mb-4">
              <Filter className="w-4 h-4 mr-2 text-primary" />
              Special Features
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {specialFeatures.map(feature => (
                <div
                  key={feature.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border-l-4 ${feature.color} bg-muted/50 hover:bg-muted transition-colors duration-200 cursor-pointer`}
                  onClick={() => handleFeatureToggle(feature.id)}
                >
                  <Checkbox
                    id={feature.id}
                    checked={selectedFeatures.includes(feature.id)}
                    onChange={() => handleFeatureToggle(feature.id)}
                  />
                  <label
                    htmlFor={feature.id}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {feature.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Search Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-12 font-medium">
              <Search className="w-5 h-5 mr-2" />
              Search Properties
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              Save Search
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {[
            { number: "500+", label: "Properties Available", color: "text-white" },
            { number: "50+", label: "Locations Covered", color: "text-white/90" },
            { number: "95%", label: "Client Satisfaction", color: "text-white/90" },
            { number: "24/7", label: "Expert Support", color: "text-white/90" }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className={`text-3xl font-bold font-display mb-2 ${stat.color}`}>
                {stat.number}
              </div>
              <div className="text-white/70 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default PropertySearch;