import { Button } from "@mui/material";
import { useConnect, useDisconnect, useNetwork } from "wagmi";

import metamask from "../../assets/metamask-logo.png";

export default function AuthMetamask() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();

  const handleLogin = () => {
    connect({ connector: connectors[0] });
    // disconnect();
  };

  // const buttonDisabled = chain.id !== process.env.REACT_APP_CHAIN;

  return (
    <>
      <Button
        // disabled={buttonDisabled}
        onClick={handleLogin}
        color="inherit"
        variant="text"
      >
        <img src={metamask} alt="metamask" width="200" />
      </Button>
    </>
  );
}
