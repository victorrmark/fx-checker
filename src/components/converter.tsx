import { ArrowLeftRight } from "lucide-react";
import { removeSign } from "../utils/formatNumbers";
import CurrencyButton from "./CurrencyButton";
import { useCurrency } from "../context/Currency/useCurrency";
import { useGetCurrency } from "../hooks/useGetCurrency";

export default function Converter() {
  const {
    amount,
    debounceAmount,
    setDebounceAmount,
    baseCurrency,
    quoteCurrency,
    setBaseCurrency,
    setQuoteCurrency,
  } = useCurrency();

  const { data } = useGetCurrency(
    Number(amount),
    baseCurrency.code,
    quoteCurrency.code,
  );

  const handleSwitch = () => {
    const currentBaseCurrency = baseCurrency;
    const currentQuoteCurrency = quoteCurrency;
    setBaseCurrency(currentQuoteCurrency);
    setQuoteCurrency(currentBaseCurrency);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    if (rawValue === "" || /^\d*\.?\d*$/.test(rawValue)) {
      setDebounceAmount(rawValue);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 p-4 md:flex-row md:gap-6 md:p-5 items-center">
      <div className="gap-4 p-4 rounded-2xl md:gap-5 md:p-5 flex flex-col w-full outline-1 outline-neutral-500 bg-neutral-600 min-w-0">
        <p className="uppercase text-4 text-neutral-100">Send</p>
        <div className="flex w-full items-center justify-between">
          <input
            type="number"
            value={debounceAmount}
            inputMode="numeric"
            onChange={handleChange}
            className="bg-transparent min-w-0 text-neutral-50 text-tab lg:text-1  focus:outline-none no-spinner placeholder:text-tab lg:placeholder:text-1 placeholder:opacity-100 placeholder:text-neutral-200"
            placeholder="0"
          />

          <CurrencyButton
            currency={baseCurrency}
            setCurrency={setBaseCurrency}
          />
        </div>
      </div>

      <button
        className="p-3 h-12 rounded-lg outline-1 outline-neutral-500 bg-neutral-600 hover:bg-neutral-400 cursor-pointer"
        onClick={handleSwitch}
      >
        <ArrowLeftRight className="rotate-90 md:rotate-0 " color="white" />
      </button>

      <div className="gap-4 p-4 rounded-2xl md:gap-5 md:p-5 flex flex-col w-full outline-1 outline-neutral-500 bg-neutral-600">
        <p className="uppercase text-4 text-neutral-100">Receive</p>
        <div className="flex w-full items-center justify-between">
          <p
            className={`text-tab lg:text-1 hover:cursor-text ${amount ? "text-lime-500" : "text-neutral-200"}`}
          >
            {amount ? removeSign(data?.convert) : "0"}
          </p>
          <CurrencyButton
            currency={quoteCurrency}
            setCurrency={setQuoteCurrency}
          />
        </div>
      </div>
    </div>
  );
}
