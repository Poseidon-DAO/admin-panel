import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, IconButton } from "@mui/material";

import FrozenWarn from "src/components/FrozenWarn";
import Iconify from "../../components/Iconify";
import AccountPopover from "./AccountPopover";
import PageTitle from "src/sections/common/page-title/PageTitle";

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
  isFrozen: PropTypes.bool,
  activeSectionTitle: PropTypes.string,
};

export default function DashboardNavbar({
  activeSectionTitle,
  isFrozen,
  onOpenSidebar,
}) {
  return (
    <RootStyle>
      {isFrozen && <FrozenWarn />}
      <ToolbarStyle>
        <IconButton
          onClick={onOpenSidebar}
          sx={{ mr: 1, color: "text.primary", display: { lg: "none" } }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <PageTitle position="header">{activeSectionTitle}</PageTitle>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  color: theme.palette.grey[800],
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));
