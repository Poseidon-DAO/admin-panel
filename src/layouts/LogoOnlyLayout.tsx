import { type FC, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Navigate, Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";

import Logo from "src/components/Logo";
import CustomSnackbar from "src/components/CustomSnackbar";

const METAMASK_INSTALLATION_STATUS = {
  PENDING: "pending",
  INSTALLED: "installed",
  NOT_INSTALLED: "not-installed",
} as const;

const LogoOnlyLayout: FC = () => {
  const { isConnected } = useAccount();

  const [metamaskInstallation, setMetamaskInstallation] = useState<
    typeof METAMASK_INSTALLATION_STATUS[keyof typeof METAMASK_INSTALLATION_STATUS]
  >(METAMASK_INSTALLATION_STATUS.PENDING);

  useEffect(() => {
    if (!window.ethereum) {
      setMetamaskInstallation(METAMASK_INSTALLATION_STATUS.NOT_INSTALLED);
    } else {
      setMetamaskInstallation(METAMASK_INSTALLATION_STATUS.INSTALLED);
    }
  }, []);

  if (isConnected) {
    return <Navigate to="/app/dashboard" replace />;
  }

  const isSnackbarOpen =
    metamaskInstallation === METAMASK_INSTALLATION_STATUS.NOT_INSTALLED;

  const message =
    metamaskInstallation === METAMASK_INSTALLATION_STATUS.NOT_INSTALLED
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
};

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

export default LogoOnlyLayout;
