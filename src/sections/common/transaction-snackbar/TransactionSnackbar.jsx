import { useEffect, useState } from "react";
import {
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
  Grid,
} from "@mui/material";
import Iconify from "src/components/Iconify";

TransactionSnackbar.defaultProps = {
  message: "",
  variant: "success",
  onClose: () => {},
  loading: false,
};

function TransactionSnackbar({ message, variant, onClose, loading }) {
  const [open, setOpen] = useState(true);

  const isError = variant === "error";

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    onClose?.();
    setOpen(false);
  };

  useEffect(() => {
    return () => setOpen(false);
  }, []);

  const action = loading ? (
    <Grid container alignItems="center" pt="5px" pr={1}>
      <CircularProgress size={18} color="inherit" />
    </Grid>
  ) : (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <Iconify icon="bi:x-lg" />
    </IconButton>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={!loading ? 6000 : null}
      onClose={handleClose}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Alert
        elevation={6}
        variant="filled"
        severity={variant}
        action={action}
        sx={{ width: "100%", color: "white" }}
      >
        {message ||
          (isError ? "Transaction failed" : "Transaction was successful")}
      </Alert>
    </Snackbar>
  );
}

export default TransactionSnackbar;
