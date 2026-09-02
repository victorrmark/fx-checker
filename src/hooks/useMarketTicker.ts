import { useQueries } from "@tanstack/react-query";
// import { compareRange } from "../utils/getDateRange";
import { fetchTicker } from "../utils/fetchTicker";

export type FavoriteRate = {
  date: string;
  base: string;
  quote: string;
  rate: number;
  // change: number;
  // isPositive: boolean;
};

export function useMarketTicker() {
  const results = useQueries({
    queries: [
      {
        queryKey: ["market-rates", "USD"],
        queryFn: () => fetchTicker("USD", ["EUR", "GBP", "NGN", "JPY"]),
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
      },
      {
        queryKey: ["market-rates", "EUR"],
        queryFn: () => fetchTicker("EUR", ["GBP", "USD"]),
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
      },
      {
        queryKey: ["market-rates", "GBP"],
        queryFn: () => fetchTicker("GBP", ["NGN", "USD"]),
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
      },
    ],
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

// export function useGetMarketTicker() {
//   const { favorites } = useFavorites();
//   const results = useQueries({
//     queries: favorites.map((pair) => {
//       const [base, quote] = pair.split("_");

//       return {
//         queryKey: ["favorite", base, quote],
//         enabled: favorites.length > 0,
//         queryFn: async () => {
//           const r = compareRange();
//           const path =
//             `/v2/rates?base=${base}` +
//             `&quotes=${quote}` +
//             `&from=${r.from}&to=${r.to}`;

//           const { data } = await axios.get(
//             "https://api.frankfurter.dev" + path,
//           );

//           const open = data[0].rate;
//           const last = data[data.length - 1].rate;

//           const change = ((last - open) / open) * 100;

//           return {
//             ...data[data.length - 1],
//             change,
//             isPositive: change >= 0
//           };
//         },
//       };
//     }),
//   });

//   const pairs: FavoriteRate[] = results
//     .map((result) => result.data)
//     .filter((data): data is FavoriteRate => data !== undefined);

//   const isLoading = results.some((result) => result.isPending);
//   const isError = results.some((result) => result.isError);

//   return {
//     pairs,
//     isLoading,
//     isError,
//   };
// }
