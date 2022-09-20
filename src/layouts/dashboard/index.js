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

import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import { ActiveNetworkTypes } from "src/types";
import { FullPageLoader } from "src/components/FullPageLoader";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

export default function DashboardLayout({ activeSectionTitle }) {
  const [open, setOpen] = useState(false);
  const { account, isAuthenticated, enableWeb3, isWeb3Enabled, logout } =
    useMoralis();

  const {
    fetchIsFrozen,
    isFrozen,
    isFetching: isFetchingFrozen,
    isLoading: isLoadingFrozen,
  } = useIsFrozen();
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
  const {
    fetchIsUserAllowed,
    isAllowed,
    isLoading: isLoadingUserAllowed,
    isFetching: isFetchingUserAllowed,
  } = useIsUserAllowed();

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

  const showSpinner =
    isLoadingUserAllowed ||
    isFetchingUserAllowed ||
    isFetchingFrozen ||
    isLoadingFrozen;

  if (showSpinner) {
    return <FullPageLoader />;
  }

  if (!isAllowed && isAllowed !== null) {
    return <Navigate to="/forbidden" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <RootStyle>
      <DashboardNavbar
        activeSectionTitle={activeSectionTitle}
        isFrozen={isFrozen}
        onOpenSidebar={() => setOpen(true)}
      />
      <DashboardSidebar
        isSidebarOpen={open}
        onSidebarClose={() => setOpen(false)}
        accountInfo={{
          address: account,
          balance: roundedBalance,
          symbol,
          isLoading:
            isBalanceLoading |
            isBalanceFetching |
            isSymbolLoading |
            isSymbolFetching,
        }}
      />
      <MainStyle>
        <Outlet context={{ balance: roundedBalance, symbol }} />
      </MainStyle>
    </RootStyle>
  );
}

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div", {
  shouldForwardProp: (props) => props !== "isFrozen",
})(({ theme, isFrozen }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24 + (isFrozen ? 25 : 0),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));
