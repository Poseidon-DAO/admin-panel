import { Navigate, useNavigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotAllowed from './pages/NotAllowed';
import NotFound from './pages/Page404';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Store } from './App';
import { useMoralis } from 'react-moralis';
import { NetworkTypes } from './types';
import { Alert, Snackbar } from '@mui/material';
import { multisigOptions } from './abis';

// ----------------------------------------------------------------------

function Router() {
  return useRoutes([
    {
      path: '/forbidden',
      element: <NotAllowed />,
    },
    {
      path: '/app',
      element: <DashboardLayout />,
      children: [
        { path: 'dashboard', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);

}

export default function Main() { 

  const { Moralis, isAuthenticated, account, logout } = useMoralis();
  const [chainId, setChainId] = useState("");
  const [needMetamask, setNeedMetamask] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { auth, setAuth, setCurrentNetwork, currentNetwork } = useContext(Store);

  const fetchContract = useCallback(async () => {
    try {
      if (account){
        const options = multisigOptions(account, "getIsMultiSigAddress", {})
        const res = await Moralis.executeFunction(options);
        return res;
      }
    } catch (error) {
      console.log("Error", error);
    }
  }, [Moralis, account]);

  useEffect(() => {
    if (!auth.name || auth.name !== 'Rinkeby' || !isAuthenticated || currentNetwork !== 'Rinkeby') navigate('/login');
  },[auth.name, navigate, isAuthenticated, currentNetwork]);

  useEffect(() => {
    if (auth.name === 'Rinkeby' && isAuthenticated && location.pathname === '/login') {
      navigate('/app');
    }
  },[auth, navigate, isAuthenticated, location.pathname]);

  // Initialize web3 env
  const setWeb3Env = () => {
    getNetwork();
    monitorNetwork();
    monitorDisconnection();
  };

  useEffect(() => {
    const isAllowed = fetchContract();
    if (!isAllowed) navigate('/forbidden');
  }, [account, fetchContract, navigate]);

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
      }catch(e) {
        setNeedMetamask(true);
      }
    };
    enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If user authenticates, we set up the environment
  useEffect(() => {
    if (isAuthenticated) {
      onWeb3Enabled();
      fetchContract();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          open={needMetamask || currentNetwork !== 'Rinkeby'}
          autoHideDuration={6000}
          onClose={() => {
            setNeedMetamask(false);
          }}
          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        >
        <Alert severity='error'>{needMetamask ? "Please install Metamask to continue." : "Please change network to Rinkeby!"}</Alert>
      </Snackbar>
      <Router />
    </>
  );
}