import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export default function SettingsSidebar() {
  return (
    <div>
      <Item>Token</Item>
      <Item>Token</Item>
      <Item>Token</Item>
    </div>
  );
}

const Item = styled(Box, {
  shouldForwardProp: (props) => props !== "isFrozen",
})(({ theme, isFrozen }) => ({
  marginLeft: "300px",

  // flex: "1",
  // border: "1px solid red",
  // flexGrow: 1,
  // overflow: "auto",
  // minHeight: "100%",
  // paddingTop: APP_BAR_MOBILE + 24,
  // paddingBottom: theme.spacing(10),
  // [theme.breakpoints.up("lg")]: {
  //   paddingTop: APP_BAR_DESKTOP + 24 + (isFrozen ? 25 : 0),
  //   paddingLeft: theme.spacing(2),
  //   paddingRight: theme.spacing(2),
  // },
}));
