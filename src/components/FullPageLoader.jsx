import { CircularProgress, Grid } from "@mui/material";

function FullPageLoader() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
    >
      <CircularProgress size={70} />
    </Grid>
  );
}

export { FullPageLoader };
