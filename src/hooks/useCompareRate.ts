import { useQueries } from "@tanstack/react-query";
import { compareList } from "../utils/compareCurrencies";
import { getRates } from "../api/frankfuter";

export type CurrenciesRate = {
  date: string;
  base: string;
  quote: string;
  rate: number;
  convertedAmount: number;
};

export function useCompareCurrencies(base: string, amount: number) {
  const results = useQueries({
    queries: compareList.map((quote) => ({
      queryKey: ["compare", base, quote.code, amount],
      enabled: Boolean(amount),
      queryFn: async (): Promise<CurrenciesRate> => {
        const data = await getRates(base, quote.code);

        return {
          ...data,
          convertedAmount: amount! * data.rate,
        };
      },
    })),
  });

  const rates: CurrenciesRate[] = results
    .map((result) => result.data)
    .filter((data): data is CurrenciesRate => data !== undefined);

  const isLoading = results.some((result) => result.isPending);
  const isError = results.some((result) => result.isError);

  return {
    rates,
    isLoading,
    isError,
  };
}

