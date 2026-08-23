import { Star } from "lucide-react";
import { compareList } from "../utils/compareCurrencies";
import { formatNumber } from "../utils/formatNumbers";
import type { CurrenciesRate } from "../hooks/useCompareRate";

export default function ComparedCurrencies({
  data,
}: {
  data: CurrenciesRate[];
}) {
  return (
    <>
      {data.map((data: CurrenciesRate) => (
        <div
          className="p-3 sm:p-4 rounded-[10px] bg-neutral-600 outline outline-neutral-500 gap-3.5 flex items-center"
          key={data.quote}
        >
          <img
            src={
              compareList.find((currency) => currency.code === data.quote)?.flag
            }
            alt={data.quote}
            className="w-6 h-6 rounded-full"
          />
          <div className="flex flex-1 flex-col gap-1.5">
            <p className="text-4 text-neutral-50 flex ">{data.quote}</p>
            <p className="text-5 text-neutral-200">
              {
                compareList.find((currency) => currency.code === data.quote)
                  ?.name
              }
            </p>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <p className="text-3 text-neutral-50">
              {formatNumber(data.convertedAmount)}
            </p>
            <p className="text-6 text-neutral-200">
              @ {formatNumber(data.rate)}
            </p>
          </div>

          <button
            className="p-2 outline outline-lime-500 rounded-lg cursor-pointer"
            // onClick={() =>  deleteLog(log.id)}
          >
            <Star className="text-lime-500 " size={15} />
          </button>
        </div>
      ))}
    </>
  );
}
