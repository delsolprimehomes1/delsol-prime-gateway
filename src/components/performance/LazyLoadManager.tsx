import { useEffect, useRef, useState } from 'react';

interface LazyLoadManagerProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  placeholder?: React.ReactNode;
  minHeight?: string;
}

export function LazyLoadManager({
  children,
  threshold = 0.1,
  rootMargin = '50px',
  placeholder,
  minHeight = '200px'
}: LazyLoadManagerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, hasLoaded]);

  return (
    <div
      ref={elementRef}
      style={{
        minHeight: isVisible ? 'auto' : minHeight,
        contentVisibility: 'auto',
        containIntrinsicSize: isVisible ? 'none' : minHeight,
      }}
      className="transition-all duration-300"
    >
      {isVisible ? children : placeholder}
    </div>
  );
}

// Component for lazy loading images with WebP support
interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');
  const imageRef = useRef<HTMLImageElement>(null);

  // Generate WebP and fallback sources
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const hasWebP = 'WebPFormat' in window || CSS.supports('(background-image: url(data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA))');

  useEffect(() => {
    if (priority) {
      setImageSrc(hasWebP ? webpSrc : src);
      return;
    }

    const element = imageRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(hasWebP ? webpSrc : src);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [src, webpSrc, hasWebP, priority]);

  return (
    <div
      className={className}
      style={{
        aspectRatio: width && height ? `${width}/${height}` : undefined,
        backgroundColor: isLoaded ? 'transparent' : 'hsl(var(--muted))',
      }}
    >
      <img
        ref={imageRef}
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className="w-full h-full object-cover transition-opacity duration-500"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'low'}
        style={{
          opacity: isLoaded ? 1 : 0,
          contentVisibility: 'auto',
        }}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}

// Component for lazy loading videos
interface LazyVideoProps {
  src: string;
  poster?: string;
  width?: number;
  height?: number;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export function LazyVideo({
  src,
  poster,
  width,
  height,
  className,
  autoPlay = false,
  muted = true,
  loop = false
}: LazyVideoProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      width={width}
      height={height}
      className={className}
      poster={poster}
      autoPlay={autoPlay && shouldLoad}
      muted={muted}
      loop={loop}
      playsInline
      preload="none"
      style={{
        aspectRatio: width && height ? `${width}/${height}` : undefined,
        contentVisibility: 'auto',
      }}
    >
      {shouldLoad && <source src={src} type="video/mp4" />}
    </video>
  );
}