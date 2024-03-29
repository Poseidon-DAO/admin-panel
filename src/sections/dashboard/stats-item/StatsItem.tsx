import { alpha, styled } from "@mui/material/styles";
import { Box, Card, CircularProgress, Typography } from "@mui/material";

import Iconify from "src/components/Iconify";

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

type IProps = {
  title: string;
  total?: number;
  icon: string;
  color?: "primary" | "info" | "warning" | "error";
  loading: boolean;
};

export default function StatsItem({
  title,
  total,
  icon,
  color = "primary",
  loading = false,
}: IProps) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: "center",
        color: (theme) => theme.palette[color].dark,
        bgcolor: (theme) => theme.palette[color].light,
      }}
    >
      <IconWrapperStyle
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(
              theme.palette[color].dark,
              0
            )} 0%, ${alpha(theme.palette[color].dark, 0.24)} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </IconWrapperStyle>

      {loading ? (
        <Box height={48}>
          <CircularProgress size={20} />
        </Box>
      ) : (
        <Typography variant="h4">{Number(total).toLocaleString()}</Typography>
      )}

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}
