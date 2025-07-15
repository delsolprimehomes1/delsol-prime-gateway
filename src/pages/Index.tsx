import Navigation from "@/components/layout/Navigation";
import Hero from "@/components/sections/Hero";
import ServicesSection from "@/components/sections/ServicesSection";
import LocationShowcase from "@/components/sections/LocationShowcase";
import PropertySearch from "@/components/sections/PropertySearch";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ServicesSection />
      <LocationShowcase />
      <PropertySearch />
    </div>
  );
};

export default Index;
