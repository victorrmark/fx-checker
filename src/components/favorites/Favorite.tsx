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
      {pairs.map((pair, idx) => {
        const favorite = isFavorite(pair.base, pair.quote);
        return (
          <div
            key={idx}
            className="p-3 sm:p-4 rounded-[10px] bg-neutral-600 outline outline-neutral-500 gap-3.5 flex items-center"
          >
            <button
              type="button"
              onClick={() => handleClick(pair.base, pair.quote)}
              className="flex flex-1 items-center justify-between gap-2 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <p className="text-4 text-neutral-50">{pair.base}</p>
                <ArrowRight className="text-neutral-200" size={15} />
                <p className="text-4 text-neutral-50">{pair.quote}</p>
              </div>

              <div className="flex flex-col items-end">
                <p className="text-3 text-neutral-50">{pair.rate.toFixed(4)}</p>
                <p
                  className={`text-6 flex items-center gap-1 text-right ${pair.isPositive ? "text-green-500" : "text-red-500"}`}
                >
                  {pair.isPositive ? (
                    <Triangle
                      className="fill-green-500"
                      size={7}
                      strokeWidth={0}
                    />
                  ) : (
                    <Triangle
                      className="fill-red-500 rotate-180"
                      size={7}
                      strokeWidth={0}
                    />
                  )}
                  {pair.isPositive ? "+" : ""}
                  {pair.change.toFixed(2)}%
                </p>
              </div>
            </button>

            <button
              type="button"
              className={`p-2 outline rounded-lg cursor-pointer ${
                favorite ? "outline-lime-500" : "outline-neutral-500"
              }`}
              onClick={() => toggleFavorite(pair.base, pair.quote)}
            >
              <Star
                className={
                  favorite ? "fill-lime-500 text-lime-500" : "text-neutral-50"
                }
                size={12}
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
