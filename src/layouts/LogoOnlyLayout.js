import { Navigate, Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Logo from "../components/Logo";
import { useEffect, useState } from "react";
import CustomSnackbar from "src/components/CustomSnackbar";
import { NetworkTypes } from "src/types";
import { useAccount, useNetwork } from "wagmi";

const metamaskInstallationStatus = {
  PENDING: "pending",
  INSTALLED: "installed",
  NOT_INSTALLED: "not-installed",
};

const errorMessages = {
  metamask: "Please install Metamask to continue.",
  chain: `Please change your network to ${
    NetworkTypes[process.env.REACT_APP_CHAIN]
  }`,
};

export default function LogoOnlyLayout() {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
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

  // const isSnackbarOpen =
  //   metamaskInstallation === metamaskInstallationStatus.NOT_INSTALLED ||
  //   (chain?.id && chain?.id !== process.env.REACT_APP_CHAIN);

  // const message =
  //   metamaskInstallation === metamaskInstallationStatus.NOT_INSTALLED
  //     ? errorMessages["metamask"]
  //     : chain?.id !== process.env.REACT_APP_CHAIN
  //     ? errorMessages["chain"]
  //     : "";

  return (
    <>
      <HeaderStyle>
        <Logo width={70} />
      </HeaderStyle>

      <Outlet />
      {/* <CustomSnackbar isOpen={isSnackbarOpen} message={message} type="error" /> */}
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
