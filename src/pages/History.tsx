import { useState } from "react";
import ConversionStats from "../components/conversionStats";
import ChartComponent from "../components/chart/rateChart";
import { useCurrencyHistory } from "../hooks/useCurrencyHistory";
import { useCurrency } from "../context/Currency/useCurrency";
import { getDate } from "../utils/getDate";
import { ChartSkeleton } from "../components/skeletons/ChartSkeleton";
import EmptyState from "../components/EmptyState";

const ranges = [
  { label: "1W", value: 7 },
  { label: "1M", value: 31 },
  { label: "3M", value: 93 },
  { label: "1Y", value: 365 },
  { label: "5Y", value: 1825 },
];

export default function History() {
  const [chartRange, setChartRange] = useState(ranges[0]);
  const { baseCurrency, quoteCurrency } = useCurrency();
  const {
    data = [],
    isPending,
    isFetching,
    error,
  } = useCurrencyHistory(baseCurrency.code, quoteCurrency.code, chartRange);

  const { month, day, time, timeZone } = getDate(new Date());

  if (isPending) {
    return <ChartSkeleton />;
  }

  if (error) {
    return (
      <EmptyState
        title="No chart data available"
        message={`We couldn't load rate history for ${baseCurrency.code}/${quoteCurrency.code} right now.\nThis usually clears up in a minute.`}
      />
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 justify-between  items-start lg:items-center">
        <ConversionStats data={data} isFetching={isFetching} />
        <nav className="p-0.5 bg-neutral-700 rounded-lg flex items-center">
          {ranges.map((range, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setChartRange(range)}
              className={`px-4 py-3  focus:outline-none  uppercase text-5 flex items-center cursor-pointer rounded-lg ${chartRange.label === range.label ? " text-neutral-50 bg-neutral-500" : "text-neutral-200 focus:text-neutral-100 hover:text-neutral-100 "}`}
            >
              {range.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex w-full flex-col py-3 px-4 rounded-2xl bg-neutral-700 outline outline-neutral-600 gap-4">
        <div className="flex justify-between items-center">
          <p className="uppercase text-3 font-medium text-neutral-50">
            {baseCurrency.code}/{quoteCurrency.code}
          </p>
          <div className="text-5 text-neutral-50 uppercase font-light flex items-center gap-2">
            <p>
              {data[data.length - 1]?.rate} {month} {day}
            </p>
            <p>{time}</p>
            <p>{timeZone}</p>
          </div>
        </div>
        <ChartComponent data={data} />
      </div>
    </div>
  );
}
