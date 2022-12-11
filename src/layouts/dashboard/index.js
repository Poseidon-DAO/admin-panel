import { useState } from "react";
import { useAccount } from "wagmi";
import { Navigate, Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";

import {
  useIsFrozen,
  useIsUserAllowed,
  usePDNBalance,
  usePDNSymbol,
} from "src/lib";

import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import { CircularProgress, Grid } from "@mui/material";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  const { address, isConnected } = useAccount();
  const { isFrozen } = useIsFrozen();

  const {
    roundedBalance,
    fetchPDNBalance,
    isLoading: isBalanceLoading,
    isFetching: isBalanceFetching,
  } = usePDNBalance();

  const {
    symbol,
    isLoading: isSymbolLoading,
    isFetching: isSymbolFetching,
  } = usePDNSymbol();

  const { isAllowed, isLoading } = useIsUserAllowed();

  if (isLoading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        width="100vw"
        height="100vh"
      >
        <CircularProgress />
      </Grid>
    );
  }

  if (!isAllowed) {
    return <Navigate to="/forbidden" />;
  }

  if (!isConnected) {
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
          address,
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
        <Outlet
          context={{
            refetchBalance: fetchPDNBalance,
            balance: roundedBalance,
            symbol,
          }}
        />
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
