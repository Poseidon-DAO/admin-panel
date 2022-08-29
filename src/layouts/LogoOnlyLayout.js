import { Navigate, Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Logo from "../components/logo";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

const metamaskInstallationStatus = {
  PENDING: "pending",
  INSTALLED: "installed",
  NOT_INSTALLED: "not-installed",
};

export default function LogoOnlyLayout() {
  const { isAuthenticated } = useMoralis();
  const [metamaskInstallation, setMetamaskInstallation] = useState(
    metamaskInstallationStatus.PENDING
  );

  useEffect(() => {
    if (!window.ethereum) {
      setMetamaskInstallation(metamaskInstallationStatus.NOT_INSTALLED);
    } else {
      setMetamaskInstallation(metamaskInstallationStatus.INSTALLED);
    }
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/app/dashboard" replace />;
  }

  const isSnackbarOpen =
    metamaskInstallation === metamaskInstallationStatus.NOT_INSTALLED;

  return (
    <>
      <HeaderStyle>
        <Logo />
      </HeaderStyle>
      <Outlet />
      <Snackbar
        severity="error"
        open={isSnackbarOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="error" elevation={6} variant="filled">
          Please install Metamask to continue.
        </Alert>
      </Snackbar>
    </>
  );
}

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: "100%",
  position: "absolute",
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(5, 5, 0),
  },
}));
