import { type FC } from "react";
import { Grid } from "@mui/material";
import { AppWidgetSummary } from "src/sections/@dashboard/app";

import {
  useWeeklyVolumeBurn,
  useWeeklyVolumeMint,
  useWeeklyVolumeMove,
} from "src/lib/api";
import { usePDNSymbol } from "src/lib/chain";

const Stats: FC = () => {
  const { totalSumMoved } = useWeeklyVolumeMove();
  const { totalSumBurned } = useWeeklyVolumeBurn();
  const { totalSumMint } = useWeeklyVolumeMint();
  const { symbol } = usePDNSymbol();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title={`${symbol} weekly move total volume`}
          total={totalSumMoved}
          icon="bi:coin"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title={`${symbol} weekly burn total volume`}
          total={totalSumBurned}
          color="info"
          icon="mingcute:fire-line"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title="gNFT's weekly mint total volume"
          total={totalSumMint}
          color="warning"
          icon="lucide:hammer"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title="Bug Reports"
          total={234}
          color="error"
          icon={"ant-design:bug-filled"}
        />
      </Grid>
    </Grid>
  );
};

export { Stats };
