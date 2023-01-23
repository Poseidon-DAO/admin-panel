import { useState } from "react";
import { useAccount, useNetwork } from "wagmi";
import { Navigate, Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";

import {
  useIsFrozen,
  useIsUserAllowed,
  usePDNBalance,
  usePDNSymbol,
} from "src/lib/chain";

import { FullPageLoader } from "src/components/FullPageLoader";

import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import CustomSnackbar from "src/components/CustomSnackbar";
import { NetworkTypes } from "src/constants";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

export default function DashboardLayout({ activeSectionTitle }) {
  const [open, setOpen] = useState(false);

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
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
    return <FullPageLoader />;
  }

  if (!isConnected) {
    return <Navigate to="/" />;
  }

  if (!isAllowed && isAllowed !== null) {
    return <Navigate to="/forbidden" />;
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
      <MainStyle $isFrozen={isFrozen}>
        <Outlet
          context={{
            refetchBalance: fetchPDNBalance,
            balance: roundedBalance,
            symbol,
          }}
        />

        <CustomSnackbar
          isOpen={process.env.REACT_APP_CHAIN !== `0x${chain?.id}`}
          type="error"
          message={`Please switch to ${NetworkTypes[
            process.env.REACT_APP_CHAIN
          ].toLowerCase()} network!`}
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
  shouldForwardProp: (props) => props !== "$isFrozen",
})(({ theme, $isFrozen }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24 + ($isFrozen ? 25 : 0),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));
