
import React, { useState, useRef, useEffect } from "react";
import { Currency } from "@/lib/currencyData";
import { cn } from "@/lib/utils";
import { ChevronDown, Search, X } from "lucide-react";

interface CurrencySelectorProps {
  label: string;
  value: string;
  currencies: Currency[];
  onChange: (currencyCode: string) => void;
  className?: string;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  label,
  value,
  currencies,
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedCurrency = currencies.find((c) => c.code === value);

  // Filter currencies based on search term
  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle selection
  const handleSelect = (currencyCode: string) => {
    onChange(currencyCode);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <label className="block text-sm font-medium text-muted-foreground mb-1">
        {label}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between px-4 py-3 rounded-xl glass",
          "transition-all-300 focus:outline-none focus:ring-2 focus:ring-primary/20",
          "hover:shadow-md"
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{selectedCurrency?.flag}</span>
          <span className="font-medium">{selectedCurrency?.code}</span>
          <span className="text-muted-foreground text-sm hidden md:inline">
            {selectedCurrency?.name}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen ? "transform rotate-180" : ""
          )}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-1 w-full bg-background glass shadow-lg rounded-xl",
            "max-h-80 overflow-y-auto animate-scale-in"
          )}
        >
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search currencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={cn(
                  "w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-secondary/50 border-0",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                )}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          <ul className="py-1 max-h-64 overflow-y-auto">
            {filteredCurrencies.map((currency) => (
              <li key={currency.code}>
                <button
                  type="button"
                  onClick={() => handleSelect(currency.code)}
                  className={cn(
                    "w-full flex items-center px-4 py-2 text-left hover:bg-secondary/50 transition-colors",
                    currency.code === value ? "bg-primary/5" : ""
                  )}
                >
                  <span className="text-xl mr-2">{currency.flag}</span>
                  <span className="font-medium mr-2">{currency.code}</span>
                  <span className="text-muted-foreground text-sm">
                    {currency.name}
                  </span>
                </button>
              </li>
            ))}
            {filteredCurrencies.length === 0 && (
              <li className="px-4 py-2 text-muted-foreground text-sm text-center">
                No currencies found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
