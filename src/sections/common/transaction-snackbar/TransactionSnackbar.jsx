import { useEffect, useState } from "react";
import { IconButton, Snackbar, Alert } from "@mui/material";
import Iconify from "src/components/Iconify";

TransactionSnackbar.defaultProps = {
  message: "",
  variant: "success",
  onClose: () => {},
};

function TransactionSnackbar({ message, variant, onClose, duration }) {
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

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <IconButton aria-label="delete" size="small">
        <Iconify icon="bi:x-lg" />
      </IconButton>
    </IconButton>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration || 3000}
      onClose={handleClose}
      action={action}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Alert
        onClose={handleClose}
        elevation={6}
        variant="filled"
        severity={variant}
        sx={{ width: "100%", color: "white" }}
      >
        {message ||
          (isError ? "Transaction failed" : "Transaction was successful")}
      </Alert>
    </Snackbar>
  );
}

export default TransactionSnackbar;
