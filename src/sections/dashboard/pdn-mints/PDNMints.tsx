import { type FC } from "react";
import { Grid, useTheme } from "@mui/material";

import { AppCurrentVisits, AppWebsiteVisits } from "src/sections/dashboard/app";

import { useWeeklyVolumeMint } from "src/lib/api";

import { makePieChartData } from "src/utils/makePieChartData";
import { makeChartDataForMints } from "src/utils/makeChartDataForMints";

const PDNMints: FC = () => {
  const theme = useTheme();

  const { totalSumMint, weeklyMints, fetchStatus } = useWeeklyVolumeMint();

  const isLoading = fetchStatus === "loading";

  const pdnMintChartData = makeChartDataForMints(weeklyMints!);
  const pdnMintPieChartData = makePieChartData(weeklyMints!);

  const hasDataToShow = totalSumMint! > 0;

  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={12}
        md={hasDataToShow ? 6 : 12}
        lg={hasDataToShow ? 8 : 12}
      >
        <AppWebsiteVisits
          title="G-NFT weekly mints"
          subheader="Last 7 days"
          chartLabels={pdnMintPieChartData.map((d) => d.formattedLabel)}
          loading={isLoading}
          chartData={[
            {
              name: `G-NFT's minted`,
              type: "column",
              fill: "solid",
              data: pdnMintChartData,
            },
          ]}
        />
      </Grid>

      {hasDataToShow && (
        <Grid item xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="G-NFT weekly mints"
            subheader="Last 7 days"
            chartData={pdnMintPieChartData.filter((d) => !!d.value)}
            loading={isLoading}
            chartColors={[
              // @ts-ignore
              theme.palette.primary.main,
              // @ts-ignore
              theme.palette.chart.blue[0],
              // @ts-ignore
              theme.palette.chart.violet[0],
              // @ts-ignore
              theme.palette.chart.yellow[0],
            ]}
          />
        </Grid>
      )}
    </Grid>
  );
};

export { PDNMints };
