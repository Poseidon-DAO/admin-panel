import ReactApexChart from "react-apexcharts";
import { merge } from "lodash";

import { useTheme, styled } from "@mui/material/styles";
import { Box, Card, CardHeader, CircularProgress, Grid } from "@mui/material";

import { BaseOptionChart } from "src/components/chart";

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled("div")(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  "& .apexcharts-canvas svg": { height: CHART_HEIGHT },
  "& .apexcharts-canvas svg,.apexcharts-canvas foreignObject": {
    overflow: "visible",
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    alignContent: "center",
    position: "relative !important",
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

type IProps = {
  title: string;
  subheader: string;
  chartColors: string[];
  chartData: { label: string; formattedLabel: string; value: number }[];
  loading?: boolean;
};

export default function PieChart({
  title,
  subheader,
  chartColors,
  chartData,
  loading = false,
}: IProps) {
  const theme = useTheme();

  const chartLabels = chartData.map((i) => i.label);
  const chartSeries = chartData.map((i) => i.value);

  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />

      <ChartWrapperStyle dir="ltr">
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
            type="pie"
            series={chartSeries}
            options={merge(BaseOptionChart(), {
              colors: chartColors,
              labels: chartLabels,
              stroke: { colors: [theme.palette.background.paper] },
              legend: { floating: true, horizontalAlign: "center" },
              dataLabels: { enabled: true, dropShadow: { enabled: false } },
              tooltip: { fillSeriesColor: false },
              plotOptions: {
                pie: { donut: { labels: { show: false } } },
              },
            })}
            height={280}
          />
        )}
      </ChartWrapperStyle>
    </Card>
  );
}
