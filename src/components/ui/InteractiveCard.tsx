import { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InteractiveCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'luxury' | 'minimal';
  hover?: 'lift' | 'scale' | 'glow' | 'tilt';
  className?: string;
}

export function InteractiveCard({
  children,
  variant = 'default',
  hover = 'lift',
  className,
  ...props
}: InteractiveCardProps) {
  const variants = {
    default: 'bg-card border border-border rounded-lg',
    luxury: 'bg-gradient-to-br from-card via-card to-card/95 border border-primary/20 rounded-lg backdrop-blur-sm',
    minimal: 'bg-card/50 border border-border/50 rounded-lg backdrop-blur-sm',
  };

  const hoverEffects = {
    lift: 'hover:shadow-elegant hover:-translate-y-2 hover:scale-[1.02]',
    scale: 'hover:scale-105',
    glow: 'hover:shadow-glow hover:border-primary/40',
    tilt: 'hover:rotate-1 hover:scale-105',
  };

  return (
    <div
      className={cn(
        'transition-all duration-300 ease-premium cursor-pointer',
        variants[variant],
        hoverEffects[hover],
        'group',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}