import { AreaSeries, createChart, ColorType } from "lightweight-charts";
import { useEffect, useRef } from "react";

type ChartData = {
  date: string;
  rate: number;
};

export default function ChartComponent({ data }: { data: ChartData[] }) {
  const colors = {
    backgroundColor: "#171719",
    lineColor: "#cef739",
    textColor: "#9d9d9d",
    areaTopColor: "rgba(216,255,57,.45)",
    areaBottomColor: "rgba(216,255,57,0)",
  };

  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.backgroundColor },
        textColor: colors.textColor,
        fontSize: 12,
      },
      rightPriceScale: {
        visible: false,
      },

      leftPriceScale: {
        visible: true,
        minimumWidth: 60,
        scaleMargins: {
          top: 0.2,
          bottom: 0.2,
        },
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          color: "#2B2B2B",
        },
      },
      timeScale: {
        timeVisible: false,
        secondsVisible: false,
        // tickMarkMaxCharacterLength: 5,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });

    const newSeries = chart.addSeries(AreaSeries, {
      lineColor: colors.lineColor,
      topColor: "rgba(216,255,57,.45)",
      bottomColor: "rgba(216,255,57,0)",
      lineWidth: 2,
    });
    newSeries.setData(
      data.map((item) => ({
        time: item.date,
        value: item.rate,
      })),
    );

    chart.timeScale().fitContent();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [
    data,
    colors.backgroundColor,
    colors.lineColor,
    colors.textColor,
    colors.areaTopColor,
    colors.areaBottomColor,
  ]);

  return <div ref={chartContainerRef} />;
}

// import {
//   AreaSeries,
//   ColorType,
//   createChart,
//   type IChartApi,
//   type ISeriesApi,
//   type Time,
// } from "lightweight-charts";
// import { useEffect, useRef } from "react";

// type ChartData = {
//   time: Time;
//   value: number;
// };

// type Props = {
//   data: ChartData[];
// };

// export default function CurrencyChart({ data }: Props) {
//   const containerRef = useRef<HTMLDivElement>(null);

//   const chartRef = useRef<IChartApi | null>(null);

//   const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     const styles = getComputedStyle(document.documentElement);

//     const background = styles.getPropertyValue("--color-surface").trim();

//     const text = styles.getPropertyValue("--color-muted").trim();

//     const border = styles.getPropertyValue("--color-border").trim();

//     const primary = styles.getPropertyValue("--color-primary").trim();

//     const chart = createChart(containerRef.current, {
//       width: containerRef.current.clientWidth,
//       height: 320,

//       layout: {
//         background: {
//           type: ColorType.Solid,
//           color: background,
//         },

//         textColor: text,
//       },

//       rightPriceScale: {
//         visible: true,

//         borderColor: border,
//       },

//       leftPriceScale: {
//         visible: false,
//       },

//       grid: {
//         vertLines: {
//           visible: false,
//         },

//         horzLines: {
//           color: border,
//           visible: true,
//         },
//       },

//       crosshair: {
//         vertLine: {
//           color: primary,
//           width: 1,
//           labelVisible: false,
//         },

//         horzLine: {
//           color: primary,
//           width: 1,
//           labelVisible: false,
//         },
//       },

//       timeScale: {
//         borderColor: border,
//       },
//     });

//     const areaSeries = chart.addSeries(AreaSeries, {
//       lineColor: primary,

//       lineWidth: 2,

//       topColor: "rgba(216,255,57,.45)",

//       bottomColor: "rgba(216,255,57,0)",

//       priceLineVisible: false,

//       lastValueVisible: true,

//       crosshairMarkerVisible: true,
//     });

//     areaSeries.setData(data);

//     chart.timeScale().fitContent();

//     chartRef.current = chart;

//     seriesRef.current = areaSeries;

//     const resizeObserver = new ResizeObserver(() => {
//       chart.applyOptions({
//         width: containerRef.current!.clientWidth,
//       });
//     });

//     resizeObserver.observe(containerRef.current);

//     return () => {
//       resizeObserver.disconnect();
//       chart.remove();
//     };
//   }, []);

//   useEffect(() => {
//     seriesRef.current?.setData(data);
//   }, [data]);

//   return (
//     <div
//       ref={containerRef}
//       className="w-full h-80 rounded-xl overflow-hidden"
//     />
//   );
// }
