import { useQuery } from "@tanstack/react-query";
import { getRates } from "../api/frankfuter";
import type { ConversionData } from "../type/data";

export function useGetCurrency(amount: number, base: string, quote: string) {
  return useQuery<ConversionData>({
    queryKey: ["currency", amount, base, quote],
    queryFn: async () => {
      const data = await getRates(base, quote);

      const rate = new Intl.NumberFormat("en", {
        style: "currency",
        currency: quote,
      });
      return { ...data, convert: rate.format(data.rate * amount) };
    },
  });
}
