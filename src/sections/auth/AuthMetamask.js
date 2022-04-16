// material
import {  Button, Divider } from '@mui/material';
import { useContext } from 'react';

import { useMoralis } from 'react-moralis';
import { Store } from 'src/App';
import metamask from '../../assets/metamask.png';

// ----------------------------------------------------------------------

export default function AuthMetamask() {
  const { authenticate } = useMoralis();
  const { currentNetwork } = useContext(Store);
  const handleLogin = () => {
    if (currentNetwork === 'Rinkeby') authenticate('metamask');
  }
  return (
    <>
      <Button disabled={!window.ethereum || currentNetwork !== 'Rinkeby'} onClick={handleLogin} color="inherit" height='50px' width='50px' >
        <img src={metamask} alt='metamask' height='100%' width='100%' />
      </Button>
      <Divider sx={{ my: 3 }} />
    </>
  );
}
