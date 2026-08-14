import { useCurrency } from "../context/Currency/useCurrency";
import { useGetCurrency } from "../hooks/useGetCurrency";
import AddFavorites from "./favoritesComponents/AddFavorites";
import AddLog from "./logComponents/AddLog";

export default function ConversionRate() {
  const { baseCurrency, quoteCurrency } = useCurrency();
  const { data, isLoading, error } = useGetCurrency(
    1,
    baseCurrency.code,
    quoteCurrency.code,
  );

  if (isLoading) {
    return (
      <div className="w-full p-4 gap-4 flex flex-col items-center md:flex-row justify-between">
        <p className="text-6 text-neutral-50 md:text-5 md:px-5 md:py-4 ">
          Getting rate...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 gap-4 flex flex-col items-center md:flex-row justify-between">
        <p className="text-6 text-neutral-50 md:text-5 md:px-5 md:py-4">
          Problem loading rate,{" "}
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-lime-500 hover:underline bg-transparent border-0 p-0 cursor-pointer font-inherit"
          >
            try again
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-4 gap-4 flex flex-col items-center md:flex-row justify-between">
      <p className="text-6 text-neutral-50 uppercase md:text-5 md:px-5 md:py-4 justify-between">
        1 {data?.base} = {data?.rate} {data?.quote}
      </p>

      <div className="flex items-center gap-3">
        <AddFavorites />
        <AddLog converted={data?.convert} />
      </div>
    </div>
  );
}
