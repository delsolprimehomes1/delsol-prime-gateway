
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

export function PerformanceMonitor() {
  useEffect(() => {
    // Enhanced Core Web Vitals monitoring
    let lcpValue = 0;
    let clsValue = 0;
    let inpValue = 0;

    // Monitor LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      lcpValue = lastEntry.startTime;
      
      console.log(`LCP: ${lcpValue}ms`, lcpValue < 2500 ? '✅' : '❌');
      
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'web_vitals', {
          metric_name: 'LCP',
          metric_value: Math.round(lcpValue),
          page_location: window.location.href,
          is_good: lcpValue < 2500,
        });
      }
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Monitor CLS (Cumulative Layout Shift)
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShiftEntry = entry as LayoutShiftEntry;
        if (!layoutShiftEntry.hadRecentInput) {
          clsValue += layoutShiftEntry.value;
        }
      }
      
      console.log(`CLS: ${clsValue}`, clsValue < 0.1 ? '✅' : '❌');
      
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'web_vitals', {
          metric_name: 'CLS',
          metric_value: Math.round(clsValue * 1000) / 1000,
          page_location: window.location.href,
          is_good: clsValue < 0.1,
        });
      }
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // Monitor INP (Interaction to Next Paint)
    const inpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const eventEntry = entry as any;
        if (eventEntry.processingStart && eventEntry.startTime) {
          inpValue = eventEntry.processingStart - eventEntry.startTime;
          
          console.log(`INP: ${inpValue}ms`, inpValue < 200 ? '✅' : '❌');
          
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'web_vitals', {
              metric_name: 'INP',
              metric_value: Math.round(inpValue),
              page_location: window.location.href,
              is_good: inpValue < 200,
            });
          }
        }
      }
    });
    inpObserver.observe({ entryTypes: ['event'] });

    // Monitor FCP (First Contentful Paint)
    const fcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          console.log(`FCP: ${entry.startTime}ms`, entry.startTime < 1800 ? '✅' : '❌');
        }
      }
    });
    fcpObserver.observe({ entryTypes: ['paint'] });

    // Cleanup
    return () => {
      lcpObserver.disconnect();
      clsObserver.disconnect();
      inpObserver.disconnect();
      fcpObserver.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
}

// Enhanced Performance utilities
export const performanceUtils = {
  // Measure custom metrics
  measureCustomMetric: (name: string, startTime: number) => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.log(`${name}: ${duration}ms`);
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'custom_performance', {
        metric_name: name,
        metric_value: Math.round(duration),
      });
    }
  },

  // Preload critical resources with priority
  preloadCriticalResource: (href: string, as: string, crossorigin?: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (crossorigin) link.crossOrigin = crossorigin;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  },

  // Prefetch non-critical resources
  prefetchResource: (href: string) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  },

  // Optimize font loading
  preloadFont: (href: string, type: string = 'font/woff2') => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = 'font';
    link.type = type;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  },

  // Critical CSS injection with media query optimization
  injectCriticalCSS: (css: string, media?: string) => {
    const style = document.createElement('style');
    style.textContent = css;
    style.setAttribute('data-critical', 'true');
    if (media) style.media = media;
    document.head.appendChild(style);
  },

  // Defer non-critical JavaScript
  deferScript: (src: string, onLoad?: () => void) => {
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    if (onLoad) script.onload = onLoad;
    document.head.appendChild(script);
  },

  // Async script loading
  asyncScript: (src: string, onLoad?: () => void) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    if (onLoad) script.onload = onLoad;
    document.head.appendChild(script);
  }
};
