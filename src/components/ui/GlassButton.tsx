import React from "react";
import { useRouter } from "next/navigation";

interface GlassButtonProps {
  text: string;
  backgroundColor?: string;
  navigateTo?: string;
  onClick?: () => void;
  className?: string;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  text,
  backgroundColor,
  navigateTo,
  onClick,
  className = "",
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) onClick();
    if (navigateTo) router.push(navigateTo);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`
        flex flex-col justify-center items-center overflow-hidden
        w-[80px] h-[80px]
        bg-[#D5F0FE]
        rounded-[32px]
        backdrop-blur-[100px]
        text-[15px] tracking-wide
        cursor-pointer
        ${className}
      `}
      style={{
        fontFamily: "'Roboto', sans-serif",
        fontWeight: 400, // Regular weight
        color: "#000000", // Pure black text
        fontVariationSettings: "'wdth' 100",
        boxShadow: `
          -1.5px -1px 1px rgba(255, 255, 255, 0.9),
           1.5px  1px 1px rgba(255, 255, 255, 0.9)
        `,
      }}
    >
      <span className="leading-6">{text}</span>
    </button>
  );
};

export default GlassButton;
