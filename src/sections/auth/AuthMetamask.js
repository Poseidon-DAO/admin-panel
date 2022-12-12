import { Button } from "@mui/material";
import { useConnect } from "wagmi";

import metamask from "../../assets/metamask-logo.png";

export default function AuthMetamask() {
  const { connect, connectors } = useConnect();

  const handleLogin = () => {
    connect({ connector: connectors[0] });
  };

  return (
    <Button
      onClick={handleLogin}
      color="inherit"
      variant="text"
      sx={{
        transition: "transform .4s",
        ":hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <img src={metamask} alt="metamask" width="200" />
    </Button>
  );
}
