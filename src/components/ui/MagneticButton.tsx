import { ReactNode, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button, ButtonProps } from './button';

interface MagneticButtonProps extends ButtonProps {
  children: ReactNode;
  magneticStrength?: number;
}

export function MagneticButton({
  children,
  magneticStrength = 0.3,
  className,
  asChild,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * magneticStrength;
    const deltaY = (e.clientY - centerY) * magneticStrength;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // If asChild is true, we need to return a single child for Slot to work
  if (asChild) {
    return (
      <Button
        ref={buttonRef}
        className={cn(
          'relative overflow-hidden transition-all duration-300 ease-premium',
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        asChild
        {...props}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button
      ref={buttonRef}
      className={cn(
        'relative overflow-hidden transition-all duration-300 ease-premium',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      {...props}
    >
      <div className="relative z-10">
        {children}
      </div>
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-glow/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
    </Button>
  );
}