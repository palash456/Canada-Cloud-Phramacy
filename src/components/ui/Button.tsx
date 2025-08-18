"use client";

import React from "react";

export const Button = ({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <div
    className="inline-block flex-shrink-0 box-border rounded-full bg-gradient-to-r from-[#3070E7] to-[#16BDEB] p-[2px] h-[60px] font-['Roboto',sans-serif]"
  >
    <button
      className={`flex items-center justify-center rounded-full bg-white h-[56px] px-6 gap-2 text-[#096DD9] font-semibold ${className}`}
      {...props}
    >
      {children}
    </button>
  </div>
);

export default Button;
