import { type FC } from "react";
import { Grid, useTheme } from "@mui/material";

import {
  AppCurrentVisits,
  AppWebsiteVisits,
} from "src/sections/@dashboard/app";

import { useWeeklyVolumeBurn } from "src/lib/api";
import { usePDNSymbol } from "src/lib/chain";

import { makeChartData } from "src/utils/makeChartData";
import { makePieChartData } from "src/utils/makePieChartData";

const PDNBurns: FC = () => {
  const theme = useTheme();

  const { totalSumBurned, weeklyBurns } = useWeeklyVolumeBurn();
  const { symbol } = usePDNSymbol();

  const pdnBurnChartData = makeChartData(weeklyBurns!);
  const pdnBurnPieChartData = makePieChartData(weeklyBurns!);

  console.log(pdnBurnChartData);

  if (!totalSumBurned) {
    return null;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={8}>
        <AppWebsiteVisits
          title={`${symbol} weekly burns`}
          subheader="Last 7 days"
          chartLabels={pdnBurnPieChartData.map((d) => d.formattedLabel)}
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
        <AppCurrentVisits
          title={`${symbol} weekly burns`}
          subheader="Last 7 days"
          chartData={pdnBurnPieChartData.filter((d) => !!d.value)}
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
    </Grid>
  );
};

export { PDNBurns };
