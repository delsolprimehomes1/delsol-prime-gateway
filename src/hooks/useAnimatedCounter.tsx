import { useState, useEffect } from 'react';

interface UseAnimatedCounterOptions {
  target: number;
  duration?: number;
  isVisible?: boolean;
  suffix?: string;
  prefix?: string;
}

export function useAnimatedCounter({ 
  target, 
  duration = 2000, 
  isVisible = true,
  suffix = '',
  prefix = '' 
}: UseAnimatedCounterOptions) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * target);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [target, duration, isVisible]);

  return `${prefix}${count}${suffix}`;
}