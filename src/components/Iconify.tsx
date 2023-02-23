import { FC } from "react";
import { Icon, type IconifyIcon } from "@iconify/react";
import { Box } from "@mui/material";

type IProps = {
  icon: string | IconifyIcon;
  sx?: object;
  width?: number;
  height?: number;
  color?: string;
};

const Iconify: FC<IProps> = ({ icon, sx = {}, ...other }) => {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
};

export default Iconify;
