import MarketCard from "./MarketCard.tsx";
import { useMarketRates } from "../../hooks/useMarketRates.ts";
import MarktetSkeleton from "./MarktetSkeleton.tsx";
import { marketPairs } from "../../utils/tickerPairs.ts";

function MarketTicker() {
  const { data, isLoading, isError } = useMarketRates();

  return (
    <div className="flex w-full min-w-0 bg-neutral-700">
      <div className="animate-glow text-5 font-medium bg-lime-500 text-neutral-900 flex gap-2 px-4 py-3 flex-none z-10">
        <span>•</span>
        <p>LIVE MARKETS</p>
      </div>
      <div className="min-w-0 flex flex-1  overflow-hidden">
        <div className="flex animate-marquee">
          {isLoading || isError
            ? [...marketPairs, ...marketPairs].map((market, index) => (
                <MarktetSkeleton key={index} market={market} index={index} error={isError} />
              ))
            : [...data, ...data].map((market, index) => (
                <MarketCard key={index} market={market} index={index} />
              ))}
        </div>
      </div>
    </div>
  );
}

export default MarketTicker;
