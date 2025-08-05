
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { imageUtils } from '@/utils/performance/cacheUtils';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape';
  objectFit?: 'cover' | 'contain' | 'fill';
  placeholder?: boolean;
  width?: number;
  height?: number;
  caption?: string;
  showCaption?: boolean;
}

export function ResponsiveImage({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  aspectRatio,
  objectFit = 'cover',
  placeholder = true,
  width,
  height,
  caption,
  showCaption = false
}: ResponsiveImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]'
  };

  const objectFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill'
  };

  // Generate WebP source and fallback
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const srcSet = imageUtils.generateSrcSet(webpSrc);
  const fallbackSrcSet = imageUtils.generateSrcSet(src);

  return (
    <figure 
      className={cn(
        'relative overflow-hidden bg-muted',
        aspectRatio && aspectRatioClasses[aspectRatio],
        !showCaption && className
      )}
    >
      <div 
        className={cn(
          'relative overflow-hidden bg-muted',
          showCaption && className
        )}
      >
        {/* Loading placeholder */}
        {isLoading && placeholder && (
          <div className="absolute inset-0 loading-shimmer" />
        )}

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
            <span className="text-sm">Failed to load image</span>
          </div>
        )}

        <picture>
          {/* WebP source for modern browsers */}
          <source
            srcSet={srcSet}
            sizes={sizes}
            type="image/webp"
          />
          {/* Fallback for older browsers */}
          <source
            srcSet={fallbackSrcSet}
            sizes={sizes}
            type={src.includes('.jpg') || src.includes('.jpeg') ? 'image/jpeg' : 'image/png'}
          />
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className={cn(
              'w-full h-full transition-all duration-500',
              objectFitClasses[objectFit],
              isLoading ? 'opacity-0 scale-110' : 'opacity-100 scale-100',
              'hover:scale-105 transition-transform duration-700'
            )}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        </picture>
      </div>

      {/* Image caption */}
      {showCaption && caption && (
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
