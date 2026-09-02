import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { groupPairsByBase, marketPairs, getDateDaysAgo } from "../utils/tickerPairs";

type Rate = {
  base: string;
  quote: string;
  rate: number;
  date: string;
};

export type MarketRate = Rate & {
  change: number;
};

export function useMarketRates() {
  const groupedPairs = groupPairsByBase(marketPairs);

  const queries = useQueries({
    queries: Object.entries(groupedPairs).map(
      ([base, quotes]) => ({
        queryKey: ["market-rates", base, quotes],

        queryFn: async (): Promise<MarketRate[]> => {
          const from = getDateDaysAgo(7);
          const to = new Date()
            .toISOString()
            .split("T")[0];

          const { data } = await axios.get(
            "https://api.frankfurter.dev/v2/rates",
            {
              params: {
                base,
                quotes: quotes.join(","),
                from,
                to,
              },
            }
          );

          const ratesByQuote = data.reduce(
            (
              groups: Record<string, Rate[]>,
              item: Rate
            ) => {
              if (!groups[item.quote]) {
                groups[item.quote] = [];
              }

              groups[item.quote].push(item);

              return groups;
            },
            {}
          );
          const entries = Object.entries(ratesByQuote) as [string, Rate[]][];

          return entries.map(
            ([quote, rates]) => {
              rates.sort((a, b) =>
                a.date.localeCompare(b.date)
              );

              const latest = rates[rates.length - 1];
              const previous = rates[rates.length - 2];

              if (!latest) {
                throw new Error(
                  `No rate found for ${base}/${quote}`
                );
              }

              const change = previous
                ? ((latest.rate - previous.rate) /
                    previous.rate) *
                  100
                : 0;

              return {
                base,
                quote,
                rate: latest.rate,
                change,
                date: latest.date,
              };
            }
          );
        },

        staleTime: 60 * 60 * 1000,
        refetchInterval: 60 * 60 * 1000,
      })
    ),
  });

  const data = queries.flatMap(
    (query) => query.data ?? []
  );

  const isLoading = queries.some(
    (query) => query.isLoading
  );

  const isError = queries.some(
    (query) => query.isError
  );

  return {
    data,
    isLoading,
    isError,
  };
}

