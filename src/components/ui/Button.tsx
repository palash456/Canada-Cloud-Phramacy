"use client";

import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import Image from "next/image";


// Types
type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "primary" | "secondary" | "tertiary" | "outline" | "ghost";
type ButtonIconPosition = "left" | "right";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: ReactNode | string;
  iconPosition?: ButtonIconPosition;
  loading?: boolean;
  fullWidth?: boolean;
  children?: ReactNode;
}

// Configuration objects for better maintainability
const BUTTON_SIZES: Record<ButtonSize, { padding: string; text: string; iconSize: number }> = {
  sm: { 
    padding: "px-[44px] py-[7px]", 
    text: "text-[12px]", 
    iconSize: 16
  },
  md: { 
    padding: "px-[20px] py-[12px]", 
    text: "text-[14px]", 
    iconSize: 20 
  },
  lg: { 
    padding: "px-[24px] py-[16px]", 
    text: "text-[16px]", 
    iconSize: 24 
  },
} as const;

const BUTTON_VARIANTS: Record<ButtonVariant, { inner: string; outer: string }> = {
  primary: {
    outer: "bg-gradient-to-r from-[#3070E7] to-[#16BDEB]",
    inner: "bg-white text-[#3070E7] hover:bg-gray-50 active:bg-gray-100"
  },
  secondary: {
    outer: "bg-[#ffffff]",
    inner: "bg-[#F2F2F270] text-[#000000] hover:bg-gray-50 active:bg-gray-100 tracking-wide"
  },
  tertiary: {
    outer: "bg-[#096DD9]",
    inner: "bg-[#096DD9] text-[#ffffff] hover:bg-gray-50 active:bg-gray-100"
  },
  outline: {
    outer: "bg-gradient-to-r from-[#3070E7] via-[#16BDEB] to-[#FF007F]",
    inner: "bg-transparent text-[#096DD9] hover:bg-[#096DD9]/10 active:bg-[#096DD9]/20"
  },
  ghost: {
    outer: "bg-transparent",
    inner: "bg-transparent text-[#096DD9] hover:bg-[#096DD9]/10 active:bg-[#096DD9]/20"
  }
} as const;

// Constants
const BASE_OUTER_CLASSES = "inline-flex rounded-full p-[2px] transition-all duration-200";
const BASE_INNER_CLASSES = [
  "flex items-center justify-center gap-2 rounded-full font-[500]",
  "transition-all duration-200 focus-visible:outline-none focus-visible:ring-2",
  "focus-visible:ring-blue-500 focus-visible:ring-offset-2",
  "disabled:opacity-50 disabled:cursor-not-allowed",
   "min-w-[100px]"

].join(" ");

const LOADING_SPINNER_SVG = (
  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
    <circle 
      className="opacity-25" 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="4"
    />
    <path 
      className="opacity-75" 
      fill="currentColor" 
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// Utility functions
const generateAltText = (icon: string | ReactNode): string => {
  if (typeof icon === "string") {
    return icon.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
  }
  return "button icon";
};

const renderIcon = (
  icon: string | ReactNode, 
  size: number, 
  loading?: boolean
): ReactNode => {
  if (loading) {
    return LOADING_SPINNER_SVG;
  }

  if (typeof icon === "string") {
    return (
      <Image
        src={icon.startsWith("/") ? icon : `/assets/icons/${icon}`}
        alt={generateAltText(icon)}
        width={size}
        height={size}
        className="flex-shrink-0"
        priority={false}
      />
    );
  }

  return icon;
};

// Utility function for className merging
const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};

// Main Button Component
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  size = "md",
  variant = "primary",
  icon,
  iconPosition = "left",
  loading = false,
  fullWidth = false,
  className,
  disabled,
  type = "button",
  ...props
}, ref) => {
  const sizeConfig = BUTTON_SIZES[size];
  const variantConfig = BUTTON_VARIANTS[variant];
  const isDisabled = disabled || loading;
  const hasIcon = Boolean(icon || loading);
  const showOnlyIcon = hasIcon && !children;

  // Classes
  const outerClasses = cn(
    BASE_OUTER_CLASSES,
    variantConfig.outer,
    fullWidth && "w-full",
    // Hover effects for outer gradient
    // !isDisabled && variant !== "ghost" && "hover:shadow-md hover:scale-[1.02]",
    className
  );

  const innerClasses = cn(
    BASE_INNER_CLASSES,
    showOnlyIcon ? "w-10 px-0" : sizeConfig.padding, // Square for icon-only
    sizeConfig.text,
    variantConfig.inner,
    fullWidth && "w-full"
  );

  const iconElement = hasIcon ? renderIcon(icon!, sizeConfig.iconSize, loading) : null;

  return (
    <div className={outerClasses}>
      <button
        ref={ref}
        type={type}
        className={innerClasses}
        disabled={isDisabled}
        aria-label={showOnlyIcon ? generateAltText(icon!) : undefined}
        {...props}
      >
        {/* Left Icon */}
        {iconElement && iconPosition === "left" && iconElement}
        
        {/* Button Text */}
        {children && (
          <span className={loading ? "opacity-0" : "opacity-100"}>
            {children}
          </span>
        )}
        
        {/* Right Icon */}
        {iconElement && iconPosition === "right" && !loading && iconElement}
        
        {/* Loading Spinner (always centered when loading) */}
        {loading && children && (
          <div className="absolute inset-0 flex items-center justify-center">
            {LOADING_SPINNER_SVG}
          </div>
        )}
      </button>
    </div>
  );
});

Button.displayName = "Button";

export default Button;