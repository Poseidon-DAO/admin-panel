import { Button, Divider } from "@mui/material";
import { useMoralis } from "react-moralis";
import { NetworkTypes } from "src/types";

import metamask from "../../assets/metamask.png";

export default function AuthMetamask() {
  const { authenticate, chainId } = useMoralis();

  const handleLogin = () => {
    try {
      authenticate("metamask");
    } catch (err) {
      console.log(err);
    }
  };

  const buttonDisabled =
    NetworkTypes[chainId]?.toLowerCase() !== process.env.REACT_APP_CHAIN;

  return (
    <>
      <Button
        disabled={buttonDisabled}
        onClick={handleLogin}
        color="inherit"
        height="50px"
        width="50px"
      >
        <img src={metamask} alt="metamask" height="100%" width="100%" />
      </Button>
      <Divider sx={{ my: 3 }} />
    </>
  );
}
