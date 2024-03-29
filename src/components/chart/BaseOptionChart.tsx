import { alpha, useTheme } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";

export function BaseOptionChartStyle() {
  const theme = useTheme();

  const background = {
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
    backgroundColor: alpha(theme.palette.background.default, 0.72),
  };

  return (
    <GlobalStyles
      styles={{
        "&.apexcharts-canvas": {
          // Tooltip
          ".apexcharts-xaxistooltip": {
            ...background,
            border: 0,
            color: theme.palette.text.primary,
            borderRadius: Number(theme.shape.borderRadius) * 1.5,
            "&:before": { borderBottomColor: "transparent" },
            "&:after": {
              borderBottomColor: alpha(theme.palette.background.default, 0.72),
            },
          },
          ".apexcharts-tooltip.apexcharts-theme-light": {
            ...background,
            border: 0,
            borderRadius: Number(theme.shape.borderRadius) * 1.5,
            "& .apexcharts-tooltip-title": {
              border: 0,
              textAlign: "center",
              fontWeight: theme.typography.fontWeightBold,
              backgroundColor: theme.palette.grey[500],
              color:
                theme.palette.text[
                  theme.palette.mode === "light" ? "secondary" : "primary"
                ],
            },
          },
          // Legend
          ".apexcharts-legend": {
            padding: 0,
          },
          ".apexcharts-legend-series": {
            display: "flex !important",
            alignItems: "center",
          },
          ".apexcharts-legend-marker": {
            marginRight: 8,
          },
          ".apexcharts-legend-text": {
            lineHeight: "18px",
            textTransform: "capitalize",
          },
        },
      }}
    />
  );
}

export default function BaseOptionChart() {
  const theme = useTheme();

  const LABEL_TOTAL = {
    show: true,
    label: "Total",
    color: theme.palette.text.secondary,
    ...theme.typography.subtitle2,
  };

  const LABEL_VALUE = {
    offsetY: 8,
    color: theme.palette.text.primary,
    ...theme.typography.h3,
  };

  return {
    colors: [
      theme.palette.primary.main,
      theme.palette.chart.yellow[0],
      theme.palette.chart.blue[0],
      theme.palette.chart.violet[0],
      theme.palette.chart.green[0],
      theme.palette.chart.red[0],
    ],

    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: theme.palette.text.disabled,
      fontFamily: theme.typography.fontFamily,
    },

    states: {
      hover: {
        filter: {
          type: "lighten",
          value: 0.04,
        },
      },
      active: {
        filter: {
          type: "darken",
          value: 0.88,
        },
      },
    },

    fill: {
      opacity: 1,
      gradient: {
        type: "vertical",
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      },
    },

    dataLabels: { enabled: false },

    stroke: {
      width: 3,
      curve: "smooth" as const,
      lineCap: "round" as const,
    },

    grid: {
      strokeDashArray: 3,
      borderColor: theme.palette.divider,
    },

    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
    },

    markers: {
      size: 0,
      strokeColors: theme.palette.background.paper,
    },

    tooltip: {
      x: { show: false },
    },

    legend: {
      show: true,
      fontSize: "13px",
      position: "top" as const,
      horizontalAlign: "right" as const,
      markers: {
        radius: 12,
      },
      fontWeight: 500,
      itemMargin: { horizontal: 12 },
      labels: {
        colors: theme.palette.text.primary,
      },
    },

    plotOptions: {
      bar: {
        columnWidth: "28%",
        borderRadius: 4,
      },
      pie: {
        donut: {
          labels: {
            show: true,
            value: LABEL_VALUE,
            total: LABEL_TOTAL,
          },
        },
      },
    },

    // Responsive
    responsive: [
      {
        // sm
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: { bar: { columnWidth: "40%" } },
        },
      },
      {
        // md
        breakpoint: theme.breakpoints.values.md,
        options: {
          plotOptions: { bar: { columnWidth: "32%" } },
        },
      },
    ],
  };
}
