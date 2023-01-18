import { type FC } from "react";
import { Grid, useTheme } from "@mui/material";

import {
  AppCurrentVisits,
  AppWebsiteVisits,
} from "src/sections/@dashboard/app";

import { useWeeklyVolumeMove } from "src/lib/api";
import { usePDNSymbol } from "src/lib/chain";

import { makeChartData } from "src/utils/makeChartData";
import { makePieChartData } from "src/utils/makePieChartData";

const PDNTransfers: FC = () => {
  const theme = useTheme();

  const { totalSumMoved, weeklyTransfers } = useWeeklyVolumeMove();
  const { symbol } = usePDNSymbol();

  if (!totalSumMoved) {
    return null;
  }

  const pdnMoveChartData = makeChartData(weeklyTransfers!);
  const pdnMovePieChartData = makePieChartData(weeklyTransfers!);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={8}>
        <AppWebsiteVisits
          title={`${symbol} weekly moves`}
          subheader="Last 7 days"
          chartLabels={pdnMovePieChartData.map((d) => d.formattedLabel)}
          chartData={[
            {
              name: `${symbol} amount`,
              type: "column",
              fill: "solid",
              data: pdnMoveChartData,
            },
          ]}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <AppCurrentVisits
          title={`${symbol} weekly moves`}
          subheader="Last 7 days"
          chartData={pdnMovePieChartData.filter((d) => !!d.value)}
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

export { PDNTransfers };
