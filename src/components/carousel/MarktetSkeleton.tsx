import { type MarketPair } from "../../utils/tickerPairs";

const MarktetSkeleton = ({
  market,
  index,
  error,
}: {
  market: MarketPair;
  index: number;
  error: boolean;
}) => {
  return (
    <>
      {index !== 0 && (
        <div className="w-px h-full outline-1 outline-neutral-500 z-50" />
      )}
      <div className="p-3 md:px-5 md:py-3 flex items-center justify-between gap-2.5 md:gap-3">
        <p className="text-6 md:text-5 text-neutral-200">
          {market.base}/{market.quote}
        </p>
        {error ? (
          <p className="text-6 md:text-5 font-medium text-neutral-50">
            error...
          </p>
        ) : (
          <p className="text-6 md:text-5 font-medium text-neutral-50">
            getting rate ...
          </p>
        )}
      </div>
    </>
  );
};

export default MarktetSkeleton;
