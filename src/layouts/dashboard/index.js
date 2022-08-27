import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";

import { accessibilityOptions } from "src/abis";
import SMART_CONTRACT_FUNCTIONS from "src/smartContract";

import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [balance, setBalance] = useState(null);
  const { Moralis, account, user } = useMoralis();

  useEffect(() => {
    async function getIsFrozen() {
      try {
        const frozen = await Moralis.executeFunction(
          accessibilityOptions(
            account,
            SMART_CONTRACT_FUNCTIONS.CHECK_IS_FROZEN,
            {}
          )
        );

        if (!!frozen) setIsFrozen(true);
      } catch (err) {
        console.error(err);
      }
    }

    getIsFrozen();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  useEffect(() => {
    async function getBalance() {
      try {
        const response = await Moralis.Web3API.account.getNativeBalance({
          chain: process.env.REACT_APP_CHAIN,
          account: user.get("ethAddress"),
        });

        const balance = Moralis.Units.FromWei(response.balance);
        const balanceAsNumber = Number(balance);
        setBalance(balanceAsNumber);
      } catch (err) {
        console.error(err);
      }
    }

    getBalance();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <RootStyle>
      <DashboardNavbar
        onOpenSidebar={() => setOpen(true)}
        isFrozen={isFrozen}
        balance={balance}
      />
      <DashboardSidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
        balance={balance}
      />
      <MainStyle isFrozen={isFrozen}>
        <Outlet context={{ balance }} />
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
