import axios from "axios";
import { useQueries } from "@tanstack/react-query";
import { compareList } from "../utils/compareCurrencies";

export type CurrenciesRate = {
  date: string;
  base: string;
  quote: string;
  rate: number;
  convertedAmount: number;
};

export function useCompareCurrencies(base: string, amount: number) {
  const results = useQueries<CurrenciesRate[]>({
    queries: compareList.map((quote) => ({
      queryKey: ["compare", base, quote.code, amount],
      enabled: Boolean(amount),
      queryFn: async (): Promise<CurrenciesRate> => {
        const { data } = await axios.get(
          `https://api.frankfurter.dev/v2/rate/${base}/${quote.code}`
        );

        return {
          ...data,
          convertedAmount: amount! * data.rate,
        };
      },
    })),
  });

  const rates: CurrenciesRate[] = results
    .map((result) => result.data)
    .filter(Boolean);

  const isLoading = results.some((result) => result.isPending);
  const isError = results.some((result) => result.isError);

  return {
    rates,
    isLoading,
    isError,
  };
}

// const r = compareRange();
        // const path =
        //   `/v2/rates?base=${base}` +
        //   `&quotes=${quote.code}` +
        //   `&from=${r.from}&to=${r.to}`;
        // const { data } = await axios.get("https://api.frankfurter.dev" + path);
