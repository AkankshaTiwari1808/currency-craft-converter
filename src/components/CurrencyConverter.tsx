
import React, { useEffect, useState } from "react";
import { useCurrencyConverter } from "@/lib/useCurrencyConverter";
import CurrencySelector from "./CurrencySelector";
import AmountInput from "./AmountInput";
import { ArrowLeftRight, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface CurrencyConverterProps {
  className?: string;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ className }) => {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    amount,
    setAmount,
    swapCurrencies,
    isLoading,
    lastResult,
    currencies,
  } = useCurrencyConverter();

  const [conversionVisible, setConversionVisible] = useState(false);
  const [animateSwap, setAnimateSwap] = useState(false);

  // Animate results when they change
  useEffect(() => {
    if (lastResult) {
      setConversionVisible(false);
      setTimeout(() => setConversionVisible(true), 100);
    }
  }, [lastResult]);

  // Animate swap button
  const handleSwap = () => {
    setAnimateSwap(true);
    swapCurrencies();
    setTimeout(() => setAnimateSwap(false), 500);
  };

  return (
    <div
      className={cn(
        "w-full max-w-2xl mx-auto glass p-6 rounded-2xl shadow-lg",
        className
      )}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Currency Converter
        </h1>
        <p className="text-muted-foreground text-center">
          Convert between currencies with real-time exchange rates
        </p>
      </div>

      <div className="space-y-6">
        <AmountInput
          label="Amount"
          value={amount}
          onChange={setAmount}
          currency={fromCurrency}
        />

        <div className="flex flex-col md:flex-row justify-between gap-4 relative">
          <CurrencySelector
            label="From"
            value={fromCurrency}
            currencies={currencies}
            onChange={setFromCurrency}
            className="flex-1"
          />

          <div className="hidden md:flex items-center justify-center">
            <button
              type="button"
              onClick={handleSwap}
              className={cn(
                "w-10 h-10 rounded-full glass flex items-center justify-center",
                "hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/20",
                "transition-all duration-300",
                animateSwap ? "rotate-180" : ""
              )}
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleSwap}
            className={cn(
              "flex md:hidden items-center justify-center py-2 rounded-lg glass",
              "hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/20",
              "transition-all duration-300",
              animateSwap ? "rotate-180" : ""
            )}
          >
            <ArrowLeftRight className="w-4 h-4 mr-2" />
            <span>Swap Currencies</span>
          </button>

          <CurrencySelector
            label="To"
            value={toCurrency}
            currencies={currencies}
            onChange={setToCurrency}
            className="flex-1"
          />
        </div>

        <div
          className={cn(
            "mt-8 p-4 rounded-xl bg-secondary/50 transition-all duration-500",
            "border border-border",
            conversionVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform -translate-y-4"
          )}
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            lastResult && (
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <span className="text-3xl font-semibold">
                    {lastResult.formattedResult}
                  </span>
                </div>

                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center justify-center space-x-2">
                    <span>
                      1 {lastResult.fromCurrency} = {lastResult.rate.toFixed(4)}{" "}
                      {lastResult.toCurrency}
                    </span>
                  </div>
                  <div className="mt-1">
                    Last updated: {lastResult.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
