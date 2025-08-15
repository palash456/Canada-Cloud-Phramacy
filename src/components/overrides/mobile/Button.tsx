import React from 'react';

export const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className="px-3 py-2 bg-purple-600 text-white rounded-full text-sm" {...props}>
    {children}
  </button>
);

export default Button;
