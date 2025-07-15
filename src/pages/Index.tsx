import Navigation from "@/components/layout/Navigation";
import Hero from "@/components/sections/Hero";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      
      {/* Placeholder for future sections */}
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold font-display mb-4">Section 1: Foundation & Hero Complete</h2>
          <p className="text-lg text-muted-foreground">
            The hero section and navigation are now ready. Next sections will include Services & Features, 
            Blog Integration, FAQ System, and more premium functionality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
