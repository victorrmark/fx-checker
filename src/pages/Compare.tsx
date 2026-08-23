import { useCurrency } from "../context/Currency/useCurrency";
import EmptyState from "../components/EmptyState";
import { formatNumber } from "../utils/formatNumbers";
import ComparedCurrencies from "../components/comparedCurrencies";
import { useCompareCurrencies } from "../hooks/useCompareRate";
import CompareSkeletons from "../components/skeletons/CompareSkeletons";

export default function Compare() {
  const { baseCurrency, amount } = useCurrency();
  const { rates, isLoading, isError } = useCompareCurrencies(
    baseCurrency.code,
    amount,
  );

  if (!amount) {
    return (
      <EmptyState
        title="No comparison available"
        message={`Enter an amount in SEND above to see what your \nmoney is worth in other currencies.`}
      />
    );
  }

  return (
    <div className="relative w-full flex flex-col bg-neutral-700 outline-neutral-600 px-4 py-5 sm:p-5 gap-5 rounded-2xl">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2.5">
        <div className="flex items-center gap-2">
          <p className="uppercase text-4 text-neutral-200">multi-currency</p>
          <p className="uppercase text-3 font-medium text-neutral-50">
            {formatNumber(amount)} from {baseCurrency.code}
          </p>
        </div>
        <p className="uppercase text-5 text-neutral-200">8 pairs</p>
      </div>

      {isError && (
        <div className="text-red-500">
          Error occurred while fetching currency rates.
        </div>
      )}
      <ComparedCurrencies data={rates} />
    </div>
  );
}
