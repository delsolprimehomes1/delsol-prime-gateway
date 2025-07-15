
import { cn } from "@/lib/utils";
import Container from "./Container";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  background?: "default" | "muted" | "accent" | "primary" | "gradient";
  id?: string;
}

export default function Section({ 
  children, 
  className,
  containerSize = "xl",
  padding = "lg",
  background = "default",
  id
}: SectionProps) {
  const paddingClasses = {
    none: "",
    sm: "py-8",
    md: "py-12",
    lg: "py-16 lg:py-24",
    xl: "py-20 lg:py-32"
  };

  const backgroundClasses = {
    default: "bg-background",
    muted: "bg-muted/30",
    accent: "bg-accent/50",
    primary: "bg-primary text-primary-foreground",
    gradient: "bg-gradient-hero"
  };

  return (
    <section 
      id={id}
      className={cn(
        paddingClasses[padding],
        backgroundClasses[background],
        className
      )}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
}
