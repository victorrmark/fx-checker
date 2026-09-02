import { type MarketRate } from "../../hooks/useMarketRates.ts";
import { Triangle } from "lucide-react";

const MarketCard = ({ market, index }: { market: MarketRate; index: number }) => {
  return (
    <>
    {index !== 0 && <div className="w-px h-full outline-1 outline-neutral-500 z-50" />}
      <div className="p-3 md:px-5 md:py-3 flex items-center justify-between gap-2.5 md:gap-3">
        <p className="text-6 md:text-5 text-neutral-200">{market.base}/{market.quote}</p>
        <p className="text-6 md:text-5 font-medium text-neutral-50">
          {market.rate.toFixed(2)}
        </p>
        <div className="flex gap-1.5 items-center">
          {market.change >= 0 ? (
            <Triangle className="fill-green-500" size={12} strokeWidth={0} />
          ) : (
            <Triangle
              className="fill-red-500 rotate-180"
              size={12}
              strokeWidth={0}
            />
          )}
          <p
            className={`text-6 md:text-5 ${market.change >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {market.change >= 0 ? "+" : ""}
            {market.change.toFixed(2)}%
          </p>
        </div>
      </div>
    </>
  );
};

export default MarketCard;
