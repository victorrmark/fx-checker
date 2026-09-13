import { Star, ArrowRight, Triangle } from "lucide-react";
import { useFavorites } from "../../context/Favorites/useFavorites";
import { useCurrency } from "../../context/Currency/useCurrency";
import { currencyList } from "../../utils/currencyList";
import { useGetFavorites } from "../../hooks/useGetFavorites";

export default function Favorite() {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { pairs } = useGetFavorites();

  const { setBaseCurrency, setQuoteCurrency } = useCurrency();

  const currencyMap = new Map(
    [...currencyList.popular, ...currencyList.other].map((currency) => [
      currency.code,
      currency,
    ]),
  );

  const handleClick = (base: string, quote: string) => {
    const newBaseCurrency = currencyMap.get(base);
    const newQuoteCurrency = currencyMap.get(quote);
    if (newBaseCurrency) {
      setBaseCurrency(newBaseCurrency);
    }
    if (newQuoteCurrency) {
      setQuoteCurrency(newQuoteCurrency);
    }
  };

  return (
    <>
      {pairs.map((pair) => {
        const favorite = isFavorite(pair.base, pair.quote);
        return (
          <div
            key={`${pair.base}-${pair.quote}`}
            className="p-3 sm:p-4 rounded-[10px] bg-neutral-600 outline outline-neutral-500 gap-3.5 flex items-center transition-colors focus-within:outline-2 focus-within:outline-lime-500"
          >
            <button
              type="button"
              onClick={() => handleClick(pair.base, pair.quote)}
              aria-label={`View ${pair.base} to ${pair.quote} exchange rate`}
              className="flex min-w-0 flex-1 items-center justify-between gap-2 cursor-pointer focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <p className="text-4 text-neutral-50">{pair.base}</p>
                <ArrowRight className="text-neutral-200" size={15} />
                <p className="text-4 text-neutral-50">{pair.quote}</p>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-3 text-neutral-50">{pair.rate.toFixed(4)}</span>
                <span
                  className={`text-6 flex items-center gap-1 text-right ${pair.isPositive ? "text-green-500" : "text-red-500"}`}
                >
                  {pair.isPositive ? (
                    <Triangle
                      className="fill-green-500"
                      size={7}
                      strokeWidth={0}
                      aria-hidden="true"
                    />
                  ) : (
                    <Triangle
                      className="fill-red-500 rotate-180"
                      size={7}
                      strokeWidth={0}
                      aria-hidden="true"
                    />
                  )}
                  {pair.isPositive ? "+" : ""}
                  {pair.change.toFixed(2)}%
                </span>
              </div>
            </button>

            <button
              type="button"
              className={`p-2 rounded-lg cursor-pointer focus:outline-2 focus:outline-offset-2 focus:outline-lime-500 border ${
                favorite ? "border-lime-500" : "border-neutral-500"
              }`}
              onClick={() => toggleFavorite(pair.base, pair.quote)}
              aria-label={
                favorite
                  ? `Remove ${pair.base} to ${pair.quote} from favorites`
                  : `Add ${pair.base} to ${pair.quote} to favorites`
              }
              aria-pressed={favorite}
            >
              <Star
                className={
                  favorite ? "fill-lime-500 text-lime-500" : "text-neutral-50"
                }
                size={12}
                aria-hidden="true"
              />
            </button>
          </div>
        );
      })}
    </>
  );
}

{
  /* <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-5">
            <p className="text-3 text-neutral-100">
              {formatNumber(log.amount)}
            </p>
            <p className="text-3 text-lime-500">{log.convertedAmount}</p>
          </div> */
}
