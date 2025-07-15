
import { useEffect } from 'react';

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

// Type definitions for performance entries
interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface FirstInputEntry extends PerformanceEntry {
  processingStart: number;
  startTime: number;
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log(`${entry.name}: ${entry.startTime}ms`);
        
        // Send metrics to analytics (replace with your analytics service)
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'web_vitals', {
            metric_name: entry.name,
            metric_value: Math.round(entry.startTime),
            page_location: window.location.href,
          });
        }
      }
    });

    // Observe navigation timing
    observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });

    // Monitor Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShiftEntry = entry as LayoutShiftEntry;
        if (!layoutShiftEntry.hadRecentInput) {
          clsValue += layoutShiftEntry.value;
        }
      }
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // Monitor First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const firstInputEntry = entry as FirstInputEntry;
        console.log('FID:', firstInputEntry.processingStart - firstInputEntry.startTime);
      }
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Cleanup
    return () => {
      observer.disconnect();
      clsObserver.disconnect();
      fidObserver.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
}

// Performance utilities
export const performanceUtils = {
  // Measure custom metrics
  measureCustomMetric: (name: string, startTime: number) => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.log(`${name}: ${duration}ms`);
    
    // Send to analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'custom_performance', {
        metric_name: name,
        metric_value: Math.round(duration),
      });
    }
  },

  // Preload critical resources
  preloadResource: (href: string, as: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  },

  // Critical CSS injection
  injectCriticalCSS: (css: string) => {
    const style = document.createElement('style');
    style.textContent = css;
    style.setAttribute('data-critical', 'true');
    document.head.appendChild(style);
  }
};
