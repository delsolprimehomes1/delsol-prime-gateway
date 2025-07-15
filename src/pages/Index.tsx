
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ServicesSection from "@/components/sections/ServicesSection";
import LocationShowcase from "@/components/sections/LocationShowcase";
import PropertySearch from "@/components/sections/PropertySearch";
import BlogSection from "@/components/sections/BlogSection";
import FAQSection from "@/components/sections/FAQSection";
import SEOHead from "@/components/seo/SEOHead";
import { organizationSchema, realEstateAgentSchema, websiteSchema } from "@/utils/seo/structuredData";
import { generateTitle, META_DESCRIPTIONS } from "@/utils/seo/metaUtils";

const Index = () => {
  const structuredData = [
    organizationSchema,
    realEstateAgentSchema,
    websiteSchema
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={generateTitle()}
        description={META_DESCRIPTIONS.homepage}
        canonical="/"
        structuredData={structuredData}
      />
      <Navigation />
      <Hero />
      <ServicesSection />
      <LocationShowcase />
      <PropertySearch />
      <BlogSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
