import { type FC } from "react";
import { Grid } from "@mui/material";
import { AppWidgetSummary } from "src/sections/dashboard/app";

import {
  useWeeklyVolumeBurn,
  useWeeklyVolumeMint,
  useWeeklyVolumeMove,
} from "src/lib/api";
import { usePDNSymbol } from "src/lib/chain";
import { useTotalNfts } from "src/lib/api/hooks/useTotalNfts";

const Stats: FC = () => {
  const { totalSumMoved, fetchStatus: movesFetchStatus } =
    useWeeklyVolumeMove();
  const { totalSumBurned, fetchStatus: burnsFetchStatus } =
    useWeeklyVolumeBurn();
  const { totalSumMint, fetchStatus: mintsFetchStatus } = useWeeklyVolumeMint();
  const { totalNfts, fetchStatus: totalFetchStatus } = useTotalNfts();

  const { symbol } = usePDNSymbol();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title={`${symbol} weekly move total volume`}
          total={totalSumMoved}
          icon="bi:coin"
          loading={movesFetchStatus === "loading"}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title={`${symbol} weekly burn total volume`}
          total={totalSumBurned}
          color="info"
          icon="mingcute:fire-line"
          loading={burnsFetchStatus === "loading"}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title="G-NFT's weekly mint total volume"
          total={totalSumMint}
          color="warning"
          icon="lucide:hammer"
          loading={mintsFetchStatus === "loading"}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title="Total G-NFT's"
          total={totalNfts}
          color="error"
          icon="clarity:picture-line"
          loading={totalFetchStatus === "loading"}
        />
      </Grid>
    </Grid>
  );
};

export { Stats };
