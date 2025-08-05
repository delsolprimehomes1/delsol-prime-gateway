import { useEffect } from 'react';
import { performanceUtils } from './PerformanceMonitor';

// Core Web Vitals optimization component
export function CoreWebVitalsOptimizer() {
  useEffect(() => {
    // Preload critical fonts
    performanceUtils.preloadFont('/fonts/inter-var.woff2');
    
    // Preload critical images (hero, above-the-fold)
    performanceUtils.preloadCriticalResource('/assets/hero-costa-del-sol-luxury.jpg', 'image', 'anonymous');
    
    // Optimize largest contentful paint
    const optimizeLCP = () => {
      // Remove unused CSS
      const unusedStyles = document.querySelectorAll('style[data-unused="true"]');
      unusedStyles.forEach(style => style.remove());
      
      // Prioritize visible content
      const visibleImages = document.querySelectorAll('img[data-priority="high"]');
      visibleImages.forEach(img => {
        (img as HTMLImageElement).fetchPriority = 'high';
      });
    };

    // Prevent cumulative layout shift
    const preventCLS = () => {
      // Set dimensions for all images without explicit dimensions
      const images = document.querySelectorAll('img:not([width]):not([height])');
      images.forEach(img => {
        const element = img as HTMLImageElement;
        if (element.naturalWidth && element.naturalHeight) {
          element.width = element.naturalWidth;
          element.height = element.naturalHeight;
        }
      });

      // Reserve space for dynamic content
      const dynamicContainers = document.querySelectorAll('[data-dynamic-content]');
      dynamicContainers.forEach(container => {
        const element = container as HTMLElement;
        if (!element.style.minHeight) {
          element.style.minHeight = '200px'; // Reserve minimum space
        }
      });
    };

    // Optimize interaction to next paint
    const optimizeINP = () => {
      // Debounce rapid interactions
      let interactionTimeout: NodeJS.Timeout;
      
      document.addEventListener('click', (e) => {
        clearTimeout(interactionTimeout);
        interactionTimeout = setTimeout(() => {
          // Process interaction after brief delay
        }, 16); // ~1 frame
      }, { passive: true });

      // Use requestIdleCallback for non-critical work
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          // Defer non-critical JavaScript execution
          const nonCriticalScripts = document.querySelectorAll('script[data-defer="true"]');
          nonCriticalScripts.forEach(script => {
            const newScript = document.createElement('script');
            newScript.src = script.getAttribute('src') || '';
            newScript.async = true;
            document.head.appendChild(newScript);
          });
        });
      }
    };

    // Apply optimizations
    optimizeLCP();
    preventCLS();
    optimizeINP();

    // Observe and fix layout shifts
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target as HTMLElement;
        // Maintain aspect ratio during resize
        if (element.dataset.aspectRatio) {
          const [width, height] = element.dataset.aspectRatio.split('/').map(Number);
          const newHeight = (entry.contentRect.width * height) / width;
          element.style.height = `${newHeight}px`;
        }
      });
    });

    // Observe images and dynamic content
    document.querySelectorAll('img, [data-dynamic-content]').forEach(el => {
      resizeObserver.observe(el);
    });

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return null;
}

// Utility functions for Core Web Vitals optimization
export const coreWebVitalsUtils = {
  // Mark critical resources
  markCritical: (selector: string) => {
    document.querySelectorAll(selector).forEach(el => {
      el.setAttribute('data-priority', 'high');
    });
  },

  // Set aspect ratios to prevent CLS
  setAspectRatio: (element: HTMLElement, ratio: string) => {
    element.dataset.aspectRatio = ratio;
    element.style.aspectRatio = ratio;
  },

  // Defer non-critical resources
  deferNonCritical: (selector: string) => {
    document.querySelectorAll(selector).forEach(el => {
      el.setAttribute('data-defer', 'true');
    });
  },

  // Optimize images for Web Vitals
  optimizeImage: (img: HTMLImageElement) => {
    // Set loading priority based on position
    const rect = img.getBoundingClientRect();
    const isAboveFold = rect.top < window.innerHeight;
    
    img.loading = isAboveFold ? 'eager' : 'lazy';
    img.fetchPriority = isAboveFold ? 'high' : 'low';
    img.decoding = 'async';
    
    // Set dimensions if missing
    if (!img.width && !img.height && img.naturalWidth) {
      img.width = img.naturalWidth;
      img.height = img.naturalHeight;
    }
  }
};