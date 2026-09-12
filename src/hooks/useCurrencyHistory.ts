import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { HistoryData } from "../type/data";
import { getRange } from "../utils/getDateRange";
import { getMultiRates } from "../api/frankfuter";

export function useCurrencyHistory(
  base: string,
  quote: string,
  range: { label: string; value: number },
) {
  return useQuery<HistoryData[]>({
    queryKey: ["history", base, quote, range],
    queryFn: async () => {
      const r = getRange(range);
      const data = await getMultiRates(base, quote, r.from, r.to);

      return data.map(({ date, rate }: { date: string; rate: number }) => ({
        date,
        rate,
      }));
    },
    placeholderData: keepPreviousData,
  });
}
