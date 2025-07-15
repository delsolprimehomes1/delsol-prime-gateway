
// Cache utilities for performance optimization

export const cacheUtils = {
  // Local storage with expiration
  setWithExpiry: (key: string, value: any, ttl: number) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  },

  getWithExpiry: (key: string) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  },

  // Session storage utilities
  setSessionData: (key: string, value: any) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },

  getSessionData: (key: string) => {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },

  // Memory cache for component data
  memoryCache: new Map(),

  memoize: <T extends (...args: any[]) => any>(fn: T, keyFn?: (...args: Parameters<T>) => string): T => {
    return ((...args: Parameters<T>) => {
      const key = keyFn ? keyFn(...args) : JSON.stringify(args);
      
      if (cacheUtils.memoryCache.has(key)) {
        return cacheUtils.memoryCache.get(key);
      }
      
      const result = fn(...args);
      cacheUtils.memoryCache.set(key, result);
      
      // Auto-cleanup after 5 minutes
      setTimeout(() => {
        cacheUtils.memoryCache.delete(key);
      }, 5 * 60 * 1000);
      
      return result;
    }) as T;
  },

  // Clear all caches
  clearAllCaches: () => {
    localStorage.clear();
    sessionStorage.clear();
    cacheUtils.memoryCache.clear();
    
    // Clear browser caches if supported
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }
  }
};

// Image optimization utilities
export const imageUtils = {
  // Generate responsive image URLs
  generateSrcSet: (baseUrl: string, sizes: number[] = [320, 640, 768, 1024, 1280, 1920]) => {
    return sizes.map(size => `${baseUrl}?w=${size} ${size}w`).join(', ');
  },

  // Lazy load images with intersection observer
  lazyLoadImage: (img: HTMLImageElement, src: string) => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement;
          image.src = src;
          image.classList.remove('loading');
          observer.unobserve(image);
        }
      });
    });
    
    imageObserver.observe(img);
  },

  // Preload critical images
  preloadImage: (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  }
};

// Bundle optimization utilities
export const bundleUtils = {
  // Dynamic import with loading state
  dynamicImport: async <T>(importFn: () => Promise<T>): Promise<T> => {
    try {
      const module = await importFn();
      return module;
    } catch (error) {
      console.error('Dynamic import failed:', error);
      throw error;
    }
  },

  // Preload route component
  preloadRoute: (routeImport: () => Promise<any>) => {
    // Preload on hover or during idle time
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        routeImport().catch(console.error);
      });
    } else {
      setTimeout(() => {
        routeImport().catch(console.error);
      }, 100);
    }
  }
};
