
import React from "react";
import TransitionLayout from "@/components/TransitionLayout";
import CurrencyConverter from "@/components/CurrencyConverter";
import { cn } from "@/lib/utils";

const Index = () => {
  return (
    <TransitionLayout>
      <div className="w-full">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
          <header className="text-center space-y-6 animate-slide-down">
            <div className="inline-block">
              <span className={cn(
                "inline-block text-xs font-semibold px-3 py-1 rounded-full",
                "bg-primary/5 text-primary"
              )}>
                Simple & Intuitive
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Currency Craft Converter
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A beautifully designed currency converter that helps you convert between currencies with precision and elegance.
            </p>
          </header>

          <div className="animate-fade-in">
            <CurrencyConverter />
          </div>

          <footer className="text-center text-sm text-muted-foreground animate-fade-in">
            <p>
              Currency Craft Converter — Designed with precision and care.
            </p>
          </footer>
        </div>
      </div>
    </TransitionLayout>
  );
};

export default Index;
