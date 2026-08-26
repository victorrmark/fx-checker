import axios from "axios";
import { useQueries } from "@tanstack/react-query";
import { useFavorites } from "../context/Favorites/useFavorites";
import { compareRange } from "../utils/getDateRange";

export type FavoriteRate = {
  date: string;
  base: string;
  quote: string;
  rate: number;
  change: number;
  isPositive: boolean;
};

export function useGetFavorites() {
  const { favorites } = useFavorites();
  const results = useQueries({
    queries: favorites.map((pair) => {
      const [base, quote] = pair.split("_");

      return {
        queryKey: ["favorite", base, quote],
        enabled: favorites.length > 0,
        queryFn: async () => {
          const r = compareRange();
          const path =
            `/v2/rates?base=${base}` +
            `&quotes=${quote}` +
            `&from=${r.from}&to=${r.to}`;

          const { data } = await axios.get(
            "https://api.frankfurter.dev" + path,
          );

          // if (!data.ok) {
          //   throw new Error("Failed to fetch favorites rate");
          // }

          const open = data[0].rate;
          const last = data[data.length - 1].rate;

          const change = ((last - open) / open) * 100;

          // console.log(data);

          return {
            ...data[data.length - 1],
            change,
            isPositive: change >= 0
          };
        },
      };
    }),
  });

  const pairs: FavoriteRate[] = results
    .map((result) => result.data)
    .filter((data): data is FavoriteRate => data !== undefined);

  const isLoading = results.some((result) => result.isPending);
  const isError = results.some((result) => result.isError);

  return {
    pairs,
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
