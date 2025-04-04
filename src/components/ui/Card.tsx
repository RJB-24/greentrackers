
import React from 'react';
import { cn } from "@/lib/utils";

// This component is a wrapper around the shadcn/ui Card component
// with some additional styling and functionality
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));

Card.displayName = "Card";

// Export as both default and named export to resolve import issues
export { Card };
export default Card;
