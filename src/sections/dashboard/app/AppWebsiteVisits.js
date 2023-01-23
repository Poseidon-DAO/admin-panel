import merge from "lodash/merge";
import ReactApexChart from "react-apexcharts";

import { Card, CardHeader, Box, CircularProgress, Grid } from "@mui/material";

import { BaseOptionChart } from "../../../components/chart";

export default function AppWebsiteVisits({
  title,
  subheader,
  chartLabels,
  chartData,
  loading = false,
  ...other
}) {
  const chartOptions = merge(BaseOptionChart(), {
    plotOptions: { bar: { columnWidth: "10%" } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    tooltip: {
      shared: true,
      intersect: false,
      y: { formatter: (y) => y },
    },
    yaxis: {
      labels: {
        formatter: (x) => Number(x).toFixed(0),
      },
    },
    chart: {
      stacked: true,
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        {loading ? (
          <Grid
            container
            height={380}
            justifyContent="center"
            alignItems="center"
          >
            <Box mb={12}>
              <CircularProgress />
            </Box>
          </Grid>
        ) : (
          <ReactApexChart
            type="line"
            series={chartData}
            options={chartOptions}
            height={365}
          />
        )}
      </Box>
    </Card>
  );
}
