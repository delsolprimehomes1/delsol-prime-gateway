// Image optimization utilities for WebP conversion and responsive images

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  caption?: string;
  className?: string;
}

// Standard responsive image sizes for srcset
export const RESPONSIVE_SIZES = [320, 480, 640, 768, 1024, 1280, 1536, 1920];

// Generate image dimensions for different breakpoints
export const generateImageDimensions = (baseWidth: number, baseHeight: number) => {
  const aspectRatio = baseWidth / baseHeight;
  
  return RESPONSIVE_SIZES.map(width => ({
    width,
    height: Math.round(width / aspectRatio)
  }));
};

// Convert image path to WebP format
export const getWebPPath = (src: string): string => {
  return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
};

// Generate srcset for responsive images - simplified for existing images
export const generateSrcSet = (baseSrc: string, sizes: number[] = RESPONSIVE_SIZES): string => {
  // For now, just return the original src since we don't have multiple sizes
  return baseSrc;
};

// SEO-optimized alt text guidelines
export const generateAltText = (context: string, description: string): string => {
  // Ensure alt text is 5-12 words and descriptive
  const words = `${description} ${context}`.trim().split(' ');
  if (words.length > 12) {
    return words.slice(0, 12).join(' ');
  }
  return words.join(' ');
};

// Common alt text patterns for real estate
export const altTextPatterns = {
  property: (type: string, location: string) => 
    generateAltText(`${type} property`, `luxury ${type} in ${location}`),
  
  location: (location: string, feature: string) =>
    generateAltText(`${location} area`, `${feature} view of ${location}`),
  
  interior: (room: string, style: string) =>
    generateAltText(`${room} interior`, `modern ${style} ${room} design`),
  
  exterior: (property: string, feature: string) =>
    generateAltText(`${property} exterior`, `${feature} outdoor space`),
  
  team: (name: string, role: string) =>
    generateAltText(`team member`, `${name} ${role} professional headshot`),
  
  blog: (topic: string) =>
    generateAltText(`blog illustration`, `${topic} guide visual`),
};

// Image loading optimization
export const preloadCriticalImages = (imageSrcs: string[]) => {
  imageSrcs.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = getWebPPath(src);
    link.type = 'image/webp';
    document.head.appendChild(link);
  });
};

// Lazy loading intersection observer options
export const lazyLoadingOptions = {
  rootMargin: '50px 0px',
  threshold: 0.01
};