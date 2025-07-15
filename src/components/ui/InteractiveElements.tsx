
import { ReactNode, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: ReactNode;
  maxTilt?: number;
  className?: string;
}

export function TiltCard({ children, maxTilt = 15, className }: TiltCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * maxTilt;
    const rotateY = ((centerX - e.clientX) / (rect.width / 2)) * maxTilt;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      className={cn('transition-transform duration-300 ease-out perspective-1000', className)}
      style={{
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

interface RippleButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function RippleButton({ children, className, onClick }: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const ref = useRef<HTMLButtonElement>(null);

  const createRipple = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    onClick?.();
  };

  return (
    <button
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      onClick={createRipple}
    >
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-ping"
          style={{
            left: ripple.x - 20,
            top: ripple.y - 20,
            width: 40,
            height: 40,
            animationDuration: '0.6s',
          }}
        />
      ))}
    </button>
  );
}

interface MorphingProps {
  children: ReactNode;
  hoverChildren: ReactNode;
  className?: string;
}

export function MorphingElement({ children, hoverChildren, className }: MorphingProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn('relative transition-all duration-500 ease-out', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          'transition-all duration-500 ease-out',
          isHovered ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          'absolute inset-0 transition-all duration-500 ease-out',
          isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        )}
      >
        {hoverChildren}
      </div>
    </div>
  );
}

export function GradientTrail({ className }: { className?: string }) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-shimmer" />
    </div>
  );
}
