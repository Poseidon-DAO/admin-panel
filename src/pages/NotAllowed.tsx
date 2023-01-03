import { type FC } from "react";
import { useDisconnect } from "wagmi";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

import Page from "src/components/Page";

const NotAllowed: FC = () => {
  const navigate = useNavigate();
  const { disconnect } = useDisconnect();

  const returnToLogin = () => {
    disconnect();
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
        <img
          src="../assets/logo.png"
          alt="PoseidonDAO"
          height="100px"
          width="100px"
        />
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
};

export default NotAllowed;
