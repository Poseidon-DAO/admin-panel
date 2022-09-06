import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Navigate, Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";

import {
  useAccountChange,
  useChainChange,
  useIsFrozen,
  useIsUserAllowed,
  usePDNBalance,
  usePDNSymbol,
} from "src/lib";

// import DashboardNavbar from "./DashboardNavbar";
// import DashboardSidebar from "./DashboardSidebar";
import { ActiveNetworkTypes } from "src/types";
import SettingsSidebar from "./SettingsSidebar";
import { Box } from "@mui/material";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

export default function SettingsLayout() {
  const [open, setOpen] = useState(false);
  const { account, isAuthenticated, enableWeb3, isWeb3Enabled, logout } =
    useMoralis();

  const { fetchIsFrozen, isFrozen } = useIsFrozen();
  const {
    fetchPDNBalance,
    roundedBalance,
    isLoading: isBalanceLoading,
    isFetching: isBalanceFetching,
  } = usePDNBalance();
  const {
    fetchPDNSymbol,
    symbol,
    isLoading: isSymbolLoading,
    isFetching: isSymbolFetching,
  } = usePDNSymbol();
  const { fetchIsUserAllowed, isAllowed } = useIsUserAllowed();

  useAccountChange({ onChange: logout });
  useChainChange({
    onChange: (chainId) => {
      if (!!ActiveNetworkTypes[chainId]) return;

      logout();
    },
  });

  useEffect(() => {
    if (!isWeb3Enabled) {
      return enableWeb3();
    }

    fetchPDNBalance();
    fetchPDNSymbol();
    fetchIsFrozen();
    fetchIsUserAllowed();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWeb3Enabled]);

  if (!isAllowed) {
    return <Navigate to="/forbidden" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <RootStyle>
      <Box>
        <Box>
          <SettingsSidebar />
        </Box>

        <Content></Content>
      </Box>
    </RootStyle>
  );
}

const RootStyle = styled("div")({
  position: "relative",

  "& > div": {
    width: "100%",
    position: "absolute",
  },

  "& > div > div:nth-child(1)": {
    height: "calc(100vh - 244px)",
    width: "300px",
    position: "fixed",
  },
});

const Content = styled("div", {
  shouldForwardProp: (props) => props !== "isFrozen",
})(({ theme, isFrozen }) => ({
  marginLeft: "300px",

  // flex: "1",
  // border: "1px solid red",
  // flexGrow: 1,
  // overflow: "auto",
  // minHeight: "100%",
  // paddingTop: APP_BAR_MOBILE + 24,
  // paddingBottom: theme.spacing(10),
  // [theme.breakpoints.up("lg")]: {
  //   paddingTop: APP_BAR_DESKTOP + 24 + (isFrozen ? 25 : 0),
  //   paddingLeft: theme.spacing(2),
  //   paddingRight: theme.spacing(2),
  // },
}));
