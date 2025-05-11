"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (value: string) => void;
}

export function PhoneInput({
  className,
  value,
  onChange,
  ...props
}: PhoneInputProps) {
  const [focused, setFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers, +, and spaces
    const input = e.target.value.replace(/[^\d\s+]/g, "");
    onChange(input);
  };

  return (
    <div
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2",
        "text-sm ring-offset-background file:border-0 file:bg-transparent",
        "file:text-sm file:font-medium placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        focused && "ring-2 ring-ring ring-offset-2",
        className
      )}
    >
      <Input
        type="tel"
        value={value}
        onChange={handleChange}
        className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
    </div>
  );
}
