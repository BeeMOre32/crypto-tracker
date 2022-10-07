import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinTimePrice } from "./api";
import { ICoinTimePrice } from "../interface/interface";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { DarkMode } from "../atom";

export default function Chart() {
  const darkMode = useRecoilValue(DarkMode);

  const coinId = useOutletContext<string>();

  const { isLoading, data: PriceData } = useQuery<ICoinTimePrice[]>(
    [coinId, "coinIdChart"],
    () => fetchCoinTimePrice(coinId)
  );
  PriceData?.map((value) => ({
    x: value.time_open,
    y: [value.open, value.high, value.low, value.close],
  }));
  return (
    <>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <ApexChart
          series={[
            {
              data:
                PriceData?.map((value) => ({
                  x: new Date(value.time_open * 1000),
                  y: [value.open, value.high, value.low, value.close],
                })) ?? [],
            },
          ]}
          options={{
            theme: { mode: darkMode ? "dark" : "light" },
            grid: { show: false },
            chart: {
              width: 600,
              height: 500,
              background: "inherit",
              toolbar: {
                show: false,
              },
            },
            tooltip: { x: { format: "dd MM" } },
            xaxis: {
              labels: { show: false },
              axisBorder: { show: false },
              axisTicks: { show: false },
            },
            yaxis: { show: false },
          }}
          type="candlestick"
        ></ApexChart>
      )}
    </>
  );
}
