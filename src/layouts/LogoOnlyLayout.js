import { Navigate, Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Logo from "../components/Logo";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import CustomSnackbar from "src/components/CustomSnackbar";
import { useChainChange } from "src/lib";
import { NetworkTypes } from "src/types";

const metamaskInstallationStatus = {
  PENDING: "pending",
  INSTALLED: "installed",
  NOT_INSTALLED: "not-installed",
};

const errorMessages = {
  metamask: "Please install Metamask to continue.",
  chain: `Please change your network to ${process.env.REACT_APP_CHAIN}`,
};

export default function LogoOnlyLayout() {
  const { isAuthenticated, chainId } = useMoralis();
  const chainToUse = NetworkTypes[chainId]?.toLowerCase();
  const [metamaskInstallation, setMetamaskInstallation] = useState(
    metamaskInstallationStatus.PENDING
  );
  useChainChange();

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
    metamaskInstallation === metamaskInstallationStatus.NOT_INSTALLED ||
    (chainToUse && chainToUse !== process.env.REACT_APP_CHAIN);

  const message =
    metamaskInstallation === metamaskInstallationStatus.NOT_INSTALLED
      ? errorMessages["metamask"]
      : chainToUse !== process.env.REACT_APP_CHAIN
      ? errorMessages["chain"]
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
