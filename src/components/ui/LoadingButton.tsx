import { useState } from 'react';
import { Button, ButtonProps } from './button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
}

export function LoadingButton({ 
  children, 
  loading, 
  loadingText = 'Loading...', 
  disabled,
  className,
  ...props 
}: LoadingButtonProps) {
  return (
    <Button
      className={cn(
        'relative overflow-hidden transition-all duration-300',
        loading && 'pointer-events-none',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      <div className={cn(
        'flex items-center justify-center transition-all duration-300',
        loading && 'opacity-0 scale-95'
      )}>
        {children}
      </div>
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          <span className="text-sm">{loadingText}</span>
        </div>
      )}
    </Button>
  );
}