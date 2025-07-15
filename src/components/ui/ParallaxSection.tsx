import { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  backgroundImage?: string;
}

export function ParallaxSection({
  children,
  speed = 0.5,
  className,
  backgroundImage,
}: ParallaxSectionProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate if element is in viewport
      const isInViewport = rect.top < windowHeight && rect.bottom > 0;
      
      if (isInViewport) {
        // Calculate scroll position relative to element
        const relativeScrollY = window.scrollY - elementTop + windowHeight;
        setScrollY(relativeScrollY * speed);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return (
    <div
      ref={elementRef}
      className={cn('relative overflow-hidden', className)}
    >
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
      )}
      <div
        className="relative z-10"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}