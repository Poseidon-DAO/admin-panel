import { type FC } from "react";
import { Grid, useTheme } from "@mui/material";

import { AppCurrentVisits, AppWebsiteVisits } from "src/sections/dashboard/app";

import { useWeeklyVolumeMove } from "src/lib/api";
import { usePDNSymbol } from "src/lib/chain";

import { makeChartData } from "src/utils/makeChartData";
import { makePieChartData } from "src/utils/makePieChartData";

const PDNTransfers: FC = () => {
  const theme = useTheme();

  const { totalSumMoved, weeklyTransfers, fetchStatus } = useWeeklyVolumeMove();
  const { symbol } = usePDNSymbol();

  const isLoading = fetchStatus === "loading";

  const pdnMoveChartData = makeChartData(weeklyTransfers!);
  const pdnMovePieChartData = makePieChartData(weeklyTransfers!);

  const hasDataToShow = totalSumMoved! > 0;

  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={12}
        md={hasDataToShow ? 6 : 12}
        lg={hasDataToShow ? 8 : 12}
      >
        <AppWebsiteVisits
          title={`${symbol} weekly moves`}
          subheader="Last 7 days"
          chartLabels={pdnMovePieChartData.map((d) => d.formattedLabel)}
          loading={isLoading}
          chartData={[
            {
              name: `${symbol} amount transfered`,
              type: "column",
              fill: "solid",
              data: pdnMoveChartData,
            },
          ]}
        />
      </Grid>

      {hasDataToShow && (
        <Grid item xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title={`${symbol} weekly moves`}
            subheader="Last 7 days"
            chartData={pdnMovePieChartData.filter((d) => !!d.value)}
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

export { PDNTransfers };
