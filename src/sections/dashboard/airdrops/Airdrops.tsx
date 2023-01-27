import { type FC } from "react";
import { Grid } from "@mui/material";

import { usePDNSymbol } from "src/lib/chain";
import { makeChartData } from "src/utils/makeChartData";
import { makePieChartData } from "src/utils/makePieChartData";
import { useAirdrops } from "src/lib/api/hooks/useAirdrops";

import OrderTimeline from "../order-timeline/OrderTimeline";
import BarChart from "../bar-chart/BarChart";

const Airdrops: FC = () => {
  const { airdrops, fetchStatus } = useAirdrops();
  const { symbol } = usePDNSymbol();

  const isLoading = fetchStatus === "loading";
  const isSuccess = fetchStatus === "success";

  if (!Object.keys(airdrops!).length && isSuccess) return null;

  const pdnBurnChartData = makeChartData(airdrops!);
  const pdnMintPieChartData = makePieChartData(airdrops!);

  const orderChartData = (Object.values(airdrops!) || [])?.map((airdrop) => ({
    id: airdrop[0].logIndex,
    title: "Airdrop",
    hash: airdrop[0].transactionHash,
    type: `hash: ${airdrop[0].transactionHash}`,
    time: airdrop[0].blockDate,
  }));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={8}>
        <BarChart
          title="Airdrops"
          subheader="Last 5"
          chartLabels={pdnMintPieChartData.map((d) => d.formattedLabel)}
          loading={isLoading}
          chartData={[
            {
              name: `${symbol} amount`,
              type: "column",
              fill: "solid",
              data: pdnBurnChartData,
            },
          ]}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <OrderTimeline
          title="Order Timeline"
          subheader="Last 5"
          list={orderChartData}
        />
      </Grid>
    </Grid>
  );
};

export { Airdrops };
