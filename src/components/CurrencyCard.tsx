import Converter from "./Converter";
import ConversionRate from "./ConversionRate";

export default function CurrencyCard() {
  return (
    <div className="flex flex-col w-full gap-4">
      <h1 className="text-2 text-neutral-50 uppercase">Check the rate</h1>
      <div className="bg-neutral-700 rounded-[20px]">
        <Converter />
        <div className="border-t border-dashed border-neutral-500"></div>

        <ConversionRate />
      </div>
    </div>
  );
}
