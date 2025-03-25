
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AmountInputProps {
  value: number;
  onChange: (value: number) => void;
  currency: string;
  currencySymbol?: string;
  label: string;
  className?: string;
}

const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChange,
  currency,
  currencySymbol = "",
  label,
  className,
}) => {
  const [inputValue, setInputValue] = useState(value.toString());
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Format value for display
  useEffect(() => {
    // Only update if not focused to prevent cursor jumping
    if (!isFocused) {
      setInputValue(parseFloat(value.toFixed(2)).toString());
    }
  }, [value, isFocused]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Accept empty input (will convert to 0 later)
    if (newValue === "") {
      setInputValue("");
      return;
    }
    
    // Only allow numeric values with at most one decimal point
    if (/^\d*\.?\d*$/.test(newValue)) {
      setInputValue(newValue);
      const numericValue = parseFloat(newValue) || 0;
      onChange(numericValue);
    }
  };

  // Handle focus/blur
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    
    // Format on blur
    if (inputValue === "") {
      setInputValue("0");
      onChange(0);
    } else {
      const numericValue = parseFloat(inputValue);
      setInputValue(numericValue.toString());
    }
  };

  return (
    <div className={cn("relative", className)}>
      <label className="block text-sm font-medium text-muted-foreground mb-1">
        {label}
      </label>
      <div
        className={cn(
          "relative glass rounded-xl overflow-hidden transition-all-300",
          isFocused ? "shadow-md ring-2 ring-primary/20" : "hover:shadow-md"
        )}
      >
        {currencySymbol && (
          <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center px-3 text-muted-foreground">
            {currencySymbol}
          </div>
        )}
        <input
          ref={inputRef}
          type="text"
          inputMode="decimal"
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            "w-full py-3 bg-transparent",
            "focus:outline-none text-xl font-medium",
            currencySymbol ? "pl-8 pr-12" : "pl-4 pr-12"
          )}
        />
        <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center px-3 text-muted-foreground">
          {currency}
        </div>
      </div>
    </div>
  );
};

export default AmountInput;
