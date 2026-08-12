export default function ChartError() {
  return (
    <div className="w- full px-10 gap-4 flex flex-col items-center">
      <p className="text-2 text-neutral-100">No chart data avaliable</p>{" "}
      <p className="text-center text-3 text-neutral-200">
        We couldn't load rate history for USD/EUR right now. <br /> This usually clears
        up in a minute.
      </p>
    </div>
  );
}
