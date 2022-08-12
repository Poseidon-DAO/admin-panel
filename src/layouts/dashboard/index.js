import { useState } from "react";
import { Outlet } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
//
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import { useEffect } from "react";
import { accessibilityOptions } from "src/abis";
import { useMoralis } from "react-moralis";
import SMART_CONTRACT_FUNCTIONS from "src/smartContract";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

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

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const { Moralis, account } = useMoralis();
  const [isFrozen, setIsFrozen] = useState(false);

  useEffect(() => {
    const checkIfFrozen = async () => {
      const isFrozenOp = accessibilityOptions(
        account,
        SMART_CONTRACT_FUNCTIONS.CHECK_IS_FROZEN,
        {}
      );
      const frozen = await Moralis.executeFunction(isFrozenOp);
      if (frozen) setIsFrozen(true);
    };
    checkIfFrozen();
  }, [account, Moralis]);

  return (
    <RootStyle>
      <DashboardNavbar
        onOpenSidebar={() => setOpen(true)}
        isFrozen={isFrozen}
      />
      <DashboardSidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
        isFrozen={isFrozen}
      />
      <MainStyle isFrozen={isFrozen}>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
