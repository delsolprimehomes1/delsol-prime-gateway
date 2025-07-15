import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface RippleEffectProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  duration?: number;
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export function RippleEffect({ 
  children, 
  className, 
  color = 'rgba(255, 255, 255, 0.6)', 
  duration = 600 
}: RippleEffectProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const createRipple = useCallback((event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newRipple: Ripple = {
      x,
      y,
      id: Date.now() + Math.random(),
    };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, duration);
  }, [duration]);

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      onMouseDown={createRipple}
    >
      {children}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute rounded-full pointer-events-none animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '20px',
            height: '20px',
            backgroundColor: color,
            transform: 'translate(-50%, -50%)',
            animation: `ripple ${duration}ms ease-out`,
          }}
        />
      ))}
    </div>
  );
}