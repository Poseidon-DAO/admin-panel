import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Box,
  Drawer,
  Typography,
  Avatar,
  Tooltip,
  CircularProgress,
  Stack,
} from "@mui/material";
import account from "../../_mock/account";
import useResponsive from "../../hooks/useResponsive";
import Logo from "../../components/Logo";
import Scrollbar from "../../components/Scrollbar";
import NavSection from "../../components/NavSection";

import navConfig from "./NavConfig";
import { formatAddress } from "src/utils/formatAddress";

const DRAWER_WIDTH = 280;

DashboardSidebar.propTypes = {
  isSidebarOpen: PropTypes.bool,
  onSidebarClose: PropTypes.func,
  accountInfo: PropTypes.shape({
    address: PropTypes.string,
    balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    symbol: PropTypes.string,
  }),
};

DashboardSidebar.defaultProps = {
  accountInfo: {
    address: "",
    balance: "",
    symbol: "",
    isLoading: false,
  },
};

export default function DashboardSidebar({
  isSidebarOpen,
  onSidebarClose,
  accountInfo: { address, balance, symbol, isLoading },
}) {
  const { pathname } = useLocation();
  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (isSidebarOpen) {
      onSidebarClose();
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
        <Logo width={70} roundedCorners />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <AccountStyle>
          <Avatar src={account.photoURL} alt="photoURL" />

          {isLoading ? (
            <Stack sx={{ ml: 8 }}>
              <CircularProgress size={20} />
            </Stack>
          ) : (
            <Box sx={{ ml: 2 }}>
              <Tooltip title={address || ""}>
                <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                  {formatAddress(address, 4)}
                </Typography>
              </Tooltip>
              <Tooltip title={balance || ""}>
                <Typography variant="caption" sx={{ color: "text.primary" }}>
                  {Number(balance).toFixed(5)} {symbol}
                </Typography>
              </Tooltip>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {account.role}
              </Typography>
            </Box>
          )}
        </AccountStyle>
      </Box>

      <NavSection navConfig={navConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isSidebarOpen}
          onClose={onSidebarClose}
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
  minHeight: "78px",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));
