import { FC } from "react";
import { Alert, Snackbar, type AlertProps } from "@mui/material";

type IProps = {
  type?: AlertProps["severity"];
  variant?: AlertProps["variant"];
  message?: string;
  isOpen: boolean;
  onClose?: () => void;
};

const CustomSnackbar: FC<IProps> = ({ type, message, isOpen, onClose }) => {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert severity={type} elevation={6} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
