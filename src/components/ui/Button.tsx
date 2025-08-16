"use client"


import React from 'react';

export const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className="px-4 py-2 bg-blue-600 text-white rounded" {...props}>
    {children}
  </button>
);

export default Button;
