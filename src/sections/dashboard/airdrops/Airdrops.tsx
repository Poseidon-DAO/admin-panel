import { type FC } from "react";
import { Grid } from "@mui/material";

import { AppOrderTimeline, AppWebsiteVisits } from "src/sections/dashboard/app";
import { usePDNSymbol } from "src/lib/chain";
import { makeChartData } from "src/utils/makeChartData";
import { makePieChartData } from "src/utils/makePieChartData";
import { useAirdrops } from "src/lib/api/hooks/useAirdrops";
import { groupAirdropsByDate } from "src/utils/groupAirdropsByDate";

const Airdrops: FC = () => {
  const { airdrops, fetchStatus } = useAirdrops();
  const { symbol } = usePDNSymbol();

  const isLoading = fetchStatus === "loading";

  const { groupedAirdrops } = groupAirdropsByDate(airdrops!);

  const pdnBurnChartData = makeChartData(groupedAirdrops!);
  const pdnBurnPieChartData = makePieChartData(groupedAirdrops!);

  const orderChartData = (airdrops || [])?.map((airdrop) => ({
    id: airdrop.logIndex,
    title: "Airdrop",
    hash: airdrop.transactionHash,
    type: `hash: ${airdrop.transactionHash}`,
    time: airdrop.blockDate,
  }));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={8}>
        <AppWebsiteVisits
          title="Airdrops"
          subheader="All"
          chartLabels={pdnBurnPieChartData.map((d) => d.formattedLabel)}
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
        <AppOrderTimeline
          title="Order Timeline"
          subheader="Airdrops"
          list={orderChartData}
        />
      </Grid>
    </Grid>
  );
};

export { Airdrops };
