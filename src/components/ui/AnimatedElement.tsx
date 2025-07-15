import { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface AnimatedElementProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  animation?: 'fade-in' | 'fade-in-up' | 'fade-in-down' | 'fade-in-left' | 'fade-in-right' | 'scale-in' | 'slide-up';
  delay?: number;
  duration?: number;
  className?: string;
}

export function AnimatedElement({
  children,
  animation = 'fade-in',
  delay = 0,
  duration = 600,
  className,
  ...props
}: AnimatedElementProps) {
  const { elementRef, isVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: true,
  });

  const animationClass = isVisible ? `animate-${animation}` : 'opacity-0';

  return (
    <div
      ref={elementRef}
      className={cn(
        'transition-all duration-300 ease-premium',
        animationClass,
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  );
}