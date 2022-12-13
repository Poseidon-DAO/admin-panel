import { useEffect, useState } from "react";
import {
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
  Grid,
  Link,
} from "@mui/material";
import Iconify from "src/components/Iconify";

function TransactionSnackbar({
  message = "",
  variant = "success",
  onClose = () => {},
  duration,
  loading = false,
  etherscanLink = "",
}) {
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
      autoHideDuration={duration === null ? null : 3000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Alert
        elevation={6}
        variant="filled"
        severity={variant}
        action={action}
        sx={{
          width: "100%",
          color: "white",
          textAlign: "left",
        }}
      >
        {message ||
          (isError ? "Transaction failed" : "Transaction was successful")}

        <br />

        {!!etherscanLink && (
          <Link href={etherscanLink} target="_blank">
            {etherscanLink.substring(0, 32)}...
          </Link>
        )}
      </Alert>
    </Snackbar>
  );
}

export default TransactionSnackbar;
