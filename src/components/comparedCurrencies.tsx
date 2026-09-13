import { Star } from "lucide-react";
import { compareList } from "../utils/compareCurrencies";
import { formatNumber } from "../utils/formatNumbers";
import type { CurrenciesRate } from "../hooks/useCompareRate";
import { useFavorites } from "../context/Favorites/useFavorites";

export default function ComparedCurrencies({
  data,
}: {
  data: CurrenciesRate[];
}) {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <>
      {data.map((data: CurrenciesRate) => {
        const favorite = isFavorite(data.base, data.quote);
        return (
          <div
            className="p-3 sm:p-4 rounded-[10px] bg-neutral-600 outline outline-neutral-500 gap-3.5 flex items-center"
            key={data.quote}
          >
            <img
              src={
                compareList.find((currency) => currency.code === data.quote)
                  ?.flag
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
              className={`p-2 outline rounded-lg cursor-pointer ${favorite ? "outline-lime-500" : "outline-neutral-500"}`}
              onClick={() => toggleFavorite(data.base, data.quote)}
              aria-label={
                favorite
                  ? `Remove ${data.base} to ${data.quote} from favorites`
                  : `Add ${data.base} to ${data.quote} to favorites`
              }
              aria-pressed={favorite}
            >
              <Star
                className={
                  favorite ? "fill-lime-500 text-lime-500" : "text-neutral-50"
                }
                size={15}
                aria-hidden="true"
              />
            </button>
          </div>
        );
      })}
    </>
  );
}
