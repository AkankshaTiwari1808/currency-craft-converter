
export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

export const currencies: Currency[] = [
  {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    flag: "🇺🇸"
  },
  {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    flag: "🇪🇺"
  },
  {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    flag: "🇬🇧"
  },
  {
    code: "JPY",
    name: "Japanese Yen",
    symbol: "¥",
    flag: "🇯🇵"
  },
  {
    code: "CAD",
    name: "Canadian Dollar",
    symbol: "$",
    flag: "🇨🇦"
  },
  {
    code: "AUD",
    name: "Australian Dollar",
    symbol: "$",
    flag: "🇦🇺"
  },
  {
    code: "CHF",
    name: "Swiss Franc",
    symbol: "Fr",
    flag: "🇨🇭"
  },
  {
    code: "CNY",
    name: "Chinese Yuan",
    symbol: "¥",
    flag: "🇨🇳"
  },
  {
    code: "INR",
    name: "Indian Rupee",
    symbol: "₹",
    flag: "🇮🇳"
  },
  {
    code: "BRL",
    name: "Brazilian Real",
    symbol: "R$",
    flag: "🇧🇷"
  },
  {
    code: "RUB",
    name: "Russian Ruble",
    symbol: "₽",
    flag: "🇷🇺"
  },
  {
    code: "KRW",
    name: "South Korean Won",
    symbol: "₩",
    flag: "🇰🇷"
  },
  {
    code: "SGD",
    name: "Singapore Dollar",
    symbol: "$",
    flag: "🇸🇬"
  },
  {
    code: "NZD",
    name: "New Zealand Dollar",
    symbol: "$",
    flag: "🇳🇿"
  },
  {
    code: "MXN",
    name: "Mexican Peso",
    symbol: "$",
    flag: "🇲🇽"
  }
];

// Default exchange rates (for demo purposes)
// In a real app, these would come from an API
export const exchangeRates: Record<string, Record<string, number>> = {
  USD: {
    EUR: 0.93,
    GBP: 0.79,
    JPY: 149.85,
    CAD: 1.37,
    AUD: 1.52,
    CHF: 0.90,
    CNY: 7.18,
    INR: 83.10,
    BRL: 5.05,
    RUB: 89.25,
    KRW: 1338.76,
    SGD: 1.34,
    NZD: 1.64,
    MXN: 17.05
  },
  EUR: {
    USD: 1.08,
    GBP: 0.85,
    JPY: 161.76,
    CAD: 1.48,
    AUD: 1.64,
    CHF: 0.97,
    CNY: 7.75,
    INR: 89.65,
    BRL: 5.45,
    RUB: 96.30,
    KRW: 1445.32,
    SGD: 1.45,
    NZD: 1.77,
    MXN: 18.40
  }
};

// Generate exchange rates for all currency pairs
export const generateAllExchangeRates = (): Record<string, Record<string, number>> => {
  const allRates: Record<string, Record<string, number>> = {};
  
  currencies.forEach(fromCurrency => {
    allRates[fromCurrency.code] = {};
    
    currencies.forEach(toCurrency => {
      if (fromCurrency.code === toCurrency.code) {
        allRates[fromCurrency.code][toCurrency.code] = 1;
        return;
      }
      
      // Use existing rates when available
      if (exchangeRates[fromCurrency.code]?.[toCurrency.code]) {
        allRates[fromCurrency.code][toCurrency.code] = exchangeRates[fromCurrency.code][toCurrency.code];
      } 
      // Try the inverse rate
      else if (exchangeRates[toCurrency.code]?.[fromCurrency.code]) {
        allRates[fromCurrency.code][toCurrency.code] = 1 / exchangeRates[toCurrency.code][fromCurrency.code];
      }
      // Generate a pseudo-random rate based on the currency codes (for demo purposes only)
      else {
        const seed = (fromCurrency.code.charCodeAt(0) + toCurrency.code.charCodeAt(0)) / 100;
        allRates[fromCurrency.code][toCurrency.code] = 0.5 + seed + Math.random();
      }
    });
  });
  
  return allRates;
};

export const getCurrencyByCode = (code: string): Currency | undefined => {
  return currencies.find(currency => currency.code === code);
};
