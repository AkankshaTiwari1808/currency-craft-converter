
import { useState, useEffect, useCallback } from 'react';
import { currencies, generateAllExchangeRates, getCurrencyByCode } from './currencyData';

export interface ConversionResult {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  convertedAmount: number;
  rate: number;
  formattedResult: string;
  timestamp: Date;
}

export const useCurrencyConverter = (
  initialFromCurrency = 'USD',
  initialToCurrency = 'EUR',
  initialAmount = 1
) => {
  const [fromCurrency, setFromCurrency] = useState(initialFromCurrency);
  const [toCurrency, setToCurrency] = useState(initialToCurrency);
  const [amount, setAmount] = useState(initialAmount);
  const [rates, setRates] = useState(generateAllExchangeRates());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<ConversionResult | null>(null);
  
  // Format currency amount for display
  const formatCurrency = useCallback((amount: number, currencyCode: string) => {
    const currency = getCurrencyByCode(currencyCode);
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(amount);
  }, []);
  
  // Perform the conversion
  const convert = useCallback(() => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API delay for a more realistic experience
      setTimeout(() => {
        if (!rates[fromCurrency] || !rates[fromCurrency][toCurrency]) {
          throw new Error(`Rate not found for ${fromCurrency} to ${toCurrency}`);
        }
        
        const rate = rates[fromCurrency][toCurrency];
        const convertedAmount = amount * rate;
        
        const result: ConversionResult = {
          fromCurrency,
          toCurrency,
          amount,
          convertedAmount,
          rate,
          formattedResult: formatCurrency(convertedAmount, toCurrency),
          timestamp: new Date()
        };
        
        setLastResult(result);
        setIsLoading(false);
        return result;
      }, 600);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setIsLoading(false);
      return null;
    }
  }, [fromCurrency, toCurrency, amount, rates, formatCurrency]);
  
  // Swap currencies
  const swapCurrencies = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency]);
  
  // Auto-convert when currencies or amount changes
  useEffect(() => {
    convert();
  }, [fromCurrency, toCurrency, amount, convert]);
  
  return {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    amount,
    setAmount,
    convert,
    swapCurrencies,
    isLoading,
    error,
    lastResult,
    formatCurrency,
    currencies
  };
};
