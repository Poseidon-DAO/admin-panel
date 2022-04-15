import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography, Snackbar, Alert } from '@mui/material';
// hooks
import { useEffect, useState } from "react";
import { useMoralis } from 'react-moralis';
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections
import AuthMetamask from '../sections/auth/AuthMetamask'

import { NetworkTypes } from '../types';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  const { Moralis, isAuthenticated, account, logout } = useMoralis();
  const [chainId, setChainId] = useState("");
  const [needMetamask, setNeedMetamask] = useState(false);
  // Initialize web3 env
  const setWeb3Env = () => {
    getNetwork();
    monitorNetwork();
    monitorDisconnection();
  };

  // Toast depending on chain being used
  const getNetwork = async () => {
    try {
      const chainID = await Moralis.getChainId();
      if (chainID) {
        setChainId(chainID);
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
    onWeb3Enabled();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If user authenticates, we set up the environment
  useEffect(() => {
    if (isAuthenticated) {
      onWeb3Enabled();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Update chain of change in wallet
  useEffect(() => {
    if (chainId.length && account) {
      // @ts-ignore
      const chainName = NetworkTypes[chainId];
      console.log({
        name: chainName,
        id: chainId,
        address: account,
      });
    }
  }, [chainId, account]);

  

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo />
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/static/illustrations/illustration_login.png" alt="login" />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Sign in to access the admin panel
            </Typography>
            <AuthMetamask />
          </ContentStyle>
          <Snackbar
            severity="error"
            open={needMetamask}
            autoHideDuration={8000}
            onClose={() => setNeedMetamask(false)}
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
          >
            <Alert severity='error'>Please install Metamask to continue.</Alert>
          </Snackbar>
        </Container>
      </RootStyle>
    </Page>
  );
}
