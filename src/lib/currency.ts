// Indian currency formatting utility
export const formatIndianCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Convert USD to INR (approximate rate)
export const usdToInr = (usdAmount: number): number => {
  const exchangeRate = 83.5; // Approximate USD to INR rate
  return Math.round(usdAmount * exchangeRate);
};

// Convert INR to USD
export const inrToUsd = (inrAmount: number): number => {
  const exchangeRate = 83.5;
  return Math.round((inrAmount / exchangeRate) * 100) / 100;
};

// Calculate booking amount based on number of guests and time
export const calculateBookingAmount = (guests: number, time: string): number => {
  const baseAmount = 500; // Base amount per person
  const timeMultiplier = time.includes('PM') && parseInt(time) >= 6 ? 1.2 : 1.0; // Dinner premium
  return Math.round(baseAmount * guests * timeMultiplier);
};

// Calculate tax and total
export const calculateTotal = (subtotal: number): {
  subtotal: number;
  tax: number;
  total: number;
} => {
  const taxRate = 0.18; // 18% GST
  const tax = Math.round(subtotal * taxRate);
  const total = subtotal + tax;
  
  return {
    subtotal,
    tax,
    total
  };
};
