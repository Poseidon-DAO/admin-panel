const { Grid, CircularProgress } = require("@mui/material");

const FullPageLoader = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <CircularProgress />
    </Grid>
  );
};

export { FullPageLoader };
