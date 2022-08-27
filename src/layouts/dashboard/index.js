import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";

import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import { useIsFrozen, usePDNBalance, usePDNSymbol } from "src/lib/hooks";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const { fetchIsFrozen } = useIsFrozen();
  const { fetchPDNBalance, roundedBalance } = usePDNBalance();
  const { fetchPDNSymbol, symbol } = usePDNSymbol();

  useEffect(() => {
    fetchIsFrozen({
      onSuccess: (isFrozen) => {
        if (!!isFrozen) setIsFrozen(isFrozen);
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchPDNBalance();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchPDNSymbol();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RootStyle>
      <DashboardNavbar
        onOpenSidebar={() => setOpen(true)}
        isFrozen={isFrozen}
      />
      <DashboardSidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
        balance={roundedBalance}
        symbol={symbol}
      />
      <MainStyle isFrozen={isFrozen}>
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
