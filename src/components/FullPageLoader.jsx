import { CircularProgress, Grid } from "@mui/material";

function FullPageLoader() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <CircularProgress size={70} />
    </Grid>
  );
}

export { FullPageLoader };
