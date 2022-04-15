// material
import {  Button, Divider } from '@mui/material';

import { useMoralis } from 'react-moralis';
import metamask from '../../assets/metamask.png';

// ----------------------------------------------------------------------

export default function AuthMetamask({ disabled }) {
  const { authenticate } = useMoralis();

  const handleLogin = () => {
    authenticate('metamask');
  }
  return (
    <>
      <Button disabled={!window.ethereum} onClick={handleLogin} color="inherit" height='50px' width='50px' >
        <img src={metamask} alt='metamask' height='100%' width='100%' />
      </Button>
      <Divider sx={{ my: 3 }} />
    </>
  );
}
