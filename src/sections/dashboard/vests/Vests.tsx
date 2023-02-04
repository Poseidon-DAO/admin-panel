import { type FC } from "react";
import { Grid } from "@mui/material";

import { usePDNSymbol } from "src/lib/chain";
import { makeChartData } from "src/utils/vests/makeChartData";
import { useVests } from "src/lib/api/hooks";

import OrderTimeline from "../order-timeline/OrderTimeline";
import BarChart from "../bar-chart/BarChart";

const Vests: FC = () => {
  const { vests = {}, fetchStatus } = useVests();
  const { symbol } = usePDNSymbol();

  const isLoading = fetchStatus === "loading";

  if (!Object.keys(vests!).length) return null;

  const { values, labels } = makeChartData(vests);

  const orderChartData = (Object.values(vests) || [])?.map((vest) => ({
    id: vest[0].logIndex,
    title: "Vest",
    hash: vest[0].transactionHash,
    type: `hash: ${vest[0].transactionHash}`,
    time: vest[0].blockDate,
  }));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={8}>
        <BarChart
          title="Airdrops with vesting"
          subheader="Last 5"
          chartLabels={labels}
          loading={isLoading}
          chartData={[
            {
              name: `${symbol} amount vested`,
              type: "column",
              fill: "solid",
              data: values,
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

export { Vests };
