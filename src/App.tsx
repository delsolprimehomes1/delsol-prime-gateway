
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
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import FAQ from "./pages/FAQ";
import Auth from "./pages/Auth";
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
            <TooltipProvider>
              <PerformanceMonitor />
              <ServiceWorkerProvider />
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/auth" element={<Auth />} />
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
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </AnalyticsProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
