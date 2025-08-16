"use client"


import React from "react";

interface GlassButtonProps {
  text: string;
  active?: boolean; // Controlled from parent
  className?: string;
  onClick?: () => void;
}

// Consolidated styles for clarity
const STYLES = {
  base: `
    flex flex-col justify-center items-center overflow-hidden
    w-[80px] h-[80px]
    rounded-[32px]
    backdrop-blur-lg
    bg-gradient-to-br from-white/30 to-white/10
    border border-white/40
    text-[15px] tracking-wide
    cursor-pointer
    transition-all duration-200 ease-out
    font-roboto font-normal text-black
  `,
  normal: {
    backgroundColor: "rgba(213, 240, 254, 0.6)",
    boxShadow: `
      -1.5px -1px 1px rgba(255, 255, 255, 0.8),
       1px  1px 1px rgba(255, 255, 255, 0.8)
    `,
    transform: "scale(1)",
  },
  active: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    boxShadow: `
      -2px -1px 1px rgba(255, 255, 255, 0.9), 
       2px 1px 1px rgba(255, 255, 255, 0.9)
    `,
    transform: "scale(1.02)",
  },
};

// Helper to get state styles
const getStateStyles = (active: boolean) =>
  active ? STYLES.active : STYLES.normal;

export const GlassButton: React.FC<GlassButtonProps> = ({
  text,
  active = false,
  className = "",
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${STYLES.base} ${className}`}
      style={getStateStyles(active)}
    >
      {text}
    </button>
  );
};

export default GlassButton;
