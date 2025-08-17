"use client";

import React, { useState } from "react";

interface DateInputFieldProps {
  id?: string;
  label?: string;
  maxDate?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const DateInputField: React.FC<DateInputFieldProps> = ({
  id = "dob-input",
  label = "Date",
  maxDate = new Date().toISOString().split("T")[0],
  value = "",
  onChange,
}) => {
  const [focused, setFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="relative w-full font-['Roboto',sans-serif]">
      <input
        id={id}
        type="date"
        max={maxDate}
        value={value}
        placeholder="dd-mm-yyyy"
        onChange={handleChange}
        className="block w-full rounded-lg border-2 px-4 py-4 text-[18px] text-gray-900
                   focus:ring-0 outline-none bg-transparent appearance-none 
                   [&::-webkit-calendar-picker-indicator]:hidden"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <label
        htmlFor={id}
        className={`absolute left-2.5 -top-2 px-2 font-medium pointer-events-none transition-colors bg-[#F5F5F5]`}
        style={{ lineHeight: "1.0" }}
        >
        {label}
      </label>
    </div>
  );
};
