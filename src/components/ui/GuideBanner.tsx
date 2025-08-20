"use client";

import React, { HTMLAttributes, ReactNode } from "react";

// Types
type BannerSize = "sm" | "md" | "lg";

interface GuideBannerProps extends HTMLAttributes<HTMLDivElement> {
  size?: BannerSize;
  children: ReactNode;
  fullWidth?: boolean;
}

// Configuration objects for better maintainability
const BANNER_SIZES: Record<BannerSize, { padding: string; text: string }> = {
  sm: { 
    padding: "px-[16px] py-[24px]", 
    text: "text-[14px]", 
  },
  md: { 
    padding: "px-[16px] py-[32px]", 
    text: "text-[16px]", 
  },
  lg: { 
    padding: "px-[16px] py-[48px]", 
    text: "text-[18px]", 

  },
} as const;

// Constants
const BASE_OUTER_CLASSES = "inline-block rounded-[16px] p-[2px] transition-all duration-200";
const OUTER_GRADIENT = "bg-gradient-to-r from-[#3070E7] via-[#16BDEB] via-[#16BDEB] via-[#16BDEB] via-[#16BDEB] via-[#16BDEB] via-[#FF007F] to-[#FF9000]";


const BASE_INNER_CLASSES = [
  "flex items-center justify-center rounded-[14px] bg-white",
  "text-center font-[500] text-gray-800 leading-relaxed",
  "transition-all duration-200"
].join(" ");

// Utility function for className merging
const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};

// Main GuideBanner Component
function GuideBanner({
  children,
  size = "md",
  fullWidth = false,
  className,
  ...props
}: GuideBannerProps) {

  const sizeConfig = BANNER_SIZES[size];

  // Classes
  const outerClasses = cn(
    BASE_OUTER_CLASSES,
    OUTER_GRADIENT,
    fullWidth && "w-full block",
    className
  );

  const innerClasses = cn(
    BASE_INNER_CLASSES,
    sizeConfig.padding,
    sizeConfig.text,
    fullWidth && "w-full"
  );

  return (
    <div className={outerClasses} {...props}>
      <div className={innerClasses}>
        <div className="max-w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

GuideBanner.displayName = "GuideBanner";

export default GuideBanner;