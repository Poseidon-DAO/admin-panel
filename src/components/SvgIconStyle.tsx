import { type FC } from "react";
import { Box } from "@mui/material";

type IProps = {
  src: string;
  sx?: object;
};

const SvgIconStyle: FC<IProps> = ({ src, sx = {} }) => {
  return (
    <Box
      component="span"
      sx={{
        width: 24,
        height: 24,
        display: "inline-block",
        bgcolor: "currentColor",
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
    />
  );
};

export default SvgIconStyle;
