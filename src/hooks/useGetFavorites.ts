import axios from "axios";
import { useQueries } from "@tanstack/react-query";
import { useFavorites } from "../context/Favorites/useFavorites";
import {
  groupPairsByBase,
  parseFavoritePairs,
  getDateDaysAgo,
} from "../utils/tickerPairs";


type Rate = {
  base: string;
  quote: string;
  rate: number;
  date: string;
};

export type FavoriteRate = Rate & {
  change: number;
  isPositive: boolean;
};

export function useGetFavorites() {
  const { favorites } = useFavorites();
  const favoritePairs = parseFavoritePairs(favorites);

  const groupedPairs = groupPairsByBase(favoritePairs);

  const queries = useQueries({
    queries: Object.entries(groupedPairs).map(([base, quotes]) => ({
      queryKey: ["favorite", base, quotes],
      enabled: favorites.length > 0,

      queryFn: async (): Promise<FavoriteRate[]> => {
        const from = getDateDaysAgo(7);
        const to = new Date().toISOString().split("T")[0];

        const { data } = await axios.get(
          "https://api.frankfurter.dev/v2/rates",
          {
            params: {
              base,
              quotes: quotes.join(","),
              from,
              to,
            },
          },
        );

        const ratesByQuote = data.reduce(
          (groups: Record<string, Rate[]>, item: Rate) => {
            if (!groups[item.quote]) {
              groups[item.quote] = [];
            }

            groups[item.quote].push(item);

            return groups;
          },
          {},
        );
        const entries = Object.entries(ratesByQuote) as [string, Rate[]][];

        return entries.map(([quote, rates]) => {
          rates.sort((a, b) => a.date.localeCompare(b.date));

          const latest = rates[rates.length - 1];
          const previous = rates[rates.length - 2];

          if (!latest) {
            throw new Error(`No rate found for ${base}/${quote}`);
          }

          const change = previous
            ? ((latest.rate - previous.rate) / previous.rate) * 100
            : 0;

          return {
            base,
            quote,
            rate: latest.rate,
            change,
            date: latest.date,
            isPositive: change >= 0,
          };
        });
      },

      staleTime: 60 * 60 * 1000,
      refetchInterval: 60 * 60 * 1000,
    })),
  });

  const data = queries.flatMap((query) => query.data ?? []);

  const isLoading = queries.some((query) => query.isLoading);

  const isError = queries.some((query) => query.isError);

  return {
    pairs: data,
    isLoading,
    isError,
  };
}
