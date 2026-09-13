import { AreaSeries, ColorType, createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";

type ChartData = {
  date: string;
  rate: number;
};

const colors = {
  backgroundColor: "#171719",
  lineColor: "#cef739",
  textColor: "#9d9d9d",
  areaTopColor: "rgba(216,255,57,.45)",
  areaBottomColor: "rgba(216,255,57,0)",
};

export default function ChartComponent({
  data,
}: {
  data: ChartData[];
}) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = chartContainerRef.current;

    if (!container) return;

    const chart = createChart(container, {
      layout: {
        background: {
          type: ColorType.Solid,
          color: colors.backgroundColor,
        },
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
      },

      width: container.clientWidth,
      height: 300,
    });

    const series = chart.addSeries(AreaSeries, {
      lineColor: colors.lineColor,
      topColor: colors.areaTopColor,
      bottomColor: colors.areaBottomColor,
      lineWidth: 2,
    });

    series.setData(
      data.map((item) => ({
        time: item.date,
        value: item.rate,
      })),
    );

    chart.timeScale().fitContent();

    const handleResize = () => {
      chart.applyOptions({
        width: container.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef} />;
}
