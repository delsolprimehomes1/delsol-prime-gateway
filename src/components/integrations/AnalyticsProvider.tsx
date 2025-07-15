
import { ReactNode, useEffect } from 'react';

interface AnalyticsProviderProps {
  children: ReactNode;
  gaId?: string;
  enableDebug?: boolean;
}

export function AnalyticsProvider({ 
  children, 
  gaId = 'G-XXXXXXXXXX', // Replace with actual GA4 ID
  enableDebug = false 
}: AnalyticsProviderProps) {
  useEffect(() => {
    // Google Analytics 4 setup
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', gaId, {
      debug_mode: enableDebug,
      send_page_view: true
    });

    // Track page views on route changes
    const handleRouteChange = () => {
      gtag('config', gaId, {
        page_path: window.location.pathname,
      });
    };

    // Listen for route changes (for SPA)
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [gaId, enableDebug]);

  return <>{children}</>;
}

// Analytics event tracking utilities
export const analytics = {
  trackEvent: (eventName: string, parameters: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  },

  trackPageView: (pagePath: string, pageTitle?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_path: pagePath,
        page_title: pageTitle,
      });
    }
  },

  trackConversion: (conversionName: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: `G-XXXXXXXXXX/${conversionName}`,
        value: value,
        currency: 'EUR',
      });
    }
  },

  trackUserEngagement: (engagementTime: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'user_engagement', {
        engagement_time_msec: engagementTime,
      });
    }
  }
};

// Global type declarations
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
