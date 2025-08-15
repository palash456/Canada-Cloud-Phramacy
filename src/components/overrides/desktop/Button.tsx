import React from 'react';

export const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className="px-6 py-3 bg-green-700 text-white rounded-lg text-lg" {...props}>
    {children}
  </button>
);

export default Button;
