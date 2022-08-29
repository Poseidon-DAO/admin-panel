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

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const { account, isAuthenticated, enableWeb3, isWeb3Enabled, logout } =
    useMoralis();

  const { fetchIsFrozen, isFrozen } = useIsFrozen();
  const { fetchPDNBalance, roundedBalance } = usePDNBalance();
  const { fetchPDNSymbol, symbol } = usePDNSymbol();
  const { fetchIsUserAllowed, isAllowed } = useIsUserAllowed();
  useAccountChange(logout);
  useChainChange(logout);

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
      <DashboardNavbar
        onOpenSidebar={() => setOpen(true)}
        isFrozen={isFrozen}
      />
      <DashboardSidebar
        isSidebarOpen={open}
        onSidebarClose={() => setOpen(false)}
        accountInfo={{
          address: account,
          balance: roundedBalance,
          symbol,
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
