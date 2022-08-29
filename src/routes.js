import {
  Navigate,
  useNavigate,
  useRoutes,
  useLocation,
} from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Accessibility from "./pages/Accessibility";
import Login from "./pages/Login";
import NotAllowed from "./pages/NotAllowed";
import NotFound from "./pages/Page404";
import DashboardApp from "./pages/DashboardApp";
import { useCallback, useContext, useEffect, useState } from "react";
import { Store } from "./App";
import { useMoralis } from "react-moralis";
import { NetworkTypes } from "./types";
import { Alert, Snackbar } from "@mui/material";
import { multiSigOptions } from "./abis";
import SMART_CONTRACT_FUNCTIONS from "./smartContract";
import Polls from "./pages/Polls";
import Airdrop from "./pages/Airdrop";
import Transfer from "./pages/Transfer";

// ----------------------------------------------------------------------

function Router() {
  return useRoutes([
    {
      path: "/app",
      element: <DashboardLayout />,
      children: [
        { path: "dashboard", element: <DashboardApp /> },
        { path: "accessibility", element: <Accessibility /> },
        { path: "polls", element: <Polls /> },
        { path: "airdrop", element: <Airdrop /> },
        { path: "transfer", element: <Transfer /> },
      ],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "/", element: <Navigate to="/login" /> },
        { path: "login", element: <Login /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "/forbidden",
      element: <NotAllowed />,
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

export default function Main() {
  const { Moralis, isAuthenticated, account, logout } = useMoralis();
  const [chainId, setChainId] = useState("");
  const [needMetamask, setNeedMetamask] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth, setCurrentNetwork, currentNetwork } = useContext(Store);

  const isUserAllowed = useCallback(async () => {
    try {
      if (account) {
        const options = multiSigOptions(
          account,
          SMART_CONTRACT_FUNCTIONS.GET_IS_MULTISIG_ADDRESS,
          {}
        );
        const res = await Moralis.executeFunction(options);
        return res;
      }
      return false;
    } catch (error) {
      console.log("Error", error);
    }
  }, [Moralis, account]);

  //Navigate to app or login when conditions are met
  useEffect(() => {
    // if (location.pathname !== '/login' && (!isAuthenticated || currentNetwork.toLowerCase() !== process.env.REACT_APP_CHAIN)) navigate('/login');
    if (
      currentNetwork.toLowerCase() === process.env.REACT_APP_CHAIN &&
      isAuthenticated &&
      location.pathname === "/login"
    )
      navigate("/app");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, isAuthenticated, currentNetwork]);

  // Initialize web3 env
  const setWeb3Env = () => {
    getNetwork();
    monitorNetwork();
    monitorDisconnection();
  };

  //Check if the user is allowed to view the dashboard by calling the smart contract getIsMultiSigAddress
  useEffect(() => {
    const checkAllowed = async () => {
      const isAllowed = await isUserAllowed();
      if (!isAllowed) navigate("/forbidden");
    };
    if (
      account &&
      isAuthenticated &&
      currentNetwork.toLowerCase() === process.env.REACT_APP_CHAIN
    ) {
      checkAllowed();
    }
  }, [account, isAuthenticated, isUserAllowed, navigate, currentNetwork]);

  // Toast depending on chain being used
  const getNetwork = async () => {
    try {
      const chainID = await Moralis.getChainId();
      if (chainID) {
        setChainId(chainID);
        setCurrentNetwork(NetworkTypes[chainID]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Reload on chain change
  const monitorNetwork = () => {
    Moralis.onChainChanged(() => {
      getNetwork();
    });
  };

  // Check if user disconnects from inside Metamask
  const monitorDisconnection = () => {
    Moralis.onAccountChanged(() => {
      logout();
      setAuth({});
    });
  };

  // Update stuff once web3 is enabled.
  const onWeb3Enabled = () => {
    Moralis.onWeb3Enabled(() => {
      setWeb3Env();
    });
  };

  // Initialize web3 through Moralis on load
  useEffect(() => {
    const enableWeb3 = async () => {
      if (!window.ethereum) {
        setNeedMetamask(true);
        return;
      }
      try {
        await Moralis.enableWeb3();
      } catch (e) {
        setNeedMetamask(true);
      }
    };
    enableWeb3();
    onWeb3Enabled();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If user authenticates, we set up the environment, if he logs out, we clear login details
  useEffect(() => {
    if (isAuthenticated) {
      onWeb3Enabled();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Update chain of change in wallet
  useEffect(() => {
    if (chainId.length && account) {
      const chainName = NetworkTypes[chainId];
      setAuth({
        name: chainName,
        id: chainId,
        address: account,
      });
    }
  }, [chainId, account, setAuth]);

  return (
    <>
      <Snackbar
        severity="error"
        open={
          needMetamask ||
          currentNetwork.toLowerCase() !== process.env.REACT_APP_CHAIN
        }
        autoHideDuration={6000}
        onClose={() => {
          setNeedMetamask(false);
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="error">
          {needMetamask
            ? "Please install or log into Metamask to continue."
            : `Please change network to ${process.env.REACT_APP_CHAIN} or log into Metamask.`}
        </Alert>
      </Snackbar>
      <Router />
    </>
  );
}
