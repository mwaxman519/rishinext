import React from "react";
import { IconType } from "react-icons";

interface SocialIconProps {
  icon: IconType;
  className?: string;
}

export const SocialIcon = React.forwardRef<SVGSVGElement, SocialIconProps>(
  ({ icon: Icon, className }, ref) => {
    const IconComponent = Icon as React.ElementType;
    return <IconComponent ref={ref} className={className} aria-hidden="true" />;
  }
);

SocialIcon.displayName = "SocialIcon";