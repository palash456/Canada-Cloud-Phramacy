"use client";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { forwardRef, useImperativeHandle } from "react";


interface DateInputFieldProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function DateInputField({ value = "", onChange }: DateInputFieldProps) {
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date of Birth"
        value={value ? new Date(value) : null}
        maxDate={new Date()}
        onChange={(newValue) =>
          onChange?.(newValue?.toISOString().split("T")[0] ?? "")
        }
        slotProps={{
          textField: { id: "dob-input", fullWidth: true },
        }}
      />
    </LocalizationProvider>
  );
}
