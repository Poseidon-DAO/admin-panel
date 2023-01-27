import ReactApexChart from "react-apexcharts";
import { Card, CardHeader, Box, CircularProgress, Grid } from "@mui/material";
import merge from "lodash/merge";

import { BaseOptionChart } from "src/components/chart";

type IProps = {
  title: string;
  subheader: string;
  chartLabels: string[];
  chartData: { name: string; type: string; fill: string; data: number[] }[];
  loading?: boolean;
  borderRadius?: number;
};

export default function BarChart({
  title,
  subheader,
  chartLabels,
  chartData,
  loading = false,
  borderRadius = 5,
}: IProps) {
  return (
    <Card>
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
            options={merge(BaseOptionChart(), {
              plotOptions: { bar: { borderRadius, columnWidth: "20%" } },
              fill: { type: chartData.map((i) => i.fill) },
              labels: chartLabels,
              tooltip: {
                shared: true,
                intersect: false,
                y: { formatter: (y: any) => Number(y).toLocaleString() },
              },
              yaxis: {
                labels: { formatter: (x: any) => Number(x).toFixed(0) },
              },
              chart: { stacked: true },
            })}
            height={365}
          />
        )}
      </Box>
    </Card>
  );
}
