import { useAccount } from "wagmi";
import { Navigate, Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Logo from "../components/Logo";
import { useEffect, useState } from "react";
import CustomSnackbar from "src/components/CustomSnackbar";

const metamaskInstallationStatus = {
  PENDING: "pending",
  INSTALLED: "installed",
  NOT_INSTALLED: "not-installed",
};

export default function LogoOnlyLayout() {
  const { isConnected } = useAccount();
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

  if (isConnected) {
    return <Navigate to="/app/dashboard" replace />;
  }

  const isSnackbarOpen =
    metamaskInstallation === metamaskInstallationStatus.NOT_INSTALLED;

  const message =
    metamaskInstallation === metamaskInstallationStatus.NOT_INSTALLED
      ? "Please install Metamask to continue."
      : "";

  return (
    <>
      <HeaderStyle>
        <Logo width={70} />
      </HeaderStyle>

      <Outlet />
      <CustomSnackbar isOpen={isSnackbarOpen} message={message} type="error" />
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
