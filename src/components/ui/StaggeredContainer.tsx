import { ReactNode, Children, cloneElement, ReactElement } from 'react';
import { cn } from '@/lib/utils';

interface StaggeredContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggeredContainer({ 
  children, 
  staggerDelay = 100, 
  className 
}: StaggeredContainerProps) {
  const childArray = Children.toArray(children);

  return (
    <div className={cn('animate-stagger', className)}>
      {childArray.map((child, index) => 
        cloneElement(child as ReactElement, {
          key: index,
          style: {
            ...((child as ReactElement).props.style || {}),
            animationDelay: `${index * staggerDelay}ms`,
          },
        })
      )}
    </div>
  );
}