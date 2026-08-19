import { useCurrency } from "../context/Currency/useCurrency";
import EmptyState from "../components/EmptyState";

export default function Compare() {
  const { baseCurrency, amount } = useCurrency();

  if (!amount) {
    return (
      <EmptyState
        title="No comparison available"
        message={`Enter an amount in SEND above to see what your \nmoney is worth in other currencies.`}
      />
    );
  }

  return <div>Compare</div>;
}
