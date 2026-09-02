type MarketPair = {
  base: string;
  quote: string;
};

type MarketRate = {
  base: string;
  quote: string;
  rate: number;
  change: number;
  date: string;
};

export const marketPairs: MarketPair[] = [
  { base: "USD", quote: "EUR" },
  { base: "USD", quote: "GBP" },
  { base: "USD", quote: "NGN" },
  { base: "USD", quote: "JPY" },
  { base: "USD", quote: "CNY" },
  { base: "USD", quote: "CAD" },

  { base: "EUR", quote: "USD" },
  { base: "EUR", quote: "GBP" },
  { base: "EUR", quote: "NGN" },
  { base: "EUR", quote: "CNY" },
  { base: "EUR", quote: "CAD" },

  { base: "GBP", quote: "NGN" },
  { base: "GBP", quote: "CNY" },
  { base: "GBP", quote: "USD" },
];

export function getDateDaysAgo(days: number) {
  const date = new Date();

  date.setDate(date.getDate() - days);

  return date.toISOString().split("T")[0];
}
