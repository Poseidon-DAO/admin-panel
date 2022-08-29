// material
import { Box, Button, Typography } from "@mui/material";
// components
import Page from "../components/Page";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useMoralis } from "react-moralis";

// ----------------------------------------------------------------------

export default function NotAllowed() {
  const navigate = useNavigate();
  const { logout } = useMoralis();

  const returnToLogin = () => {
    logout();
    navigate("/login");
  };

  return (
    <Page title="Forbidden access">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        width="100vw"
      >
        <img src={logo} alt="PoseidonDAO" height="100px" width="100px" />
        <Typography variant="h4" gutterBottom mt={5}>
          You're not allowed to view this page.
        </Typography>
        <Typography variant="h5" gutterBottom>
          If you're sure you have access, try checking if the Metamask address
          is the correct one!
        </Typography>
        <Button onClick={returnToLogin}>Return to login</Button>
      </Box>
    </Page>
  );
}
