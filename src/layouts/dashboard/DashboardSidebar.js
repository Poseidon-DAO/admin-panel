import { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Link, Drawer, Typography, Avatar, Tooltip } from "@mui/material";
import { formatAddress } from "src/utils/formatAddress";

import account from "../../_mock/account";
import useResponsive from "../../hooks/useResponsive";
import Logo from "../../components/logo.js";
import Scrollbar from "../../components/Scrollbar";
import NavSection from "../../components/NavSection";
import navConfig from "./NavConfig";
import { Store } from "../../App";

const DRAWER_WIDTH = 280;

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
  balance: PropTypes.number,
  symbol: PropTypes.string,
};

export default function DashboardSidebar({
  isOpenSidebar,
  onCloseSidebar,
  balance,
  symbol,
}) {
  const { pathname } = useLocation();
  const { auth } = useContext(Store);
  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={account.photoURL} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Tooltip title={auth?.address}>
                <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                  {formatAddress(auth?.address, 4)}
                </Typography>
              </Tooltip>
              <Tooltip title={balance}>
                <Typography variant="caption" sx={{ color: "text.primary" }}>
                  {balance} {symbol}
                </Typography>
              </Tooltip>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {account.role}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={navConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));
