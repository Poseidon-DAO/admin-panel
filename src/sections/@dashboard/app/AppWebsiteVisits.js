import merge from "lodash/merge";
import ReactApexChart from "react-apexcharts";

import { Card, CardHeader, Box } from "@mui/material";

import { BaseOptionChart } from "../../../components/chart";

export default function AppWebsiteVisits({
  title,
  subheader,
  chartLabels,
  chartData,
  ...other
}) {
  const chartOptions = merge(BaseOptionChart(), {
    plotOptions: { bar: { columnWidth: "16%" } },
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
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={chartData}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}
