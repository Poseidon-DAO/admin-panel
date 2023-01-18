import { type FC } from "react";
import { Grid, useTheme } from "@mui/material";

import {
  AppCurrentVisits,
  AppWebsiteVisits,
} from "src/sections/@dashboard/app";

import { useWeeklyVolumeMint } from "src/lib/api";
import { usePDNSymbol } from "src/lib/chain";

import { makeChartData } from "src/utils/makeChartData";
import { makePieChartData } from "src/utils/makePieChartData";

const PDNMints: FC = () => {
  const theme = useTheme();

  const { totalSumMint, weeklyMints } = useWeeklyVolumeMint();
  const { symbol } = usePDNSymbol();

  const pdnMintChartData = makeChartData(weeklyMints!);
  const pdnMintPieChartData = makePieChartData(weeklyMints!);

  if (!totalSumMint) {
    return null;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={8}>
        <AppWebsiteVisits
          title={`${symbol} weekly mints`}
          subheader="Last 7 days"
          chartLabels={pdnMintPieChartData.map((d) => d.formattedLabel)}
          chartData={[
            {
              name: `${symbol} amount`,
              type: "column",
              fill: "solid",
              data: pdnMintChartData,
            },
          ]}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <AppCurrentVisits
          title={`${symbol} weekly mints`}
          subheader="Last 7 days"
          chartData={pdnMintPieChartData.filter((d) => !!d.value)}
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

export { PDNMints };
