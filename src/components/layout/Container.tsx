
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  centerContent?: boolean;
}

export default function Container({ 
  children, 
  className, 
  size = "xl",
  padding = "md",
  centerContent = false
}: ContainerProps) {
  const sizeClasses = {
    sm: "max-w-2xl",
    md: "max-w-4xl", 
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full"
  };

  const paddingClasses = {
    none: "",
    xs: "px-3 sm:px-4",
    sm: "px-4 sm:px-6",
    md: "px-4 sm:px-6 lg:px-8",
    lg: "px-6 sm:px-8 lg:px-12",
    xl: "px-6 sm:px-8 lg:px-16"
  };

  return (
    <div className={cn(
      "relative w-full mx-auto",
      sizeClasses[size],
      paddingClasses[padding],
      centerContent && "flex items-center justify-center",
      "transition-all duration-300 ease-premium",
      className
    )}>
      {children}
    </div>
  );
}
