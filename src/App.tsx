
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "@/components/integrations/ErrorBoundary";
import { AnalyticsProvider } from "@/components/integrations/AnalyticsProvider";
import { PerformanceMonitor } from "@/components/performance/PerformanceMonitor";
import { ServiceWorkerProvider } from "@/components/performance/ServiceWorker";
import { CoreWebVitalsOptimizer } from "@/components/performance/CoreWebVitalsOptimizer";
import { SearchEngineVerification } from "@/components/seo/SearchEngineVerification";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import FAQ from "./pages/FAQ";
import Glossary from "./pages/Glossary";
import FixFlipBuyHoldGuide from "./pages/FixFlipBuyHoldGuide";
import Auth from "./pages/Auth";
import Calendar from "./pages/Calendar";
import SEODashboard from "./pages/SEODashboard";
import NotFound from "./pages/NotFound";
import Marbella from "./pages/locations/Marbella";
import Estepona from "./pages/locations/Estepona";
import Mijas from "./pages/locations/Mijas";
import Fuengirola from "./pages/locations/Fuengirola";
import Benalmadena from "./pages/locations/Benalmadena";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        if (failureCount < 3) return true;
        return false;
      },
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AnalyticsProvider>
          <AuthProvider>
            <LanguageProvider>
              <TooltipProvider>
                <SearchEngineVerification 
                  googleVerificationCode={import.meta.env.VITE_GOOGLE_VERIFICATION}
                  bingVerificationCode={import.meta.env.VITE_BING_VERIFICATION}
                />
                <PerformanceMonitor />
                <CoreWebVitalsOptimizer />
                <ServiceWorkerProvider />
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <ScrollToTop />
                  <div className="min-h-screen bg-background">
                    <Navigation />
                    <main className="pt-16 lg:pt-20">
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogPost />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/glossary" element={<Glossary />} />
                        <Route path="/guide/fix-flip-vs-buy-hold" element={<FixFlipBuyHoldGuide />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/locations/marbella" element={<Marbella />} />
                        <Route path="/locations/estepona" element={<Estepona />} />
                        <Route path="/locations/mijas" element={<Mijas />} />
                        <Route path="/locations/fuengirola" element={<Fuengirola />} />
                        <Route path="/locations/benalmadena" element={<Benalmadena />} />
                        <Route 
                          path="/seo-dashboard" 
                          element={
                            <ProtectedRoute>
                              <SEODashboard />
                            </ProtectedRoute>
                          } 
                        />
                        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                    <Footer />
                  </div>
                </BrowserRouter>
              </TooltipProvider>
            </LanguageProvider>
          </AuthProvider>
        </AnalyticsProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
