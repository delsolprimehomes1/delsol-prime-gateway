
import { lazy, Suspense, ReactNode, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyComponentProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

// Performance optimization component for lazy loading sections
export function LazySection({ children, fallback, className }: LazyComponentProps) {
  const defaultFallback = (
    <div className={`space-y-4 ${className || ''}`}>
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
}

// Enhanced image optimization component for Core Web Vitals
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  aspectRatio?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
}

export function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  aspectRatio,
  fetchPriority = 'auto'
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div 
      className={className}
      style={{
        aspectRatio: aspectRatio || (width && height ? `${width}/${height}` : undefined),
        backgroundColor: isLoaded ? 'transparent' : 'hsl(var(--muted))',
      }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover transition-opacity duration-300"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        sizes={sizes}
        fetchPriority={fetchPriority}
        style={{ 
          contentVisibility: 'auto',
          opacity: isLoaded ? 1 : 0,
        }}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
      {!isLoaded && !hasError && (
        <Skeleton className="absolute inset-0" />
      )}
    </div>
  );
}

// Critical CSS inliner component
export function CriticalCSS({ css }: { css: string }) {
  return (
    <style
      dangerouslySetInnerHTML={{ __html: css }}
      data-critical="true"
    />
  );
}
