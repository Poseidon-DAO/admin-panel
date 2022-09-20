import { Button } from "@mui/material";
import { useMoralis } from "react-moralis";

import metamask from "../../assets/metamask-logo.png";

export default function AuthMetamask() {
  const { authenticate, chainId } = useMoralis();

  const handleLogin = () => {
    try {
      authenticate("metamask");
    } catch (err) {
      console.log(err);
    }
  };

  const buttonDisabled = chainId !== process.env.REACT_APP_CHAIN;

  return (
    <>
      <Button
        disabled={buttonDisabled}
        onClick={handleLogin}
        color="inherit"
        variant="text"
      >
        <img src={metamask} alt="metamask" width="200" />
      </Button>
    </>
  );
}
