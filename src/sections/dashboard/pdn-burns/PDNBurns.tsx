import { type FC } from "react";
import { Grid, useTheme } from "@mui/material";

import { useWeeklyVolumeBurn } from "src/lib/api";
import { usePDNSymbol } from "src/lib/chain";

import { makeChartData } from "src/utils/makeChartData";
import { makePieChartData } from "src/utils/makePieChartData";
import PieChart from "../pie-chart/PieChart";
import BarChart from "../bar-chart/BarChart";

const PDNBurns: FC = () => {
  const theme = useTheme();

  const { totalSumBurned, weeklyBurns, fetchStatus } = useWeeklyVolumeBurn();
  const { symbol } = usePDNSymbol();

  const isLoading = fetchStatus === "loading";

  const pdnBurnChartData = makeChartData(weeklyBurns!);
  const pdnBurnPieChartData = makePieChartData(weeklyBurns!);

  const hasDataToShow = totalSumBurned! > 0;

  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={12}
        md={hasDataToShow ? 6 : 12}
        lg={hasDataToShow ? 8 : 12}
      >
        <BarChart
          title={`${symbol} weekly burns`}
          subheader="Last 7 days"
          chartLabels={pdnBurnPieChartData.map((d) => d.formattedLabel)}
          loading={isLoading}
          chartData={[
            {
              name: `${symbol} amount burned`,
              type: "column",
              fill: "solid",
              data: pdnBurnChartData,
            },
          ]}
        />
      </Grid>

      {hasDataToShow && (
        <Grid item xs={12} md={6} lg={4}>
          <PieChart
            title={`${symbol} weekly burns`}
            subheader="Last 7 days"
            chartData={pdnBurnPieChartData.filter((d) => !!d.value)}
            loading={isLoading}
            chartColors={[
              theme.palette.primary.main,
              theme.palette.chart.blue[0],
              theme.palette.chart.violet[0],
              theme.palette.chart.yellow[0],
            ]}
          />
        </Grid>
      )}
    </Grid>
  );
};

export { PDNBurns };
