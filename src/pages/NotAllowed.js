// material
import { Box, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import logo from '../assets/logo.png'

// ----------------------------------------------------------------------

export default function NotAllowed() {
  return (
    <Page title="Forbidden access">
      <Box display='flex' flexDirection='column' alignItems="center" justifyContent="center" height='100vh' width='100vw'>
        <img src={logo} alt='PoseidonDAO' height='100px' width='100px' />
        <Typography variant="h4" gutterBottom mt={5}>
            You're not allowed to view this page.
        </Typography>
        <Typography variant="h5" gutterBottom>
          If you're sure you have access, try checking if the Metamask address is the correct one!
        </Typography>
      </Box>
    </Page>
  );
}
