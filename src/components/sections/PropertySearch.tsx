
import { useState } from "react";
import { Search, MapPin, Home, Euro, Bed, Bath, Filter } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useLanguage } from "@/contexts/LanguageContext";

const PropertySearch = () => {
  const { t } = useLanguage();
  const [priceRange, setPriceRange] = useState([500000]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  // Animated counters for stats
  const { elementRef: statsRef, isVisible: statsVisible } = useIntersectionObserver({ threshold: 0.3 });
  
  
  const propertiesCount = useAnimatedCounter({ target: 500, isVisible: statsVisible, suffix: "+", duration: 2000 });
  const locationsCount = useAnimatedCounter({ target: 50, isVisible: statsVisible, suffix: "+", duration: 2200 });
  const satisfactionRate = useAnimatedCounter({ target: 95, isVisible: statsVisible, suffix: "%", duration: 2400 });

  const locations = [
    t('propertySearch.locations.allLocations'),
    t('propertySearch.locations.marbella'),
    t('propertySearch.locations.estepona'),
    t('propertySearch.locations.mijas'),
    t('propertySearch.locations.fuengirola'),
    t('propertySearch.locations.benalmadena'),
    t('propertySearch.locations.nerja'),
    t('propertySearch.locations.torrox')
  ];

  const propertyTypes = [
    t('propertySearch.propertyTypes.allTypes'),
    t('propertySearch.propertyTypes.apartment'),
    t('propertySearch.propertyTypes.villa'),
    t('propertySearch.propertyTypes.penthouse'),
    t('propertySearch.propertyTypes.townhouse'),
    t('propertySearch.propertyTypes.plot'),
    t('propertySearch.propertyTypes.commercial')
  ];

  const bedrooms = [
    t('propertySearch.rooms.any'),
    t('propertySearch.rooms.onePlus'),
    t('propertySearch.rooms.twoPlus'),
    t('propertySearch.rooms.threePlus'),
    t('propertySearch.rooms.fourPlus'),
    t('propertySearch.rooms.fivePlus')
  ];
  
  const bathrooms = [
    t('propertySearch.rooms.any'),
    t('propertySearch.rooms.onePlus'),
    t('propertySearch.rooms.twoPlus'),
    t('propertySearch.rooms.threePlus'),
    t('propertySearch.rooms.fourPlus'),
    t('propertySearch.rooms.fivePlus')
  ];

  const specialFeatures = [
    { id: "pool", label: t('propertySearch.features.pool'), color: "border-l-blue-500" },
    { id: "seaview", label: t('propertySearch.features.seaview'), color: "border-l-cyan-500" },
    { id: "garden", label: t('propertySearch.features.garden'), color: "border-l-green-500" },
    { id: "garage", label: t('propertySearch.features.garage'), color: "border-l-gray-500" },
    { id: "terrace", label: t('propertySearch.features.terrace'), color: "border-l-orange-500" },
    { id: "aircon", label: t('propertySearch.features.aircon'), color: "border-l-purple-500" }
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
            {t('propertySearch.badge')}
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold font-display mb-6 text-white">
            {t('propertySearch.title')}
            <br />
            <span className="text-white/90">{t('propertySearch.titleHighlight')}</span>
          </h2>
          
          <p className="text-lg text-white/80">
            {t('propertySearch.subtitle')}
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
                {t('propertySearch.location')}
              </label>
              <Select>
                <SelectTrigger className="border-l-4 border-l-primary">
                  <SelectValue placeholder={t('propertySearch.selectLocation')} />
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
                {t('propertySearch.propertyType')}
              </label>
              <Select>
                <SelectTrigger className="border-l-4 border-l-secondary">
                  <SelectValue placeholder={t('propertySearch.selectType')} />
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
                {t('propertySearch.bedrooms')}
              </label>
              <Select>
                <SelectTrigger className="border-l-4 border-l-green-500">
                  <SelectValue placeholder={t('propertySearch.bedrooms')} />
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
                {t('propertySearch.bathrooms')}
              </label>
              <Select>
                <SelectTrigger className="border-l-4 border-l-blue-500">
                  <SelectValue placeholder={t('propertySearch.bathrooms')} />
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
              {t('propertySearch.priceRange')}: €{priceRange[0].toLocaleString()}+
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
              {t('propertySearch.specialFeatures')}
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
              {t('propertySearch.searchProperties')}
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              {t('propertySearch.saveSearch')}
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {[
            { number: propertiesCount, label: t('propertySearch.stats.propertiesAvailable'), color: "text-white" },
            { number: locationsCount, label: t('propertySearch.stats.locationsCovered'), color: "text-white/90" },
            { number: satisfactionRate, label: t('propertySearch.stats.clientSatisfaction'), color: "text-white/90" },
            { number: "24/7", label: t('propertySearch.stats.expertSupport'), color: "text-white/90" }
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
