import { getCurrencyStats } from "../utils/getCurrencyStats";
import { Triangle } from "lucide-react";

export default function ConversionStats({
  data,
  isFetching,
}: {
  data: { rate: number }[];
  isFetching: boolean;
}) {
  const stats = getCurrencyStats(data);

  if (!stats) return null;

  if (isFetching) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-20.25 w-35 rounded-lg bg-neutral-800"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full sm:w-auto grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="flex flex-col gap-4 py-3 px-5 rounded-2xl bg-neutral-700 outline-1 outline-neutral-600">
        <p className="text-4 text-neutral-50">OPEN</p>
        <p className="text-2 text-neutral-50">{stats.open.toFixed(4)}</p>
      </div>

      <div className="flex flex-col gap-4 py-3 px-5 rounded-2xl bg-neutral-700 outline-1 outline-neutral-600">
        <p className="text-4 text-neutral-50">LAST</p>
        <p className="text-2 text-neutral-50">{stats.last.toFixed(4)}</p>
      </div>

      <div className="flex flex-col gap-4 py-3 px-5 rounded-2xl bg-neutral-700 outline-1 outline-neutral-600">
        <p className="text-4 text-neutral-50">CHANGE</p>
        <p
          className={`text-2 ${stats.isPositive ? "text-green-500" : "text-red-500"}`}
        >
          {stats.change >= 0 ? "+" : ""}
          {stats.change.toFixed(4)}
        </p>
      </div>

      <div className="flex flex-col gap-4 py-3 px-5 rounded-2xl bg-neutral-700 outline-1 outline-neutral-600">
        <p className="text-4 text-neutral-50">% CHANGE</p>
        <p
          className={`text-2 flex items-center gap-1 ${stats.isPositive ? "text-green-500" : "text-red-500"}`}
        >
          {stats.percentChange >= 0 ? (
            <Triangle className="fill-green-500" size={12} strokeWidth={0} />
          ) : (
            <Triangle
              className="fill-red-500 rotate-180"
              size={12}
              strokeWidth={0}
            />
          )}
          {stats.percentChange >= 0 ? "+" : ""}
          {stats.percentChange.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}
