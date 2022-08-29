import React from "react";
import { Alert, Snackbar } from "@mui/material";

export default function CustomSnackbar({
  type,
  variant,
  message,
  isOpen,
  onClose,
}) {
  return (
    <Snackbar
      severity={type}
      open={isOpen}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert severity={type} elevation={6} variant={variant}>
        {message}
      </Alert>
    </Snackbar>
  );
}

CustomSnackbar.defaultProps = {
  variant: "filled",
};
