// Core Web Vitals optimization utilities
export class WebVitalsOptimizer {
  private static instance: WebVitalsOptimizer;
  private observers: Map<string, any> = new Map();

  static getInstance(): WebVitalsOptimizer {
    if (!WebVitalsOptimizer.instance) {
      WebVitalsOptimizer.instance = new WebVitalsOptimizer();
    }
    return WebVitalsOptimizer.instance;
  }

  // Optimize Largest Contentful Paint (LCP)
  optimizeLCP() {
    // Preload critical resources
    this.preloadCriticalAssets();
    
    // Remove render-blocking resources
    this.deferNonCriticalCSS();
    
    // Optimize images above the fold
    this.optimizeAboveFoldImages();
  }

  // Prevent Cumulative Layout Shift (CLS)
  preventCLS() {
    // Set dimensions for all images
    this.setImageDimensions();
    
    // Reserve space for dynamic content
    this.reserveDynamicContentSpace();
    
    // Stabilize font loading
    this.stabilizeFontLoading();
    
    // Monitor layout shifts
    this.monitorLayoutShifts();
  }

  // Optimize Interaction to Next Paint (INP)
  optimizeINP() {
    // Debounce user interactions
    this.debounceInteractions();
    
    // Use event delegation
    this.setupEventDelegation();
    
    // Defer non-critical JavaScript
    this.deferNonCriticalJS();
    
    // Use requestIdleCallback for background tasks
    this.scheduleBackgroundTasks();
  }

  private preloadCriticalAssets() {
    const criticalAssets = [
      { href: '/assets/hero-costa-del-sol-luxury.jpg', as: 'image' },
      { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2' },
    ];

    criticalAssets.forEach(asset => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = asset.href;
      link.as = asset.as;
      if (asset.type) link.type = asset.type;
      if (asset.as === 'font') link.crossOrigin = 'anonymous';
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });
  }

  private deferNonCriticalCSS() {
    const nonCriticalStyles = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
    nonCriticalStyles.forEach(link => {
      const styleLink = link as HTMLLinkElement;
      styleLink.media = 'print';
      styleLink.onload = () => {
        styleLink.media = 'all';
      };
    });
  }

  private optimizeAboveFoldImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      const rect = img.getBoundingClientRect();
      const isAboveFold = rect.top < window.innerHeight + 100;
      
      if (isAboveFold) {
        img.loading = 'eager';
        img.fetchPriority = 'high';
        img.decoding = 'sync';
      } else {
        img.loading = 'lazy';
        img.fetchPriority = 'low';
        img.decoding = 'async';
      }
    });
  }

  private setImageDimensions() {
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach(img => {
      const image = img as HTMLImageElement;
      
      // Use intrinsic dimensions if available
      if (image.naturalWidth && image.naturalHeight) {
        image.width = image.naturalWidth;
        image.height = image.naturalHeight;
      } else {
        // Set aspect ratio to prevent CLS
        image.style.aspectRatio = '16/9'; // Default aspect ratio
      }
    });
  }

  private reserveDynamicContentSpace() {
    const dynamicElements = document.querySelectorAll('[data-dynamic], .dynamic-content');
    dynamicElements.forEach(element => {
      const el = element as HTMLElement;
      if (!el.style.minHeight && !el.style.height) {
        el.style.minHeight = '200px'; // Reserve minimum space
        el.style.contentVisibility = 'auto';
        el.style.containIntrinsicSize = '200px';
      }
    });
  }

  private stabilizeFontLoading() {
    // Use font-display: swap for web fonts
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        font-display: swap;
        src: url('/fonts/inter-var.woff2') format('woff2');
      }
    `;
    document.head.appendChild(style);
  }

  private monitorLayoutShifts() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const shift = entry as any;
          if (shift.value > 0.01) {
            console.warn('Layout shift detected:', shift.value, shift.sources);
          }
        }
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.set('layout-shift', observer);
    }
  }

  private debounceInteractions() {
    let interactionTimeout: NodeJS.Timeout;
    
    const debouncedHandler = (event: Event) => {
      clearTimeout(interactionTimeout);
      interactionTimeout = setTimeout(() => {
        // Process interaction
        this.processInteraction(event);
      }, 16); // One frame delay
    };

    ['click', 'keydown', 'touchstart'].forEach(eventType => {
      document.addEventListener(eventType, debouncedHandler, { passive: true });
    });
  }

  private setupEventDelegation() {
    // Use single event listener for multiple elements
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      
      // Handle button clicks
      if (target.matches('button, [role="button"]')) {
        this.handleButtonClick(target, event);
      }
      
      // Handle link clicks
      if (target.matches('a[href]')) {
        this.handleLinkClick(target as HTMLAnchorElement, event);
      }
    }, { passive: false });
  }

  private deferNonCriticalJS() {
    const scripts = document.querySelectorAll('script[data-defer]');
    scripts.forEach(script => {
      const newScript = document.createElement('script');
      newScript.src = script.getAttribute('src') || '';
      newScript.async = true;
      
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          document.head.appendChild(newScript);
        });
      } else {
        setTimeout(() => {
          document.head.appendChild(newScript);
        }, 100);
      }
    });
  }

  private scheduleBackgroundTasks() {
    const backgroundTasks = [
      () => this.cleanupUnusedStyles(),
      () => this.preloadNextPageResources(),
      () => this.optimizeImageFormats(),
    ];

    const executeTask = (taskIndex: number) => {
      if (taskIndex >= backgroundTasks.length) return;
      
      const runTask = () => {
        try {
          backgroundTasks[taskIndex]();
        } catch (error) {
          console.warn('Background task failed:', error);
        }
        executeTask(taskIndex + 1);
      };

      if ('requestIdleCallback' in window) {
        requestIdleCallback(runTask, { timeout: 5000 });
      } else {
        setTimeout(runTask, 100);
      }
    };

    executeTask(0);
  }

  private processInteraction(event: Event) {
    // Minimal interaction processing to maintain low INP
    const target = event.target as HTMLElement;
    target.setAttribute('data-interacted', 'true');
  }

  private handleButtonClick(button: HTMLElement, event: Event) {
    // Optimized button click handling
    if (button.hasAttribute('data-async')) {
      event.preventDefault();
      this.asyncButtonAction(button);
    }
  }

  private handleLinkClick(link: HTMLAnchorElement, event: Event) {
    // Preload link destination
    if (link.hostname === window.location.hostname) {
      this.preloadPage(link.href);
    }
  }

  private asyncButtonAction(button: HTMLElement) {
    requestAnimationFrame(() => {
      // Perform button action asynchronously
      button.dispatchEvent(new CustomEvent('asyncClick', { bubbles: true }));
    });
  }

  private preloadPage(href: string) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  }

  private cleanupUnusedStyles() {
    const unusedStyles = document.querySelectorAll('style[data-unused="true"]');
    unusedStyles.forEach(style => style.remove());
  }

  private preloadNextPageResources() {
    // Preload resources for likely next pages
    const nextPageResources = ['/api/properties', '/api/locations'];
    nextPageResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = resource;
      document.head.appendChild(link);
    });
  }

  private optimizeImageFormats() {
    // Convert images to optimal formats
    const images = document.querySelectorAll('img[data-optimize]');
    images.forEach(img => {
      const image = img as HTMLImageElement;
      const src = image.src;
      
      if (src.includes('.jpg') || src.includes('.png')) {
        const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        
        // Test WebP support
        const webpTest = new Image();
        webpTest.onload = () => {
          image.src = webpSrc;
        };
        webpTest.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';
      }
    });
  }

  // Initialize all optimizations
  initialize() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.optimizeLCP();
        this.preventCLS();
        this.optimizeINP();
      });
    } else {
      this.optimizeLCP();
      this.preventCLS();
      this.optimizeINP();
    }
  }

  // Cleanup observers
  cleanup() {
    this.observers.forEach(observer => {
      if ('disconnect' in observer) {
        observer.disconnect();
      }
    });
    this.observers.clear();
  }
}

// Export singleton instance
export const webVitalsOptimizer = WebVitalsOptimizer.getInstance();