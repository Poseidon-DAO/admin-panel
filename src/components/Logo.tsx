import { type FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";

type IProps = {
  disabledLink?: boolean;
  roundedCorners?: boolean;
  width?: number;
};

const Logo: FC<IProps> = ({
  disabledLink = false,
  width = 150,
  roundedCorners = false,
}) => {
  const logo = (
    <Box width={width}>
      <img
        src="/static/logo.png"
        alt="logo"
        style={{ borderRadius: roundedCorners ? "12px" : 0 }}
      />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
};

export default Logo;
