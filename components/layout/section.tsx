import React, { ReactNode } from "react";
import { cn } from "../../client/src/lib/utils";

interface SectionProps {
  children: ReactNode;
  color?: 'default' | 'primary' | 'muted';
  className?: string;
}

export const Section = ({ 
  children, 
  color = "default", 
  className = "" 
}: SectionProps) => {
  const sectionColor = {
    default: "bg-background text-foreground",
    primary: "bg-primary text-primary-foreground relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/20 before:to-transparent",
    muted: "bg-muted text-muted-foreground",
  };

  return (
    <section
      className={cn(
        "relative overflow-hidden py-16 sm:py-24",
        sectionColor[color],
        className
      )}
    >
      {children}
    </section>
  );
};