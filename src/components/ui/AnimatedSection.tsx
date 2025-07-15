
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-in-up' | 'fade-in-left' | 'fade-in-right' | 'scale-in' | 'slide-up';
  delay?: number;
  threshold?: number;
}

export function AnimatedSection({
  children,
  className,
  animation = 'fade-in-up',
  delay = 0,
  threshold = 0.1
}: AnimatedSectionProps) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold });

  const animationClasses = {
    'fade-in-up': 'animate-fade-in-up',
    'fade-in-left': 'animate-fade-in-left', 
    'fade-in-right': 'animate-fade-in-right',
    'scale-in': 'animate-scale-in',
    'slide-up': 'animate-slide-up'
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        'opacity-0 transform',
        isVisible && 'opacity-100',
        isVisible && animationClasses[animation],
        className
      )}
      style={{
        animationDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
}

export function AnimatedCard({
  children,
  className,
  index = 0
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div
      ref={elementRef}
      className={cn(
        'opacity-0 transform translate-y-8 transition-all duration-700 ease-out hover-lift',
        isVisible && 'opacity-100 translate-y-0',
        className
      )}
      style={{
        transitionDelay: `${index * 150}ms`
      }}
    >
      {children}
    </div>
  );
}
